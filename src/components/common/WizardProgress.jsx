import ProgressIndicator from "./ProgressIndicator.jsx";

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