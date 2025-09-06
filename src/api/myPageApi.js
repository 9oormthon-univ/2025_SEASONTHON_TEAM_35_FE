import apiClient from './client';

// GET /api/v0/member/mypage
export const getMyPageInfo = async () => {
  try {
    const { data } = await apiClient.get('/api/v0/member/mypage');
    return data.result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
