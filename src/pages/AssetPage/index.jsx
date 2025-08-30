import Layout from '../../components/Layout';
import TotalAssets from '../../components/AssetPage/TotalAssets';
import AssetAnalysis from '../../components/AssetPage/AssetAnalysis';
import InvestmentAnalysis from '../../components/AssetPage/InvestmentAnalysis';

export default function AssetPage() {
    return (
        <Layout title="자산 정보">
            {/* ✨ 여기에 mt-4 (margin-top: 16px)를 추가하여 헤더와의 간격을 조절합니다. */}
            {/* 원하는 간격에 맞게 mt-5, mt-6 등으로 조절해보세요. */}
            <div className="flex flex-col items-center gap-8 mt-4">
                <TotalAssets />
                <AssetAnalysis />
                <InvestmentAnalysis />
            </div>
        </Layout>
    );
}