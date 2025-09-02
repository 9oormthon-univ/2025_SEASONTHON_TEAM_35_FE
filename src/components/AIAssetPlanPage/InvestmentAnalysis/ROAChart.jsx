import { BarChart, Bar, XAxis, CartesianGrid, LabelList, Cell } from 'recharts';

const data = [
  // api 수정필요! - 값이랑 경우의 수
  { name: '현재', value: 12000000 },
  { name: '1년 후', value: 14000000 },
  { name: '2년 후', value: 16000000 },
  { name: '3년 후', value: 18000000 },
];

const CustomTick = ({ x, y, payload }) => {
  const isNow = payload.value === '현재';
  return (
    <text
      x={x}
      y={y + 8} // 위치 보정
      textAnchor="middle"
      fill={isNow ? '#00D6B3' : '#A7AEB3'} // 조건부 색상
      fontSize={12}
      fontWeight={400}
    >
      {payload.value}
    </text>
  );
};
export default function ROAChart() {
  return (
    <BarChart width={345} height={237} data={data} margin={{ top: 20 }}>
      {/* 눈금 */}
      <CartesianGrid strokeDasharray="4 2" vertical={false} />
      {/* x축 */}
      <XAxis
        dataKey="name"
        tickLine={false}
        axisLine={{ stroke: '#D7DDE1', strokeWidth: 2 }}
        tick={<CustomTick />}
      />
      {/* 막대 */}
      <Bar
        dataKey="value"
        radius={[4, 4, 0, 0]}
        barSize={45} // 개수에 따라 다르게 해야함!!
      >
        {/* 막대별 색상 지정 */}
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={
              index === data.length - 1
                ? 'url(#colorGy)' // 마지막 막대는 회색
                : 'url(#colorUv)' // 나머지는 그라데이션
            }
          />
        ))}
        <LabelList
          dataKey="value"
          position="top"
          content={({ x, y, width, value, index }) => {
            const isFirst = index === 0;
            const isLast = index === data.length - 1;

            if (!isFirst && !isLast) return null;

            const label = value.toLocaleString() + '원';
            const fontSize = 12;

            if (isFirst) {
              // 처음 라벨: border 박스 포함
              return (
                <g>
                  <rect
                    x={x + width / 2 - label.length * fontSize * 0.3}
                    y={y - 30}
                    width={label.length * fontSize * 0.6 + 10}
                    height={20}
                    rx={4}
                    fill="#fff"
                    stroke="#00D6B3"
                    strokeWidth={1}
                  />
                  <text
                    x={x + width / 2 + 4}
                    y={y - 19}
                    textAnchor="middle"
                    fill="#00D6B3"
                    fontSize={fontSize}
                    fontWeight={600}
                    dominantBaseline="middle"
                  >
                    {label}
                  </text>
                </g>
              );
            }

            if (isLast) {
              // 마지막 라벨: 굵은 글씨 (y 좌표 보정)
              return (
                <text
                  x={x + width / 2}
                  y={y - 8} // 🔥 막대 위에 딱 붙도록 수정
                  textAnchor="middle"
                  fill="#A7AEB3"
                  fontSize={fontSize}
                  fontWeight={700}
                  dominantBaseline="middle"
                >
                  {(value / 10000).toLocaleString()}만
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
        <linearGradient id="colorGy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4E7EA" stopOpacity={1} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0.5} />
        </linearGradient>
      </defs>
    </BarChart>
  );
}
