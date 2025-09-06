export default function OnBoardingButton({ onClick, isPrimary = true }) {
    const baseClasses = "w-full h-[56px] rounded-[12px]  font-bold text-[16px]";
    const primaryClasses = "bg-[#59E4CD] text-white";
    const secondaryClasses = "bg-transparent text-gray-600";

    return (
        <div className="w-[320px] flex items-center   ">
            <button
                onClick={onClick}
                className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
            >
                이전
            </button>
            <button
                onClick={onClick}
                className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
            >
                다음
            </button>
        </div>

    );
}