import { useState } from "react";

// 숫자 콤마 제거 및 변환
const parseAmount = (s) => Number((s || "").replace(/,/g, "")) || 0;

// 유효성 검증 로직
export function useAssetValidator() {
    const [error, setError] = useState("");

    // 검증 수행
    const validate = (currentValue, currentStepData) => {
        const numericValue = parseAmount(currentValue);

        if ((currentValue || "").trim() === "") {
            setError("금액을 입력해 주세요.");
            return false;
        }
        if (currentStepData.key === "cash" && numericValue === 0) {
            setError("0원은 입력할 수 없어요. 1원 이상을 입력해 주세요.");
            return false;
        }
        if (numericValue < 0) {
            setError("0원 이상을 입력해 주세요.");
            return false;
        }
        if (numericValue > 500000000) {
            setError("입력 가능한 최대 금액은 5억원입니다.");
            return false;
        }

        setError(""); // 모든 검증 통과 시 에러 초기화
        return true; // 유효함
    };

    return { error, validate, setError };
}