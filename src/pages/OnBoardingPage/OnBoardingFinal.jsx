import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import OnboardingDots from '../../components/OnBoardingPage/OnBoardingDots.jsx';
import React from "react";

const pageVariants = {
    initial: { x: '100vw' }, // 오른쪽에서 시작
    animate: { x: 0 },       // 중앙으로 이동
    exit: { x: '-100vw' }     // 왼쪽으로 사라짐
};
const pageTransition = {
    type: 'tween',
    duration: 0.5
};

export default function OnBoardingFinal() {
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
            <OnboardingDots total={3} current={3} />

            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">마지막 페이지</h1>
            </div>
            <div className="flex w-full gap-4 mb-10">
                <div className="flex w-full gap-4 mb-10">

                   <button onClick={() => navigate('/user/inform')}
                   >
                       시작하기
                   </button>
                </div>
            </div>
        </motion.div>
    );
}