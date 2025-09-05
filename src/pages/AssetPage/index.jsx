import Layout from '../../components/layout/Layout.jsx';
import TotalAssets from '../../components/AssetPage/TotalAssets';
import AssetAnalysis from '../../components/AssetPage/AssetAnalysis';
import InvestmentAnalysis from '../../components/AssetPage/InvestmentAnalysis';
import {useAssets} from "../../context/AssetContext.jsx";
import NoInfo from "../../components/NoInfo/NoInfo.jsx";
import {useEffect} from "react";

export default function AssetPage() {
    const { loading, assetData, userName, fetchAssetSummary, fetchUserName } = useAssets();
    useEffect(() => {
        // 자산 데이터가 없으면 자산 정보를 요청
        if (!assetData) {
            fetchAssetSummary();
        }
        // 사용자 이름이 없으면 사용자 이름 요청
        if (!userName) {
            fetchUserName();
        }
    }, [assetData, userName, fetchAssetSummary, fetchUserName]);

    //  로딩 중
    if (loading || !assetData || !userName) {
        return <div>데이터를 불러오는 중입니다...</div>;
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