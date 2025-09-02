import React from 'react';

// 아이콘을 임시로 렌더링하는 부분
const TempIcon = ({ icon }) => (
    <div className="w-10 h-10 mb-3 flex items-center justify-center">
        <span className="text-3xl">{icon}</span>
    </div>
);

export default function ToggleBox({ option, isSelected, onClick }) {
    const { label, description, icon } = option;

    const containerClasses = `
        w-[170px] h-[174px] rounded-lg border p-4
        transition-all duration-200
        ${isSelected
        ? 'border-primary-2 border-[2px] bg-white shadow-sm'
        : 'border-gray-20 bg-gray-5 hover:bg-gray-10'
    }
    `;

    const titleFontClasses = isSelected ? 'font-semibold' : 'font-medium';

    return (
        <button onClick={onClick} className={containerClasses}>
            <div className="flex flex-col items-start justify-start w-full h-full text-left">
                {/* 1. 아이콘 */}
                <TempIcon icon={icon} />

                {/* 2. 메인 텍스트 (제목) */}
                <p className={`text-[16px] text-gray-100 font-bold  `}>
                    {option.label}
                </p>

                {/* 3. 서브 텍스트 (회색 설명) */}
                <p className={`mt-1 text-xs text-gray-60 font-medium whitespace-pre-wrap ${titleFontClasses}`}>
                    {option.description}
                </p>
            </div>
        </button>
    );
}