export default function WizardFooter({ onNext, isLastStep, submitButtonText = "다음",isSubmitting = false, stepData, isNextDisabled  }) {
    // 마지막 스텝이면 prop으로 받은 텍스트 사용, 아니면 "다음"을 표시
    const buttonText = isSubmitting
        ? "저장 중..."
        : isLastStep
            ? submitButtonText
            : stepData?.nextButtonText || "다음";
    return (
        <div >
            <button
                onClick={onNext}
                disabled={isSubmitting || isNextDisabled}
                className="w-full h-[90px] text-white font-bold text-[20px] rounded-t-[16px] pt-[1px] pb-[24px] px-[140px] transition-colors
                           disabled:bg-gray-10 disabled:cursor-not-allowed bg-primary-2"
            >
                {buttonText}
            </button>
        </div>
    );
}