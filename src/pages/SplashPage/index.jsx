import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../assets/icons/mainlogo.png';
import GrowPlanText from '../../assets/icons/sublogo.png'

export default function SplashPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000); // 3초 후에 로그인 페이지로 이동

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
            <motion.div
                key="splash-screen" // AnimatePresence를 위한 고유 key
                className="flex flex-col items-center justify-between min-h-screen w-full
                           bg-gradient-to-b from-[#00D6B3] to-[#59E4CD] py-10" // 그라데이션 배경
                initial={{ opacity: 0 }} // 처음에는 보이지 않다가
                animate={{ opacity: 1 }} // 서서히 나타나도록
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }} // 사라질 때 0.5초 동안 흐려짐 효과
            >
                {/* 상단 로고 컨테이너 */}
                <motion.div
                    className="flex-grow flex items-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 80, // 탄성 옵션 약하게 줄수록 부드러워짐!
                        damping: 30,    // 감쇠 효과
                        delay: 0.3
                    }}
                >
                    <motion.img
                        src={Logo}
                        alt="App Logo"
                        className="w-[81px]  object-contain"
                    />
                </motion.div>

                {/* 하단 GrowPlan 텍스트 로고 (Fade In 애니메이션) */}
                <motion.div
                    className="flex-shrink-0 mb-10"
                    initial={{ opacity: 0, y: 20 }} // 아래에서 올라오면서 나타남
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }} // 0.8초 딜레이 후 시작
                >
                    <img
                        src={GrowPlanText}
                        alt="GrowPlan Text"
                        className="w-[150px] object-contain pb-10"
                    />
                </motion.div>
            </motion.div>
    );
}