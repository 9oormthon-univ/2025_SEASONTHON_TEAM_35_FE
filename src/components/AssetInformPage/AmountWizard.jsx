import { useNavigate } from "react-router-dom";
import { useAmountWizard } from "../../hooks/useAmountWizard";

import WizardHeader from "./WizardHeader";
import WizardProgress from "./WizardProgress";
import WizardContent from "./WizardContent";
import WizardFooter from "./WizardFooter";

// 단계 데이터는 훅과 함께 관리하거나 별도 파일로 분리할 수 있습니다.
const steps = [
    { key: "cash",    title: "계좌 및 예금에 보유 중인\n현금을 입력해 주세요." },
    { key: "stock",   title: "보유 중인 주식 투자\n금액을 입력해 주세요." },
    { key: "bitcoin", title: "보유 중인 비트코인 투자\n금액을 입력해 주세요." },
    { key: "bond",    title: "보유 중인 채권 투자\n금액을 입력해 주세요." },
    { key: "etf",     title: "보유 중인 ETF 투자\n금액을 입력해 주세요." },
    { key: "etc",     title: "그 외 자산에 해당하는 금액을\n입력해 주세요." },
];

export default function AmountWizard() {
    const navigate = useNavigate();
    const handleComplete = (payload) => {
        localStorage.setItem("assetPortfolioPayload", JSON.stringify(payload));
        navigate("/asset/summary", { state: payload });
    };

    const {
        step, totalSteps, currentStepData, form, error, direction,
        next, prev, updateValue,
    } = useAmountWizard(steps, {
        onComplete: handleComplete,
        memberId: 123,
    });

    return (
        <div className="flex h-full flex-col">
            <WizardHeader onPrev={prev} isPrevDisabled={step === 0} />
            <WizardProgress totalSteps={totalSteps} currentStep={step} />
            <WizardContent
                direction={direction}
                stepData={currentStepData}
                formValue={form[currentStepData.key]}
                onValueChange={updateValue}
                error={error}
            />
            <WizardFooter onNext={next} isLastStep={step === totalSteps - 1} />
        </div>
    );
}