import { useAssets } from '../../context/AssetContext.jsx'; // 👈 1. useAssets 훅을 import 합니다.

export default function TotalAssets() {
    // useAssets 훅을 호출 -> 전역 상태와 필요한 값들
    const { assetData, userName, loading } = useAssets();

    // 데이터 로딩 중이거나 데이터가 없을 때 처리
    if (loading) {
        return <div>로딩 중...</div>;
    }

    //  assetData에서 총 자산을 계산하고, 없으면 0으로 처리.
    const totalAmount = assetData?.total_amount || 0;

    // 숫자를 콤마가 포함된 문자열로 포맷팅.
    const formattedAmount = totalAmount.toLocaleString('en-US');

    return (
        <div className="w-[353px] h-[96px] bg-white rounded-xl p-5 flex flex-col gap-1 shadow-sm">
            <span className="text-sm">
                {/* Context에서 가져온 userName을 사용 */}
                <span className="text-primary-1 font-bold pr-1">{userName}</span>
                <span className="text-gray-60">님의 총 자산</span>
            </span>
            {/* 계산된 formattedAmount를 사용 */}
            <span className="text-2xl font-bold text-gray-100">{formattedAmount} 원</span>
        </div>
    );
}