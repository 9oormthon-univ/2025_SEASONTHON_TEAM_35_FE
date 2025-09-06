import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAssets } from '../../context/AssetContext';
import { PLAN_WIZARD_STEPS } from '@/constants/wizardSteps.js';
import AIPlanWizard from '../../components/AssetPlanInformPage/AIPlanWizard';

export default function AssetPlanInformPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { submitAssetPlan } = useAssets();

    // URL의 쿼리 파라미터에서 mode 값 추출
    const queryParams = new URLSearchParams(location.search);
    const mode = (queryParams.get('mode') || '').trim().toLowerCase();

    const handlePlanComplete = async (payload) => {
        console.log("[PLAN][FINAL PAYLOAD]", payload);
        console.log("[PLAN][MODE]", mode); // ✅ mode 값 확인

        if (!payload || typeof payload !== 'object') {
            console.error("[PLAN] payload가 비어있거나 객체가 아닙니다.");
            alert("제출 데이터가 비어있어요. 다시 시도해주세요.");
            return;
        }

        // submitAssetPlan에 payload와 mode를 함께 전달
        const success = await submitAssetPlan(payload, mode);

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