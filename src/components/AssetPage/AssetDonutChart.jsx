import { PieChart, Pie, Cell } from "recharts";

const data = [
    { name: "주식", value: 60 },
    { name: "비트코인", value: 20 },
    { name: "채권", value: 15 },
    { name: "ETF", value: 5 },
];

// Tailwind theme에 맞춰 색상 순서 정의
const COLORS = ["#00B894", "#6C5CE7", "#0984E3", "#E17055"];
// ↑ 예시로 primary-2, sub-1, sub-2, sub-3 색상을 직접 HEX 코드로 넣었어요.
// 프로젝트 theme.colors에 이미 정의돼 있다면 그대로 불러와서 대체하면 됩니다.

export default function AssetDonutChart() {
    return (
        <div className="flex items-center gap-6">
            {/* 도넛 차트 */}
            <PieChart width={140} height={140}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}  // 도넛 두께
                    outerRadius={70}  // 전체 크기
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>

            {/* 범례 리스트 */}
            <div className="flex flex-col gap-2 text-sm">
                {data.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
            <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
            ></span>
                        <span className="font-medium">{entry.name}</span>
                        <span className="text-gray-500">{entry.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
