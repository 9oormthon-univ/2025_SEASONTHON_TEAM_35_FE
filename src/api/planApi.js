import  apiClient from './client.js';

/**
 * AI 자산 설계 질문 답변을 서버에 제출하는 API
 * @param {object} payload - Wizard에서 수집한 답변 데이터
 * @returns {Promise<object>} - API 응답 데이터
 */
export const submitPlan = async (payload) => {
    try {
        const response = await apiClient.post('/api/v0/recommendation/design', payload);
        return response.data;
    } catch (error) {
        console.error("AI 자산 설계 API 호출 실패:", error);
        throw error;
    }
};