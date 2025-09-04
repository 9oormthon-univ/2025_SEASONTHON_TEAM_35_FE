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

    // 로딩 중
    if (loading) {
        return { isLoading: true, chartData: [], hasInvestmentData: false };
    }

    // 투자 데이터 추출 (AssetContext의 transformAssetData가 만드는 구조에 맞춤)
    const investment = assetData?.investmentAssets ?? [];

    // 투자 내역이 없으면
    if (investment.length === 0) {
        return { isLoading: false, chartData: [], hasInvestmentData: false };
    }

    // 비율(ratio) 기준 내림차순 정렬 + 색상 부여
    const chartData = [...investment]
        .sort((a, b) => (b.ratio ?? 0) - (a.ratio ?? 0))
        .map((item, index) => ({
            key: item.key,               // 'stock' | 'bitcoin' | 'bond' | 'etf'
            name: item.name,             // '주식' | '비트코인' | ...
            value: item.ratio ?? 0,      // 퍼센트 값
            color: RANK_COLORS[index % RANK_COLORS.length],
        }));

    return { isLoading: false, chartData, hasInvestmentData: true };
}