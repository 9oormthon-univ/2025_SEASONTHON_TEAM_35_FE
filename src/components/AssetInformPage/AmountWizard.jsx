import { AnimatePresence, motion } from "framer-motion";
import AmountStep from "./AmountStep";
import BackIcon from '../../assets/icons/back.svg?react';
import CloseIcon from '../../assets/icons/close.svg?react';
import { useAmountWizard } from "../../hooks/useAmountWizard";
import ProgressIndicator from "./ProgressIndicator.jsx";
const variants = {
    enter: (dir) => ({ x: dir > 0 ? 150 : -150, opacity: 0, position: "absolute" }),
    center: { x: 0, opacity: 1, position: "relative" },
    exit:  (dir) => ({ x: dir > 0 ? -150 : 150, opacity: 0, position: "absolute" }),
};

export default function AmountWizard() {
    // steps 데이터는
    const steps = [
        { key: "cash", title: "계좌 및 예금에 보유 중인\n현금을 입력해 주세요." },
        { key: "stock", title: "보유 중인 주식 투자\n금액을 입력해 주세요." },
        { key: "bitcoin", title: "보유 중인 비트코인 투자\n금액을 입력해 주세요." },
        { key: "bond", title: "보유 중인 채권 투자\n금액을 입력해 주세요." },
        { key: "extra", title: "보유 중인 ETF 투자\n금액을 입력해 주세요." },
        { key: "others", title: "그 외 자산에 해당하는 금액을\n입력해 주세요." },
    ];

    // useAmountWizard 훅에서 불러오기
    const {
        step,
        totalSteps,
        currentStepData,
        form,
        error,
        direction,
        next,
        prev,
        updateValue,
    } = useAmountWizard(steps);

    return (
        <div className="flex h-full flex-col">
            {/* 상단 헤더 */}
            <div className="px-5 pt-6 flex items-center justify-between text-xl">
                <button onClick={prev} disabled={step === 0} className="p-2 disabled:opacity-30">
                    <BackIcon/>
                </button>
                <button className="p-2">
                    <CloseIcon/>
                </button>
            </div>
            {/* 프로그레스 바 */}
            <div className="px-7 mt-24">
                <ProgressIndicator
                    totalSteps={totalSteps}
                    currentStep={step}
                    className="justify-start"
                />
            </div>

            <div className="flex-1 relative">
                <AnimatePresence custom={direction} initial={false} mode="popLayout">
                    <motion.div
                        key={currentStepData.key}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                        className="absolute w-full h-full"
                    >
                        <AmountStep
                            title={currentStepData.title}
                            value={form[currentStepData.key]}
                            onChange={updateValue}
                            error={error}
                            totalSteps={totalSteps}
                            currentStep={step}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div>
                <button
                    onClick={next}
                    className="w-full h-[90px] bg-primary-2 text-white font-bold text-[20px] rounded-t-[16px] pt-[1px] pb-[24px] px-[167px]">
                    {step < totalSteps - 1 ? "다음" : "완료"}
                </button>
            </div>
        </div>
    );
}