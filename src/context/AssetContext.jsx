import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import apiClient from '../api/client'; // 👈 1. API 클라이언트 import

// --- API 데이터와 프론트엔드 데이터 형식 맞추기 ---

// 👈 2. GET /summary API 응답을 프론트엔드 형식으로 변환하는 함수
const transformSummaryResponse = (apiResult) => {
    if (!apiResult) return null;
    return {
        // 백엔드(camelCase) -> 프론트엔드(snake_case)
        total_amount: apiResult.totalAmount,
        // amounts 객체 구성 (API 응답에 없는 값은 0으로 초기화)
        amounts: {
            cash: apiResult.cashAmount || 0,
            etc: apiResult.otherAmount || 0,
            // GET API는 개별 투자 금액을 주지 않으므로, 총 투자액과 비율로 역산 (추정치)
            stock: (apiResult.investedAmount * apiResult.stockRatioPercent) / 100 || 0,
            bitcoin: (apiResult.investedAmount * apiResult.bitcoinRatioPercent) / 100 || 0,
            bond: (apiResult.investedAmount * apiResult.bondRatioPercent) / 100 || 0,
            etf: (apiResult.investedAmount * apiResult.etfRatioPercent) / 100 || 0,
        },
        // ratios 객체 구성
        ratios: {
            cash: apiResult.cashRatioPercent || 0,
            etc: apiResult.otherRatioPercent || 0,
            stock: apiResult.stockRatioPercent || 0,
            bitcoin: apiResult.bitcoinRatioPercent || 0,
            bond: apiResult.bondRatioPercent || 0,
            etf: apiResult.etfRatioPercent || 0,
        },
    };
};

// 👈 3. 프론트엔드 form 데이터를 POST /register API 형식으로 변환하는 함수
const transformToRegisterPayload = (wizardData) => {
    const assetMapping = {
        cash: "CASH",
        stock: "STOCK",
        bond: "BOND",
        etf: "ETF",
        bitcoin: "BITCOIN",
        etc: "OTHER",
    };
    const assetList = Object.entries(wizardData.amounts)
        .filter(([, amount]) => amount > 0) // 금액이 0보다 큰 자산만 포함
        .map(([key, amount]) => ({
            assetType: assetMapping[key],
            amount: amount,
        }));
    return { assetList };
};


// --- 컨텍스트 생성 및 프로바이더 ---

const AssetContext = createContext(null);

export function AssetProvider({ children }) {
    const [assetData, setAssetData] = useState(null);
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
    const [isSubmitting, setIsSubmitting] = useState(false); // 데이터 저장/수정 상태
    const [error, setError] = useState(null); // API 에러 상태

    // 👈 4. GET API를 호출하여 자산 요약 정보를 가져오는 함수
    const fetchAssetSummary = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('/api/v0/asset/summary');
            if (response.data && response.data.isSuccess) {
                // API 응답을 프론트엔드에 맞게 변환하여 상태에 저장
                const formattedData = transformSummaryResponse(response.data.result);
                setAssetData(formattedData);
            } else {
                throw new Error(response.data.message || "자산 정보를 불러오는데 실패했습니다.");
            }
        } catch (err) {
            console.error("자산 요약 조회 실패:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // 👈 5. 컴포넌트가 마운트될 때 자산 정보를 불러옵니다.
    useEffect(() => {
        fetchAssetSummary();
    }, [fetchAssetSummary]);

    // 👈 6. POST API를 호출하여 자산을 '최초 등록'하는 함수
    const registerAssets = async (wizardPayload) => {
        setIsSubmitting(true);
        setError(null);
        try {
            // 프론트엔드 데이터를 API 형식에 맞게 변환
            const apiPayload = transformToRegisterPayload(wizardPayload);
            const response = await apiClient.post('/api/v0/asset/register', apiPayload);
            if (!response.data || !response.data.isSuccess) {
                throw new Error(response.data.message || "자산 등록에 실패했습니다.");
            }
            // 등록 성공 후, 최신 자산 정보를 다시 불러와 화면을 갱신
            await fetchAssetSummary();
            return true; // 성공 여부 반환
        } catch (err) {
            console.error("자산 등록 실패:", err);
            setError(err);
            return false; // 실패 여부 반환
        } finally {
            setIsSubmitting(false);
        }
    };

    // (TODO: 자산 '수정' 함수는 다음 단계에서 여기에 추가할 예정입니다.)


    // 👈 7. 자식 컴포넌트들에게 전달할 값들
    const value = {
        assetData,
        loading,
        isSubmitting,
        error,
        userName: "김민서", // (임시)
        registerAssets, // 자산 등록 함수
        // updateAssetData, // (다음 단계에서 추가)
    };

    return (
        <AssetContext.Provider value={value}>
            {children}
        </AssetContext.Provider>
    );
}

// 커스텀 훅
export function useAssets() {
    const context = useContext(AssetContext);
    if (!context) {
        throw new Error('useAssets must be used within an AssetProvider');
    }
    return context;
}