import BackIcon from "../../assets/icons/back.svg?react";
import ClosePng from "../../assets/icons/close.png";

export default function WizardHeader({ onPrev, isPrevDisabled }) {
    return (
        //이쪽에서 이전버튼, 종료버튼 padding 조절
        <div className="h-[100px] flex items-end justify-between text-xl pb-1 px-4">
            <button
                onClick={onPrev}
                disabled={isPrevDisabled}
                className="p-2 disabled:opacity-30"
            >
                <BackIcon />
            </button>

            <button className="p-2">
                <img src={ClosePng} alt="닫기" width={14} height={14} />
            </button>
        </div>
    );
}
