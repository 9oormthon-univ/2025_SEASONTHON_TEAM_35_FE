// src/hooks/useAmountWizard.js
import { useState } from "react";

// ✨ 1. options에 initialFormValues 추가
export function useAmountWizard(steps, options = {}) {
    const { onComplete = () => {}, memberId = null, initialFormValues = null } = options;

    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [form, setForm] = useState(
        // ✨ 2. initialFormValues가 있으면 그걸로, 없으면 기존 방식으로 초기화
        initialFormValues || steps.reduce((acc, cur) => ({ ...acc, [cur.key]: "" }), {})
    );
    const [error, setError] = useState("");

    const currentStepData = steps[step];

    // ... (updateValue, parseAmount, buildPayload 로직은 기존과 동일)
    const updateValue = (val) => {
        const key = currentStepData.key;
        setForm((prevForm) => ({ ...prevForm, [currentStepData.key]: val }));
        if (error) setError("");
    };

    const parseAmount = (s) => Number((s || "").replace(/,/g, "")) || 0;

    const buildPayload = () => {
        const amounts = Object.fromEntries(
            Object.entries(form).map(([k, v]) => [k, parseAmount(v)])
        );

        const total_amount = Object.values(amounts).reduce((sum, val) => sum + val, 0);
        const total_investment = (amounts.stock || 0) + (amounts.bitcoin || 0) + (amounts.bond || 0) + (amounts.etf || 0);

        const ratios = total_amount > 0 ? Object.fromEntries(
            Object.entries(amounts).map(([k, v]) => [k, (v / total_amount) * 100])
        ) : {};

        return { memberId, total_amount, total_investment, amounts, ratios };
    };


    const next = () => {
        const currentValue = form[currentStepData.key];
        const numericValue = parseAmount(currentValue);

        if ((currentValue || "").trim() === "") {
            setError("금액을 입력해 주세요.");
            return;
        }
        if (currentStepData.key === "cash" && numericValue === 0) {
            setError("0원은 입력할 수 없어요. 1원 이상을 입력해 주세요.");
            return;
        }
        if (numericValue < 0) {
            setError("0원 이상을 입력해 주세요.");
            return;
        }
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
            onComplete(payload); // ✨ onComplete 콜백 호출 (alert 제거)
        }
    };

    const prev = () => {
        if (step > 0) {
            setDirection(-1);
            setStep((s) => s - 1);
        }
    };

    return {
        step, totalSteps: steps.length, currentStepData, form, error, direction,
        next, prev, updateValue,
    };
}