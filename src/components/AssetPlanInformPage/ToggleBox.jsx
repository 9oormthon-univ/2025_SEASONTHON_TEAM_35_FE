import piggyBankIcon from '../../assets/AssetPlanInform/돼지저금통.png';
import safeIcon from '../../assets/AssetPlanInform/금고.png';

const ICONS = {
    piggyBank: piggyBankIcon,
    safe: safeIcon,
};
export default function ToggleBox({ option, isSelected, onClick }) {
    const { label, description, icon } = option;

    const containerClasses = `
        w-[170px] h-[174px] rounded-lg border p-4
        transition-all duration-200
        ${isSelected
        ? 'border-primary-2 border-[2px] shadow-[0_0_10px_#00D6B380]'
        : 'border-gray-5 border-[2px] bg-white'}
    `;

    const titleFontClasses = isSelected ? 'font-semibold' : 'font-medium';

    return (
        <button onClick={onClick} className={containerClasses}>
            <div className="flex flex-col items-start justify-start w-full h-full text-left">
                {ICONS[icon] && (
                    <img
                        src={ICONS[icon]}
                        alt={label}
                        className="w-12 h-12 mt-3 object-contain"
                    />
                )}

                <p className={`text-[16px] text-gray-100 font-bold mt-3 `}>
                    {option.label}
                </p>

                <p className={`mt-1 text-xs text-gray-60 font-medium whitespace-pre-wrap ${titleFontClasses}`}>
                    {option.description}
                </p>
            </div>
        </button>
    );
}