import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '../../context/AssetContext';
import { PLAN_WIZARD_STEPS } from '../../constants/wizardSteps';
import AIPlanWizard from '../../components/AssetPlanInformPage/AIPlanWizard'; // 👈 1. 새로 만든 래퍼 import

export default function AssetPlanInformPage() {
    const navigate = useNavigate();
    const { submitAssetPlan } = useAssets();

    const handlePlanComplete = async (payload) => {
        const success = await submitAssetPlan(payload);
        if (success) {
            navigate("/ai/plan/result");
        }
    };

    return (
        <div className="h-full bg-white">
            <AIPlanWizard
                wizardSteps={PLAN_WIZARD_STEPS}
                onComplete={handlePlanComplete}
                onClose={() => navigate('/asset/main')}
            />
        </div>
    );
}