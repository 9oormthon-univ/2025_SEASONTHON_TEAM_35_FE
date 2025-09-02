import React from 'react';

function CustomRadio({ name, option, value, onChange }) {
    const isSelected = value === option.value;
    return (
        <label className="flex items-center p-3 cursor-pointer">
            <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={onChange}
                className="sr-only" // 실제 라디오 버튼은 숨기고
            />
            {/* 👇 우리가 직접 디자인한 UI를 보여줍니다. */}
            <div className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors
                           ${isSelected ? 'border-primary-1 bg-white' : 'border-gray-20 bg-white'}`}
            >
                {isSelected && <div className="w-[10px] h-[10px] bg-primary-1 rounded-full" />}
            </div>
            <span className="ml-3 text-[18px] font-medium text-gray-100">{option.label}</span>
        </label>
    );
}


// 메인 컴포넌트
export default function PlanQuestionStep({ stepData, value, onChange, error }) {
    const { key, title, type, options = [] } = stepData;

    const handleInputChange = (e) => {
        onChange(key, e.target.value);
    };

    const handleValueChange = (newValue) => {
        onChange(key, newValue);
    };

    const renderInput = () => {
        switch (type) {
            case 'radio':
                return (
                    <div className="space-y-4">
                        {options.map((option) => (
                            // 👇 2. 파일 상단에 만든 CustomRadio 컴포넌트를 여기서 사용합니다.
                            <CustomRadio
                                key={option.value}
                                name={key}
                                option={option}
                                value={value}
                                onChange={handleInputChange}
                            />
                        ))}
                    </div>
                );

            case 'toggle':
                return (
                    <div className="space-y-3">
                        {options.map((option) => {
                            const isSelected = value === option.value;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => handleValueChange(option.value)}
                                    className={`w-full text-left p-4 rounded-lg border text-lg transition-colors
                                                ${isSelected
                                        ? 'bg-primary-1 text-white border-primary-1 font-bold'
                                        : 'bg-white text-gray-80 border-gray-20 hover:bg-gray-5'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                );

            // ... 다른 'select', 'number' 타입 케이스들 ...
        }
    };

    return (
        <div className="p-5 pt-8">
            <h2 className="mt-1 mb-8 whitespace-pre-wrap text-2xl font-bold leading-tight">{title}</h2>
            <div>
                {renderInput()}
                {error && <p className="mt-2 text-sm text-error">{error}</p>}
            </div>
        </div>
    );
}