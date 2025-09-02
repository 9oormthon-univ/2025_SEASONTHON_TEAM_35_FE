import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseWizard from '../../components/common/wizard/BaseWizard.jsx';
import PlanQuestionStep from '../../components/AssetPlanInformPage/PlanQuestionStep.jsx';
import { PLAN_WIZARD_STEPS } from '../../constants/wizardSteps.js';

export default function AssetPlanInformPage() {
    const navigate = useNavigate();
    const handlePlanComplete = (payload) => { /* ... */ };

    return (
        <BaseWizard
            wizardSteps={PLAN_WIZARD_STEPS} // 7개 질문
            onComplete={handlePlanComplete}
            submitButtonText="결과 보기"
            showPrevButton={true} // 이전 버튼 항상 표시
            disableNextUntilSelected={true}
            renderStep={({ stepData, value, onChange, error }) => (
                <PlanQuestionStep
                    stepData={stepData}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            )}
        />
    );
}