import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getAssetSummary } from '@/api/assetApi.js';
import { MOCK_SUMMARY } from '@/mocks/assetMock.js';
import apiClient from '@/api/client.js';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const toRecommendationDTO = (p) => ({
    // 서버가 enum으로 받는 필드들 (이름만 Type로 바꿔줌)
    incomeRangeType: p.incomeRange,
    savingRangeType: p.savingRange,
    expectedProfitRangeType: p.profitRange,        // 서버가 profitRange → expectedProfitRangeType일 가능성 높음
    investmentPeriodType: p.investmentPeriod,
    investmentPropensityType: p.propensity,
    investmentPurposeType: p.investmentPurpose,

    // 불리언은 반드시 boolean으로
    emergencyFundNeeded: p.emergencyFund === true || p.emergencyFund === 'true',

    // 필요 시 식별자 추가 (토큰으로 식별하면 제외 가능)
    ...(p.memberId ? { memberId: p.memberId } : {}),
});

const transformAssetData = (apiResult) => {
    if (!apiResult) return null;

    const invested = Number(apiResult.investedAmount ?? 0);

    const mainAssets = [
        { key: 'cash',       name: '현금',  amount: apiResult.cashAmount,     ratio: apiResult.cashRatioPercent,     colorKey: 'cash',       mode: 'cash' },
        { key: 'deposit',    name: '예금',  amount: apiResult.depositAmount,  ratio: apiResult.depositRatioPercent,  colorKey: 'deposit',    mode: 'cash' },
        { key: 'savings',    name: '적금',  amount: apiResult.savingsAmount,  ratio: apiResult.savingsRatioPercent,  colorKey: 'savings',    mode: 'cash' },
        { key: 'investment', name: '투자',  amount: apiResult.investedAmount, ratio: apiResult.investedRatioPercent, colorKey: 'investment', mode: 'investment' },
        { key: 'etc',        name: '기타',  amount: apiResult.otherAmount,    ratio: apiResult.otherRatioPercent,    colorKey: 'etc',        mode: 'etc' },
    ].filter((i) => Number(i.amount) > 0);

    const investmentAssets = [
        { key: 'stock',   name: '주식',     ratio: apiResult.stockRatioPercent,   amount: invested * (Number(apiResult.stockRatioPercent ?? 0)   / 100) },
        { key: 'bitcoin', name: '비트코인', ratio: apiResult.bitcoinRatioPercent, amount: invested * (Number(apiResult.bitcoinRatioPercent ?? 0) / 100) },
        { key: 'bond',    name: '채권',     ratio: apiResult.bondRatioPercent,    amount: invested * (Number(apiResult.bondRatioPercent ?? 0)    / 100) },
        { key: 'etf',     name: 'ETF',      ratio: apiResult.etfRatioPercent,     amount: invested * (Number(apiResult.etfRatioPercent ?? 0)     / 100) },
    ].filter((i) => Number(i.amount) > 0);

    return {
        totalAmount: apiResult.totalAmount,
        mainAssets,
        investmentAssets,
    };
};

const AssetContext = createContext(null);

export function AssetProvider({ children }) {
    const [assetData, setAssetData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const fetchAssetSummary = useCallback(async () => {
        setLoading(true);
        try {
            const apiResult = USE_MOCK ? MOCK_SUMMARY : await getAssetSummary(); // getAssetSummary는 result만 반환
            const transformed = transformAssetData(apiResult);
            setAssetData(transformed);
        } catch (e) {
            console.error('자산 요약 조회 실패:', e);
            setError(e);
            setAssetData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAssetSummary();
    }, [fetchAssetSummary]);

    return (
        <AssetContext.Provider
            value={{
                assetData,
                loading,
                isSubmitting,
                error,
                userName: '김민서',
                refetchAssets: fetchAssetSummary,
            }}
        >
            {children}
        </AssetContext.Provider>
    );
}

export function useAssets() {
    const ctx = useContext(AssetContext);
    if (!ctx) throw new Error('useAssets must be used within an AssetProvider');

    const submitAssetPlan = async (payload) => {
        try {
            const dto = toRecommendationDTO(payload);
            console.log('[PLAN][REQUEST] POST /api/v0/recommendation/design');
            console.log('[PLAN][REQUEST][DTO]', dto);

            const res = await apiClient.post('/api/v0/recommendation/design', dto, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('[PLAN][RESPONSE]', res.status, res.data);
            return {
                ok: res.status >= 200 && res.status < 300,
                status: res.status,
                data: res.data,
                error: null,
            };
        } catch (err) {
            const status = err?.response?.status;
            // 서버 메시지 상세를 그대로 보여주자 (스프링 표준 problem+json 스타일)
            const body = err?.response?.data;
            console.error('[PLAN][ERROR]', status, body || err?.message);

            return {
                ok: false,
                status: status ?? 0,
                data: null,
                error: body || err?.message || 'Unknown error',
            };
        }
    };

    return { ...ctx, submitAssetPlan };
}