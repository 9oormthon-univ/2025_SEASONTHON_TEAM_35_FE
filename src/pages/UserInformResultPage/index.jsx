import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 👇 재사용할 레이아웃 컴포넌트의 경로를 확인해주세요.
import AnalysisLayout from '../../components/common/AnalysisLayout.jsx';

// 아이콘 임시 정의 (기존과 동일)
const Spinner = () => <div className="w-16 h-16 border-4 border-primary-1 border-t-transparent rounded-full animate-spin" />;
const CheckIcon = () => <svg className="w-20 h-20 text-primary-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


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
                icon={<Spinner />}
                // 👇 텍스트를 "자산 연동"에 맞게 수정
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
                icon={<CheckIcon />}
                // 👇 텍스트를 "자산 연동"에 맞게 수정
                title="자산 연동이 완료되었습니다"
                subtitle={"지금 바로 연동된 자산을 바탕으로\nAI 자산 기능을 이용해보세요!"}
                buttonText="완료"
                onButtonClick={() => navigate('/asset/main')} // TODO: 이동할 최종 경로로 수정
            />
        );
    }

    return <div>오류가 발생했습니다.</div>;
}