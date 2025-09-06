import { BarChart, Bar, XAxis, CartesianGrid, LabelList, Cell } from 'recharts';

const CustomTick = ({ x, y, payload, index, dataLength }) => {
  const isNow = payload.value === '현재';
  const isLast = index === dataLength - 1;
  return (
    <text
      x={x}
      y={y + 12} // 위치 보정
      textAnchor="middle"
      fill={isNow || isLast ? '#00D6B3' : '#A7AEB3'} // 조건부 색상
      fontSize={12}
      fontWeight={isNow || isLast ? 600 : 400}
    >
      {payload.value}
    </text>
  );
};
export default function ROAChart({ result }) {
  const data = result?.forecast_points ?? [];
  const adjustedData = data.map((d, i) => ({
    ...d,
    amount: d.amount * (1 + i * 0.2),
  }));
  return (
    <BarChart width={350} height={237} data={adjustedData} margin={{ top: 20 }}>
      {/* 눈금 */}
      <CartesianGrid strokeDasharray="4 2" vertical={false} />
      {/* x축 */}
      <XAxis
        dataKey="label"
        tickLine={false}
        axisLine={{ stroke: '#D7DDE1', strokeWidth: 2 }}
        tick={({ x, y, payload, index }) => (
          <CustomTick
            x={x}
            y={y}
            payload={payload}
            index={index}
            dataLength={data.length}
          />
        )}
      />
      {/* 막대 */}
      <Bar
        dataKey="amount"
        radius={[4, 4, 0, 0]}
        barSize={`${
          data?.length === 3 ? '50' : data?.length === 4 ? '45' : '30'
        }`}
        shape={(props) => {
          const { x, y, width, height, fill } = props;

          return (
            <rect
              x={x}
              y={y - 1} // 위로 이동
              width={width}
              height={height} // 높이는 그대로
              fill={fill}
              rx={4}
            />
          );
        }}
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
                      data?.length === 6 || data?.length === 4 ? '42' : '62'
                    }`}
                    y={y - 19}
                    textAnchor="middle"
                    fill="#00D6B3"
                    fontSize={12}
                    fontWeight={600}
                    dominantBaseline="middle"
                  >
                    {`${result?.currentAmount?.toLocaleString?.() ?? 0}원`}
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
                  fill="#00BA9B"
                  fontSize={16}
                  fontWeight={700}
                  dominantBaseline="middle"
                >
                  {(value / 10000).toFixed(0)}만
                </text>
              );
            }

            return null;
          }}
        />
      </Bar>

      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#80EBD9" stopOpacity={1} />
          <stop offset="100%" stopColor="#f2fffa" stopOpacity={0.5} />
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="colorMd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4DE3CA" stopOpacity={1} />
          <stop offset="100%" stopColor="#f2fffa" stopOpacity={0.5} />
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="colorL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D6B3" stopOpacity={1} />
          <stop offset="100%" stopColor="#f2fffa" stopOpacity={0.5} />
        </linearGradient>
      </defs>
    </BarChart>
  );
}
