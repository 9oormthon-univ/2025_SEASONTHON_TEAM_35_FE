import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PlanStart from '../../components/AssetPlanInformPage/PlanStart.jsx';
import WizardHeader from '../../components/common/wizard/WizardHeader.jsx';
import assetPlan from '../../assets/AssetPlanInform/assetplan.png'; // Make sure the path is correct

export default function AssetPlanStartPage() {
    const navigate = useNavigate();
    const routerLocation = useLocation();

    const pageData = {
        title: "AI 자산 설계를 통해\n자산을 관리해요",
        keyword: "AI 자산 설계",
        subtitle: "가장 알맞은 자산 비율을 찾아드려요.",
    };

    const queryParams = new URLSearchParams(routerLocation.search);
    const mode = (queryParams.get('mode') || '').trim().toLowerCase();

    const handleStart = () => {
        const nextMode = mode === 'update' ? 'update' : 'new';
        navigate(`/ai/plan/inform?mode=${nextMode}`);
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <WizardHeader showPrevButton={false} onClose={() => navigate('/home/AI-asset-plan')} />

            <PlanStart
                title={pageData.title}
                keyword={pageData.keyword}
                subtitle={pageData.subtitle}
                onStart={handleStart}
            />
        </div>
    );
}