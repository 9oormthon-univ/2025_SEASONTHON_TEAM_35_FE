import { useState } from 'react';

import AIRecommendAssetCard from '../../components/AIAssetPlanPage/AssetPlan/AIRecommendAssetCard';
import AIAssetOpinionCard from '../../components/AIAssetPlanPage/AssetPlan/AIAssetOpinionCard';
import MyInfoCard from '../../components/AIAssetPlanPage/AssetPlan/MyInfoCard';
import Footer from '../../components/layout/Footer';

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
  return (
    <div className="h-[762px] flex flex-col justify-end">
      <div className="flex gap-[8px] border-b-[1px] bordergray-5 py-[8px] px-[20px]">
        {ASSET_PALN_BTN.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setOnClicked(item.title)}
            className={`w-[69px] h-[32px] rounded-[12px] text-[12px] flex justify-center items-center font-semibold ${
              item.title === onClicked
                ? 'bg-gray-70 text-white'
                : 'bg-background text-gray-50'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      {onClicked === '자산 설계' ? (
        <div className="h-[606px] bg-background flex flex-col gap-[12px] overflow-y-scroll scrollbar-hide">
          <AIRecommendAssetCard />
          <AIAssetOpinionCard />
          <MyInfoCard />
        </div>
      ) : (
        ''
      )}

      <Footer />
    </div>
  );
}
