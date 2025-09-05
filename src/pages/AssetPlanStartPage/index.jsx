import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlanStart from '../../components/AssetPlanInformPage/PlanStart.jsx';
import WizardHeader from '../../components/common/wizard/WizardHeader.jsx';

export default function AssetPlanStartPage() {
    const navigate = useNavigate();

    const pageData = {
        title: "AI 자산 설계를 통해\n자산을 관리해요",
        keyword: "AI 자산 설계",
        subtitle: "가장 알맞은 자산 비율을 찾아드려요.",
    };

    const handleStart = () => {
        navigate('/ai/plan/inform');
    };

    return (
        <div className="h-full">
            <WizardHeader showPrevButton={true} onClose={() => navigate('/asset/main')} />
            <PlanStart
                title={pageData.title}
                keyword={pageData.keyword}
                subtitle={pageData.subtitle}
                onStart={handleStart}
            />
        </div>
    );
}