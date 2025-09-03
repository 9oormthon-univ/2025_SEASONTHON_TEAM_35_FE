import React, { useState } from 'react';

// TODO: 나중에 실제 아이콘으로 교체
const EyeIcon = ({ isVisible }) => (
    <span className="text-xl">{isVisible ? '👁️' : '🔒'}</span>
);

export default function ResidentNumberInput({ value = {}, onChange, error }) {
    const [isMasked, setIsMasked] = useState(true);
    const { part1 = '', part2 = '' } = value;

    const handlePartChange = (part, val) => {
        // 숫자만 입력되도록 하고, 최대 길이를 제한합니다.
        const numericValue = val.replace(/[^0-9]/g, '');
        const maxLength = part === 'part1' ? 6 : 7;
        const truncatedValue = numericValue.slice(0, maxLength);

        onChange({
            ...value,
            [part]: truncatedValue,
        });
    };

    return (
        <div className="flex items-center gap-2">
            {/* 첫 번째 6자리 입력 필드 */}
            <input
                type="text"
                value={part1}
                onChange={(e) => handlePartChange('part1', e.target.value)}
                placeholder="생년월일 6자리"
                className={`w-full h-[50px] px-4 rounded-lg border text-lg text-center
                           ${error ? 'border-red-500' : 'border-gray-20'}
                           focus:border-primary-1 focus:ring-1 focus:ring-primary-1`}
            />
            <span className="text-gray-300">-</span>

            {/* 두 번째 7자리 입력 필드 (마스킹 처리) */}
            <div className="relative w-full">
                <input
                    type={isMasked ? 'password' : 'text'}
                    value={part2}
                    onChange={(e) => handlePartChange('part2', e.target.value)}
                    placeholder="뒤 7자리"
                    className={`w-full h-[50px] px-4 rounded-lg border text-lg text-center
                               ${error ? 'border-red-500' : 'border-gray-20'}
                               focus:border-primary-1 focus:ring-1 focus:ring-primary-1`}
                />
                <button
                    type="button"
                    onClick={() => setIsMasked(!isMasked)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400"
                >
                    <EyeIcon isVisible={!isMasked} />
                </button>
            </div>
        </div>
    );
}