import Layout from '../../components/layout/Layout.jsx';
import TotalAssets from '../../components/AssetPage/TotalAssets';
import AssetAnalysis from '../../components/AssetPage/AssetAnalysis';
import InvestmentAnalysis from '../../components/AssetPage/InvestmentAnalysis';
import {useAssets} from "../../context/AssetContext.jsx";
import NoInfo from "../../components/NoInfo/NoInfo.jsx";
import {useEffect} from "react";

export default function AssetPage() {
    const { loading, assetData, fetchAssetSummary } = useAssets();
    useEffect(() => {
        // assetData가 없을 때만
        if (!assetData) {
            fetchAssetSummary();
        }
    }, [assetData, fetchAssetSummary]);

    //  로딩 중
    if (loading) {
        return <div className="p-4 text-center">자산 정보를 불러오는 중입니다...</div>;
    }

    if (assetData === 'no-asset') {
        return <NoInfo />;
    }

    // 자산 정보가 성공적으로 불러와졌을 때
    if (assetData) {
        return (
        <Layout title="자산 정보">
            <div className="flex flex-col items-center gap-[14px] mt-2">
                <TotalAssets />
                <AssetAnalysis />
                <InvestmentAnalysis />
            </div>
        </Layout>
    );}
}