import { userFormRules } from './userFormRules';
import { assetPlanRules } from './assetPlanRules';

// 모든 규칙을 하나의 객체로 통합
const allRules = {
    ...userFormRules,
    ...assetPlanRules,
};

/**
 * key에 해당하는 유효성 검증 함수를 찾아 실행합니다.
 * @param {string} key - 검증할 필드의 키 (예: 'name', 'propensity')
 * @param {*} value - 검증할 값
 * @returns {string|null} - 에러 메시지 또는 null
 */
export const validate = (key, value) => {
    // key에 해당하는 규칙이 있으면 실행, 없으면 null 반환
    const rule = allRules[key];
    return rule ? rule(value) : null;
};