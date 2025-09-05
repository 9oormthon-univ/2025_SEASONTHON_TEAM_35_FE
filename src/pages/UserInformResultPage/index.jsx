import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '../../context/AssetContext';
import AnalysisLayout from '../../components/common/AnalysisLayout.jsx';
import StatusAnimation from '@/components/common/animations/StatusAnimation.jsx';

export default function UserInformResultPage() {
    const navigate = useNavigate();
    const { fetchAssetSummary } = useAssets();
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        // API 연결이 완료되어도, 최소 3.5초간은 유지되도록 설정 (시간 변동 필요하면 숫자만 바꿔주면 됨)
        const minimumDisplayTimePromise = new Promise(resolve => {
            setTimeout(resolve, 3500);
        });

        Promise.all([fetchAssetSummary(), minimumDisplayTimePromise])
            .then(([apiWasSuccessful]) => {
                if (apiWasSuccessful) {
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            })
            .catch(() => {
                setStatus('error');
            });
    }, [fetchAssetSummary]);

    // --- UI 렌더링 ---
    if (status === 'error') {
        return (
            <AnalysisLayout
                icon={<StatusAnimation type="error" size={120} className="flex justify-center mb-10" />}
                title="자산 연동 실패"
                subtitle={"자산 정보를 불러오는 데 실패했습니다.\n잠시 후 다시 시도해주세요."}
                buttonText="돌아가기"
                onButtonClick={() => navigate('/home')}
            />
        );
    }

    if (status === 'loading') {
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

    // status === 'success'
    return (
        <AnalysisLayout
            icon={<StatusAnimation type="complete" size={120} className="flex justify-center mb-10" />}
            title="자산 연동이 완료되었습니다"
            subtitle={"지금 바로 연동된 자산을 바탕으로\nAI 자산 기능을 이용해보세요!"}
            buttonText="완료"
            onButtonClick={() => navigate('/asset/main')}
        />
    );
}