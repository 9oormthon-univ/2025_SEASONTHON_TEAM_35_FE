import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // 👈 1. framer-motion을 import 합니다.
import AnalysisLayout from '../../components/AssetPlanInformPage/AnalysisLayout.jsx';
import StatusAnimation from '@/components/common/animations/StatusAnimation.jsx';

const loadingSteps = ["보유 자산 확인 중...", "목표 분석 중...", "맞춤형 자산 설계 중..."];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 1.2, // 시간 간격 두고 순차적으로 애니메이션 실행
            staggerDirection: -1, // 맨 아래 박스부터 올라오도록
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // 처음에 살짝 흐렸다가
    visible: {
        y: 0,
        opacity: 1, // 제자리로 올라오면서 선명해짐
        transition: {
            type: 'spring', // 통통 튀는 느낌으로
            stiffness: 100,
        },
    },
};

export default function AssetPlanResultPage() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('success');
        }, 4000);

        return () => clearTimeout(timer);
    }, []);


    if (status === 'loading') {
        return (
            <AnalysisLayout
                icon={<StatusAnimation type="loading" size={120} className="flex justify-center mb-10" />}
                title="자산 분석 중..."
                subtitle={"AI가 입력하신 정보를 토대로\n가장 알맞은 자산 비율을 찾고 있어요!"}
                buttonText="완료"
                isButtonDisabled={true}
            >
                <motion.div
                    className="space-y-2 mt-20"
                    variants={containerVariants}
                    initial="hidden" // 처음엔 hidden 상태
                    animate="visible" // 그 다음 visible 상태로 애니메이션
                >
                    {loadingSteps.map((text, index) => (
                        <motion.div
                            key={index}
                            className="w-full h-[50px] p-4 bg-[#F5F7FA] rounded-lg text-left text-gray-40"
                            variants={itemVariants} // 각 아이템에도 variants 적용
                        >
                            {text}
                        </motion.div>
                    ))}
                </motion.div>
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
                onButtonClick={() => navigate('/home/AI-asset-plan')}
            />
        );
    }

    return <div>오류가 발생했습니다.</div>;
}