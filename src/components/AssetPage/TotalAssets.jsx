export default function TotalAssets() {
    // 유저 이름과 총 자산은 props로 받아오는걸로 수정 필요
    const userName = "유저 이름";
    const totalAmount = "12,000,000";

    return (
        <div className="w-[361px] h-[96px] bg-white rounded-xl p-5 flex flex-col gap-1 shadow-sm">
            <span className="text-sm">
                <span className="text-primary-1 font-bold pr-1">{userName}</span>
                <span className="text-gray-60">님의 총 자산</span>
            </span>
            <span className="text-2xl font-bold text-gray-100">{totalAmount} 원</span>
        </div>
    );
}