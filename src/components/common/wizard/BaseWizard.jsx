import WizardHeader from "@/components/common/WizardHeader.jsx";
import WizardProgress from "@/components/common/WizardProgress.jsx";
import WizardContent from "@/components/common/wizard/WizardContent.jsx";
import WizardFooter from "@/components/common/WizardFooter.jsx";
import { useAmountWizard } from "@/hooks/useAmountWizard.js"; // 훅 이름은 추후 useWizard로 리네임 고려

export default function BaseWizard({
                                       wizardSteps,
                                       initialData,
                                       onComplete,
                                       onClose,
                                       showPrevButton,
                                       submitButtonText,
                                       renderStep,
                                   }) {
    // ✅ 초반 가드: 잘못된 props 방지
    if (!Array.isArray(wizardSteps) || wizardSteps.length === 0) {
        if (import.meta.env.DEV) {
            console.warn("[BaseWizard] wizardSteps가 비어있거나 배열이 아닙니다.", { wizardSteps });
        }
        return (
            <div className="p-6 text-red-600">
                마법사 단계(wizardSteps)가 설정되지 않았습니다.
            </div>
        );
    }

    const {
        step, totalSteps, currentStepData, form, error, direction,
        next, prev, updateValue,
    } = useAmountWizard(wizardSteps, {
        onComplete,
        initialFormValues: initialData ?? {}, // ✅ null 방지
        memberId: 123,
    });

    // ✅ 현재 스텝 방어
    if (!currentStepData) {
        if (import.meta.env.DEV) {
            console.warn("[BaseWizard] currentStepData가 없습니다.", { step, wizardSteps });
        }
        return null;
    }
    return (
        <div className="flex h-full flex-col">
            <WizardHeader
                onPrev={prev}
                isPrevDisabled={step === 0}
                onClose={onClose}
                showPrevButton={showPrevButton}
            />

            <WizardProgress totalSteps={totalSteps} currentStep={step} />

            <WizardContent direction={direction} stepKey={currentStepData.key}>
                {renderStep({
                    stepData: currentStepData,
                    value: form[currentStepData.key],
                    onChange: (key, v) => updateValue(key, v),
                    error,
                })}
            </WizardContent>

            <WizardFooter
                onNext={next}
                isLastStep={step === totalSteps - 1}
                submitButtonText={submitButtonText}
            />
        </div>
    );
}
