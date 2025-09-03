import { useState } from 'react';

import seeMoreBtn from '../../../assets/AIAssetPlan/seeMoreBtn.png';
import closeBtn from '../../../assets/AIAssetPlan/closeBtn.png';

export default function PortfolioCard({
  title,
  summary,
  money,
  percent,
  description,
}) {
  const [onClicked, setOnClicked] = useState(false);
  return (
    <div className="bg-white w-[345px] border-[1px] border-gray-5 py-[16px] rounded-[12px] px-[20px] flex flex-col">
      <div className="mb-[16px] flex justify-between">
        <div className="flex flex-col gap-[4px]">
          <h1 className="text-gray-90 text-[18px font-bold">{title}</h1>
          <p className="text-gray-40 font-medium text-[12px]">{summary}</p>
        </div>
        <div className="flex flex-col items-end">
          <h1 className="text-[#0073FF] text-[18px] font-bold">{money}</h1>
          <p className="text-[#0073FF] text-[12px] font-semibold">{percent}%</p>
        </div>
      </div>
      {onClicked && (
        <div className="py-[16px] border-t-[1px] border-gray-5">
          <p className="text-gray-100 text-[14px] font-medium">{description}</p>
        </div>
      )}
      <button
        className="flex gap-[4px] self-center"
        onClick={() => setOnClicked(!onClicked)}
      >
        <h1 className="text-gray-40 text-[12px] font-normal">자세히보기</h1>
        <img
          src={`${onClicked ? closeBtn : seeMoreBtn}`}
          alt="seeMoreBtn"
          className="w-[16px] h-[16px]"
        />
      </button>
    </div>
  );
}
