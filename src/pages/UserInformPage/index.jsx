import { useNavigate} from 'react-router-dom';
import UserInformWizard from '../../components/UserInformPage/UserInformWizard.jsx';
import { ASSET_INFORM_STEPS } from '@/constants/wizardSteps.js';
import {useMemo} from "react";

export default function UserInformPage() {
    const navigate = useNavigate();

    // TODO: 실제로는 서버나 상태 관리 라이브러리에서 가져와야 합니다.
    const userNameFromServer = "김민서";

    // 👇 2. useMemo를 사용해서 userNameFromServer 값이 바뀔 때만 객체를 새로 만듭니다.
    const initialFormValues = useMemo(() => ({
        name: userNameFromServer,
    }), [userNameFromServer]);

    console.log("1. UserInformPage에서 생성:", initialFormValues);
    const handleComplete = (payload) => {
        console.log("사용자 정보 입력 완료:", payload);
    };

    return (
        <div className="h-full bg-white">
            <UserInformWizard
                // userNameFromServer 값이 바뀔 때마다 Wizard 전체가 리셋됩니다.
                wizardSteps={ASSET_INFORM_STEPS}
                onComplete={handleComplete}
                submitButtonText="다음"
                initialFormValues={{ name: userNameFromServer }}
            />
        </div>
    );
}