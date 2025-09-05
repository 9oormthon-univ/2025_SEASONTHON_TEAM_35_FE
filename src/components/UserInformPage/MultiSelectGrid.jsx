const InstitutionButton = ({ option, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-[108px] h-[108px] rounded-[12px] border transition-all
            ${isSelected
            ? 'border-primary-2 border-[2px] bg-white shadow-[0_0_10px_#00D6B380]' 
            : 'border-background bg-background '
        }`}
    >
        <img
            src={option.logo}
            alt={option.label}
            className="w-[70px] h-[60px]"
        />
        <span className={`text-[12px] font-bold `}>
            {option.label}
        </span>
    </button>
);

export default function MultiSelectGrid({ options, value = [], onChange }) {

    const handleToggle = (selectedValue) => {
        const isCurrentlySelected = value.includes(selectedValue);
        const newSelection = isCurrentlySelected
            ? value.filter(item => item !== selectedValue)
            : [...value, selectedValue];
        onChange(newSelection);
    };

    return (
        <div className="space-y-6">
            {options.map((group) => (
                <div key={group.groupTitle}>
                    {/* 그룹 제목 */}
                    <h3 className="text-[18px] font-bold text-gray-90 mt-3 mb-3 text-left">
                        {group.groupTitle}
                    </h3>
                    {/* 금융사 그리드 */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                        {group.items.map(option => (
                            <InstitutionButton
                                key={option.value}
                                option={option}
                                isSelected={value.includes(option.value)}
                                onClick={() => handleToggle(option.value)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}