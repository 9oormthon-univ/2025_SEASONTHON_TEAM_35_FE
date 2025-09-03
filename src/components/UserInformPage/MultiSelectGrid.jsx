import React from 'react';

// 개별 금융사 로고 버튼
const InstitutionButton = ({ option, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-24 h-24 rounded-lg border transition-all
                   ${isSelected
            ? 'border-primary-1 border-2 bg-primary-1/10'
            : 'border-gray-20 bg-white hover:bg-gray-50'
        }`}
    >
        {/* TODO: option.logo를 실제 이미지 경로로 바꿔야 합니다. */}
        <div className="w-10 h-10 mb-2 bg-gray-200 rounded-full" />
        <span className={`font-medium ${isSelected ? 'text-primary-1' : 'text-gray-800'}`}>
            {option.label}
        </span>
    </button>
);


export default function MultiSelectGrid({ options, value = [], onChange, error }) {

    const handleToggle = (selectedValue) => {
        // 현재 선택된 값 배열(value)에 새로운 값이 있는지 확인
        const isCurrentlySelected = value.includes(selectedValue);
        let newSelection;

        if (isCurrentlySelected) {
            // 이미 선택되어 있다면, 배열에서 제거
            newSelection = value.filter(item => item !== selectedValue);
        } else {
            // 선택되어 있지 않다면, 배열에 추가
            newSelection = [...value, selectedValue];
        }
        onChange(newSelection);
    };

    return (
        <div className="grid grid-cols-3 gap-3">
            {options.map(option => (
                <InstitutionButton
                    key={option.value}
                    option={option}
                    isSelected={value.includes(option.value)}
                    onClick={() => handleToggle(option.value)}
                />
            ))}
        </div>
    );
}