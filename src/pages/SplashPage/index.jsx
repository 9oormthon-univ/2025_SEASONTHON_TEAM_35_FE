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
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <motion.div
            className="flex flex-col items-center justify-between min-h-screen w-full
                       bg-gradient-to-b from-[#00D6B3] to-[#59E4CD] py-8"
        >
            {/* 상단 로고 컨테이너 */}
            <motion.div
                className="flex-grow flex items-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 30,
                    delay: 0.3
                }}
            >
                <motion.img
                    src={Logo}
                    alt="App Logo"
                    className="w-[90px] object-contain"
                />
            </motion.div>

            {/* 하단 GrowPlan 텍스트 로고 */}
            <motion.div
                className="flex-shrink-0 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                <img
                    src={GrowPlanText}
                    alt="GrowPlan Text"
                    className="w-[150px] object-contain pb-[48px]"
                />
            </motion.div>
        </motion.div>
    );
}