import starIcon from '.././../assets/GoalSetting/starIcon.png';

const ANALYZE = [
  {
    title: '저축',
    description:
      '현재 자산은 1,200만 원이며, 매달 약 42만 원 저축이 필요합니다.',
  },
  {
    title: '목표 달성',
    description: '현재 소득과 투자 성향을 고려했을 때 무리가 없는 수준입니다.',
  },
  {
    title: '비상 자금',
    description:
      '예상치 못한 지출을 대비해 비상 자금을 최소 200만 원 이상 유지하는 것을 권장드립니다.',
  },
];

export default function AIGoalAnalyze() {
  return (
    <div className="w-[353px] h-[349px] flex flex-col gap-[20px] pt-[20px] px-[24px] pb-[69px] rounded-[24px] shadow-[0_0_10px_#00d6b27f] border-[1px] border-primary-2 overflow-y-auto scrollbar-hide bg-white">
      <div className="flex gap-[8px]">
        <img src={starIcon} alt="starIcon" className="w-[24px] h-[24px]" />
        <h1 className="text-gray-90 text-[16px] font-bold">AI 목표 분석</h1>
      </div>
      <div className="flex flex-col gap-[20px]">
        {ANALYZE.map((item) => (
          <div className="flex flex-col gap-[4px]">
            <h1 className="text-primary-1 text-[14px] font-bold">
              {item.title}
            </h1>
            <p className="text-gray-100 text-[16px] font-medium">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
