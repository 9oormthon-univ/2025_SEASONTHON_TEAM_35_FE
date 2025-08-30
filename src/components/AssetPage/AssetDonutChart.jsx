import { PieChart, Pie, Cell } from 'recharts';

// 데이터 관리, 아래에서 순서 변경 필요
const assetData = [
    { name: '주식', value: 60, color: '#00E8C0' },
    { name: '비트코인', value: 20, color: '#58A9FF' },
    { name: '채권', value: 15, color: '#FF919F' },
    { name: 'ETF', value: 5, color: '#FFD562' },
];

// 차트 시각적 배치를 위한 데이터 (순서 유지)
const dataForChart = [
    assetData.find(a => a.name === '채권'),
    assetData.find(a => a.name === '주식'),
    assetData.find(a => a.name === '비트코인'),
    assetData.find(a => a.name === 'ETF'),
];

// 범례 표시를 위한 데이터 (내림차순)
const dataForLegend = [...assetData].sort((a, b) => b.value - a.value);


export default function AssetDonutChart() {
    return (
        <div className="flex items-center space-x-6 p-4 bg-white rounded-lg">

            {/* 도넛 차트 */}
            <div className="relative">
                <PieChart width={140} height={140}>
                    <Pie
                        data={dataForChart}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        labelLine={false}
                        label={false}
                    >
                        {dataForChart.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                </PieChart>
            </div>

            {/* 범례  */}
            {/*  컨테이너 사이즈를 130x96px  */}
            <div className="w-[130px] h-[96px] flex flex-col justify-center space-y-3">
                {dataForLegend.map((entry) => ( // 정렬된 범례용 데이터 사용
                    <div key={`legend-${entry.name}`} className="flex items-center text-sm">
                        <div
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-gray-60">{entry.name}</span>
                        <span className="text-gray-80 ml-auto">{entry.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}