import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '../../context/AssetContext';
import { PLAN_WIZARD_STEPS } from '@/constants/wizardSteps.js';
import AIPlanWizard from '../../components/AssetPlanInformPage/AIPlanWizard'; // 👈 1. 새로 만든 래퍼 import

export default function AssetPlanInformPage() {
    const navigate = useNavigate();
    const { submitAssetPlan } = useAssets();


    // Wizard가 완료되었을 때 호출될 함수
    const handlePlanComplete = async (payload) => {
        console.log("최종 제출 데이터:", payload);
        const success = await submitAssetPlan(payload); // (API 호출은 비활성화 상태)

        if (success) {
            // 👇 3. 성공 시, 결과 페이지로 이동시킵니다.
            navigate("/ai/plan/result");
        } else {
            // (선택) 실패 시 에러 처리
            alert("제출에 실패했습니다.");
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