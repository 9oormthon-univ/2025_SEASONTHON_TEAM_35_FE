import React from 'react';
import CustomRadio from './CustomRadio';
import ToggleCard from './ToggleCard';
import ToggleBox from "./ToggleBox.jsx";

export default function QuestionRenderer({ stepData, value, onChange }) {
    const { key, type, options = [] } = stepData;

    const handleInputChange = (e) => onChange(key, e.target.value);
    const handleValueChange = (newValue) => onChange(key, newValue);

    switch (type) {
        case 'radio':
            return (
                <div className="space-y-1">
                    {options.map((option) => (
                        <CustomRadio key={option.value} name={key} option={option} value={value} onChange={handleInputChange} />
                    ))}
                </div>
            );

        case 'toggle':
            if (stepData.styleVariant === 'card') {
                return (
                    <div className="space-y-3">
                        {options.map((option) => (
                            <ToggleCard key={option.value} option={option} isSelected={value === option.value} onClick={() => handleValueChange(option.value)} />
                        ))}
                    </div>
                );
            }else if (stepData.styleVariant === 'box') {
                return (
                    <div className="flex items-center gap-3">
                        {options.map((option) => (
                            <ToggleBox
                                key={option.value}
                                option={option}
                                isSelected={value === option.value}
                                onClick={() => handleValueChange(option.value)}
                            />
                        ))}
                    </div>
                );
            }else if (stepData.styleVariant === 'pill') {
                return (
                    <div className="flex-wrap gap-2">
                        {options.map((option) => {
                            const isSelected = value === option.value;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => handleValueChange(option.value)}
                                    className={`flex items-center justify-center px-4 py-2 rounded-full border text-base transition-colors
                                                    ${isSelected
                                        ? 'bg-primary-1 text-white border-primary-1 font-bold'
                                        : 'bg-white text-gray-80 border-gray-20 hover:bg-gray-5'
                                    }`}
                                >
                                    <span className="ml-1">{option.label}</span>
                                </button>
                            );
                        })}
                    </div>
                );
            }
            return <div>기본 토글 UI</div>;

        default:
            return <div>알 수 없는 질문 타입입니다.</div>;
    }
}