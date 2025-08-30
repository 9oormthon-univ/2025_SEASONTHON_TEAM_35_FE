import { PieChart, Pie, Cell } from 'recharts';
import { useAssets } from '../../context/AssetContext.jsx';

// 자산 key에 맞는 한글 이름을 매핑하는 객체 (색상 정보는 제거)
const ASSET_NAMES = {
    stock: '주식',
    bitcoin: '비트코인',
    bond: '채권',
    etf: 'ETF',
};

// 순위에 따라 적용될 색상 배열
// NOTE: 프로젝트의 tailwind.config.js에 정의된 실제 색상 코드로 변경해주세요.
const RANK_COLORS = [
    '#2DDAB2', // 1위: primary-2
    '#58A9FF', // 2위: sub-1
    '#FF919F', // 3위: sub-2
    '#FFD562', // 4위: sub-3
];

export default function AssetDonutChart() {
    const { assetData, loading } = useAssets();

    // 로딩 중이거나 데이터가 없을 때
    if (loading || !assetData || !assetData.ratios) {
        return <div className="text-gray-40">데이터가 없습니다.</div>;
    }

    // 투자 자산 데이터만 필터링
    const investmentRatios = (({ cash, etc, ...rest }) => rest)(assetData.ratios);

    // 차트에 사용할 형태로 데이터를 가공하고, 비율이 0인 항목은 제외
    const chartData = Object.entries(investmentRatios)
        .map(([key, value]) => ({
            key,
            name: ASSET_NAMES[key] || key,
            value: value || 0,
        }))
        .filter(item => item.value > 0);

    // 투자 자산이 하나도 없을 경우의 UI
    if (chartData.length === 0) {
        return <div className="text-gray-40">투자 내역이 없습니다.</div>;
    }

    // 비율이 높은 순으로 데이터를 정렬하고, 순위에 따라 색상을 추가
    const sortedDataWithColor = [...chartData]
        .sort((a, b) => b.value - a.value)
        .map((item, index) => ({
            ...item,
            // RANK_COLORS 배열에서 순서대로 색상을 할당합니다.
            // 자산 종류가 4개보다 많아질 경우를 대비해 나머지 연산(%) 해둠 (사실 필요 X)
            color: RANK_COLORS[index % RANK_COLORS.length],
        }));

    return (
        <div className="flex items-center space-x-6 p-4 bg-white rounded-lg">
            {/* 도넛 차트 */}
            <div className="relative mr-1">
                <PieChart width={140} height={140}>
                    <Pie
                        data={sortedDataWithColor}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={sortedDataWithColor.length > 1 ? 2 : 0}
                        startAngle={90}  //  시작 각도를 90도로 설정 (12시 방향)
                        endAngle={-270} // 90도에서 -270도까지 (시계 반대 방향으로 360도 회전)
                    >
                        {sortedDataWithColor.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                </PieChart>
            </div>

            {/* 범례 */}
            <div className="w-[130px] h-[96px] flex flex-col justify-center space-y-1">
                {sortedDataWithColor.map((entry, index) => { // 5. 여기도 정렬된 데이터를 사용
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