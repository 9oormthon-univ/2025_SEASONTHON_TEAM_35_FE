import React from 'react';
import BaseWizard from '../common/wizard/BaseWizard';
import FormStep from './FormStep';
import { useWizard } from '@/hooks/useWizard.js';

export default function UserInformWizard(props) {
    const { wizardSteps, onComplete, initialFormValues, onClose } = props;

    const wizard = useWizard(wizardSteps, {
        onComplete,
        initialFormValues,
        payloadType: 'plan'
    });

    return (
        <BaseWizard
            wizard={wizard}
            wizardSteps={wizardSteps}
            onClose={onClose}
            // 👇 "제출하기" 라는 텍스트 재료만 전달합니다.
            submitButtonText="제출하기"
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