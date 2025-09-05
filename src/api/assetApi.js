import apiClient from "./client.js";

// /** GET /api/v0/asset/summary - 자산 요약 조회 API */
export const getAssetSummary = async () => {
    const { data } = await apiClient.get('/api/v0/asset/summary');
// 스웨거 스펙: { isSuccess, code, message, result: { ... } }
if (!data?.isSuccess || !data?.result) {
 throw new Error(data?.message || '요약 응답이 올바르지 않습니다.');
}
return data.result; // ← 컨텍스트에서 바로 transform에 넣어 쓰기 좋게
};