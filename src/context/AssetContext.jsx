import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getAssetSummary } from '@/api/assetApi.js';
import { MOCK_SUMMARY } from '@/mocks/assetMock.js';
import apiClient from '@/api/client.js'; // (아직 submit 쪽에서 사용)

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

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
            console.log('[PLAN][REQUEST] POST /api/v0/recommendation/design', payload);

            const res = await apiClient.post('/api/v0/recommendation/design', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    // ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            console.log('[PLAN][RESPONSE]', res.status, res.data);

            // 성공/실패를 더 풍부하게 리턴
            return {
                ok: res.status >= 200 && res.status < 300,
                status: res.status,
                data: res.data,
                error: null,
            };
        } catch (err) {
            const status = err?.response?.status;
            const data = err?.response?.data;
            const message = err?.message ?? 'Unknown error';

            console.error('[PLAN][ERROR]', status, data || message);

            return {
                ok: false,
                status: status ?? 0,
                data: null,
                error: data || message,
            };
        }
    };

    return {
        ...ctx,          // 기존 컨텍스트 값들 유지
        submitAssetPlan, // 새 API 함수 노출
    };
}