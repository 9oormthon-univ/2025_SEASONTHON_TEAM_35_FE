export default function OnboardingDots({ total, current }) {
    const dots = Array.from({ length: total }, (_, index) => (
        <div
            key={index}
            className={`w-[6px] h-[6px] rounded-full mx-1 transition-colors duration-300 ${
                index === current - 1 ? 'bg-primary-2' : 'bg-gray-20'
            }`}
        />
    ));

    return <div className="flex justify-center mt-4">{dots}</div>;
}