import starIcon from '../../../assets/AIAssetPlan/starIcon.png';

export default function AIInvestmentOpinion({ data }) {
  return (
    <div className="flex justify-center py-[20px]">
      <div className=" w-[353px] bg-white px-[24px] py-[20px] flex flex-col gap-[16px] border-[2px] border-primary-2 shadow-[0_0_10px_#00D6B380] rounded-[16px]">
        <div className="flex gap-[8px] items-center">
          <img src={starIcon} className="w-[24px] h-[24px]" />
          <h1 className="text-[16px] text-gray-90 font-bold">AI 투자 의견</h1>
        </div>
        <p className="text-gray-100 text-[16px] font-medium">
          {data?.reasonText}
        </p>
      </div>
    </div>
  );
}
