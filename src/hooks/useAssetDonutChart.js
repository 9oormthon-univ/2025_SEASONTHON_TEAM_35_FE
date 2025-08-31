import { useAssets } from '../context/AssetContext.jsx';

const ASSET_NAMES = {
    stock: '주식',
    bitcoin: '비트코인',
    bond: '채권',
    etf: 'ETF',
};

// 색상 배열
const RANK_COLORS = [
    '#00D6B3',
    '#58A9FF',
    '#FF919F',
    '#FFD562',
];

export function useAssetDonutChart() {
    const { assetData, loading } = useAssets();

    // 로딩, NULL 처리
    if (loading || !assetData || !assetData.amounts) {
        return { isLoading: true, chartData: [], hasInvestmentData: false };
    }

    //투자 자산 금액만 필터링
    const { cash, etc, ...investmentAmounts } = assetData.amounts;

    // 총 투자액 계산
    const totalInvestmentAmount = Object.values(investmentAmounts).reduce((sum, amount) => sum + (amount || 0), 0);

    // 투자 내역이 있는지 여부 판단
    if (totalInvestmentAmount === 0) {
        return { isLoading: false, chartData: [], hasInvestmentData: false };
    }

    // 총 투자액 대비 각 항목의 비율을 계산하여 차트 데이터 생성
    const calculatedData = Object.entries(investmentAmounts)
        .map(([key, amount]) => ({
            key,
            name: ASSET_NAMES[key] || key,
            value: (amount / totalInvestmentAmount) * 100,
        }))
        .filter(item => item.value > 0);

    // 비율이 높은 순으로 정렬하고, 순위에 따라 색상을 추가
    const finalChartData = [...calculatedData]
        .sort((a, b) => b.value - a.value)
        .map((item, index) => ({
            ...item,
            color: RANK_COLORS[index % RANK_COLORS.length],
        }));

    // 최종적으로 계산된 값들을 반환
    return {
        isLoading: false,
        chartData: finalChartData,
        hasInvestmentData: true,
    };
}