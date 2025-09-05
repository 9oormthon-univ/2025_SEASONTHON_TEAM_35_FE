export default function ToggleCard({ option, isSelected, onClick }) {
    const { label, description } = option;
    const containerClasses = `
        relative flex items-center w-[353px] h-[76px] p-4 rounded-xl border transition-all duration-300 overflow-hidden
        ${isSelected
        ? 'border-primary-2 border-[2px] shadow-[0_0_10px_#00D6B380]'
        : 'border-gray-5 border-[2px] bg-white'}
    }
    `;

    return (
        <button onClick={onClick} className={containerClasses} >
            <div className="flex-1 text-left">
                <p className="text-[16px] font-bold text-gray-90">{label}</p>
                <p className="text-[12px] font-medium text-gray-40">{description}</p>
            </div>
        </button>
    );
}