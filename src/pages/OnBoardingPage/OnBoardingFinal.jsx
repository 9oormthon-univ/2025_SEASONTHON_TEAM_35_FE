import {useEffect} from "react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import graph from '../../assets/OnBoarding/graphicon.png'
import {useAssets} from "@/context/AssetContext.jsx";

const fadeInVariants = {
    initial: { opacity: 0 }, // 처음에는 투명하게
    animate: { opacity: 1 }, // 나타날 때 서서히 보이게
    exit: { opacity: 0 }     // 사라질 때 서서히 사라지게
};

const pageTransition = {
    type: 'tween',
    duration: 1.0
};

export default function OnBoardingFinal() {
    const { userName, fetchUserName } = useAssets();
    console.log("3. OnboardingPage: Context로부터 받은 userName:", userName);
    //이름 받아오는 API
    useEffect(() => {
        fetchUserName();
    }, [fetchUserName]);

    return (
        <motion.div
            key="onboarding-final" // key를 "onboarding-final"로 변경하여 다른 페이지와 구분
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="flex flex-col items-center justify-center min-h-screen p-10 bg-white"
        >

            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="text-[24px] text-center font-bold">
                    <span className="text-primary-2">그로우플랜</span>과 함께 <br />
                    자산관리를 시작해보세요!
                </div>
            </div>
            <div className="w-[240px] h-[313px] mb-20">
                <img src={graph} alt="Onboarding" className="w-full h-full object-contain" />
            </div>
            <Link
                to="/user/inform"
                className="flex items-center justify-center w-[353px] h-[55px] bg-primary-2 text-white font-bold text-[20px] rounded-[12px] mb-20"
            >
                시작하기
            </Link>
        </motion.div>
    );
}