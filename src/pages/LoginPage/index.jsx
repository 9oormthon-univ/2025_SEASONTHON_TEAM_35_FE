import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';
import kakaoIcon from '../../assets/Login/kakaoIcon.png';
import MainLogo from '../../assets/icons/mainlogo2.png';
import SubLogo from '../../assets/icons/sublogo.png';
import React from "react";

export default function LoginPage() {
    return (
        <div className="h-full flex flex-col items-center gap-y-4 justify-center min-h-screen w-full
                        bg-gradient-to-b from-[#00D6B3] to-[#59E4CD]">

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-[18px] font-semibold text-white "
            >
                맞춤형 자산 설계 서비스
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col items-center"
            >
                <img src={SubLogo} alt="App Logo" className="w-[300px] object-contain mb-10"/>
                <img src={MainLogo} alt="App Logo" className="w-[100px] object-contain mb-20" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-20" // margin을 따로 줘서 Link 컴포넌트를 감싸기
            >
                <Link
                    to="/onboarding/1"
                    className="w-[350px] h-[56px] rounded-[12px] bg-[#FFEB3B] flex text-[16px] text-[#111111] font-bold justify-center items-center"
                >
                    <img src={kakaoIcon} alt="kakaoIcon" className="w-[32px] h-[27px] mr-[6px]"/>
                    카카오톡으로 시작하기
                </Link>
            </motion.div>
        </div>
    );
}