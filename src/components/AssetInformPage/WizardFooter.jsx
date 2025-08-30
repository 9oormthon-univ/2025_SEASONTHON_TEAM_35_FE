export default function WizardFooter({ onNext, isLastStep }) {
    return (
        <div>
            <button
                onClick={onNext}
                className="w-full h-[90px] bg-primary-2 text-white font-bold text-[20px] rounded-t-[16px] pt-[1px] pb-[24px] px-[167px]"
            >
                {isLastStep ? "완료" : "다음"}
            </button>
        </div>
    );
}