import starIcon from '../../../assets/AIAssetPlan/starIcon.png';

export default function AIAssetOpinionCard() {
  return (
    <div className="w-full py-[20px] px-[24px] flex flex-col gap-[16px] bg-white">
      <div className="flex gap-[10px] items-center ">
        <img src={starIcon} alt="starIcon" className="w-[24px] h-[24px]" />
        <h1 className="font-bold text-[16px] text-gray-90">AI 자산 의견</h1>
      </div>
      <div className="text-gray-100 text-[14px] flex flex-col gap-[10px] font-medium">
        <p>
          안정적적인 운용을 선호하시기 때문에 예금과 비상금 중심으로
          추천드렸습니다. 급한 상황에서도 자산을 쉽게 사용할 수 있도록 유동성을
          확보했어요.
        </p>
        <p>
          목표 시점이 가까워 위험 자산 비중을 졸이고, 원금 보전에 유리한 구조로
          설정했습니다.
        </p>
      </div>
    </div>
  );
}
