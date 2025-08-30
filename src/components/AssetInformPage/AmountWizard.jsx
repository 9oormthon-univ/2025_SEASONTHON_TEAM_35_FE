import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AmountStep from "./AmountStep";
import BackIcon from "../../assets/icons/back.svg?react";
import ClosePng from "../../assets/icons/close.png";
import { useAmountWizard } from "../../hooks/useAmountWizard";
import ProgressIndicator from "./ProgressIndicator.jsx";

const variants = {
    enter: (dir) => ({ x: dir > 0 ? 150 : -150, opacity: 0, position: "absolute" }),
    center: { x: 0, opacity: 1, position: "relative" },
    exit:  (dir) => ({ x: dir > 0 ? -150 : 150, opacity: 0, position: "absolute" }),
};

export default function AmountWizard() {
    const navigate = useNavigate();

    // 데이터 key
    const steps = [
        { key: "cash",    title: "계좌 및 예금에 보유 중인\n현금을 입력해 주세요." },
        { key: "stock",   title: "보유 중인 주식 투자\n금액을 입력해 주세요." },
        { key: "bitcoin", title: "보유 중인 비트코인 투자\n금액을 입력해 주세요." },
        { key: "bond",    title: "보유 중인 채권 투자\n금액을 입력해 주세요." },
        { key: "etf",     title: "보유 중인 ETF 투자\n금액을 입력해 주세요." },
        { key: "etc",     title: "그 외 자산에 해당하는 금액을\n입력해 주세요." },
    ];

    const handleComplete = (payload) => {
        localStorage.setItem("assetPortfolioPayload", JSON.stringify(payload));
        navigate("/asset/summary", { state: payload });
    };

    // ✅ 한 번만 호출 (onComplete 옵션 포함)
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
    } = useAmountWizard(steps, {
        onComplete: handleComplete,
        memberId: 123, // 실제 로그인 사용자 id로 교체
    });

    return (
        <div className="flex h-full flex-col">
            {/* 상단 헤더 */}
            <div className="px-5 pt-6 flex items-center justify-between text-xl">
                <button onClick={prev} disabled={step === 0} className="p-2 disabled:opacity-30">
                    <BackIcon />
                </button>
                <button className="p-2">
                    <img src={ClosePng} alt="닫기" width={14} height={14} />
                </button>
            </div>

            {/* 프로그레스 바 (좌측 정렬, 제목과 간격 촘촘) */}
            <div className="px-7 mt-[100px] mb-1">
                <ProgressIndicator
                    totalSteps={totalSteps}
                    currentStep={step}
                    className="justify-start"  // ← ProgressIndicator가 className 지원해야 함
                />
            </div>

            {/* 본문: 제목/인풋만 전환 애니메이션 */}
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
                            // ⛔ totalSteps/currentStep 제거: AmountStep은 순수 본문만
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 하단 버튼 */}
            <div>
                <button
                    onClick={next}
                    className="w-full h-[90px] bg-primary-2 text-white font-bold text-[20px] rounded-t-[16px] pt-[1px] pb-[24px] px-[167px]"
                >
                    {step < totalSteps - 1 ? "다음" : "완료"}
                </button>
            </div>
        </div>
    );
}
