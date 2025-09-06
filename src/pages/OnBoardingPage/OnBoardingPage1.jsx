import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import OnboardingDots from '../../components/OnBoardingPage/OnBoardingDots.jsx';
import OnBoardingButton from '../../components/OnBoardingPage/OnBoardingButton.jsx';
import React from "react"; // 컴포넌트 import

const pageVariants = {
    initial: { x: '100vw' }, // 오른쪽에서 시작
    animate: { x: 0 },       // 중앙으로 이동
    exit: { x: '-100vw' }     // 왼쪽으로 사라짐
};
const pageTransition = {
    type: 'tween', // 부드러운 이동 효과
    duration: 0.5
};

export default function OnBoardingPage1() {
    const navigate = useNavigate();

    return (
        <motion.div
            key="onboarding-1"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="flex flex-col items-center justify-center min-h-screen p-10 bg-white"
        >
            <OnboardingDots total={3} current={1} />

            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">첫 번째 페이지</h1>
                <p>환영합니다!</p>
            </div>
            <div className="flex w-full gap-4 mb-10">

                <div className="flex w-full gap-4 mb-10">
                    <OnBoardingButton
                        onClick={() => navigate('/onboarding/1')}
                        text="이전"
                        isPrimary={false}
                        invisible={true}
                    />
                    <OnBoardingButton
                        onClick={() => navigate('/onboarding/2')}
                        text="다음"
                    />
                </div>
            </div>
        </motion.div>
    );
}