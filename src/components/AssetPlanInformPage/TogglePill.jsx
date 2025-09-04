import saveIcon from '../../assets/AssetPlanInform/저축.png'
import houseIcon from '../../assets/AssetPlanInform/집.png'
import carIcon from '../../assets/AssetPlanInform/차.png'
import travelIcon from '../../assets/AssetPlanInform/여행.png'
import marryIcon from '../../assets/AssetPlanInform/결혼.png'
import growIcon from '../../assets/AssetPlanInform/자기계발.png'

const ICONS={
    save: saveIcon,
    house: houseIcon,
    car: carIcon,
    travel: travelIcon,
    marry: marryIcon,
    grow: growIcon,
}
export default function TogglePill({ option, isSelected, onClick, disabled = false }) {
    const iconSrc = ICONS[option.icon];

    return (
        <button
            type="button"
            onClick={() => !disabled && onClick(option.value)}
            disabled={disabled}
            className={[
                "inline-flex items-center justify-start px-4 py-2 rounded-full border text-[16px] transition-colors",
                isSelected
                    ? "bg-primary-2 text-white border-primary-2 font-bold"
                    : "bg-background text-gray-100 border-background ",
                disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
            aria-pressed={isSelected}
        >
            {iconSrc && (
                <img
                    src={iconSrc}
                    alt={option.label}
                    className="w-4 h-4 object-contain"
                />
            )}

            <span className="ml-2">{option.label}</span>
        </button>
    );
}
