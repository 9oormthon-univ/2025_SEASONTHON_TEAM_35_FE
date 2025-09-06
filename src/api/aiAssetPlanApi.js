import apiClient from './client';

// /api/v0/recommendation/portfolio
export const getAiAssetPlan = async () => {
  try {
    const { data } = await apiClient.get('/api/v0/recommendation/portfolio');
    return data.result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
