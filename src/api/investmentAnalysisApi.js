import apiClient from './client';

// /api/v0/recommendation/investment
export const getInvestmentInfo = async () => {
  try {
    const { data } = await apiClient.get('/api/v0/recommendation/investment');
    console.log(data.result);
    return data.result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
