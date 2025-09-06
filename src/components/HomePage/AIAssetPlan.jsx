import { BarChart, Bar, XAxis, CartesianGrid, LabelList, Cell } from 'recharts';
const CustomTick = ({ x, y, payload }) => {
  const isNow = payload.value === '현재';
  return (
    <text
      x={x}
      y={y + 12} // 위치 보정
      textAnchor="middle"
      fill={isNow ? '#00D6B3' : '#A7AEB3'} // 조건부 색상
      fontSize={12}
      fontWeight={400}
    >
      {payload.value}
    </text>
  );
};
export default function AIAssetPlan() {
  const data = [
    {
      label: '현재',
      years: 0,
      amount: 1000000,
    },
    {
      label: '1년 후',
      years: 1,
      amount: 2000000,
    },
    {
      label: '2년 후',
      years: 2,
      amount: 3000000,
    },
  ];
  const adjustedData = data.map((d, i) => ({
    ...d,
    amount: d.amount * (1 + i * 0.2),
  }));
  return (
    <div className="w-[353px] h-[337px] p-[20px] rounded-[12px] bg-white flex flex-col gap-[16px] shadow-[0_0_8px_#E7E9EECC]">
      <div className="flex flex-col gap-[4px]">
        <h1 className="text-[16px] text-gray-90 font-bold">예상 자산 수익률</h1>
        <p className="text-[12px] font-semibold text-primary-1">
          예상 연 수익률 16%
        </p>
      </div>
      <div className="w-[313px] h-[239px] flex justify-center">
        {/* 그래프 */}
        <BarChart
          width={350}
          height={237}
          data={adjustedData}
          margin={{ top: 20 }}
        >
          {/* 눈금 */}
          <CartesianGrid strokeDasharray="4 2" vertical={false} />
          {/* x축 */}
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={{ stroke: '#D7DDE1', strokeWidth: 2 }}
            tick={<CustomTick />}
          />
          {/* 막대 */}
          <Bar
            dataKey="amount"
            radius={[4, 4, 0, 0]}
            barSize={`${
              data?.length === 3 ? '50' : data?.length === 4 ? '45' : '30'
            }`}
          >
            {/* 막대별 색상 지정 */}
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === data.length - 1
                    ? 'url(#colorL)'
                    : index === 0
                    ? 'url(#colorUv)'
                    : 'url(#colorMd)'
                }
              />
            ))}
            <LabelList
              dataKey="amount"
              position="top"
              content={({ x, y, width, value, index }) => {
                const isFirst = index === 0;
                const isLast = index === data.length - 1;

                if (!isFirst && !isLast) return null;

                const label = value.toLocaleString() + '원';

                if (isFirst) {
                  // 처음 라벨: border 박스 포함
                  return (
                    <g>
                      <rect
                        x={`${
                          data?.length === 4 || data?.length === 6 ? '2' : '18'
                        }`}
                        y={y - 30}
                        width={label.length * 12 * 0.6 + 10}
                        height={20}
                        rx={4}
                        fill="#fff"
                        stroke="#00D6B3"
                        strokeWidth={1}
                      />
                      <text
                        x={`${
                          data?.length === 6 || data?.length === 4 ? '43' : '59'
                        }`}
                        y={y - 19}
                        textAnchor="middle"
                        fill="#00D6B3"
                        fontSize={12}
                        fontWeight={600}
                        dominantBaseline="middle"
                      >
                        {/* {`${result?.currentAmount?.toLocaleString?.() ?? 0}원`} */}
                        {data[0].amount.toLocaleString()}원
                      </text>
                    </g>
                  );
                }

                if (isLast) {
                  // 마지막 라벨: 굵은 글씨 (y 좌표 보정)
                  return (
                    <text
                      x={x + width / 2}
                      y={y - 11} // 🔥 막대 위에 딱 붙도록 수정
                      textAnchor="middle"
                      fill="#4DE2CA"
                      fontSize={16}
                      fontWeight={700}
                      dominantBaseline="middle"
                    >
                      {/* {(value / 10000).toFixed(0)}만 */}
                      1,800만
                    </text>
                  );
                }

                return null;
              }}
            />
          </Bar>

          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D6B3" stopOpacity={1} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="colorMd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B2F3E8" stopOpacity={1} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="colorL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4DE3CA" stopOpacity={1} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0.5} />
            </linearGradient>
          </defs>
        </BarChart>
      </div>
    </div>
  );
}
