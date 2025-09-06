import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GrowPlanText from '../../assets/icons/sublogo.png'
import SplashLogo from "@/components/common/animations/SplashLogo.jsx";

export default function SplashPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 3200);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen w-full
                       bg-gradient-to-b from-[#00D6B3] to-[#59E4CD] gap-y-[300px] "
        >
            <SplashLogo />

            <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                <img
                    src={GrowPlanText}
                    alt="GrowPlan Text"
                    className="w-[150px] object-contain "
                />
            </motion.div>
        </motion.div>
    );
}