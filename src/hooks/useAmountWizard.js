import { useState } from "react";

export function useAmountWizard(steps) {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [form, setForm] = useState(
        // steps 배열을 기반으로 form의 초기 상태를 동적으로 생성
        steps.reduce((acc, current) => {
            acc[current.key] = "";
            return acc;
        }, {})
    );
    const [error, setError] = useState('');

    const currentStepData = steps[step];

    const updateValue = (val) => {
        setForm((prevForm) => ({ ...prevForm, [currentStepData.key]: val }));
        if (error) setError('');
    };

    //유효성 검증 3가지
    const next = () => {
        const currentValue = form[currentStepData.key];
        const numericValue = Number(currentValue.replace(/,/g, ''));

        if (currentValue.trim() === "" || numericValue < 0) {
            setError("0원 이상을 입력해 주세요.");
            return;
        }
        if (currentStepData.key === "cash" && numericValue === 0) {
            setError("0원은 입력할 수 없어요. 1원 이상을 입력해 주세요.");
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

    // 컴포넌트에서 필요한 모든 값과 함수 객체로 반환
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