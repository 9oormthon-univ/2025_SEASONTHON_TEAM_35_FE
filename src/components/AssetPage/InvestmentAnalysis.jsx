import AssetDonutChart from './AssetDonutChart';

export default function InvestmentAnalysis() {
    return (
        <div className="w-[361px] flex flex-col gap-3">
            {/* 헤더 */}
            <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold">투자 분석</h2>
            </div>
            {/* 컨텐츠 카드 */}
            <div className="w-[361px] h-[188px] bg-white rounded-xl shadow-sm p-5 flex items-center justify-center">
                <AssetDonutChart />
            </div>
        </div>
    );
}