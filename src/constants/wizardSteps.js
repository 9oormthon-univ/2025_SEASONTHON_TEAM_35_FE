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
    // --- Radio 버튼 질문 (4개) ---
    {
        key: "incomeRange",
        title: "본인의 월 소득 수준을\n선택해주세요",
        type: 'radio',
        options: [
            { value: 'BELOW_100',       label: '100만원 이하' },
            { value: 'BETWEEN_100_200', label: '100-200만원' },
            { value: 'BETWEEN_200_300', label: '200-300만원' },
            { value: 'BETWEEN_300_500', label: '300-500만원' },
            { value: 'ABOVE_500',       label: '500만원 이상' },
        ]
    },
    {
        key: "savingRange",
        title: "월 저축 가능 금액을\n선택해주세요",
        type: 'radio',
        options: [
            { value: 'BELOW_10',        label: '10만원 이하' },
            { value: 'BETWEEN_10_50',   label: '10-50만원' },
            { value: 'BETWEEN_50_100',  label: '50-100만원' },
            { value: 'BETWEEN_100_200', label: '100-200만원' },
            { value: 'ABOVE_200',       label: '200만원 이상' },
        ]
    },
    {
        key: "profitRange",
        title: "투자 수익에 대한\n목표 금액",
        type: 'radio',
        options: [
            { value: 'BELOW_500',        label: '500만원 이하' },
            { value: 'BETWEEN_500_1500',  label: '500-1500만원' },
            { value: 'BETWEEN_1500_3000', label: '1500-3000만원' },
            { value: 'BETWEEN_3000_5000', label: '3000-5000만원' },
            { value: 'BETWEEN_5000_10000',label: '5000-1억' },
            { value: 'ABOVE_10000',      label: '1억 이상' },
        ]
    },
    {
        key: "investmentPeriod",
        title: "투자 수익에 대한\n목표 시점",
        type: 'radio',
        options: [
            { value: 'UNDER_6_MONTHS', label: '6개월 이내' },
            { value: 'UNDER_1_YEAR',   label: '1년 이내' },
            { value: 'UNDER_2_YEARS',  label: '2년 이내' },
            { value: 'UNDER_3_YEARS',  label: '3년 이내' },
            { value: 'UNDER_5_YEARS',  label: '5년 이내' },
            { value: 'UNDER_10_YEARS', label: '10년 이내' },
            { value: 'OVER_10_YEARS',  label: '10년 이상 장기' },
        ]
    },

    // --- Toggle 버튼 질문 (3개) ---
    {
        key: "propensity",
        title: "선호하는 투자 스타일은\n무엇인가요?",
        type: 'toggle',
        options: [
            { value: 'STABLE', label: '안정적인 투자' },
            { value: 'COMMON', label: '균형적인 투자' },
            { value: 'ACTIVE', label: '공격적인 투자' },
        ],
        styleVariant: 'card', // 예시 스타일
    },
    {
        key: "investmentPurpose",
        title: "투자의 주된 목적은\n무엇인가요?",
        type: 'toggle',
        options: [
            { value: 'SAVINGS',          label: '저축' },
            { value: 'HOME_OWNERSHIP',   label: '내 집 마련' },
            { value: 'CAR_PURCHASE',     label: '차량 구매' },
            { value: 'TRAVEL',           label: '여행' },
            { value: 'MARRIAGE',         label: '결혼' },
            { value: 'SELF_DEVELOPMENT', label: '자기계발' },
            { value: 'OTHER',            label: '기타' },
        ],
        styleVariant: 'pill', // 예시 스타일
    },
    {
        key: "has_experience", // 이 부분은 백엔드 명세에 없어서 임의로 key를 정했습니다.
        title: "투자를 해본 경험이 있나요?",
        type: 'toggle',
        options: [
            { value: 'true',  label: '네, 있어요' },
            { value: 'false', label: '아니요, 없어요' },
        ],
        styleVariant: 'full', // 예시 스타일
    },
];