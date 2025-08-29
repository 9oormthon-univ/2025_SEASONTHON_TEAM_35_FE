import React from 'react';

export default function ProgressIndicator({ totalSteps, currentStep }) {
    const stepsArray = Array.from({ length: totalSteps }, (_, i) => i);

    return (
        <div className="flex justify-center items-center space-x-2">
            {stepsArray.map((index) => (
                <div
                    key={index}
                    className={`
                        transition-all duration-300 ease-in-out
                        ${index === currentStep // 현재 스텝 (막대)
                        ? 'w-[20px] h-[4px] bg-primary-2 rounded-full' // 20x4px 민트색 바
                        : index < currentStep // 지나온 스텝 (민트색 원)
                            ? 'w-[6px] h-[6px] bg-primary-2 rounded-full' // 6x6px 민트색 점
                            : 'w-[6px] h-[6px] bg-gray-20 rounded-full' // 아직 오지 않은 스텝 (회색 점)
                    }
                    `}
                />
            ))}
        </div>
    );
}