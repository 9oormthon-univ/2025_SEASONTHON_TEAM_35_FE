import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/icons/back.svg?react";
import ClosePng from "@/assets/icons/close.png";

export default function WizardHeader({ onPrev, isPrevDisabled, showPrevButton = true, onClose }) {
    const navigate = useNavigate();
    const handleClose = () => (onClose ? onClose() : navigate("/asset/main"));

    return (
        <div className="h-[100px] flex items-end justify-between text-xl pb-1 px-4">
            {showPrevButton ? (
                <button onClick={onPrev} disabled={isPrevDisabled} className="p-2 disabled:opacity-30">
                    <BackIcon />
                </button>
            ) : (
                <div className="w-[32px] h-[32px] p-2" />
            )}
            <button onClick={handleClose} className="p-2">
                <img src={ClosePng} alt="닫기" width={14} height={14} />
            </button>
        </div>
    );
}
