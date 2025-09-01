import { useAmountWizard } from "../../hooks/useAmountWizard";
import WizardHeader from "./WizardHeader";
import WizardProgress from "./WizardProgress";
import WizardContent from "./WizardContent";
import WizardFooter from "./WizardFooter";

// submitButtonText prop 추가
export default function AmountWizard({ wizardSteps, initialData, onComplete, onClose, showPrevButton, submitButtonText }) {
    const {
        step, totalSteps, currentStepData, form, error, direction,
        next, prev, updateValue,
    } = useAmountWizard(wizardSteps, {
        onComplete: onComplete,
        initialFormValues: initialData,
        memberId: 123,
    });

    return (
        <div className="flex h-full flex-col">
            <WizardHeader
                onPrev={prev}
                isPrevDisabled={step === 0}
                onClose={onClose}
                showPrevButton={showPrevButton}
            />
            <WizardProgress totalSteps={totalSteps} currentStep={step} />
            <WizardContent
                direction={direction}
                stepData={currentStepData}
                formValue={form[currentStepData.key]}
                onValueChange={updateValue}
                error={error}
            />
            {/* WizardFooter에 submitButtonText 전달 */}
            <WizardFooter
                onNext={next}
                isLastStep={step === totalSteps - 1}
                submitButtonText={submitButtonText}
            />
        </div>
    );
}