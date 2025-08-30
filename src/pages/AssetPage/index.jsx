import TotalAssets from '../../components/AssetPage/TotalAssets';
import AssetAnalysis from '../../components/AssetPage/AssetAnalysis';
import InvestmentAnalysis from '../../components/AssetPage/InvestmentAnalysis';
import userIcon from '../../assets/icons/user.png';

export default function AssetPage() {
    return (
        <div className="bg-background min-h-screen ">
            {/*헤더 */}
            <header className="flex justify-between items-center p-[20px] pb-[16px] pt-7">
                <h1 className="text-xl font-bold text-gray-90">자산 정보</h1>
              {/* 마이페이지로 이동 */}
                    <img src={userIcon} alt="마이페이지" className="w-[24px] h-[24px]" />

            </header>

            <main className="flex flex-col h-[652px] items-center gap-5">
                <TotalAssets />
                <AssetAnalysis />
                <InvestmentAnalysis />
            </main>
        </div>
    );
}