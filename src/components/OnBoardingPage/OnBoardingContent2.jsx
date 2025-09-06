import onboarding2 from "@/assets/OnBoarding/onboarding2.png";

export default function OnBoardingContent2() {
    return (
        <>
            <div className="text-[24px] font-bold pt-10 ">
                목표를 위한 체계적인 관리
            </div>

            <div className="text-[14px] text-center pt-2  font-medium text-gray-500 whitespace-pre-line">
                AI가 나의 목표에 맞춘
                {'\n'}자산 관리 전략을 제공해 줘요
            </div>

            <div className="mt-1">
                <img src={onboarding2} alt="Onboarding" className="w-full h-auto" />
            </div>

        </>
    );
}