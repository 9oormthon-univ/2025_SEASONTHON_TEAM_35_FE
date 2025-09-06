import apiClient from './client';

// GET /api/v0/home/ - 홈 API
export const getHomePageInfo = async () => {
  try {
    const { data } = await apiClient.get('/api/v0/goal/analyze');
    return data.result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
