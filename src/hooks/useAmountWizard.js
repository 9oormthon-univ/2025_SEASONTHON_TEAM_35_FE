import { useState } from "react";
import { useAssetValidator } from "./useAssetValidator.js"; // 👈 1. 유효성 검증 훅 import

export function useAmountWizard(steps, options = {}) {
    const { onComplete, initialFormValues = {}, memberId } = options;

    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [form, setForm] = useState(
        initialFormValues || steps.reduce((acc, cur) => ({ ...acc, [cur.key]: "" }), {})
    );

    const currentStepData = steps[step];
    const { error, validate, setError } = useAssetValidator();

    const updateValue = (key, val) => {
        setForm((prevForm) => ({ ...prevForm, [key]: val }));
        if (error) setError(""); // 값을 입력하면 에러를 지웁니다.
    };


    // 👇✅ 이 함수의 내용을 다시 채워 넣었습니다.
    const buildPayload = () => {
        const parseAmount = (s) => Number((s || "").replace(/,/g, "")) || 0;
        const amounts = Object.fromEntries(
            Object.entries(form).map(([k, v]) => [k, parseAmount(v)])
        );

        // 자산 등록/수정에 필요한 amounts 객체만 반환하도록 간소화
        return { amounts };
    };

    // next함수는 스텝만 넘기도록 간소화
    const next = () => {
        const currentValue = form[currentStepData.key];

        // 유효성 검증을 validator에게 위임
        const isValid = validate(currentValue, currentStepData);
        if (!isValid) return; // 유효하지 않으면 여기서 중단

        // 유효하다면, 다음 단계로 이동하거나 완료 처리
        if (step < steps.length - 1) {
            setDirection(1);
            setStep((s) => s + 1);
        } else {
            const payload = buildPayload();
            onComplete(payload);
        }
    };

    const prev = () => { /* ... (변경 없음) ... */ };

    return {
        step, totalSteps: steps.length, currentStepData, form, error, direction,
        next, prev, updateValue,
    };
}