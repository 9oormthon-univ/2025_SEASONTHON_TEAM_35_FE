import React from 'react';

export default function CustomRadio({ name, option, value, onChange }) {
    const isSelected = value === option.value;
    return (
        <label className="flex items-center p-1 cursor-pointer"  style={{ cursor: 'none' }}>
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