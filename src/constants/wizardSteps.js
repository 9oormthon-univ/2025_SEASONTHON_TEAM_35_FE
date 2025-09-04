// 자산 입력 질문 (새로운 버전)
export const ASSET_INFORM_STEPS = [
    {
        key: "name",
        title: "이름을\n입력해주세요.",
        keyword: "이름",
        type: 'text',
        placeholder: "홍길동",
    },
    {
        key: "residentNumber",
        title: "주민등록번호를\n입력해주세요.",
        keyword: "주민등록번호",
        type: 'resident',
        placeholder: "생년월일 6자리와 성별",
    },
    {
        key: "phoneNumber",
        title: "휴대폰 번호를\n입력해주세요.",
        keyword: "휴대폰 번호",
        type: 'phone', // 휴대폰 번호 형식
        placeholder: "‘-’ 없이 숫자만 입력",
    },
    {
        key: "financialInstitutions",
        title: "자산을 연결할 금융사를\n선택해 주세요.",
        keyword: "금융사",
        type: 'multi-select-grid',
        options: [
            {
                groupTitle: '은행',
                items: [
                    { value: 'KB', label: 'KB국민은행', logo: '/logos/kb.png' },
                    { value: 'SHINHAN', label: '신한은행', logo: '/logos/shinhan.png' },
                    { value: 'WOORI', label: '우리은행', logo: '/logos/woori.png' },
                    { value: 'HANA', label: '하나은행', logo: '/logos/hana.png' },
                    { value: 'IBK', label: 'IBK기업은행', logo: '/logos/ibk.png' },
                    { value: 'TOSS_BANK', label: '토스뱅크', logo: '/logos/toss.png' },
                    { value: 'KAKAO_BANK', label: '카카오뱅크', logo: '/logos/kakao.png' },
                    { value: 'K_BANK', label: '케이뱅크', logo: '/logos/kbank.png' },
                ]
            },
            {
                groupTitle: '증권사',
                items: [
                    { value: 'SAMSUNG_SEC', label: '삼성증권', logo: '/logos/samsung.png' },
                    { value: 'TOSS_SEC', label: '토스증권', logo: '/logos/toss.png' },
                    { value: 'KIWOOM_SEC', label: '키움증권', logo: '/logos/kiwoom.png' },
                    { value: 'MIRAE_ASSET', label: '미래에셋증권', logo: '/logos/mirae.png' },
                ]
            }
        ]
    },
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
                value: 'AGGRESSIVE',
                label: '공격투자형',
                description: '높은 수익을 위해 위험을 감수할 수 있어요.',
            },
            {
                value: 'ACTIVE',
                label: '적극투자형',
                description: '수익을 중시하며 적극적으로 투자하고 싶어요.',
            },
            {
                value: 'NEUTRAL',
                label: '위험중립형',
                description: '수익과 안정성의 균형 잡힌 투자를 원해요.',
            },
            {
                value: 'CONSERVATIVE',
                label: '안정추구형',
                description: '안정성을 더 중시하며 투자를 하고 싶어요.',
            },
            {
                value: 'STABLE',
                label: '안정형',
                description: '위험을 최소화하고 안전하게 투자할래요.',
            },
        ],
    },
    {
        key: "emergencyFund",
        title: "언제든 바로 찾을 수 있는 \n 돈이 필요한가요?",
        keyword: "돈",
        type: 'toggle',
        styleVariant: 'box',
        options: [
            {
                value: 'true',
                label: '단기 자금',
                description: '언제든 인출 가능한\n안정적인 자금이 필요해요.',
                icon: 'piggyBank'
            },
            {
                value: 'false',
                label: '장기 자금',
                description: '유동성이 낮아도\n장기간 운용할 수 있어요.',
                icon: 'safe'
            },
        ],
    },
    {
        key: "investmentPurpose",
        title: "현재 가장 중요하게 생각하는\n주요 목표는 무엇인가요?",
        keyword: "주요 목표",
        type: 'toggle',
        styleVariant: 'pill',
        options: [
            { value: 'SAVINGS',          label: '저축',           icon: 'save' },
            { value: 'HOME_OWNERSHIP',   label: '내 집 마련',     icon: 'house' },
            { value: 'CAR_PURCHASE',     label: '차량 구매',       icon: 'car' },
            { value: 'TRAVEL',           label: '여행',           icon: 'travel' },
            { value: 'MARRIAGE',         label: '결혼',           icon: 'marry' },
            { value: 'SELF_DEVELOPMENT', label: '자기계발',       icon: 'grow' },
        ],
    },
];