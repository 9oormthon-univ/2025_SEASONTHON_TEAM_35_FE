// src/hooks/useWizard.js
import { useState } from "react";
import { useValidator } from './useValidator';

export function useWizard(steps, options = {}) {
    const { onComplete, initialFormValues = {}, payloadType = 'plan', memberId } = options;
    const { error, setError, validateAll } = useValidator();

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
        // ... (이 부분은 수정할 필요 없습니다)
        if (payloadType === 'amount') {
            // ... amount 로직 ...
        } else {
            // ... plan 로직 ...
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