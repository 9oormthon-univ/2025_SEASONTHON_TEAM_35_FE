import ROAChart from './ROAChart';

export default function ROA() {
  return (
    <div className="px-[24px] py-[20px]">
      <div className="flex gap-[4px] flex-col mb-[16px]">
        <h1 className="text-gray-90 text-[16px] font-bold">예상 자산 수익률</h1>
        <p className="text-primary-1 font-semibold text-[12px]">
          예상 연 수익률 16%
        </p>
      </div>
      <div>
        <ROAChart />
      </div>
    </div>
  );
}
