export default function OnBoardingButton({ onClick, text, isPrimary = true, invisible = false }) {
    const baseClasses = "flex-grow w-[100px] h-[45px] rounded-[20px] font-bold text-[16px] flex justify-center items-center transition-opacity duration-300";
    const primaryClasses = "bg-[#00D6B3] text-white";
    const secondaryClasses = "bg-transparent text-gray-600";
    const visibilityClass = invisible ? 'invisible' : 'visible';

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses} ${visibilityClass}`}
        >
            {text}
        </button>
    );
}