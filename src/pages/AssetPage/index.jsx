import TotalAssets from '../../components/AssetPage/TotalAssets';
import AssetAnalysis from '../../components/AssetPage/AssetAnalysis';
import InvestmentAnalysis from '../../components/AssetPage/InvestmentAnalysis';
import userIcon from '../../assets/icons/user.png';

export default function AssetPage() {
    return (
        <div className="bg-background min-h-screen p-5">
            {/*헤더 */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-80">자산 정보</h1>
              {/* 마이페이지로 이동 */}
                    <img src={userIcon} alt="마이페이지" className="w-8 h-8" />

            </header>

            <main className="flex flex-col items-center gap-8">
                <TotalAssets />
                <AssetAnalysis />
                <InvestmentAnalysis />
            </main>
        </div>
    );
}