import Layout from '../../components/layout/Layout.jsx';
import TotalAssets from '../../components/AssetPage/TotalAssets';
import AssetAnalysis from '../../components/AssetPage/AssetAnalysis';
import InvestmentAnalysis from '../../components/AssetPage/InvestmentAnalysis';
import {useAssets} from "../../context/AssetContext.jsx";
import NoInfo from "../../components/NoInfo/NoInfo.jsx";
export default function AssetPage() {
    // useAssets 훅에서 loading과 assetData 상태를 가져온다.
    const { loading, assetData } = useAssets();

    //  로딩 중
    if (loading) {
        return <div className="p-4 text-center">자산 정보를 불러오는 중입니다...</div>;
    }

    // 자산이 없을 때 (ASSET404) NoInfo 컴포넌트를 렌더링
    if (assetData === 'no-asset') {
        return <NoInfo />;
    }

    // 자산 정보가 성공적으로 불러와졌을 때
    if (assetData) {
        return (
        <Layout title="자산 정보">
            {/* 헤더와의 간격을 조절 */}
            <div className="flex flex-col items-center gap-[14px] mt-2">
                <TotalAssets />
                <AssetAnalysis />
                <InvestmentAnalysis />
            </div>
        </Layout>
    );}
}