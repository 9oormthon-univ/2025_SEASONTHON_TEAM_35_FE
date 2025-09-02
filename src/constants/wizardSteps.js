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
        keyword: "월 소득 수준",
        type: 'radio',
        options: [
            { value: 'BELOW_100',       label: '100만 원 이하' },
            { value: 'BETWEEN_100_200', label: '100 ~ 200만 원' },
            { value: 'BETWEEN_200_300', label: '200 ~ 300만 원' },
            { value: 'BETWEEN_300_500', label: '300 ~ 500만 원' },
            { value: 'ABOVE_500',       label: '500만 원 이상' },
        ]
    },
    {
        key: "savingRange",
        title: "월 저축 가능 금액을\n선택해주세요",
        keyword: "월 저축 가능 금액",
        type: 'radio',
        options: [
            { value: 'BELOW_10',        label: '10만 원 이하' },
            { value: 'BETWEEN_10_50',   label: '10 ~ 50만원' },
            { value: 'BETWEEN_50_100',  label: '50 ~ 100만원' },
            { value: 'BETWEEN_100_200', label: '100 ~ 200만원' },
            { value: 'ABOVE_200',       label: '200만 원 이상' },
        ]
    },
    {
        key: "profitRange",
        title: "투자 수익에 대한\n목표 금액",
        keyword: "목표 금액",
        type: 'radio',
        options: [
            { value: 'BELOW_500',        label: '500만 원 이하' },
            { value: 'BETWEEN_500_1000',  label: '500 ~ 1000만 원' },
            { value: 'BETWEEN_1000_3000', label: '1000 ~ 3000만 원' },
            { value: 'BETWEEN_3000_5000', label: '3000 ~ 5000만원' },
            { value: 'BETWEEN_5000_10000',label: '5000 ~ 1억 원' },
            { value: 'ABOVE_10000',      label: '1억 이상' },
        ]
    },
    {
        key: "investmentPeriod",
        title: "투자 수익에 대한\n목표 시점",
        keyword: "목표 시점",
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
        title: "본인의 투자 성향을\n선택해주세요",
        keyword: "투자 성향",
        type: 'toggle',
        styleVariant: 'card',
        options: [
            // 각 option을 객체로 만들어서 description과 icon 정보를 추가
            {
                value: 'STABLE',
                label: '안정형',
                description: '안전하게, 원금 중심으로 투자하고 싶어요.',
                icon: 'ShieldIcon' // (아이콘 이름은 임시)
            },
            {
                value: 'COMMON',
                label: '중립형',
                description: '안정과 수익, 적당히 섞어 투자하고 싶어요.',
                icon: 'BalanceIcon'
            },
            {
                value: 'ACTIVE',
                label: '공격형',
                description: '높은 수익을 목표로 적극적으로 투자하고 싶어요.',
                icon: 'RocketIcon'
            },
        ],
    },
    {
        key: "emergencyFund",
        title: "언제든 바로 찾을 수 있는 \n 돈이 필요한가요?",
        type: 'toggle',
        styleVariant: 'box',
        options: [
            { value: 'true',  label: '단기 자금' },
            { value: 'false', label: '장기 자금' },
        ],
    },
    {
        key: "investmentPurpose",
        title: "현재 가장 중요하게 생각하는\n주요 목표는 무엇인가요?",
        keyword: "주요 목표",
        type: 'toggle',
        styleVariant: 'pill',
        options: [
            { value: 'SAVINGS',          label: '저축',           icon: '💰' },
            { value: 'HOME_OWNERSHIP',   label: '내 집 마련',     icon: '🏠' },
            { value: 'CAR_PURCHASE',     label: '차량 구매',       icon: '🚗' },
            { value: 'TRAVEL',           label: '여행',           icon: '✈️' },
            { value: 'MARRIAGE',         label: '결혼',           icon: '💍' },
            { value: 'SELF_DEVELOPMENT', label: '자기계발',       icon: '📚' },
            { value: 'OTHER',            label: '기타',           icon: '✨' },
        ],
    },
];