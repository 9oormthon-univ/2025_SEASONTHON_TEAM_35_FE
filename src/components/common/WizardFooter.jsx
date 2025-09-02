// submitButtonText prop 추가, 기본값은 "다음"
export default function WizardFooter({ onNext, isLastStep, submitButtonText = "다음",isSubmitting = false }) {
    // 마지막 스텝이면 prop으로 받은 텍스트 사용, 아니면 "다음"을 표시
    const buttonText = isSubmitting ? "저장 중..." : (isLastStep ? submitButtonText : "다음");
    return (
        <div>
            <button
                onClick={onNext}
                disabled={isSubmitting}
                className="w-full h-[90px] bg-primary-2 text-white font-bold text-[20px] rounded-t-[16px] pt-[1px] pb-[24px] px-[167px]
                           disabled:bg-gray-30 disabled:cursor-not-allowed"
            >
                {buttonText}
            </button>
        </div>
    );
}