import BaseWizard from "../common/wizard/BaseWizard.jsx";
import AmountStep from "./AmountStep.jsx";

export default function AmountWizardCompat(props) {
    return (
        <BaseWizard
            {...props}
            renderStep={({ stepData, value, onChange, error }) => (
                <AmountStep
                    title={stepData.title}
                    keyword={stepData.keyword}
                    value={value}
                    onChange={(v) => onChange(stepData.key, v)}
                    error={error}
                />
            )}
        />
    );
}