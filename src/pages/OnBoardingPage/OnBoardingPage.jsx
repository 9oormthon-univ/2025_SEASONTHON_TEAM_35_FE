import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import OnBoardingDots from '../../components/OnBoardingPage/OnBoardingDots.jsx';
import OnBoardingButton from '../../components/OnBoardingPage/OnBoardingButton.jsx';
import OnBoardingContent1 from '../../components/OnBoardingPage/OnBoardingContent1.jsx';
import OnBoardingContent2 from '../../components/OnBoardingPage/OnBoardingContent2.jsx';
import OnBoardingContent3 from '../../components/OnBoardingPage/OnBoardingContent3.jsx';

// 페이지 컨텐츠 매핑
const onboardingContent = [
    null,
    OnBoardingContent1,
    OnBoardingContent2,
    OnBoardingContent3
];

export default function OnBoardingPage() {
    const [page, setPage] = useState(1);
    const [direction, setDirection] = useState(0); // 1: 다음, -1: 이전
    const navigate = useNavigate();

    const handleNext = () => {
        if (page < onboardingContent.length - 1) {
            setDirection(1);
            setPage(page + 1);
        } else {
            navigate('/onboarding/final'); // 마지막 페이지로 이동
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setDirection(-1);
            setPage(page - 1);
        }
    };

    // 컨텐츠 애니메이션 variants
    const contentVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '80%' : '-100%',
            opacity: 0.4,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0.6,
        }),
    };

    const CurrentContentComponent = onboardingContent[page];

    return (
        <div className="flex flex-col h-full items-center bg-white p-6">
            <div className="w-full pt-16">
                <OnBoardingDots total={onboardingContent.length - 1} current={page} />
            </div>

            <div className="relative w-full flex-grow overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'tween', duration: 0.4 }}
                        className="absolute inset-0 flex flex-col items-center justify-center w-full h-full"
                    >
                        <CurrentContentComponent />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center gap-28 mb-5">
                <OnBoardingButton onClick={handlePrev} text="이전" isPrimary={false} invisible={page === 1} />
                <OnBoardingButton
                    onClick={handleNext}
                    text={"다음"}
                />
            </div>
        </div>
    );
}