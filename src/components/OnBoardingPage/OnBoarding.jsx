import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const ONBORADING_STEPS = [
  {
    title: '한눈에 보는 나의 자산',
    desription: '',
  },
  {
    title: '나만의 성장 설계도',
    desription: '나의 자산과 목표, 투자 성향을 바탕으로 AI가 최적',
  },
  {
    title: '그로우플랜과 함께 \n자산관리를 시작해보세요!',
    desription: '',
  },
];

export default function OnBoarding() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < ONBORADING_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);
  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={step} // step이 바뀔 때마다 애니메이션 적용
          className="flex flex-col items-center gap-[18px] mb-[456px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <h1 className="text-gray-100 font-bold text-[24px] mt-[219px] whitespace-pre-line text-center">
            {ONBORADING_STEPS[step].title}
          </h1>
          {ONBORADING_STEPS[step].desription && (
            <p className="text-gray-50 font-medium tetxt-[18px]">
              {ONBORADING_STEPS[step].desription}
            </p>
          )}
        </motion.div>
        {step === 2 && (
          <Link
            to="/login"
            className="text-white bg-primary-2 w-[353px] h-[55px] rounded-[12px] flex justify-center items-center text-[20px] mb-[50px]"
          >
            시작하기
          </Link>
        )}
      </AnimatePresence>
    </div>
  );
}
