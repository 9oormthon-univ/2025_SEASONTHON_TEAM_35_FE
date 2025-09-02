import BaseWizard from "@/components/common/wizard/BaseWizard.jsx";
import ChoiceStep from "@/components/AssetPlanInformPage/ChoiceStep.jsx";

const PLAN_STEPS = [
    {
        key: "goal",
        title: "당신의 자산 설계 목적은 무엇인가요?",
        keyword: "자산 설계 목적",
        options: [
            { label: "단기 비상자금", value: "emergency", desc: "3~6개월 생활비" },
            { label: "내집 마련", value: "house" },
            { label: "노후 준비", value: "retire" },
            { label: "자녀 교육", value: "education" },
        ],
    },
    {
        key: "risk",
        title: "어느 정도의 위험을 감수하실 수 있나요?",
        keyword: "위험",
        options: [
            { label: "안정형", value: "low", desc: "원금 보존 우선" },
            { label: "중립형", value: "mid" },
            { label: "공격형", value: "high", desc: "수익 극대화" },
        ],
    },
];

export default function AssetPlanInformPage() {
    const initialData = { goal: "", risk: "" };

    const handleComplete = (form) => {
        console.log("submit plan form:", form);
        // ✅ 여기서 AI 자산 설계 API 호출
    };
    console.log(PLAN_STEPS)
    return (
        <BaseWizard
            wizardSteps={PLAN_STEPS}
            initialData={initialData}
            onComplete={handleComplete}
            submitButtonText="설계 시작"
            showPrevButton={true}
            renderStep={({ stepData, value, onChange }) => (
                <ChoiceStep
                    title={stepData.title}
                    keyword={stepData.keyword}
                    options={stepData.options}
                    value={value}
                    onChange={(v) => onChange(stepData.key, v)}
                />
            )}
        />
    );
}
