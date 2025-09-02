import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseWizard from '../../components/common/wizard/BaseWizard.jsx';
import PlanQuestionStep from '../../components/AssetPlanInformPage/PlanQuestionStep.jsx';
import { PLAN_WIZARD_STEPS } from '@/constants/wizardSteps.js';
import {useAssets} from "@/context/AssetContext.jsx";

export default function AssetPlanInformPage() {
    const navigate = useNavigate();
    const { submitAssetPlan, isSubmitting } = useAssets(); // 👈 2. Context에서 함수와 상태 가져오기

    const handlePlanComplete = async (payload) => {
        const success = await submitAssetPlan(payload); // 👈 3. Context 함수 호출
        console.log(" 최종 제출 데이터 (payload):", payload);
        if (success) {
            // 성공 시 결과 페이지로 이동
            navigate("/ai/plan/result");
        }
        // 실패 시에는 AssetContext의 error 상태가 업데이트되므로,
        // 필요하다면 에러 메시지를 보여주는 UI를 추가할 수 있습니다.
    };

    return (
        <BaseWizard
            wizardSteps={PLAN_WIZARD_STEPS} // 7개 질문
            onComplete={handlePlanComplete}
            submitButtonText="결과 보기"
            showPrevButton={true} // 이전 버튼 항상 표시
            disableNextUntilSelected={true}
            payloadType="plan"
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