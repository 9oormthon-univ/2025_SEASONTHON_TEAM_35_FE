import { useState } from 'react';

// 유효성 검증 규칙
const validate = (key, value) => {
    switch (key) {
        case 'name':
            // 이름은 수정 불가하므로 항상 유효하다고 처리
            return null
        case 'residentNumber':
            if (!value || String(value.part1 || '').length !== 6 || String(value.part2 || '').length !== 7) {
                return "유효하지 않은 주민번호입니다.";
            }
            return null;

        // 👇 휴대폰 번호 검증 규칙 추가
        case 'phoneNumber':
            if (!value || !value.carrier || !value.number) {
                return "통신사와 휴대폰 번호를 모두 입력해주세요.";
            }
            // 간단한 번호 길이 검증 (예시)
            if (value.number.length < 10) {
                return "유효하지 않은 휴대폰 번호입니다.";
            }
            return null;

        default:
            return null; // 검증 규칙이 없는 경우
    }
};

export function useUserFormValidator() {
    const [error, setError] = useState(null);

    const validateField = (key, value) => {
        const errorMessage = validate(key, value);
        setError(errorMessage ? { [key]: errorMessage } : null);
        return !errorMessage;
    };

    // 여러 필드를 한 번에 검증하는 함수 (다음 버튼 클릭 시 사용)
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