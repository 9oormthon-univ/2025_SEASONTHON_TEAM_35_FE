import React from 'react';
import ResidentNumberInput from "@/components/UserInformPage/ResidentNumberInput.jsx";
import PhoneNumberInput from "@/components/UserInformPage/PhoneNumberInput.jsx";
import MultiSelectGrid from "@/components/UserInformPage/MultiSelectGrid.jsx";
// 일반 텍스트 입력 필드 컴포넌트
const TextInput = ({ value, onChange, placeholder }) => (
    <input
        type="text"
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-[50px] px-4 rounded-lg border border-gray-20 text-lg focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
    />
);

// 이름 입력 필드 컴포넌트를 수정합니다.
const NameInput = ({ value, error, onClick }) => (
    <div className="relative" onClick={onClick}>
        <input
            type="text"
            value={value || ''}
            readOnly
            className={`w-full h-[50px] px-4 rounded-lg border text-lg 
                       ${error ? 'border-red-500' : 'border-gray-20'} 
                       bg-white text-gray-90`}
        />
    </div>
);

export default function FormStep({ stepData, value, onChange, error, setError }) {
    const { key, title, keyword, type, placeholder } = stepData;

    // 제목을 키워드 기준으로 분리
    const titleParts = keyword ? title.split(keyword) : [title];

    // 입력 값이 변경될 때 호출되는 함수
    const handleInputChange = (e) => {
        onChange(key, e.target.value);
    };

    // stepData.type에 따라 다른 입력 UI를 렌더링
    const renderInput = () => {
        switch (type) {
            case 'text':
                // 👇 이름 필드일 경우 특별한 처리를 합니다.
                if (key === 'name') {
                    return (
                        <NameInput
                            value={value}
                            error={error && error[key]}
                            onClick={() => setError({ [key]: "이름은 변경할 수 없습니다." })}// 클릭 시 강제로 유효성 검증 실행
                        />
                    );
                }

                return (
                    <TextInput
                        value={value}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                    />
                );
            case 'resident':
                return (
                    <ResidentNumberInput
                        value={value}
                        onChange={(newValue) => onChange(stepData.key, newValue)}
                        error={error && error[stepData.key]}
                    />
                );
            case 'phone':
                return (
                    <PhoneNumberInput
                        value={value}
                        onChange={(newValue) => onChange(stepData.key, newValue)}
                        error={error && error[stepData.key]}
                    />
                );
            case 'multi-select-grid':
                return (
                    <MultiSelectGrid
                        options={stepData.options}
                        value={value}
                        onChange={(newValue) => onChange(stepData.key, newValue)}
                        error={error && error[stepData.key]}
                    />
                );
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