import onboarding1 from "@/assets/OnBoarding/onboarding1.png"

export default function OnBoardingContent1() {
    return (
            <>
                <div className="text-[24px] font-bold pt-10 ">
                    나만의 자산 설계
                </div>

                <div className="text-[14px] text-center pt-2 font-medium text-gray-500 whitespace-pre-line">
                    누구나 간편하게{'\n'}펀드매니저급 AI 자산 설계를 받을 수 있어요
                </div>

                <div className="mt-1">
                    <img src={onboarding1} alt="Onboarding" className="w-full h-auto" />
                </div>

            </>
    );
}