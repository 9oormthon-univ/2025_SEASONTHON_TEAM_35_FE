import React from 'react';

// 아이콘 임시 표시용 (나중에 실제 아이콘으로 교체)
const TempIcon = ({ name, isSelected, icon }) => (
    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-20'}`}>
        <span className="text-2xl">{icon || (name === 'ShieldIcon' ? '🛡️' : name === 'RocketIcon' ? '🚀' : '⚖️')}</span>
    </div>
);

export default function ToggleCard({ option, isSelected, onClick }) {
    const { label, description, icon } = option;
    const containerClasses = `
        relative flex items-center w-full p-4 rounded-xl border transition-all duration-300 overflow-hidden
        ${isSelected
        ? 'border-primary-1 bg-gradient-to-r from-primary-2/20 to-transparent shadow-md'
        : 'border-gray-20 bg-white hover:bg-gray-5'
    }
    `;

    return (
        <button onClick={onClick} className={containerClasses}>
            <div className="flex-1 text-left">
                <p className="text-lg font-bold text-gray-90">{label}</p>
                <p className="text-[12px] font-medium text-gray-40">{description}</p>
            </div>
            <div className="ml-4">
                <TempIcon name={icon} isSelected={isSelected} />
            </div>
        </button>
    );
}