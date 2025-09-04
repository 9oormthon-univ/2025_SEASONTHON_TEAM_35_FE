// src/validators/userFormRules.js

export const userFormRules = {
    name: (value) => {
        // 이름은 수정 불가하므로 항상 유효
        return null;
    },
    residentNumber: (value) => {
        if (!value || String(value.part1 || '').length !== 6 || String(value.part2 || '').length !== 7) {
            return "유효하지 않은 주민번호입니다.";
        }
        return null;
    },
    phoneNumber: (value) => {
        if (!value || !value.carrier || !value.number) {
            return "통신사와 휴대폰 번호를 모두 입력해주세요.";
        }
        if (value.number.length < 10) {
            return "유효하지 않은 휴대폰 번호입니다.";
        }
        return null;
    },
    financialInstitutions: (value) => {
        if (!value || value.length === 0) {
            return "금융사를 하나 이상 선택해주세요.";
        }
        return null;
    },
};