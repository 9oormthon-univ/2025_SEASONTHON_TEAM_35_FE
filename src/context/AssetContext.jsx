import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { submitPlan as submitPlanApi } from '../api/planApi';
import {MOCK_SUMMARY} from "@/mocks/assetMock.js";


// (옵션) 모킹 토글: .env에서 VITE_USE_MOCK=true 로 설정 시 가짜 데이터 사용
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// API 응답을 프론트엔드 형식으로 변환하는 새로운 함수
const transformAssetData = (apiResult) => {
    if (!apiResult) return null;

    // 1. 자산 분석(막대그래프)을 위한 데이터
    const mainAssets = [
        { key: 'cash',       name: '현금',  amount: apiResult.cashAmount,       ratio: apiResult.cashRatioPercent,       colorKey: 'cash',       mode: 'cash' },
        { key: 'deposit',    name: '예금',  amount: apiResult.depositAmount,    ratio: apiResult.depositRatioPercent,    colorKey: 'deposit',    mode: 'cash' },
        { key: 'savings',    name: '적금',  amount: apiResult.savingsAmount,    ratio: apiResult.savingsRatioPercent,    colorKey: 'savings',    mode: 'cash' },
        { key: 'investment', name: '투자',  amount: apiResult.investedAmount,   ratio: apiResult.investedRatioPercent,   colorKey: 'investment', mode: 'investment' },
        { key: 'etc',        name: '기타',  amount: apiResult.otherAmount,      ratio: apiResult.otherRatioPercent,      colorKey: 'etc',        mode: 'etc' },
    ].filter(item => item.amount > 0); // 금액이 0인 항목은 필터링

    // 2. 투자 분석(도넛그래프)을 위한 데이터
    const investmentAssets = [
        { key: 'stock',   name: '주식',      ratio: apiResult.stockRatioPercent,    amount: apiResult.investedAmount * (apiResult.stockRatioPercent / 100) },
        { key: 'bitcoin', name: '비트코인',  ratio: apiResult.bitcoinRatioPercent,  amount: apiResult.investedAmount * (apiResult.bitcoinRatioPercent / 100) },
        { key: 'bond',    name: '채권',      ratio: apiResult.bondRatioPercent,     amount: apiResult.investedAmount * (apiResult.bondRatioPercent / 100) },
        { key: 'etf',     name: 'ETF',       ratio: apiResult.etfRatioPercent,      amount: apiResult.investedAmount * (apiResult.etfRatioPercent / 100) },
    ].filter(item => item.amount > 0);

    return {
        totalAmount: apiResult.totalAmount,
        mainAssets,
        investmentAssets,
    };
};
async function mockSubmitPlan() { await wait(); return { isSuccess: true }; }
// ----------------------------
const AssetContext = createContext(null);

export function AssetProvider({ children }) {
    const [assetData, setAssetData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const fetchAssetSummary = useCallback(async () => {
        setLoading(true);
        try {
            // 나중에 실제 API로 교체: const response = await getAssetSummary();
            const apiResult = MOCK_SUMMARY;
            const transformedData = transformAssetData(apiResult);
            setAssetData(transformedData);
        } catch (e) {
            console.error("자산 요약 조회 실패:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAssetSummary();
    }, [fetchAssetSummary]);

    const submitAssetPlan = async (payload) => {
        setIsSubmitting(true); setError(null);
        try {
            if (USE_MOCK) await mockSubmitPlan(payload);
            else await submitPlanApi(payload); // :contentReference[oaicite:3]{index=3}
            return true;
        } catch (e) { setError(e); return false; }
        finally { setIsSubmitting(false); }
    };

    return (
        <AssetContext.Provider value={{
            assetData,
            loading,
            isSubmitting,
            error,
            userName: "김민서",
            submitAssetPlan,
            refetchAssets: fetchAssetSummary,
        }}>
            {children}
        </AssetContext.Provider>
    );
}

export function useAssets() {
    const ctx = useContext(AssetContext);
    if (!ctx) throw new Error('useAssets must be used within an AssetProvider');
    return ctx;
}
