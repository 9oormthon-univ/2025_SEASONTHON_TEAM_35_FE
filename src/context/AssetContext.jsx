import React, { createContext, useState, useContext, useCallback } from 'react';
import { getAssetSummary } from '@/api/assetApi.js';
import {submitPlan} from "@/api/planApi.js";
import {getMemberName} from "@/api/memberApi.js";
import { MOCK_SUMMARY } from '@/mocks/assetMock.js';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// --- 데이터 변환 유틸리티 함수들 (수정 없음) ---
const toRecommendationDTO = (p) => ({
    // 서버가 enum으로 받는 필드들 (이름만 Type로 바꿔줌)
    incomeRangeType: p.incomeRange,
    savingRangeType: p.savingRange,
    expectedProfitRangeType: p.profitRange, // 서버가 profitRange → expectedProfitRangeType일 가능성 높음
    investmentPeriodType: p.investmentPeriod,
    investmentPropensityType: p.propensity,
    investmentPurposeType: p.investmentPurpose,

    // 불리언은 반드시 boolean으로
    emergencyFundNeeded: p.emergencyFund === true || p.emergencyFund === "true",

    // 필요 시 식별자 추가 (토큰으로 식별하면 제외 가능)
    ...(p.memberId ? { memberId: p.memberId } : {}),
});

const transformAssetData = (apiResult) => {
    if (!apiResult) return null;

    const invested = Number(apiResult.investedAmount ?? 0);

    const mainAssets = [
        {
            key: "cash",
            name: "현금",
            amount: apiResult.cashAmount,
            ratio: apiResult.cashRatioPercent,
            colorKey: "cash",
            mode: "cash",
        },
        {
            key: "deposit",
            name: "예금",
            amount: apiResult.depositAmount,
            ratio: apiResult.depositRatioPercent,
            colorKey: "deposit",
            mode: "cash",
        },
        {
            key: "savings",
            name: "적금",
            amount: apiResult.savingsAmount,
            ratio: apiResult.savingsRatioPercent,
            colorKey: "savings",
            mode: "cash",
        },
        {
            key: "investment",
            name: "투자",
            amount: apiResult.investedAmount,
            ratio: apiResult.investedRatioPercent,
            colorKey: "investment",
            mode: "investment",
        },
        {
            key: "etc",
            name: "기타",
            amount: apiResult.otherAmount,
            ratio: apiResult.otherRatioPercent,
            colorKey: "etc",
            mode: "etc",
        },
    ].filter((i) => Number(i.amount) > 0);

    const investmentAssets = [
        {
            key: "stock",
            name: "주식",
            ratio: apiResult.stockRatioPercent,
            amount:
                invested * (Number(apiResult.stockRatioPercent ?? 0) / 100),
        },
        {
            key: "bitcoin",
            name: "비트코인",
            ratio: apiResult.bitcoinRatioPercent,
            amount:
                invested * (Number(apiResult.bitcoinRatioPercent ?? 0) / 100),
        },
        {
            key: "bond",
            name: "채권",
            ratio: apiResult.bondRatioPercent,
            amount:
                invested * (Number(apiResult.bondRatioPercent ?? 0) / 100),
        },
        {
            key: "etf",
            name: "ETF",
            ratio: apiResult.etfRatioPercent,
            amount:
                invested * (Number(apiResult.etfRatioPercent ?? 0) / 100),
        },
    ].filter((i) => Number(i.amount) > 0);

    return {
        totalAmount: apiResult.totalAmount,
        mainAssets,
        investmentAssets,
    };
};

// --- 컨텍스트 생성 ---
const AssetContext = createContext(null);


// --- Provider 컴포넌트 ---
export function AssetProvider({ children }) {
    const [assetData, setAssetData] = useState(null);
    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(false); // fetch 로딩
    const [isSubmitting, setIsSubmitting] = useState(false); // submit 로딩
    const [error, setError] = useState(null);

    // 사용자 이름 가져오기 (OnboardingPage에서 사용)
    const fetchUserName = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getMemberName(); // { result: { name: "민서" } }
            const name = data?.result?.name ?? null;
            if (name) setUserName(name);
            else console.warn('응답에 name 없음:', data);
        } catch (e) {
            console.error('fetchUserName 실패:', e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);
    // 자산 요약 정보 가져오기 (UserInformResultPage에서 사용)
    const fetchAssetSummary = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const apiResult = USE_MOCK ? MOCK_SUMMARY : await getAssetSummary();
            const transformed = transformAssetData(apiResult);
            setAssetData(transformed);
            return true; // 성공 시 true 반환
        } catch (e) {
            console.error('자산 요약 조회 실패:', e);
            setError(e);
            setAssetData(null);
            return false; // 실패 시 false 반환
        } finally {
            setLoading(false);
        }
    }, []);

    // 자산 설계 제출 페이지
    const submitAssetPlan = async (payload) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // ✅ 실제 API 호출
            const dto = toRecommendationDTO(payload);
            const res = await submitPlan(dto);

            console.log("AI 자산 설계 제출 (실제 API):", res);
            return res; // 서버 응답 그대로 반환
        } catch (err) {
            setError(err);
            return null; // 실패 시 null 반환
        } finally {
            setIsSubmitting(false);
        }
    };

    console.log("2. AssetContext: 현재 저장된 userName:", userName);
    const value = {
        assetData,
        userName,
        loading,
        isSubmitting,
        error,
        fetchUserName,
        fetchAssetSummary,
        submitAssetPlan,
    };

    return (
        <AssetContext.Provider value={value}>
            {children}
        </AssetContext.Provider>
    );
}

// --- Custom Hook ---
// 👇 5. useAssets 훅은 이제 Context를 가져오는 역할만 하여 매우 깔끔해졌습니다.
export function useAssets() {
    const context = useContext(AssetContext);
    if (!context) {
        throw new Error('useAssets must be used within an AssetProvider');
    }
    return context;
}