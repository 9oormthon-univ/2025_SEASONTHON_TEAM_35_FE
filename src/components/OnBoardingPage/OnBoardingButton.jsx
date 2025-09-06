import React from 'react';

export default function OnBoardingButton({ onClick, text, isPrimary = true, invisible = false }) {
    const baseClasses = "flex-grow h-[56px] rounded-[12px] font-bold text-[16px] flex justify-center items-center transition-opacity duration-300";
    const primaryClasses = "bg-[#59E4CD] text-white";
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