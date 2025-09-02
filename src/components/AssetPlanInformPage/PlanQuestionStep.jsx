import React from 'react';

export default function PlanQuestionStep({ stepData, value, onChange, error }) {
    const { key, title, type, options = [] } = stepData;
    const handleInputChange = (e) => {
        onChange(key, e.target.value);
    };

    // 질문 타입에 맞는 UI를 렌더링 (radio/
    const renderInput = () => {
        switch (type) {
            case 'number':
                return (
                    <input
                        type="number"
                        value={value || ''}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 border border-gray-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1"
                        placeholder="숫자를 입력하세요"
                    />
                );
            case 'radio':
                return (
                    <div className="space-y-3">
                        {options.map((option) => (
                            <label key={option} className="flex items-center p-4 border border-gray-20 rounded-lg cursor-pointer hover:bg-gray-5">
                                <input
                                    type="radio"
                                    name={key}
                                    value={option}
                                    checked={value === option}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-primary-1 focus:ring-primary-1"
                                />
                                <span className="ml-4 text-lg">{option}</span>
                            </label>
                        ))}
                    </div>
                );
            case 'select':
                return (
                    <select
                        value={value || ''}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 border border-gray-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1"
                    >
                        <option value="" disabled>선택하세요</option>
                        {options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            default: // 'text' 또는 기본값
                return (
                    <input
                        type="text"
                        value={value || ''}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 border border-gray-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1"
                        placeholder="답변을 입력하세요"
                    />
                );
        }
    };

    return (
        <div className="p-5 pt-12">
            <h2 className="mb-8 text-2xl font-bold whitespace-pre-wrap">{title}</h2>
            <div>
                {renderInput()}
                {error && <p className="mt-2 text-sm text-error">{error}</p>}
            </div>
        </div>
    );
}