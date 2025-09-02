import React from 'react';

// 헬퍼(Helper) 컴포넌트들을 메인  위에 배치합니다.
function CustomRadio({ name, option, value, onChange }) {
    const isSelected = value === option.value;
    return (
        <label className="flex items-center p-1 cursor-pointer">
            <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={onChange}
                className="sr-only"
            />
            <div className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors
                           ${isSelected ? 'border-primary-1 bg-white' : 'border-gray-20 bg-white'}`}
            >
                {isSelected && <div className="w-[10px] h-[10px] bg-primary-1 rounded-full" />}
            </div>
            <span className="ml-3 text-[18px] font-medium text-gray-100">{option.label}</span>
        </label>
    );
}

// 아이콘 헬퍼 컴포넌트에 새로운 아이콘들을 추가
const TempIcon = ({ name, isSelected, icon }) => (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center`}>
        {/* 아이콘 prop이 있으면 그것을, 없으면 기존 로직을 사용 */}
        <span className="text-xl">{icon || (name === 'ShieldIcon' ? '🛡️' : name === 'RocketIcon' ? '🚀' : '⚖️')}</span>
    </div>
);


// 카드 스타일 토글 UI를 위한 헬퍼 컴포넌트
function ToggleCard({ option, isSelected, onClick }) {
    const { label, description, icon } = option;
    const containerClasses = `
        w-[353px] h-[86px] radius=[12px] relative flex items-center p-5 rounded-xl border transition-all duration-300 overflow-hidden
        ${isSelected
        ? 'border-primary-1 bg-gradient-to-r from-primary-2/20 to-transparent shadow-md'
        : 'border-gray-20 bg-white hover:bg-gray-5'
    }
    `;

    return (
        <button onClick={onClick} className={containerClasses}>
            <div className="flex-1 text-left">
                <p className="text-lg font-bold text-gray-90">{label}</p>
                <p className=" text-[12px] text-mideum text-gray-40">{description}</p>
            </div>
            <div className="ml-4">
                <TempIcon name={icon} isSelected={isSelected} />
            </div>
        </button>
    );
}

// --- 메인 컴포넌트 ---
export default function PlanQuestionStep({ stepData, value, onChange, error }) {
    const { key, title, type, options = [], keyword } = stepData;

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
                    <div className="space-y-1">
                        {options.map((option) => (
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
                // styleVariant 값에 따라 다른 토글 UI를 보여주도록 분기
                if (stepData.styleVariant === 'card') {
                    return (
                        <div className="space-y-3">
                            {options.map((option) => (
                                <ToggleCard
                                    key={option.value}
                                    option={option}
                                    isSelected={value === option.value}
                                    onClick={() => handleValueChange(option.value)}
                                />
                            ))}
                        </div>
                    );
                }else if (stepData.styleVariant === 'box') {
                    return (
                        <div className="flex items-center gap-3">
                            {options.map((option) => {
                                const isSelected = value === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => handleValueChange(option.value)}
                                        className={`flex-1 text-center p-5 rounded-lg border text-lg transition-colors
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
                } else if (stepData.styleVariant === 'pill') {
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
                                        <TempIcon icon={option.icon} />
                                        <span className="ml-1">{option.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    );
                }

                // 기본 토글 버튼 (카드 스타일이 아닐 경우)
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
        }
    };

    const titleParts = keyword ? title.split(keyword) : [title];

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