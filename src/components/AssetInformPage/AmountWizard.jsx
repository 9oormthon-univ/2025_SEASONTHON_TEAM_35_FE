import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AmountStep from "./AmountStep";

const variants = {
    enter: (dir) => ({
        x: dir > 0 ? 150 : -150,
        opacity: 0,
        position: "absolute"
    }),
    center: {
        x: 0,
        opacity: 1,
        position: "relative"
    },
    exit: (dir) => ({
        x: dir > 0 ? -150 : 150,
        opacity: 0,
        position: "absolute"
    }),
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

    const current = steps[step];
    const progressPercentage = ((step + 1) / steps.length) * 100;
    const updateValue = (val) => setForm((p) => ({ ...p, [current.key]: val }));
    // 유효성 검증부
    const next = () => {
        const currentValue = form[current.key];
        if (currentValue.trim() === "") {
            alert("금액을 입력해주세요.");
            return;
        }
        const numericValue = Number(currentValue.replace(/,/g, ''));
        if (numericValue >= 500000000) {
            alert("유효하지 않은 금액입니다! (5억 미만)");
            return;
        }
        if (step < steps.length - 1) {
            setDirection(1);
            setStep((s) => s + 1);
        } else {
            console.log("최종 제출 데이터:", form);
            alert("자산 입력이 완료되었습니다!");
        }
    };
    const prev = () => { if (step > 0) { setDirection(-1); setStep((s) => s - 1); } };

    return (
        <div className="flex h-full flex-col">
            <div className="mb-6 flex items-center justify-between text-xl p-2 pb-0">
                <button onClick={prev} disabled={step === 0} className="px-2 disabled:opacity-30">‹</button>
                <button className="px-2">✕</button>
            </div>
            {/* 프로그레스 바 */}
            <div className="w-full bg-gray-10 h-1">
                <div
                    className="bg-primary-2 h-1 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
            <div className="flex-1 px-5 py-6">
                <div className="relative">
                    <div className="relative flex min-h-[400px] items-center overflow-hidden p-1">
                        <AnimatePresence custom={direction} initial={false} mode="popLayout">
                            <motion.div
                                key={current.key}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                                className="w-full"
                            >
                                <AmountStep
                                    title={current.title}
                                    value={form[current.key]}
                                    onChange={updateValue}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* 하단 버튼 */}
            <div>
                <button
                    onClick={next}
                    // 피그마 값 그대로 가져옴
                    className="w-full h-[90px] bg-primary-2 text-white text-[20px] font-bold text-lg rounded-t-[16px] pb-[26px] px-[167px]"
                >
                    {step < steps.length - 1 ? "다음" : "완료"}
                </button>

            </div>
        </div>
    );
}