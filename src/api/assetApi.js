import apiClient from "./client.js";

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
        .filter(([, amount]) => amount > 0)
        .map(([key, amount]) => ({
            assetType: assetMapping[key],
            amount: amount,
        }));
    return { assetList };
};

// API 호출 함수들
/** GET /api/v0/asset/summary - 자산 요약 조회 API */
export const getAssetSummary = async () => {
    const response = await apiClient.get('/api/v0/asset/summary');
    return response.data;
};

/** POST /api/v0/asset/register - 자산 최초 등록 API */
export const registerNewAssets = async (wizardPayload) => {
    const apiPayload = transformToRegisterPayload(wizardPayload);
    const response = await apiClient.post('/api/v0/asset/register', apiPayload);
    return response.data;
};

// 자산 수정 함수들
/** POST /api/v0/asset/modify-cash - 현금 자산 수정 API */
export const modifyCashAsset = async (amount) => {
    const payload = { amount };
    console.log(" 현금 수정 API 호출", { endpoint: '/api/v0/asset/modify-cash', body: payload });
    const response = await apiClient.post('/api/v0/asset/modify-cash', { amount });
    return response.data;
};

/** POST /api/v0/asset/modify-investment - 투자 자산 수정 API */
export const modifyInvestmentAsset = async (amounts) => {
    const payload = {
        stockAmount: amounts.stock || 0,
        bitcoinAmount: amounts.bitcoin || 0,
        bondAmount: amounts.bond || 0,
        etfAmount: amounts.etf || 0,
    };
    console.log("투자 수정 API 호출", { endpoint: '/api/v0/asset/modify-investment', body: payload });
    const response = await apiClient.post('/api/v0/asset/modify-investment', payload);
    return response.data;
};

/** POST /api/v0/asset/modify-other - 기타 자산 수정 API */
export const modifyOtherAsset = async (amount) => {
    const payload = { items: [{  amount }] };
    console.log("기타 자산 수정 API 호출", { endpoint: '/api/v0/asset/modify-other', body: payload });
    const response = await apiClient.post('/api/v0/asset/modify-other', payload);
    return response.data;
};