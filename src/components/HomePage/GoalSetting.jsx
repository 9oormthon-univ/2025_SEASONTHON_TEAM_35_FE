export default function GoalSetting({ data }) {
  return (
    <div className="w-[353px] h-[128px] shadow-[0_0_8px_#E7E9EECC] rounded-[12px] p-[20px] flex flex-col gap-[12px] bg-white">
      <div className="flex flex-col gap-[4px]">
        <h1 className="text-gray-40 text-[12px] font-bold">목표 달성률</h1>
        <p className="text-gray-80 font-bold text-[16px]">
          목표 금액의{' '}
          <span className="text-primary-1">{data?.achievementRate}%</span> 를
          달성했어요
        </p>
      </div>
      <div className="flex flex-col gap-[4px]">
        <div className="text-gray-40 text-[12px] font-semibold flex justify-between">
          <p>{data?.totalAmount?.toLocaleString()}원</p>
          <p>{data?.targetAmount?.toLocaleString()}원</p>
        </div>
        <div className="w-full h-[8px] bg-gray-5 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-2 transition-all duration-500"
            style={{ width: `${data?.achievementRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
