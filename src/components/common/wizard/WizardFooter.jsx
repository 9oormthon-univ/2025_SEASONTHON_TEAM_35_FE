export default function WizardFooter({ onNext, buttonText, isSubmitting = false, isNextDisabled = false }) {
    return (
        <div>
            <button
                onClick={onNext}
                disabled={isSubmitting || isNextDisabled}
                className="w-full h-[90px] bg-primary-2 text-white font-bold text-[20px] rounded-t-[16px] pt-[1px] pb-[24px] px-[150px]
                           disabled:bg-gray-10 disabled:cursor-not-allowed"
            >
                {buttonText}
            </button>
        </div>
    );
}