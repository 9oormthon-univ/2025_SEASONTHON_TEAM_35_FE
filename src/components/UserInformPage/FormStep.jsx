import React from 'react';
import NameInput from './NameInput';
import ResidentNumberInput from './ResidentNumberInput';
import PhoneNumberInput from './PhoneNumberInput';
import MultiSelectGrid from './MultiSelectGrid';

export default function FormStep({ stepData, value, onChange, error, setError }) {
    const { key, type } = stepData;

    const renderInput = () => {
        switch (type) {
            case 'text':
                if (key === 'name') {
                    return <NameInput value={value} error={error && error[key]} onClick={() => setError({ [key]: "이름은 변경할 수 없습니다." })} />;
                }
                break; // Fallback for other text inputs if any
            case 'resident':
                return <ResidentNumberInput value={value} onChange={onChange} error={error && error[key]} />;
            case 'phone':
                return <PhoneNumberInput value={value} onChange={onChange} error={error && error[key]} />;
            case 'multi-select-grid':
                return <MultiSelectGrid options={stepData.options} value={value} onChange={onChange} />;
            default:
                return <div>지원하지 않는 입력 타입입니다: {type}</div>;
        }
    };

    return (
        <div>
            {renderInput()}
            {error && error[key] && (
                <p className="mt-2 text-sm text-red-500">{error[key]}</p>
            )}
        </div>
    );
}