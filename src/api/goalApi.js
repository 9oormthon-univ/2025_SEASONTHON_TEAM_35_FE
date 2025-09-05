import apiClient from './client';

// GET /api/v0/goal/analyze - 목표 설정 API
export const getGoalSettingInfo = async () => {
  try {
    const { data } = await apiClient.get('/api/v0/goal/analyze');
    return data.result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
