import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/icons/back.svg?react";
import ClosePng from "../../assets/icons/close.png";

export default function WizardHeader({ onPrev, isPrevDisabled, showPrevButton = true, onClose }) {
    const navigate = useNavigate();

    // onClose prop이 없으면 기본 동작으로 메인 페이지로 이동
    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate("/asset/main");
        }
    };

    return (
        <div className="h-[100px] flex items-end justify-between text-xl pb-1 px-4">
            {/* showPrevButton이 true일 때만 '이전' 버튼을 보여줌 */}
            {showPrevButton ? (
                <button
                    onClick={onPrev}
                    disabled={isPrevDisabled}
                    className="p-2 disabled:opacity-30"
                >
                    <BackIcon />
                </button>
            ) : (
                // 버튼을 숨기더라도 레이아웃 유지를 위해 빈 공간을 차지하는 div 추가
                <div className="w-[32px] h-[32px] p-2"></div>
            )}

            <button onClick={handleClose} className="p-2">
                <img src={ClosePng} alt="닫기" width={14} height={14} />
            </button>
        </div>
    );
}