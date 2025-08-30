import ProgressIndicator from "./ProgressIndicator";

export default function WizardProgress({ totalSteps, currentStep }) {
    return (
        <div className="px-7 mt-[80px] mb-1">
            <ProgressIndicator
                totalSteps={totalSteps}
                currentStep={currentStep}
            />
        </div>
    );
}