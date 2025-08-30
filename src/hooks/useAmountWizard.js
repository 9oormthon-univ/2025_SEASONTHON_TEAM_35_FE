// src/hooks/useAmountWizard.js
import { useState } from "react";

export function useAmountWizard(steps, options = {}) {
    const { onComplete = () => {}, memberId = null } = options;

    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [form, setForm] = useState(
        steps.reduce((acc, cur) => ({ ...acc, [cur.key]: "" }), {})
    );
    const [error, setError] = useState("");

    const currentStepData = steps[step];

    const updateValue = (val) => {
        const key = currentStepData.key;
        console.log(`[updateValue] step=${key}, 입력값=`, val); // ✅ 입력값 로그
        setForm((prevForm) => ({ ...prevForm, [currentStepData.key]: val }));
        if (error) setError("");
    };

    const parseAmount = (s) => Number((s || "").replace(/,/g, "")) || 0;

    // ✅ ERD 규칙: total_amount = 전체 합, total_investment = stock+bitcoin+bond+etf (cash, etc 제외)
    const buildPayload = () => {
        const amounts = Object.fromEntries(
            Object.entries(form).map(([k, v]) => [k, parseAmount(v)])
        );

        const total_amount =
            (amounts.cash || 0) +
            (amounts.stock || 0) +
            (amounts.bitcoin || 0) +
            (amounts.bond || 0) +
            (amounts.etf || 0) +
            (amounts.etc || 0);

        const total_investment =
            (amounts.stock || 0) +
            (amounts.bitcoin || 0) +
            (amounts.bond || 0) +
            (amounts.etf || 0);

        const items = /** @type {const} */ ([
            "cash",
            "stock",
            "bitcoin",
            "bond",
            "etf",
            "etc",
        ]).map((k) => ({ asset_type: k, amount: amounts[k] || 0 }));

        const ratios = Object.fromEntries(
            Object.entries(amounts).map(([k, v]) => [
                k,
                total_amount ? Math.round((v / total_amount) * 1000) / 10 : 0,
            ])
        );

        return {
            member_id: memberId,
            total_amount,
            total_investment,
            items,
            // 프론트 편의
            amounts,
            ratios,
        };
    };

    const next = () => {
        const currentValue = form[currentStepData.key];
        const numericValue = parseAmount(currentValue);

        // 공백
        if ((currentValue || "").trim() === "") {
            setError("금액을 입력해 주세요.");
            return;
        }
        // 첫 질문(cash) 0 금지
        if (currentStepData.key === "cash" && numericValue === 0) {
            setError("0원은 입력할 수 없어요. 1원 이상을 입력해 주세요.");
            return;
        }
        // 음수 금지
        if (numericValue < 0) {
            setError("0원 이상을 입력해 주세요.");
            return;
        }
        // 상한
        if (numericValue > 500000000) {
            setError("입력 가능한 최대 금액은 5억원입니다.");
            return;
        }

        setError("");
        if (step < steps.length - 1) {
            setDirection(1);
            setStep((s) => s + 1);
        } else {
            const payload = buildPayload();
            console.log("[완료] 최종 payload =", payload); // ✅ 최종 제출 데이터 로그
            onComplete(payload);
            alert("제출 완료");
        }
    };

    const prev = () => {
        if (step > 0) {
            setError("");
            setDirection(-1);
            setStep((s) => s - 1);
        }
    };

    return {
        step,
        totalSteps: steps.length,
        currentStepData,
        form,
        error,
        direction,
        next,
        prev,
        updateValue,
    };
}
