import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnalysisLayout from '../../components/AssetPlanInformPage/AnalysisLayout.jsx';
import StatusAnimation from '@/components/common/animations/StatusAnimation.jsx';

// 로딩 중에 보일 회색 박스 리스트
const loadingSteps = ["보유 자산 확인 중...", "목표 분석 중...", "맞춤형 자산 설계 중..."];

export default function AssetPlanResultPage() {
    const navigate = useNavigate();
    // API 통신 상태를 관리합니다: 'loading', 'success', 'error'
    const [status, setStatus] = useState('loading');

    // API 호출을 시뮬레이션합니다.
    useEffect(() => {
        // 3초 후에 'loading' 상태를 'success'로 변경합니다.
        const timer = setTimeout(() => {
            setStatus('success');
        }, 3000);

        // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
        return () => clearTimeout(timer);
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 합니다.


    if (status === 'loading') {
        return (
            <AnalysisLayout
                icon={<StatusAnimation type="loading" size={120} className="flex justify-center mb-10" />}
                title="자산 분석 중..."
                subtitle={"AI가 입력하신 정보를 토대로\n가장 알맞은 자산 비율을 찾고 있어요!"}
                buttonText="완료"
                isButtonDisabled={true}
            >
                {/* 로딩 중에만 보이는 회색 박스들 */}
                <div className="space-y-2 mt-20">
                    {loadingSteps.map((text, index) => (
                        <div
                            key={index}
                            className="w-full h-[50px] p-4 bg-[#F5F7FA] rounded-lg text-left text-gray-40"
                        > {text}
                        </div>
                    ))}
                </div>
            </AnalysisLayout>
        );
    }

    if (status === 'success') {
        return (
            <AnalysisLayout
                title="분석 완료"
                icon={<StatusAnimation type="complete" size={120} className="flex justify-center mb-10" />}
                subtitle={"입력하신 정보를 바탕으로\n맞춤형 자산 설계가 완료되었어요!"}
                buttonText="완료"
                onButtonClick={() => navigate('/asset/main')} // 완료 버튼 클릭 시 메인으로 이동
            />
        );
    }

    // TODO: 에러 상태일 때의 UI도 추가하면 좋습니다.
    return <div>오류가 발생했습니다.</div>;
}