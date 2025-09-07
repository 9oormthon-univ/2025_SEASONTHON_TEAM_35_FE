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
          이 포트폴리오는 안정성을 최우선으로 생각하는 보수적인 투자자에게 적합합니다. 채권 비중이 압도적으로 높아 변동성이 매우 낮지만, 그만큼 수익률 또한 제한적일 수 있습니다. 최대낙폭이 적어 시장 하락 시에도 비교적 잘 버텨낼 수 있으며, 샤프지수가 높아 위험 대비 수익률은 괜찮은 편입니다. 빠르게 자산을 늘리기보다는 꾸준히 자산을 지키고 싶은 분들에게 적합한 포트폴리오입니다.
        </p>
      </div>
    </div>
  );
}
