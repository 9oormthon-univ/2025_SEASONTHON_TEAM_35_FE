// 자산 입력 질문
export const ASSET_INFORM_STEPS = [
    { key: "cash",    title: "계좌 및 예금에 보유 중인\n현금을 입력해 주세요.", keyword: "계좌 및 예금" },
    { key: "stock",   title: "보유 중인 주식 투자\n금액을 입력해 주세요.",   keyword: "주식 투자" },
    { key: "bitcoin", title: "보유 중인 비트코인 투자\n금액을 입력해 주세요.", keyword: "비트코인 투자" },
    { key: "bond",    title: "보유 중인 채권 투자\n금액을 입력해 주세요.",   keyword: "채권 투자" },
    { key: "etf",     title: "보유 중인 ETF 투자\n금액을 입력해 주세요.",    keyword: "ETF 투자" },
    { key: "etc",     title: "그 외 자산에 해당하는 금액을\n입력해 주세요.",     keyword: "그 외 자산" },
];

// AI 자산 설계 질문
export const PLAN_WIZARD_STEPS = [
    { key: "age", title: "만 나이가 어떻게 되시나요?", type: 'number' },
    { key: "goal", title: "자산 설계의 목표는 무엇인가요?", type: 'select', options: ['은퇴 준비', '주택 마련', '자녀 교육'] },
    { key: "risk", title: "선호하는 투자 위험도는 어느 정도인가요?", type: 'radio', options: ['안정형', '중립형', '공격형'] },
    // ... 나머지 4개 질문
];