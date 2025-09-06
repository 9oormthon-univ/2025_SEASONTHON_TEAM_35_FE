import AssetAnalysis from '@/components/AssetPage/AssetAnalysis.jsx';
import ROA from '@/components/AIAssetPlanPage/InvestmentAnalysis/ROA.jsx';

import NoInfoCard from './NoInfoCard';
import GoalSetting from './GoalSetting';
import seeMoreBtn from '../../assets/icons/seeMoreBtn.png';
import { Link } from 'react-router-dom';

import { getGoalSettingInfo } from '../../api/goalApi';
import { useState, useEffect } from 'react';
import HomeUserName from "@/components/HomePage/HomeUserName.jsx";
import HomeTotalAssets from "@/components/HomePage/HomeTotalAsset.jsx";
import HomeAssetAnalysis from "@/components/HomePage/HomeAssetAnalysis.jsx";

import AIAssetPlan from './AIAssetPlan';

export default function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getGoalSettingInfo();
      if (result) {
        setData(result);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-[24px]">
        <HomeUserName/>
      {/* 총 자산 */}
      <HomeTotalAssets/>
      {/* 자산 분석 */}
      <HomeAssetAnalysis/>

      {/* AI 자산 설계 */}
      <div className="flex flex-col gap-[12px]">
        <h1 className="text-[16px] text-gray-100 font-bold">AI 자산 설계</h1>
        {/* api 연결 전 임시 */}
        <NoInfoCard
          title="aiAssetPlan"
          description="AI를 통해 자산 관리를 시작해보세요!"
          buttonTitle="AI 자산 설계 받기"
          to="/user/inform"
        />
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
            <img
              src={seeMoreBtn}
              alt="seeMoreBtn"
              className="w-[16px] h-[16px]"
            />
          </Link>
        </div>
        {data ? (
          <GoalSetting data={data} />
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
