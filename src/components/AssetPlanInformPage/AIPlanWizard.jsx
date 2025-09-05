import React from 'react';
import BaseWizard from '../common/wizard/BaseWizard.jsx';
import PlanQuestionStep from './PlanQuestionStep.jsx';
import { useWizard } from '@/hooks/useWizard.js';

export default function AIPlanWizard(props) {
    const { wizardSteps, onComplete, initialFormValues, onClose } = props;

    const wizard = useWizard(wizardSteps, {
        onComplete,
        initialFormValues,
        payloadType: 'plan',
    });

    const isLastStep = wizard.step === wizard.totalSteps - 1;
    const buttonText = isLastStep ? '결과보기' : '다음';

    return (
        <BaseWizard
            wizard={wizard}
            wizardSteps={wizardSteps}
            onClose={onClose}
            buttonText={buttonText}
            renderStep={({ stepData, value, onChange, error, setError }) => (
                <PlanQuestionStep
                    stepData={stepData}
                    value={value}
                    onChange={(newValue) => {
                        // 1) 변경 로그
                        console.log('[DEBUG] Step Changed:', stepData.key, '=>', newValue);

                        // 2) 실제 상태 반영
                        onChange(stepData.key, newValue);

                        // 3) 반영 직후 페이로드 스냅샷(예상값)
                        const nextPayload = { ...wizard.formValues, [stepData.key]: newValue };
                        console.log('[DEBUG] Payload snapshot:', nextPayload);
                    }}
                    error={error}
                    setError={setError}
                />
            )}
        />
    );
}
