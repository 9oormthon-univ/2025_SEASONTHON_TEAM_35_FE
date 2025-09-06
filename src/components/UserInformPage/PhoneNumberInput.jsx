import React, { useState, useRef, useEffect } from 'react';

const carriers = [
    { value: 'SKT', label: 'SKT' },
    { value: 'KT', label: 'KT' },
    { value: 'LGU', label: 'LG U+' },
    { value: 'SKT_MVNO', label: 'SKT 알뜰폰' },
    { value: 'KT_MVNO', label: 'KT 알뜰폰' },
    { value: 'LGU_MVNO', label: 'LG U+ 알뜰폰' },
];

const formatPhoneNumber = (number) => {
    if (!number) return "";
    const rawNumber = number.replace(/[^0-9]/g, "").slice(0, 11);
    if (rawNumber.length < 4) return rawNumber;
    if (rawNumber.length < 8) return `${rawNumber.slice(0, 3)}-${rawNumber.slice(3)}`;
    return `${rawNumber.slice(0, 3)}-${rawNumber.slice(3, 7)}-${rawNumber.slice(7)}`;
};

export default function PhoneNumberInput({ value = {}, onChange, error }) {
    const { carrier = '', number = '' } = value;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ... (useEffect, handleCarrierSelect, handleValueChange 함수는 그대로)
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleCarrierSelect = (carrierValue) => {
        onChange({ ...value, carrier: carrierValue });
        setIsOpen(false);
    };

    const handleValueChange = (key, val) => {
        const newValue = key === 'number' ? formatPhoneNumber(val) : val;
        onChange({ ...value, [key]: newValue });
    };

    // 선택된 라벨을 찾고, 없으면 placeholder 문구 지정
    const selectedCarrierLabel = carriers.find(c => c.value === carrier)?.label || '이용 중인 통신사를 선택해 주세요';

    return (
        <div className="space-y-2 "  style={{ cursor: 'none' }}>
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full h-[50px] px-4 flex items-center justify-between 
                               ${error ? 'border-red-500' : 'border-gray-20'}
                               focus:shadow-primary-focus-light focus:border-primary-2 focus:outline-none
                               ${!carrier ? 'text-gray-400' : 'text-gray-100'}
                               text-[18px]  border-2 rounded-xl bg-white`}
                    style={{ cursor: 'none' }}
                >
                    <span>{selectedCarrierLabel}</span>
                    <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div
                        className="absolute z-10 w-full  bg-white border border-gray-200 rounded-xl shadow-lg
                                   h-[267px] overflow-y-auto"
                        style={{ cursor: 'none' }}
                    >
                        {carriers.map(c => (
                            <div
                                key={c.value}
                                onClick={() => handleCarrierSelect(c.value)}
                                className="px-4 py-[8px] text-[18px] text-gray-100  cursor-pointer"
                                style={{ cursor: 'none' }}
                            >
                                {c.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* --- 휴대폰 번호 입력 --- */}
            <input
                type="tel"
                value={number}
                onChange={(e) => handleValueChange('number', e.target.value)}
                placeholder="사용 중인 번호를 입력해 주세요"
                maxLength={13}
                className={`w-full h-[50px] px-4 rounded-[12px] border text-[18px]
               ${error ? 'border-red-500' : 'border-gray-20'}
               focus:shadow-primary-focus-light focus:border-primary-2 focus:outline-none`}
                style={{ cursor: 'none' }}
            />
        </div>
    );
}