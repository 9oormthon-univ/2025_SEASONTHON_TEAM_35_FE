export default function HomeTotalAssets() {
    // // useAssets 훅을 호출 -> 전역 상태와 필요한 값들
    // const { userName, loading } = useAssets();

    // // 데이터 로딩 중이거나 데이터가 없을 때 처리
    // if (loading) {
    //     return <div>로딩 중...</div>;
    // }

    // 이 부분은 API 호출이 아닌 목업 데이터로 가정합니다.
    const totalAmount = 190198123; // 예시: API에서 totalAmount가 들어왔다고 가정

    // 1. 총 자산의 6.7% 계산
    const increasedAmount = totalAmount * 0.057;

    // 2. 10원 단위에서 반올림
    // Math.round()는 소수점 첫째 자리에서 반올림하므로,
    // 10으로 나눈 후 반올림하고 다시 10을 곱하여 10원 단위로 반올림합니다.
    const roundedAmount = Math.round(increasedAmount / 10) * 10;

    // 3. 숫자를 콤마가 포함된 문자열로 포맷팅
    const formattedTotalAmount = totalAmount.toLocaleString('ko-KR');
    const formattedIncreasedAmount = roundedAmount.toLocaleString('ko-KR');

    return (
        <div className="w-[353px] h-[120px] bg-white rounded-xl p-5 flex flex-col gap-1 shadow-sm">
            <div className="flex justify-between items-center">
                <span className="text-sm">
                    <span className="text-gray-60">총 자산</span>
                </span>
            </div>
            <span className="text-2xl font-bold text-gray-100">{formattedTotalAmount} 원</span>
            <span className="text-sm text-gray-50 mt-1">
                초기 자산보다 <span className="text-blue-500">{formattedIncreasedAmount}</span>원 늘었어요
            </span>
        </div>
    );
}