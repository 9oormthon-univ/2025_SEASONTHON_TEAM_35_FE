import { Link } from 'react-router-dom';

import NoInfoCard from './NoInfoCard';
import GoalSetting from './GoalSetting';
import seeMoreBtn from '../../assets/icons/seeMoreBtn.png';

import HomeUserName from "@/components/HomePage/HomeUserName.jsx";
import HomeTotalAssets from "@/components/HomePage/HomeTotalAsset.jsx";
import HomeAssetAnalysis from "@/components/HomePage/HomeAssetAnalysis.jsx";

import AIAssetPlan from './AIAssetPlan';
import { useHome } from "@/context/HomeContext.jsx";

export default function Home() {
    const { loading, error, home /*, periodLabel*/ } = useHome();

    if (loading) return <div className="px-7 py-6">로딩 중…</div>;
    if (error)   return <div className="px-7 py-6 text-red-500">홈 데이터를 불러오지 못했어요.</div>;

    return (
        <div className="flex flex-col gap-[24px]">
            <HomeUserName/>
            <HomeTotalAssets/>
            <HomeAssetAnalysis/>

            {/* AI 자산 설계 */}
            <div className="flex flex-col gap-[12px]">
                <h1 className="text-[16px] text-gray-100 font-bold">AI 자산 설계</h1>

                {/* 데이터 없을 때 띄우는 안내 카드 */}
                {!home?.investmentForecast?.forecastPoints?.length && (
                    <NoInfoCard
                        title="aiAssetPlan"
                        description="AI를 통해 자산 관리를 시작해보세요!"
                        buttonTitle="AI 자산 설계 받기"
                        to="/user/inform"
                    />
                )}

                {/* 실제 AI 계획 카드/그래프 */}
                <div>
                    <AIAssetPlan />
                </div>
            </div>

            {/* 목표 관리 */}
            <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between">
                    <h1 className="text-gray-100 text-[16px] font-bold">목표 관리</h1>
                    <Link to="/goal-setting" className="flex gap-[4px] items-center">
                        <p className="text-gray-40 text-[12px] font-medium">더보기</p>
                        <img src={seeMoreBtn} alt="seeMoreBtn" className="w-[16px] h-[16px]" />
                    </Link>
                </div>

                {/* ✅ 여기서 data 대신 home을 넘겨요. 조건은 targetAmount 등 실제 필드 기준으로 */}
                {home?.targetAmount > 0 ? (
                    <GoalSetting data={home} />
                ) : (
                    <NoInfoCard
                        title="goalSetting"
                        description="AI가 목표에 맞는 자산 설계를 도와드려요!"
                        buttonTitle="목표 설정하기"
                        to="/ai/plan/inform"
                    />
                )}
            </div>
        </div>
    );
}
