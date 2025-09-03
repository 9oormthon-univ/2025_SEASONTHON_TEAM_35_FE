import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserInformWizard from '../../components/UserInformPage/UserInformWizard.jsx';
import { ASSET_INFORM_STEPS } from '../../constants/wizardSteps.js';

export default function UserInformPage() {
    const navigate = useNavigate();

    // TODO: 새로운 API 연동 로직으로 수정될 부분
    const handleComplete = (payload) => {
        console.log("사용자 정보 입력 완료:", payload);
        // navigate('/다음페이지');
    };

    return (
        <div className="h-full bg-white">
            <UserInformWizard
                wizardSteps={ASSET_INFORM_STEPS}
                onComplete={handleComplete}
                submitButtonText="다음" // 버튼 텍스트 변경
            />
        </div>
    );
}