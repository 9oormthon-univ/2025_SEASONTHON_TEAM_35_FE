import React from 'react';

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


export default function FormStep({ stepData, value, onChange, error }) {
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
                return (
                    <TextInput
                        value={value}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                    />
                );

            // TODO: 'resident', 'phone', 'multi-select-grid' 타입에 대한 case 추가 예정

            default:
                return <div>지원하지 않는 입력 타입입니다: {type}</div>;
        }
    };

    return (
        <div className="p-5 pt-8">
            <h2 className="mt-1 mb-8 whitespace-pre-wrap text-2xl font-bold leading-tight">
                {keyword ? (
                    <>
                        {titleParts[0]}
                        <span className="text-primary-1">{keyword}</span>
                        {titleParts[1]}
                    </>
                ) : (
                    title
                )}
            </h2>
            <div>
                {renderInput()}
                {error && <p className="mt-2 text-sm text-error">{error}</p>}
            </div>
        </div>
    );
}