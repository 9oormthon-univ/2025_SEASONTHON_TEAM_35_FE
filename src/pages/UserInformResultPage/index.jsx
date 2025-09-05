import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '../../context/AssetContext'; // 👈 1. useAssets 훅 import
import AnalysisLayout from '../../components/common/AnalysisLayout.jsx';
import StatusAnimation from '@/components/common/animations/StatusAnimation.jsx';

export default function UserInformResultPage() {
    const navigate = useNavigate();
    // 👇 2. AssetContext에서 실제 로딩 상태와 에러, 데이터 요청 함수를 가져옵니다.
    const { loading, error, fetchAssetSummary } = useAssets();
    // API 호출이 시작되었는지 추적하는 상태 (첫 렌더링 시 자동 이동 방지용)
    const [isFetchInitiated, setIsFetchInitiated] = useState(false);

    // 👇 3. 페이지가 보이자마자 자산 정보를 요청하는 API를 딱 한 번 호출합니다.
    useEffect(() => {
        fetchAssetSummary();
        setIsFetchInitiated(true);
    }, [fetchAssetSummary]);

    // 👇 4. 로딩 상태가 변경될 때마다 다음 페이지로 이동할지 결정합니다.
    useEffect(() => {
        // API 호출이 시작되었고, 로딩이 끝났으며, 에러가 없을 때만 실행
        if (isFetchInitiated && !loading && !error) {
            // "완료" 애니메이션을 잠시 보여준 후 (예: 1.5초) 메인 페이지로 이동
            const timer = setTimeout(() => {
                navigate('/asset/main');
            }, 1500);

            return () => clearTimeout(timer); // 컴포넌트가 사라지면 타이머도 정리
        }
    }, [loading, error, isFetchInitiated, navigate]);

    // 5. 에러가 발생했을 경우의 UI (선택 사항이지만 추천)
    if (error) {
        return (
            <AnalysisLayout
                icon={<StatusAnimation type="error" size={120} className="flex justify-center mb-10" />}
                title="자산 연동 실패"
                subtitle={"자산 정보를 불러오는 데 실패했습니다.\n잠시 후 다시 시도해주세요."}
                buttonText="홈으로 돌아가기"
                onButtonClick={() => navigate('/home')}
            />
        );
    }

    // 👇 6. API가 데이터를 가져오는 중일 때와 완료되었을 때의 UI를 분리
    // 로딩 중이거나, 아직 API 호출이 시작되지 않았다면 로딩 화면을 보여줍니다.
    if (loading || !isFetchInitiated) {
        return (
            <AnalysisLayout
                icon={<StatusAnimation type="loading" size={120} className="flex justify-center mb-10"/>}
                title="자산 연동 중..."
                subtitle={"입력하신 개인정보를 바탕으로\n자산을 연동하고 있어요!"}
                buttonText="완료"
                isButtonDisabled={true}
            />
        );
    }

    // 로딩이 성공적으로 끝났을 때의 UI
    return (
        <AnalysisLayout
            icon={<StatusAnimation type="complete" size={120} className="flex justify-center mb-10" />}
            title="자산 연동이 완료되었습니다"
            subtitle={"지금 바로 연동된 자산을 바탕으로\nAI 자산 기능을 이용해보세요!"}
            buttonText="완료"
            // 버튼을 비활성화하여 자동으로 넘어가도록 유도
            isButtonDisabled={true}
        />
    );
}