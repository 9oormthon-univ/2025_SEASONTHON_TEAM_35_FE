import React from 'react';
import WizardHeader from '../WizardHeader';
import WizardProgress from '../WizardProgress';
import WizardContent from './WizardContent';
import WizardFooter from '../WizardFooter';
// ❗ BaseWizard는 더 이상 useWizard 훅을 직접 호출하지 않습니다.

export default function BaseWizard(props) {
    const {
        wizard,         // 👈 1. 부모로부터 wizard 훅의 모든 것을 통째로 받습니다.
        renderStep,
        onClose,
        submitButtonText,
    } = props;

    // 방어 코드: wizard 객체가 없을 경우를 대비합니다.
    if (!wizard) {
        console.error("[BaseWizard] 'wizard' prop이 전달되지 않았습니다.");
        return <div>Wizard를 초기화할 수 없습니다.</div>;
    }

    const {
        step,
        totalSteps,
        currentStepData,
        form,
        error,
        setError,
        direction,
        next,
        prev,
        updateValue,
    } = wizard;

    return (
        <div className="flex h-full flex-col bg-white">
            <WizardHeader
                onPrev={prev}
                isPrevDisabled={step === 0}
                onClose={onClose}
                showPrevButton={step > 0} // 첫 스텝에서는 뒤로가기 버튼 숨김
            />

            {/* 👇 2. 원래 있던 프로그레스 바를 다시 추가합니다. */}
            <WizardProgress totalSteps={totalSteps} currentStep={step} />

            {/* 👇 3. 애니메이션을 위한 WizardContent를 다시 추가합니다. */}
            <WizardContent direction={direction} stepKey={currentStepData.key}>
                {renderStep({
                    stepData: currentStepData,
                    value: form[currentStepData.key],
                    onChange: updateValue, // updateValue는 (key, value)를 모두 받도록 설계됨
                    error,
                    setError,
                })}
            </WizardContent>

            <WizardFooter
                onNext={next}
                // 👇 Footer가 직접 판단할 수 있도록 두 정보를 모두 전달합니다.
                isLastStep={step === totalSteps - 1}
                submitButtonText={submitButtonText}
            />
        </div>
    );
}