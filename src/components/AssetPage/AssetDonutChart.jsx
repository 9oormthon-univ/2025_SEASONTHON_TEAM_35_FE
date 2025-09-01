import { PieChart, Pie, Cell } from 'recharts';
import { useAssetDonutChart } from '../../hooks/useAssetDonutChart.js';

export default function AssetDonutChart() {
    const { isLoading, chartData, hasInvestmentData } = useAssetDonutChart();

    // 로딩 처리
    if (isLoading) {
        return <div className="text-gray-40">데이터를 불러오는 중...</div>;
    }

    // 투자 데이터가 없을 때
    if (!hasInvestmentData) {
        return <div className="text-gray-40">투자 내역이 없습니다.</div>;
    }

    return (
        <div className="flex items-center space-x-6 p-4 bg-white rounded-lg">
            {/* 도넛 차트 */}
            <div className="relative mr-1">
                <PieChart width={140} height={140}>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        startAngle={90}
                        endAngle={-270}
                    >
                        {chartData.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                </PieChart>
            </div>

            {/* 범례 */}
            <div className="w-[130px] h-[96px] flex flex-col justify-center space-y-1">
                {chartData.map((entry, index) => {
                    const isMax = index === 0;
                    const containerClasses = `flex items-center text-[12px] ${isMax ? 'h-[24px] bg-background rounded-lg' : ''}`;
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