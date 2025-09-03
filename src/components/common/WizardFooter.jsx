// submitButtonText prop 추가, 기본값은 "다음"
export default function WizardFooter({ onNext, isLastStep, submitButtonText = "다음",isSubmitting = false }) {
    // 👇 Footer가 직접 "지금이 마지막 단계인가?"를 판단하여 텍스트를 결정합니다.
    const buttonText = isLastStep ? submitButtonText : "다음";

    return (
        <div>
            <button
                onClick={onNext}
                disabled={isSubmitting}
                className="w-full h-[90px] bg-primary-2 text-white font-bold text-[20px] rounded-t-[16px] pt-[1px] pb-[24px] px-[150px]
                           disabled:bg-gray-30 disabled:cursor-not-allowed"
            >
                {buttonText}
            </button>
        </div>
    );
}