import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileIcon from '../../assets/AIAssetPlan/profile.png';
import Footer from '../../components/layout/Footer';
import NoInfo from '../../components/NoInfo/NoInfo';

// 자산 설계
import AIRecommendAssetCard from '../../components/AIAssetPlanPage/AssetPlan/AIRecommendAssetCard';
import AIAssetOpinionCard from '../../components/AIAssetPlanPage/AssetPlan/AIAssetOpinionCard';
import MyInfoCard from '../../components/AIAssetPlanPage/AssetPlan/MyInfoCard';

// 투자 분석
import AIPortfolio from '../../components/AIAssetPlanPage/InvestmentAnalysis/AIPortfolio';
import AIInvestmentOpinion from '../../components/AIAssetPlanPage/InvestmentAnalysis/AIInvestmentOpinion';
import Portfolio from '../../components/AIAssetPlanPage/InvestmentAnalysis/Portfolio';
import ROA from '../../components/AIAssetPlanPage/InvestmentAnalysis/ROA';

// api
import { getAiAssetPlan } from '../../api/aiAssetPlanApi';
import { getInvestmentInfo } from '../../api/investmentAnalysisApi';
const ASSET_PALN_BTN = [
  {
    title: '자산 설계',
  },
  {
    title: '투자 분석',
  },
];
export default function AIAssetPlanPage() {
  const [onClicked, setOnClicked] = useState('자산 설계');

  const [aiAssetData, setAiAssetData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAiAssetPlan();
      if (result) {
        setAiAssetData(result);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/ai/plan/start');
  };

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getInvestmentInfo();
      if (result) {
        setData(result);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* header */}
      <div className=" h-[108px] flex items-end px-[20px]">
        <div className="flex justify-between items-start w-full">
          <div className="w-[150px] h-[36px] flex gap-[16px]">
            {ASSET_PALN_BTN.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setOnClicked(item.title)}
                className={`h-[36px] text-[18px] flex font-bold ${
                  item.title === onClicked
                    ? 'text-gray-90 border-b-[2px] border-gray-100'
                    : 'text-gray-30'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
          <Link to="/mypage">
            <img
              src={profileIcon}
              alt="profileIcon"
              className="w-[24px] h-[24px]"
            />
          </Link>
        </div>
      </div>
      {/* main */}
      {aiAssetData ? (
        onClicked === '자산 설계' ? (
          <div className="h-full bg-graduation flex flex-col overflow-y-scroll ">
            <AIRecommendAssetCard aiAssetData={aiAssetData} />
            <AIAssetOpinionCard aiAssetData={aiAssetData} />
            <MyInfoCard aiAssetData={aiAssetData} />
          </div>
        ) : (
          <div className="h-full bg-graduation flex flex-col overflow-y-scroll pb-[85px]">
            <AIPortfolio data={data} />
            <AIInvestmentOpinion data={data} />
            <Portfolio data={data} />
            <ROA result={data || {}} />
          </div>
        )
      ) : (
        <div className="bg-background h-full flex justify-center pt-[12px]">
          <NoInfo
            title="아직 AI 자산 설계를 받지 않았습니다."
            description="가장 알맞은 자산 비율을 찾아보세요!"
            btnText="AI 자산 설계 받기"
            onButtonClick={handleClick}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
