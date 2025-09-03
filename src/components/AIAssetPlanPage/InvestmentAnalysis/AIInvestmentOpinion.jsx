import starIcon from '../../../assets/AIAssetPlan/starIcon.png';

export default function AIInvestmentOpinion() {
  return (
    <div className="flex justify-center py-[20px]">
      <div className=" w-[353px] bg-white px-[24px] py-[20px] flex flex-col gap-[16px] border-[2px] border-primary-2 shadow-[0_0_10px_#00D6B380] rounded-[16px]">
        <div className="flex gap-[8px] items-center">
          <img src={starIcon} className="w-[24px] h-[24px]" />
          <h1 className="text-[16px] text-gray-90 font-bold">AI 투자 의견</h1>
        </div>
        <p className="text-gray-100 text-[16px] font-medium">
          이 포트폴리오는 고수익을 추구하면서도 위험을 관리할 수 있도록
          구성되었습니다. 특히, 기술주 중심의 미국 시장과 배당 성장형 국내
          시장을 혼합하여 위험을 분산하고, 수익률을 끌어올리는 전략을
          사용했습니다.
        </p>
      </div>
    </div>
  );
}
