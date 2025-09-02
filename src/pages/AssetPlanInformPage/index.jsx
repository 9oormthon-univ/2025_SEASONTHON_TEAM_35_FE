import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseWizard from '../../components/common/wizard/BaseWizard.jsx';
import PlanQuestionStep from '../../components/AssetPlanInformPage/PlanQuestionStep.jsx';

// 👇 7개의 질문만 남깁니다.
const PLAN_WIZARD_STEPS = [
    { key: "age", title: "만 나이가 어떻게 되시나요?", type: 'number' },
    { key: "goal", title: "자산 설계의 목표는 무엇인가요?", type: 'select', options: ['은퇴 준비', '주택 마련', '자녀 교육'] },
    { key: "risk", title: "선호하는 투자 위험도는 어느 정도인가요?", type: 'radio', options: ['안정형', '중립형', '공격형'] },
    // ... 나머지 4개 질문
];

export default function AssetPlanInformPage() {
    const navigate = useNavigate();

    const handlePlanComplete = (payload) => { /* ... */ };

    return (
        <BaseWizard
            wizardSteps={PLAN_WIZARD_STEPS} // 7개 질문
            onComplete={handlePlanComplete}
            submitButtonText="결과 보기"
            showPrevButton={true} // 이전 버튼 항상 표시
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