import { useNavigate } from 'react-router-dom';
import UpToDateWizard from '@/components/UpToDatePage/UpToDateWizard.jsx';
import UpToDateStep from '@/components/UpToDatePage/UpToDateStep.jsx'; // UpToDateStep 컴포넌트 import

const wizardSteps = [
    {
        key: 'selectInstitution',
        title: '금융사 선택',
        component: UpToDateStep,
    },

];

export default function UpToDatePage() {
    const navigate = useNavigate();

    const handleComplete = (formData) => {
        console.log('마법사 완료! 최종 데이터:', formData);
        navigate('/user/inform/result');
    };

    const handleClose = () => {
        navigate('/mypage');
    };

    return (
        <UpToDateWizard
            wizardSteps={wizardSteps} // 정의한 배열을 props로 전달
            onComplete={handleComplete}
            initialFormValues={{ selectInstitution: [] }}
            onClose={handleClose}
        />
    );
}