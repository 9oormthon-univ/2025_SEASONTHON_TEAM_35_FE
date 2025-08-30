import Layout from '../../components/Layout';
import TotalAssets from '../../components/AssetPage/TotalAssets';
import AssetAnalysis from '../../components/AssetPage/AssetAnalysis';
import InvestmentAnalysis from '../../components/AssetPage/InvestmentAnalysis';
import userIcon from '../../assets/icons/user.png';

export default function AssetPage() {
    return (
        <Layout title="자산 정보">
            {/* 헤더와의 간격을 조절 */}
            <div className="flex flex-col items-center gap-8 mt-4">
                <TotalAssets />
                <AssetAnalysis />
                <InvestmentAnalysis />
            </div>
        </Layout>
    );
}