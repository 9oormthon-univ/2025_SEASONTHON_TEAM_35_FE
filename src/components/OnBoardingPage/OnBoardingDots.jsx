import React from 'react';

export default function OnboardingDots({ total, current }) {
    const dots = Array.from({ length: total }, (_, index) => (
        <div
            key={index}
            className={`w-2 h-2 rounded-full mx-1 transition-colors duration-300 ${
                index === current - 1 ? 'bg-white' : 'bg-gray-400'
            }`}
        />
    ));

    return <div className="flex justify-center mt-4">{dots}</div>;
}