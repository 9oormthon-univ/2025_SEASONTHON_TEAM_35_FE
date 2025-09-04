import { useNavigate } from 'react-router-dom';
import AmountWizardCompat from "../../components/AssetInformPage/AmountWizardCompat.jsx";
import { useAssets } from '../../context/AssetContext.jsx';
import {ASSET_INFORM_STEPS} from "@/constants/wizardSteps.js";

export default function AssetInformPage() {
    const navigate = useNavigate();
    // context에서 registerAssets와 isSubmitting을 가져온다
    const { registerAssets, isSubmitting } = useAssets();

    // wizard가 완료되었을 때 실행될 함수를 async/await으로 수정
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
                wizardSteps={ASSET_INFORM_STEPS}
                initialData={{ cash: "", stock: "", bond: "",bitcoin: "", etf:"", etc:"" }}
                onComplete={handleRegister}
                submitButtonText="완료"
                isSubmitting={isSubmitting}
            />
        </div>
    );
}