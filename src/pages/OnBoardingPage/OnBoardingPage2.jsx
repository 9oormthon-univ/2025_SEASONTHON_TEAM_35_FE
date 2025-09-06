import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import OnboardingDots from '../../components/OnBoardingPage/OnBoardingDots.jsx';
import OnBoardingButton from '../../components/OnBoardingPage/OnBoardingButton.jsx';

const pageVariants = {
    initial: { x: '100vw' }, // 오른쪽에서 시작
    animate: { x: 0 },       // 중앙으로 이동
    exit: { x: '-100vw' }     // 왼쪽으로 사라짐
};
const pageTransition = {
    type: 'tween',
    duration: 0.5
};

export default function OnBoardingPage2() {
    const navigate = useNavigate();

    return (
        <motion.div
            key="onboarding-2"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="flex flex-col items-center justify-between min-h-screen p-3 bg-white"
        >
            {/* 1. 페이지 진행률 */}
            <OnboardingDots total={3} current={2} />

            {/* 2. 페이지 컨텐츠 */}
            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">두 번째 페이지</h1>
                <p>환영합니다!</p>
            </div>

            {/* 3. 버튼: OnBoardingButton 컴포넌트 사용 */}
            <div className="flex w-full mb-10">
                    <OnBoardingButton
                        onClick={() => navigate('/onboarding/3')}
                        text="다음"/>
            </div>
        </motion.div>
    );
}