import { useHome } from "@/context/HomeContext.jsx";

export default function HomeTotalAssets() {
    const { loading, error, home } = useHome();

    const totalAsset = home?.totalAsset ?? 0;

    // 1. 총 자산의 5.7% 계산
    const increasedAmount = totalAsset * 0.057;

    // 2. 10원 단위에서 반올림
    // Math.round()는 소수점 첫째 자리에서 반올림하므로,
    // 10으로 나눈 후 반올림하고 다시 10을 곱하여 10원 단위로 반올림
    const roundedAmount = Math.round(increasedAmount / 10) * 10;

    // 3. 숫자를 콤마가 포함된 문자열로 포맷팅
    const formattedTotalAmount = totalAsset.toLocaleString('ko-KR');
    const formattedIncreasedAmount = roundedAmount.toLocaleString('ko-KR');

    if (loading) {
        return (
            <div className="bg-gray-5 rounded-xl px-6 py-4">
                <p className="text-gray-60 text-sm">총 자산 불러오는 중…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-5 rounded-xl px-6 py-4">
                <p className="text-red-500 text-sm">총 자산 정보를 불러오지 못했어요.</p>
            </div>
        );
    }


    return (
    <div className="w-[353px] h-[120px] bg-white rounded-xl p-5 flex flex-col gap-1 shadow-sm">
        <div className="flex justify-between items-center">
                <span className="text-sm">
                    <span className="text-gray-60">총 자산</span>
                </span>
        </div>
        <span className="text-2xl font-bold text-gray-100">{formattedTotalAmount} 원</span>
        <span className="text-sm text-gray-50 mt-1">
                초기 자산보다 <span className="text-blue-500 font-bold">{formattedIncreasedAmount}</span>원 늘었어요
            </span>
    </div>
    );
}
