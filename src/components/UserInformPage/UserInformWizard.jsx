import React from 'react';
import BaseWizard from '../common/wizard/BaseWizard.jsx';
import FormStep from './FormStep.jsx';
import { useWizard } from '@/hooks/useWizard.js';

export default function UserInformWizard(props) {
    const { wizardSteps, onComplete, initialFormValues, onClose } = props;

    const wizard = useWizard(wizardSteps, {
        onComplete,
        initialFormValues,
        payloadType: 'user'
    });

    const isLastStep = wizard.step === wizard.totalSteps - 1;
    // 👇 UserInformWizard가 직접 버튼 텍스트를 최종 결정합니다.
    const buttonText = isLastStep ? "제출하기" : "다음";

    return (
        <BaseWizard
            wizard={wizard}
            wizardSteps={wizardSteps}
            onClose={onClose}
            // 👇 결정된 최종 텍스트를 buttonText prop으로 전달합니다.
            buttonText={buttonText}
            renderStep={({ stepData, value, onChange, error, setError }) => (
                <FormStep
                    stepData={stepData}
                    value={value}
                    onChange={(newValue) => onChange(stepData.key, newValue)}
                    error={error}
                    setError={setError}
                />
            )}
        />
    );
}