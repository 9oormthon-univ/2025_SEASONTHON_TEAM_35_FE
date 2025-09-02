import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import apiClient from '../api/client'; // 👈 1. API 클라이언트 import
import {getAssetSummary, registerNewAssets, modifyCashAsset,modifyInvestmentAsset,modifyOtherAsset} from "../api/assetApi.js";
import { submitPlan as submitPlanApi } from '../api/planApi';

// GET /summary API 응답을 프론트엔드 형식으로 변환하는 함수
 const transformSummaryResponse = (apiResult) => {
    if (!apiResult) return null;

    // 👇✅ API 응답 값을 직접 사용하여 amounts 객체를 구성합니다.
    // 개별 투자 자산(주식 등)의 '금액'은 API가 주지 않으므로,
    // 총 투자액만 별도로 관리하거나 필요 시 0으로 둘 수 있습니다.
    // 여기서는 도넛 차트와 분석 UI를 위해 이전처럼 추정치를 계산하는 로직을 유지하되,
    // 다른 값들은 API의 값을 직접 사용하도록 명확히 합니다.
    return {
        total_amount: apiResult.totalAmount,
        amounts: {
            cash: apiResult.cashAmount,
            etc: apiResult.otherAmount,

            // [참고] 개별 투자 '금액'은 여전히 API 응답에 없으므로,
            // 이 부분은 총 투자액과 비율을 통해 추정치를 계산하는 것이 맞습니다.
            // 만약 UI에서 개별 투자 금액 표시가 필요 없다면 이 부분을 0으로 처리해도 됩니다.
            stock: (apiResult.investedAmount * apiResult.stockRatioPercent) / 100 || 0,
            bitcoin: (apiResult.investedAmount * apiResult.bitcoinRatioPercent) / 100 || 0,
            bond: (apiResult.investedAmount * apiResult.bondRatioPercent) / 100 || 0,
            etf: (apiResult.investedAmount * apiResult.etfRatioPercent) / 100 || 0,
        },
        ratios: {
            cash: apiResult.cashRatioPercent,
            etc: apiResult.otherRatioPercent,
            stock: apiResult.stockRatioPercent,
            bitcoin: apiResult.bitcoinRatioPercent,
            bond: apiResult.bondRatioPercent,
            etf: apiResult.etfRatioPercent,
        },
        // [추가] investedAmount도 활용할 수 있도록 추가하면 좋습니다.
        invested_amount: apiResult.investedAmount,
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
            } else if (mode === 'all') {
                // 자산 최초 등록 API를 재사용하여 전체 자산을 업데이트합니다.
                result = await registerNewAssets(wizardPayload);
            }else {
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
    const submitAssetPlan = async (payload) => {
        setError(null);
        setIsSubmitting(true);
        try {
            const response = await submitPlanApi(payload);
            if (response.isSuccess) {
                console.log("AI 자산 설계 제출 성공:", response);
                return true; // 성공 여부를 반환
            } else {
                setError(response.message || "자산 설계 제출에 실패했습니다.");
                return false;
            }
        } catch (e) {
            setError("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <AssetContext.Provider value={{
            ...value, // 👈 1. 기존 value 객체의 모든 내용을 여기에 복사하고,
            submitAssetPlan, // 👈 2. 새로운 함수를 추가합니다.
        }}>
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