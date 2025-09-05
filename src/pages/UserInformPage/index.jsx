import { useNavigate} from 'react-router-dom';
import UserInformWizard from '../../components/UserInformPage/UserInformWizard.jsx';
import { ASSET_INFORM_STEPS } from '@/constants/wizardSteps.js';
import {useMemo} from "react";
import {useAssets} from "@/context/AssetContext.jsx";

export default function UserInformPage() {
    const navigate = useNavigate();
    const { userName } = useAssets();

    console.log("4. UserInformPage: Context로부터 받은 userName:", userName);

    // userName이 변경될 때만 initialFormValues 객체를 새로 만듭니다.
    const initialFormValues = useMemo(() => ({
        name: userName || '', // 👈 3. 가져온 userName을 초기값으로 설정
    }), [userName]);

    const handleComplete = (payload) => {
        console.log("최종 제출 데이터:", payload);
        // API 호출 후, 로딩 및 결과 페이지로 이동합니다.
        navigate('/user/inform/result'); // 👈 이동 경로를 지정합니다.
    };
    return (
        <div className="h-full bg-white">
            <UserInformWizard
                // userNameFromServer 값이 바뀔 때마다 Wizard 전체가 리셋됩니다.
                wizardSteps={ASSET_INFORM_STEPS}
                onComplete={handleComplete}
                initialFormValues={ initialFormValues }
                payloadType="user"
            />
        </div>
    );
}