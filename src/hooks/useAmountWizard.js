import { useState } from "react";
import { useAssetValidator } from "./useAssetValidator.js"; // 👈 1. 유효성 검증 훅 import

export function useAmountWizard(steps, options = {}) {
    const { onComplete, initialFormValues = {}, memberId, disableNextUntilSelected = false, payloadType = 'plan' } = options;

    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [form, setForm] = useState(
        initialFormValues || steps.reduce((acc, cur) => ({ ...acc, [cur.key]: "" }), {})
    );

    const currentStepData = steps[step];
    const { error, validate, setError } = useAssetValidator();
    // disableNextUntilSelected가 true일 때만 비활성화
    const isNextDisabled = disableNextUntilSelected ? !form[currentStepData.key] : false;

    const updateValue = (key, val) => {
        setForm((prevForm) => ({ ...prevForm, [key]: val }));
        if (error) setError(""); // 값을 입력하면 에러를 지웁니다.
    };

    const buildPayload = () => {
        if (payloadType === 'amount') {
            // "자산 입력" Wizard를 위한 로직
            const parseAmount = (s) => Number((s || "").replace(/,/g, "")) || 0;
            const amounts = Object.fromEntries(
                Object.entries(form).map(([k, v]) => [k, parseAmount(v)])
            );
            return { amounts }; // amounts 객체를 반환
        } else { // payloadType이 'plan'일 경우
            // "AI 자산 설계" Wizard를 위한 로직
            const processedForm = { ...form };
            if (processedForm.emergencyFund) {
                processedForm.emergencyFund = processedForm.emergencyFund === 'true';
            }
            return processedForm; // form 객체 전체를 반환
        }
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

    const prev = () => {
        setStep((currentStep) => {
            // 현재 스텝이 0보다 클 때만 1을 뺀다
            if (currentStep > 0) {
                setDirection(-1); // 애니메이션 방향 설정
                return currentStep - 1;
            }
            // 0일 경우에는 더 이상 뒤로 가지 않도록
            return currentStep;
        });
    };

    return {
        step, totalSteps: steps.length, currentStepData, form, error, direction,
        next, prev, updateValue,isNextDisabled,
    };
}