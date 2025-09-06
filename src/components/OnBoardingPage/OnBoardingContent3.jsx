import onboarding3 from "@/assets/OnBoarding/onboarding3.png";

export default function OnBoardingContent3() {
    return (
        <>
            <div className="text-[24px] font-bold pt-10 ">
                한눈에 보는 나의 자산
            </div>

            <div className="text-[14px] text-center pt-2 font-medium text-gray-500 whitespace-pre-line">
                여기저기 흩어져 있는 나의 자산을
                {'\n'}한 번에 확인할 수 있어요
            </div>

            <div className="mt-1">
                <img src={onboarding3} alt="Onboarding" className="w-full h-auto" />
            </div>

        </>
    );
}