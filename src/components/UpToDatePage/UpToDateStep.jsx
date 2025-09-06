import MultiSelectGrid from '../UserInformPage/MultiSelectGrid.jsx';

const mockOptions = [
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
];

export default function UpToDateStep({  value, onChange }) {
    return (
        <div className="p-1">
            <MultiSelectGrid
                options={mockOptions} // 더미 데이터 전달
                value={value}
                onChange={(newValue) => onChange(newValue)}
            />
        </div>
    );
}