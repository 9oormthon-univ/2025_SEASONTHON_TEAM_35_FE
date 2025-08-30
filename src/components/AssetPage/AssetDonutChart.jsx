import { PieChart, Pie, Cell } from 'recharts';

const assetData = [
    { name: '주식', value: 60, color: '#00E8C0' },
    { name: '비트코인', value: 20, color: '#58A9FF' },
    { name: '채권', value: 15, color: '#FF919F' },
    { name: 'ETF', value: 5, color: '#FFD562' },
];

const dataForChart = [
    assetData.find(a => a.name === 'ETF'),
    assetData.find(a => a.name === '주식'),
    assetData.find(a => a.name === '비트코인'),
    assetData.find(a => a.name === '채권'),
];

const dataForLegend = [...assetData].sort((a, b) => b.value - a.value);


export default function AssetDonutChart() {
    return (
        <div className="flex items-center space-x-5 p-4 bg-white rounded-lg">
            {/* 도넛 차트 */}
            <div className="relative mr-1">
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

            {/* 범례 */}
            <div className="w-[130px] h-[96px] flex flex-col justify-center space-y-1">
                {dataForLegend.map((entry, index) => {
                    //  현재 항목이 가장 큰 값인지 확인
                    const isMax = index === 0;

                    // isMax 값에 따라 다른 스타일을 적용 (강조 표시 때문에)
                    const containerClasses = `flex items-center text-[12px] ${
                        isMax
                            ? 'h-[24px] bg-background rounded-lg' // 강조 스타일
                            : ''
                    }`;
                    const textColor = isMax ? 'text-gray-100' : 'text-gray-60';

                    return (
                        <div key={`legend-${entry.name}`} className={containerClasses}>
                            <div
                                className="w-2 h-2 rounded-full ml-3 mr-2"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className={textColor}>{entry.name}</span>
                            <span className={`${textColor} ml-auto mr-3`}>{entry.value.toFixed(1)}%</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}