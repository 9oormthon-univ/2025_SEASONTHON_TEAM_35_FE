import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';

// 임시 데이터
const DATA = [
  { name: '예금 및 현금', value: 60 },
  { name: '투자', value: 20 },
  { name: '기타 자산', value: 15 },
];

// 색상
const COLORS = ['#00D6B3', '#58A9FF', '#FFD562'];

export default function AIRecommendAssetCard() {
  return (
    <div className="bg-white py-[20px] px-[24px]">
      <div className="flex justify-between items-center mb-[16px]">
        <h1 className="text-gray-90 text-[16px] font-bold">
          AI 추천 자산 비율
        </h1>
        <Link className="flex justify-center items-center text-[12px] text-gray-40 border-[1px] border-gray-5 rounded-[12px] w-[66px] h-[24px] font-normal">
          다시하기
        </Link>
      </div>

      {/* 그래프 */}
      <div className="flex flex-col items-center gap-[24px]">
        <PieChart width={220} height={220}>
          <Pie
            data={DATA}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={110}
            startAngle={90}
            endAngle={-270}
          >
            <Cell key="cell-0" fill={COLORS[0]} stroke="none" />
            <Cell key="cell-1" fill={COLORS[1]} stroke="none" />
            <Cell key="cell-2" fill={COLORS[2]} stroke="none" />
          </Pie>
        </PieChart>

        <div className="w-full px-[20px] grid-cols-2 grid">
          {DATA.map((item, idx) => (
            <div
              key={item.name}
              className="flex w-[150.5px] h-[24px] items-center text-[12px] font-normal px-[8px]"
            >
              <div
                className="w-[8px] h-[8px] rounded-[50%] mr-[8px]"
                style={{ backgroundColor: COLORS[idx] }}
              />
              <span className="text-gray-60">{item.name}</span>
              <span className="ml-auto text-gray-60">
                {item.value.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
