import AssetDonutChart from './AssetDonutChart';

export default function InvestmentAnalysis() {
    return (
        <div className="w-[361px] flex flex-col gap-1">
            {/* 헤더 */}
            <div className="flex justify-between items-center">
                <h2 className="text-base font-bold pl-[4px]">투자 분석</h2>
            </div>
            {/* 컨텐츠 카드 */}
            <div className="w-[361px] h-[170px] bg-white rounded-xl shadow-sm p-3 flex items-center justify-center">
                <AssetDonutChart />
            </div>
        </div>
    );
}