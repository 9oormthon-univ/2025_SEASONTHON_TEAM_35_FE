import AmountWizard from "../../components/AssetInformPage/AmountWizard";

export default function AssetPlanInformPage() {

    return (
        <div className="h-full bg-white">
            <AmountWizard
                wizardSteps={WIZARD_STEPS}
                onComplete={handleRegister}
                submitButtonText="완료"
                isSubmitting={isSubmitting}
            />
        </div>
    );
}