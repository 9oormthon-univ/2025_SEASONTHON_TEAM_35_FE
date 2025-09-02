import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import apiClient from '../api/client'; // 👈 1. API 클라이언트 import
import {getAssetSummary, registerNewAssets, modifyCashAsset,modifyInvestmentAsset,modifyOtherAsset} from "../api/assetApi.js";

// GET /summary API 응답을 프론트엔드 형식으로 변환하는 함수
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

//  프론트엔드 form 데이터를 POST /register API 형식으로 변환하는 함수
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

    // GET API를 호출하여 자산 요약 정보를 가져오는 함수
    const fetchAssetSummary = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAssetSummary();

            // API 호출 성공 시
            if (result.isSuccess) {
                const formattedData = transformSummaryResponse(result.result);
                setAssetData(formattedData);
                // 자산 미입력 시
            } else if (result.code === 'ASSET404') {
                setAssetData('no-asset'); // 자산이 없다는 특별한 상태로 설정
                // 그 외 다른 에러
            } else {
                throw new Error(result.message || "자산 정보를 불러오는데 실패했습니다.");
            }
        } catch (err) {
            console.error("자산 요약 조회 실패:", err);
            setError(err);
            setAssetData(null); // 에러 발생 시 데이터 null 처리
        } finally {
            setLoading(false);
        }
    }, []);

    //포넌트가 마운트될 때 자산 정보를 불러온다.
    useEffect(() => {
        fetchAssetSummary();
    }, [fetchAssetSummary]);

    //  POST API를 호출하여 자산을 최초 등록하는 함수
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

    // 자산 수정 함수
    const modifyAssets = async (mode, wizardPayload) => {
        setIsSubmitting(true);
        setError(null);
        try {
            let result;
            const amounts = wizardPayload.amounts;

            // mode 값에 따라 다른 API 함수를 호출하는 분기 처리
            if (mode === 'cash') {
                result = await modifyCashAsset(amounts.cash);
            } else if (mode === 'investment') {
                result = await modifyInvestmentAsset(amounts);
            } else if (mode === 'etc') {
                result = await modifyOtherAsset(amounts.etc);
            } else {
                // 'all' 모드는 각 API를 모두 호출해야 하므로 별도 구현이 필요합니다.
                throw new Error(`'${mode}' 모드는 아직 지원되지 않습니다.`);
            }

            if (!result.isSuccess) {
                throw new Error(result.message || "자산 수정에 실패했습니다.");
            }

            await fetchAssetSummary(); // 수정 성공 후 최신 데이터 다시 불러오기
            return true;
        } catch (err) {
            console.error("자산 수정 실패:", err);
            setError(err);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    // 자식 컴포넌트들에게 전달할 값들
    const value = {
        assetData,
        loading,
        isSubmitting,
        error,
        userName: "김민서", // (임시)
        registerAssets, // 자산 등록 함수
        modifyAssets,
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