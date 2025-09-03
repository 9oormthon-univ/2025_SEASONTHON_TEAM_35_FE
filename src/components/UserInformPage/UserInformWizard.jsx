import React from 'react';
import BaseWizard from '../common/wizard/BaseWizard';
import FormStep from './FormStep';
import { useWizard } from '../../hooks/useWizard';

export default function UserInformWizard(props) {
    const { wizardSteps, onComplete, initialFormValues } = props;

    // Wizard의 핵심 로직을 담고 있는 훅을 직접 호출
    const wizard = useWizard(wizardSteps, {
        onComplete,
        initialFormValues,
        payloadType: 'plan'
    });

    // 현재 스텝이 마지막 스텝인지 확인
    const isLastStep = wizard.step === wizard.totalSteps - 1;

    return (
        <BaseWizard
            {...props}
            submitButtonText={isLastStep ? "제출하기" : "다음"}
            wizard={wizard}

            // 👇 이 부분이 빠져있었습니다! 각 스텝을 어떻게 그릴지 알려줍니다.
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