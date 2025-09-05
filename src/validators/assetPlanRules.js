export const assetPlanRules = {
    propensity: (value) => {
        if (!value) return "투자 성향을 선택해주세요.";
        return null;
    },
    investmentPeriod: (value) => {
        if (!value) return "투자 기간을 선택해주세요.";
        return null;
    },
    // 필요에 따라 다른 AI 설계 질문 key에 대한 규칙을 추가
    // savingRange, hasEmergencyFund 등
};