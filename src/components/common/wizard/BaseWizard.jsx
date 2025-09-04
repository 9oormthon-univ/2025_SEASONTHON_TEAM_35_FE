import React from 'react';
import WizardHeader from './WizardHeader';
import WizardProgress from './WizardProgress';
import WizardContent from './WizardContent';
import WizardFooter from './WizardFooter';

export default function BaseWizard(props) {
    const { wizard, renderStep, onClose, buttonText } = props;

    if (!wizard) {
        console.error("[BaseWizard] 'wizard' prop이 전달되지 않았습니다.");
        return <div>Wizard를 초기화할 수 없습니다.</div>;
    }

    const { form, error, currentStepData, step, totalSteps, next, prev, direction, updateValue, setError } = wizard;

    // 👇 유연한 버튼 비활성화 로직
    const shouldDisableOnEmpty = currentStepData.disableNextOnEmpty ?? false; // 규칙이 없으면 기본값은 false
    const isValueEmpty = (form[currentStepData.key] == null || form[currentStepData.key] === '');
    const isNextDisabled =
        (shouldDisableOnEmpty && isValueEmpty) || // 1. 비활성화 규칙이 true이고 값이 비었을 때
        (error && error[currentStepData.key]);     // 2. 유효성 검사 에러가 있을 때

    const titleParts = currentStepData.keyword
        ? currentStepData.title.split(currentStepData.keyword)
        : [currentStepData.title];

    return (
        <div className="flex h-full flex-col bg-white">
            <WizardHeader onPrev={prev} isPrevDisabled={step === 0} onClose={onClose} showPrevButton={step > 0} />
            <WizardProgress totalSteps={totalSteps} currentStep={step} />

            <div className="p-5 pb-0">
                <h2 className="mt-1 mb-8 whitespace-pre-wrap text-2xl font-bold leading-tight">
                    {currentStepData.keyword ? (
                        <>
                            {titleParts[0]}<span className="text-primary-1">{currentStepData.keyword}</span>{titleParts[1]}
                        </>
                    ) : (
                        currentStepData.title
                    )}
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pt-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <WizardContent direction={direction} stepKey={currentStepData.key}>
                    {renderStep({
                        stepData: currentStepData,
                        value: form[currentStepData.key],
                        onChange: updateValue,
                        error,
                        setError,
                    })}
                </WizardContent>
            </div>

            <WizardFooter
                onNext={next}
                buttonText={buttonText}
                isNextDisabled={isNextDisabled}
            />
        </div>
    );
}