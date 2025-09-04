import React from 'react';
import BaseWizard from '../common/wizard/BaseWizard';
import FormStep from './FormStep';
import { useWizard } from '@/hooks/useWizard.js';

export default function UserInformWizard(props) {
    const {
        wizardSteps,
        onComplete,
        initialFormValues,
        onClose,
        submitButtonText = '제출하기',  // 🔹 외부에서 오버라이드 가능
        payloadType = 'user',           // 🔹 기본은 user로 두는 걸 권장 (페이지 성격별 구분)
    } = props;


    const wizard = useWizard(wizardSteps, {
        onComplete,
        initialFormValues,
        payloadType: 'user'
    });

    const isLastStep = wizard.step === wizard.totalSteps - 1;
    const buttonText = isLastStep ? "제출하기" : "다음";

    return (
        <BaseWizard
            wizard={wizard}
            wizardSteps={wizardSteps}
            onClose={onClose}
            buttonText={buttonText}
            renderStep={({ stepData, value, onChange, error, setError }) => (
                <FormStep
                    stepData={stepData}
                    value={value}
                    onChange={onChange}
                    error={error}
                    setError={setError}
                />
            )}
        />
    );
}