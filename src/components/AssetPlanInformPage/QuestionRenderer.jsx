import React from 'react';
import CustomRadio from './CustomRadio';
import ToggleCard from './ToggleCard';

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
            }
            return <div>기본 토글 UI</div>;

        default:
            return <div>알 수 없는 질문 타입입니다.</div>;
    }
}