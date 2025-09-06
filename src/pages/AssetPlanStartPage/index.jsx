import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PlanStart from '../../components/AssetPlanInformPage/PlanStart.jsx';
import WizardHeader from '../../components/common/wizard/WizardHeader.jsx';

export default function AssetPlanStartPage() {
    console.log('[START PAGE] mounted render, location.search =', location.search);
    const navigate = useNavigate();
    const routerLocation = useLocation(); // ✅ 현재 URL 정보 가져오기

    const pageData = {
        title: "AI 자산 설계를 통해\n자산을 관리해요",
        keyword: "AI 자산 설계",
        subtitle: "가장 알맞은 자산 비율을 찾아드려요.",
    };
// ✅ URL에서 mode 쿼리 파라미터 추출
    const queryParams = new URLSearchParams(routerLocation.search);
    const mode = (queryParams.get('mode') || '').trim().toLowerCase();

    const handleStart = () => {
        console.log('[ㅋㅋ] location.search =', routerLocation.search);
        console.log('[ㅋㅋ] parsed mode =', mode, typeof mode);
        const nextMode = mode === 'update' ? 'update' : 'new';
        console.log('[클릭!] nextMode =', nextMode);
        navigate(`/ai/plan/inform?mode=${nextMode}`);
    };


    return (
        <div className="h-full">
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