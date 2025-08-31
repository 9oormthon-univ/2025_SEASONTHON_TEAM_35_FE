// submitButtonText prop 추가, 기본값은 "다음"
export default function WizardFooter({ onNext, isLastStep, submitButtonText = "다음" }) {
    // 마지막 스텝이면 prop으로 받은 텍스트 사용, 아니면 "다음"을 표시
    const buttonText = isLastStep ? submitButtonText : "다음";

    return (
        <div>
            <button
                onClick={onNext}
                className="w-full h-[90px] bg-primary-2 text-white font-bold text-[20px] rounded-t-[16px] pt-[1px] pb-[24px] px-[160px]"
            >
                {buttonText}
            </button>
        </div>
    );
}