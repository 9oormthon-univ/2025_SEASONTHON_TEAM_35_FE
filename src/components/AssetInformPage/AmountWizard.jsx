// src/components/AssetInformPage/AmountWizard.jsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AmountStep from "./AmountStep";

const variants = {
    enter: (dir) => ({ x: dir > 0 ? 150 : -150, opacity: 0, position: "absolute" }),
    center: { x: 0, opacity: 1, position: "relative" },
    exit:  (dir) => ({ x: dir > 0 ? -150 : 150, opacity: 0, position: "absolute" }),
};

export default function AmountWizard() {
    const steps = [
        { key: "cash", title: "계좌 및 예금에 보유 중인\n현금을 입력해 주세요." },
        { key: "stock", title: "보유 중인 주식 투자\n금액을 입력해 주세요." },
        { key: "bitcoin", title: "보유 중인 비트코인 투자\n금액을 입력해 주세요." },
        { key: "bond", title: "보유 중인 채권 투자\n금액을 입력해 주세요." },
        { key: "extra", title: "보유 중인 ETF 투자\n금액을 입력해 주세요." },
        { key: "others", title: "그 외 자산에 해당하는 금액을\n입력해 주세요." },
    ];

    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [form, setForm] = useState({ cash: "", stock: "", bitcoin: "", bond: "", others: "", extra: "" });
    const [error, setError] = useState('');

    const current = steps[step];

    const updateValue = (val) => {
        setForm((p) => ({ ...p, [current.key]: val }));
        if (error) setError('');
    };

    const next = () => {
        const currentValue = form[current.key];
        const numericValue = Number(currentValue.replace(/,/g, ''));
        if (currentValue.trim() === "" || numericValue < 0) {
            setError("0원 이상을 입력해 주세요.");
            return;
        }
        if (numericValue > 500000000) {
            setError("입력 가능한 최대 금액은 5억원입니다.");
            return;
        }
        setError('');
        if (step < steps.length - 1) {
            setDirection(1);
            setStep((s) => s + 1);
        } else {
            console.log("최종 제출 데이터:", form);
            alert("자산 입력이 완료되었습니다!");
        }
    };

    const prev = () => {
        if (step > 0) {
            setError('');
            setDirection(-1);
            setStep((s) => s - 1);
        }
    };

    return (
        <div className="flex h-full flex-col">
            {/* 상단 뒤로가기, 닫기 버튼 */}
            <div className="px-5 pt-6 flex items-center justify-between text-xl">
                <button onClick={prev} disabled={step === 0} className="px-2 disabled:opacity-30">‹</button>
                <button className="px-2">✕</button>
            </div>

            {/* 컨텐츠 영역: 이제 애니메이션만 담당합니다. */}
            <div className="flex-1 relative">
                <AnimatePresence custom={direction} initial={false} mode="popLayout">
                    <motion.div
                        key={current.key}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                        className="absolute w-full h-full"
                    >
                        {/* ✨ 필요한 모든 정보를 props로 전달 */}
                        <AmountStep
                            title={current.title}
                            value={form[current.key]}
                            onChange={updateValue}
                            error={error}
                            totalSteps={steps.length}
                            currentStep={step}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 하단 버튼 */}
            <div>
                <button
                    onClick={next}
                    className="w-full h-[90px] bg-primary-2 text-white font-bold text-[20px] rounded-t-[16px] pt-[1px] pb-[24px] px-[167px]">
                    {step < steps.length - 1 ? "다음" : "완료"}
                </button>
            </div>
        </div>
    );
}