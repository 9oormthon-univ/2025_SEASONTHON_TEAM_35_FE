import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '../../context/AssetContext';
import { PLAN_WIZARD_STEPS } from '@/constants/wizardSteps.js';
import AIPlanWizard from '../../components/AssetPlanInformPage/AIPlanWizard'; // 👈 1. 새로 만든 래퍼 import

export default function AssetPlanInformPage() {
    const navigate = useNavigate();
    const { submitAssetPlan } = useAssets();

    const handlePlanComplete = async (payload) => {
        console.log("[PLAN][FINAL PAYLOAD]", payload);
              if (!payload || typeof payload !== 'object') {
                console.error("[PLAN] payload가 비어있거나 객체가 아닙니다.");
                alert("제출 데이터가 비어있어요. 다시 시도해주세요.");
                return;
              }
        const success = await submitAssetPlan(payload);

        if (success) {
            navigate("/ai/plan/inform/result");
        } else {
            alert("제출에 실패했습니다.");
        }
    };

    return (
        <div className="h-full bg-white">
            <AIPlanWizard
                wizardSteps={PLAN_WIZARD_STEPS}
                onComplete={handlePlanComplete}
                onClose={() => navigate('/home/AI-asset-plan')}
            />
        </div>
    );
}