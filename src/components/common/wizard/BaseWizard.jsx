import React from 'react';
import WizardHeader from '../WizardHeader';
import WizardProgress from '../WizardProgress';
import WizardContent from './WizardContent';
import WizardFooter from '../WizardFooter';

export default function BaseWizard(props) {
    const {
        wizard,         // 부모로부터 wizard 훅의 모든 것을 통째로 전달
        renderStep,
        onClose,
        submitButtonText,
    } = props;

    // 방어 코드: wizard 객체가 없을 경우를 대비
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

    const titleParts = currentStepData.keyword
        ? currentStepData.title.split(currentStepData.keyword)
        : [currentStepData.title];

    // 👇 유실되었던 버튼 비활성화 로직을 추가합니다.
    const currentValue = form[currentStepData.key];
    const isNextDisabled =
        (currentValue == null || currentValue === '') || // 값이 없거나 비어있을 때
        (error && error[currentStepData.key]); // 유효성 에러가 있을 때


    return (
        <div className="flex h-full flex-col bg-white">
            <WizardHeader
                onPrev={prev}
                isPrevDisabled={step === 0}
                onClose={onClose}
                showPrevButton={step > 0} // 첫 스텝에서는 뒤로가기 버튼 숨김
            />

            <WizardProgress totalSteps={totalSteps} currentStep={step} />

            {/* 제목을 BaseWizard에서 직접 렌더링 (고정 영역) */}
            <div className="p-5 pb-0">
                <h2 className="mt-1 mb-8 whitespace-pre-wrap text-2xl font-bold leading-tight">
                    {currentStepData.keyword ? (
                        <>
                            {titleParts[0]}
                            <span className="text-primary-1">{currentStepData.keyword}</span>
                            {titleParts[1]}
                        </>
                    ) : (
                        currentStepData.title
                    )}
                </h2>
            </div>

            {/* 스크롤되는 컨텐츠 영역 */}
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
                isLastStep={step === totalSteps - 1}
                submitButtonText={submitButtonText}
                // 👇 계산된 비활성화 상태를 Footer로 전달합니다.
                isNextDisabled={isNextDisabled}
            />
        </div>
    );
}