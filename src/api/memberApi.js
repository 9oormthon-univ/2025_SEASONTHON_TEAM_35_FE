import apiClient from './client'; // 설정된 apiClient import

/**
 * @description GET /api/v0/member/name API
 * 회원 이름을 조회
 */
export const getMemberName = async () => {
    try {
        const response = await apiClient.get('/api/v0/member/name');

        if (response.data && response.data.isSuccess) {
            return response.data;
        } else {
            throw new Error(response.data.message || '회원 이름을 가져오는 데 실패했습니다.');
        }
    } catch (err) {
        console.error('Error fetching member name:', err);
        throw err;
    }
};