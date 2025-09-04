import React from 'react';
import BaseWizard from '../common/wizard/BaseWizard.jsx';
import PlanQuestionStep from './PlanQuestionStep.jsx'; // AI 설계용 질문 UI
import { useWizard } from '@/hooks/useWizard.js';

export default function AIPlanWizard(props) {
    const { wizardSteps, onComplete, initialFormValues, onClose } = props;

    const wizard = useWizard(wizardSteps, {
        onComplete,
        initialFormValues,
        payloadType: 'plan' // 사용자 정보와 동일한 플랫 객체 페이로드 사용
    });

    const isLastStep = wizard.step === wizard.totalSteps - 1;
    const buttonText = isLastStep ? "결과보기" : "다음";

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
                    onChange={(newValue) => onChange(stepData.key, newValue)}
                    error={error}
                    setError={setError}
                />
            )}
        />
    );
}