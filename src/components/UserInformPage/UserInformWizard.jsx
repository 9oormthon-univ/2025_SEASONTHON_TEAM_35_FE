import React from 'react';
import BaseWizard from '../common/wizard/BaseWizard.jsx';
import FormStep from './FormStep.jsx';
import { useWizard } from '@/hooks/useWizard.js';

export default function UserInformWizard(props) {
    const { wizardSteps, onComplete, initialFormValues, onClose } = props;

    const wizard = useWizard(wizardSteps, {
        onComplete,
        initialFormValues,
        payloadType: 'user' // 페이로드 타입을 'user'로 지정
    });

    const isLastStep = wizard.step === wizard.totalSteps - 1;

    return (
        <BaseWizard
            wizard={wizard}
            wizardSteps={wizardSteps}
            onClose={onClose}
            submitButtonText={isLastStep ? "제출하기" : "다음"}
            renderStep={({ stepData, value, onChange, error, setError }) => (
                <FormStep
                    stepData={stepData}
                    value={value}
                    // onChange prop을 newValue만 받아서 처리하는 새로운 함수로 만들어 전달
                    onChange={(newValue) => onChange(stepData.key, newValue)}
                    error={error}
                    setError={setError}
                />
            )}
        />
    );
}