import { useNavigate } from 'react-router-dom';
import AmountWizardCompat from "../../components/AssetInformPage/AmountWizardCompat.jsx";
import { useAssets } from '../../context/AssetContext.jsx';

const WIZARD_STEPS = [
    { key: "cash",    title: "계좌 및 예금에 보유 중인\n현금을 입력해 주세요.", keyword: "계좌 및 예금" },
    { key: "stock",   title: "보유 중인 주식 투자\n금액을 입력해 주세요.",   keyword: "주식 투자" },
    { key: "bitcoin", title: "보유 중인 비트코인 투자\n금액을 입력해 주세요.", keyword: "비트코인 투자" },
    { key: "bond",    title: "보유 중인 채권 투자\n금액을 입력해 주세요.",   keyword: "채권 투자" },
    { key: "etf",     title: "보유 중인 ETF 투자\n금액을 입력해 주세요.",    keyword: "ETF 투자" },
    { key: "etc",     title: "그 외 자산에 해당하는 금액을\n입력해 주세요.",     keyword: "그 외 자산" },
];


export default function AssetInformPage() {
    const navigate = useNavigate();
    // 👈 1. context에서 registerAssets와 isSubmitting을 가져옵니다.
    const { registerAssets, isSubmitting } = useAssets();

    // 👈 2. wizard가 완료되었을 때 실행될 함수를 async/await으로 수정
    const handleRegister = async (payload) => {
        const success = await registerAssets(payload); // API 호출

        if (success) {
            alert("자산 정보가 성공적으로 저장되었습니다.");
            navigate("/asset/main");
        } else {
            // AssetContext에서 error 상태를 관리하므로, 실패 시 에러 알림만 띄워줍니다.
            alert("자산 정보 저장에 실패했습니다. 다시 시도해 주세요.");
        }
    };
    return (
        <div className="h-full bg-white">
            <AmountWizardCompat
                wizardSteps={WIZARD_STEPS}
                initialData={{ cash: "", stock: "", bond: "",bitcoin: "", etf:"", etc:"" }}
                onComplete={handleRegister}
                submitButtonText="완료"
                isSubmitting={isSubmitting}
            />
        </div>
    );
}