import React, { useState } from 'react';
import NameInput from './NameInput';
import ResidentNumberInput from './ResidentNumberInput';
import PhoneNumberInput from './PhoneNumberInput';
import MultiSelectGrid from './MultiSelectGrid';

export default function FormStep({ stepData, value, onChange, error, setError }) {
    const { key, type } = stepData;
    const [warning, setWarning] = useState(null);

    const renderInput = () => {
        switch (type) {
            case 'text':
                if (key === 'name') {
                    return (
                        <NameInput
                            value={value}
                            error={warning?.[key]}
                            onClick={() => setWarning({ [key]: "이름은 변경할 수 없습니다." })}
                        />
                    );
                }
                break;
            case 'resident':
                // 옵셔널 체이닝을 사용해 안전하게 에러 전달
                return <ResidentNumberInput value={value} onChange={onChange} error={error?.[key]} />;
            case 'phone':
                return <PhoneNumberInput value={value} onChange={onChange} error={error?.[key]} />;
            case 'multi-select-grid':
                return <MultiSelectGrid options={stepData.options} value={value} onChange={onChange} />;
            default:
                return <div>지원하지 않는 입력 타입입니다: {type}</div>;
        }
    };

    const messageToShow = error?.[key] || warning?.[key];

    return (
        <div>
            {renderInput()}
            {messageToShow && (
                <p className="mt-2 text-sm text-red-500">{messageToShow}</p>
            )}
        </div>
    );
}