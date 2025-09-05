import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnalysisLayout from '../../components/common/AnalysisLayout.jsx';
import StatusAnimation from '@/components/common/animations/StatusAnimation.jsx';

export default function UserInformResultPage() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');

    // 3초 후 완료 상태로 변경하는 시뮬레이션
    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('success');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (status === 'loading') {
        return (
            <AnalysisLayout
                icon={<StatusAnimation type="loading" size={120} className="flex justify-center mb-10"/>}
                title="자산 연동 중..."
                subtitle={"입력하신 개인정보를 바탕으로\n자산을 연동하고 있어요!"}
                buttonText="완료"
                isButtonDisabled={true}
            />
        );
    }

    if (status === 'success') {
        return (
            <AnalysisLayout
                icon={<StatusAnimation type="complete" size={120} className="flex justify-center mb-10" />}
                title="자산 연동이 완료되었습니다"
                subtitle={"지금 바로 연동된 자산을 바탕으로\nAI 자산 기능을 이용해보세요!"}
                buttonText="완료"
                onButtonClick={() => navigate('/asset/main')} // TODO: 이동할 최종 경로로 수정
            />
        );
    }

    return <div>오류가 발생했습니다.</div>;
}