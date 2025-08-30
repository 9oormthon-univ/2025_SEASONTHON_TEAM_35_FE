import { useNavigate } from 'react-router-dom';
import AmountWizard from "../../components/AssetInformPage/AmountWizard";
import { useAssets } from '../../context/AssetContext.jsx'; // 👈 1. useAssets 훅 가져오기

//  wizard에 표시될 스텝 정보
const WIZARD_STEPS = [
    { key: "cash",    title: "계좌 및 예금에 보유 중인\n현금을 입력해 주세요." },
    { key: "stock",   title: "보유 중인 주식 투자\n금액을 입력해 주세요." },
    { key: "bitcoin", title: "보유 중인 비트코인 투자\n금액을 입력해 주세요." },
    { key: "bond",    title: "보유 중인 채권 투자\n금액을 입력해 주세요." },
    { key: "etf",     title: "보유 중인 ETF 투자\n금액을 입력해 주세요." },
    { key: "etc",     title: "그 외 자산에 해당하는 금액을\n입력해 주세요." },
];

export default function AssetInformPage() {
    const navigate = useNavigate(); // 👈 2. 페이지 이동을 위한 navigate 함수
    const { updateAssetData } = useAssets(); // 👈 3. 컨텍스트에서 데이터 업데이트 함수 가져오기

    // 👈 4. wizard가 완료되었을 때 실행될 함수
    const handleComplete = (payload) => {
        updateAssetData(payload); // 컨텍스트를 통해 전역 자산 데이터를 업데이트
        alert("자산 정보가 저장되었습니다.");
        navigate("/asset/main"); // 자산 정보 메인 페이지로 이동
    };

    return (
        <div className="h-full bg-white">
            <AmountWizard
                wizardSteps={WIZARD_STEPS}
                onComplete={handleComplete} // 👈 5. AmountWizard에 완료 함수를 props로 전달
                submitButtonText="완료"
            />
        </div>
    );
}