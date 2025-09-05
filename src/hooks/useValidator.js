import { useState } from 'react';
import { validate } from '../validators'; // 통합된 validate 함수를 import

export function useValidator() {
    const [error, setError] = useState(null);

    const validateField = (key, value) => {
        const errorMessage = validate(key, value);
        setError(errorMessage ? { [key]: errorMessage } : null);
        return !errorMessage;
    };

    const validateAll = (form, steps) => {
        for (const step of steps) {
            const value = form[step.key];
            const errorMessage = validate(step.key, value);
            if (errorMessage) {
                setError({ [step.key]: errorMessage });
                return false;
            }
        }
        setError(null);
        return true;
    };

    return { error, setError, validateField, validateAll };
}