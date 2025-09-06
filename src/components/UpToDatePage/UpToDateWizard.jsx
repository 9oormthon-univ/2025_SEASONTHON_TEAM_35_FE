import { useNavigate } from 'react-router-dom';
import BaseWizard from '../common/wizard/BaseWizard.jsx';
import UpToDateStep from './UpToDateStep.jsx';
import { useWizard } from '@/hooks/useWizard.js';

const wizardSteps = [
    {
        key: 'upToDateStep1',
        title: '자산을 연결할 금융사를 \n선택해 주세요',
        keyword:"금융사",
        component: UpToDateStep,
        disableNextOnEmpty: true,
    },
];

export default function UpToDateWizard({  initialFormValues}) {
    const navigate = useNavigate();

    const wizard = useWizard(wizardSteps, {
        onComplete: (formData) => {
            console.log("제출 완료, 최종 데이터:", formData);
            navigate('/user/inform/result/');
        },
        initialFormValues,
        payloadType: 'user'
    });

    const handleClose = () => {
        navigate('/mypage');
    };

    return (
        <BaseWizard
            wizard={wizard}
            wizardSteps={wizardSteps}
            onClose={handleClose} // 수정된 handleClose 함수를 onClose prop으로 전달
            buttonText="제출하기"
            showProgress={false}
            renderStep={({ stepData, value, onChange }) => (
                <UpToDateStep
                    stepData={stepData}
                    value={value}
                    onChange={(newValue) => onChange(stepData.key, newValue)}
                />
            )}
        />
    );
}