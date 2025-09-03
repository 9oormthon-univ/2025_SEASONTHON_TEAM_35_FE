import React from 'react';

// 통신사 목록
const carriers = [
    { value: '', label: '통신사를 선택해주세요' },
    { value: 'SKT', label: 'SKT' },
    { value: 'KT', label: 'KT' },
    { value: 'LGU', label: 'LG U+' },
    { value: 'SKT_MVNO', label: 'SKT 알뜰폰' },
    { value: 'KT_MVNO', label: 'KT 알뜰폰' },
    { value: 'LGU_MVNO', label: 'LG U+ 알뜰폰' },
];

export default function PhoneNumberInput({ value = {}, onChange, error }) {
    const { carrier = '', number = '' } = value;

    const handleValueChange = (key, val) => {
        let processedValue = val;
        // 'number' 필드의 경우 숫자만 허용
        if (key === 'number') {
            processedValue = val.replace(/[^0-9]/g, '');
        }

        onChange({
            ...value,
            [key]: processedValue,
        });
    };

    return (
        <div className="space-y-2">
            {/* 통신사 선택 */}
            <select
                value={carrier}
                onChange={(e) => handleValueChange('carrier', e.target.value)}
                className={`w-full h-[50px] px-3 rounded-lg border text-lg
                           ${error ? 'border-red-500' : 'border-gray-20'}
                           focus:border-primary-1 focus:ring-1 focus:ring-primary-1
                           ${!carrier ? 'text-gray-400' : 'text-gray-90'}`} // placeholder 스타일
            >
                {carriers.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                ))}
            </select>

            {/* 휴대폰 번호 입력 */}
            <input
                type="text"
                value={number}
                onChange={(e) => handleValueChange('number', e.target.value)}
                placeholder="‘-’ 없이 숫자만 입력"
                className={`w-full h-[50px] px-4 rounded-lg border text-lg
                           ${error ? 'border-red-500' : 'border-gray-20'}
                           focus:border-primary-1 focus:ring-1 focus:ring-primary-1`}
            />
        </div>
    );
}