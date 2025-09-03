import { useState } from "react";
import { useUserFormValidator } from './useUserFormValidator';

export function useWizard(steps, options = {}) {
    const { onComplete, initialFormValues = {}, payloadType = 'plan', memberId } = options;
    const { error, setError, validateField, validateAll } = useUserFormValidator();
    console.log("3. useWizard 훅이 받은 options:", initialFormValues);
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [form, setForm] = useState(initialFormValues || {});

    const updateValue = (key, val, shouldValidate = false) => {
        setForm((prevForm) => ({ ...prevForm, [key]: val }));

        if (shouldValidate) {
            validateField(key, val);
        } else if (error) {
            setError(null);
        }
    };

    const buildPayload = () => {
        if (payloadType === 'amount') {
            const parseAmount = (s) => Number((s || "").replace(/,/g, "")) || 0;
            const amounts = Object.fromEntries(
                Object.entries(form).map(([k, v]) => [k, parseAmount(v)])
            );
            return { memberId, amounts };
        } else { // 'plan' 타입 (사용자 정보, AI 설계 등)
            const processedForm = { ...form };
            if (processedForm.emergencyFund) {
                processedForm.emergencyFund = processedForm.emergencyFund === 'true';
            }
            return { memberId, ...processedForm };
        }
    };

    const next = () => {
        const isAllValid = validateAll(form, steps.slice(0, step + 1));
        if (!isAllValid) {
            return;
        }
        if (step < steps.length - 1) {
            setDirection(1);
            setStep((s) => s + 1);
        } else {
            const payload = buildPayload();
            onComplete(payload);
        }
    };

    const prev = () => {
        if (step > 0) {
            setDirection(-1);
            setStep((s) => s - 1);
        }
    };

    return {
        step,
        totalSteps: steps.length,
        currentStepData: steps[step],
        form,
        error,
        setError,
        direction,
        next,
        prev,
        updateValue,
    };
}