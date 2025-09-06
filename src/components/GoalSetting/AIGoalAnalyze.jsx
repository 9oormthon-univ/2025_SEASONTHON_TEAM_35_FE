import starIcon from '.././../assets/GoalSetting/starIcon.png';
export default function AIGoalAnalyze({ data }) {
  const formatToManWon = (text) => {
    if (!text) return '';
    return text.replace(/\d+/g, (num) => {
      const n = Number(num);
      if (n >= 10000) {
        return `${Math.round(n / 10000)}만`;
      }
      return `${n.toLocaleString()}`;
    });
  };

  const sentences = data ? data.analysisText.split('\n') : [];
  const ANALYZE = [
    {
      title: '저축',
      description: formatToManWon(sentences[0]),
    },
    {
      title: '목표 달성',
      description: formatToManWon(sentences[1]),
    },
    {
      title: '비상 자금',
      description: formatToManWon(sentences[2]),
    },
  ];
  return (
    <div className="w-[353px] h-[349px] flex flex-col gap-[20px] pt-[20px] px-[24px] pb-[69px] rounded-[24px] shadow-[0_0_10px_#00d6b27f] border-[1px] border-primary-2 overflow-y-auto scrollbar-hide bg-white">
      <div className="flex gap-[8px]">
        <img src={starIcon} alt="starIcon" className="w-[24px] h-[24px]" />
        <h1 className="text-gray-90 text-[16px] font-bold">AI 목표 분석</h1>
      </div>
      <div className="flex flex-col gap-[20px]">
        {ANALYZE.map((item) => (
          <div className="flex flex-col gap-[4px]" key={item.title}>
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
