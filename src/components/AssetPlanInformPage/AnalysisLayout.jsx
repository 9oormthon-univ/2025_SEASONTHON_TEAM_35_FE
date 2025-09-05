import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AnalysisLayout({
                                           icon,
                                           title,
                                           subtitle,
                                           buttonText,
                                           isButtonDisabled = false,
                                           onButtonClick,
                                           children
                                       }) {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col h-full bg-white p-5 text-center">
            <div className="flex-1 flex flex-col">

                <div className="pt-60">
                    <div className="w-20 h-20 mx-auto flex items-center justify-center">
                        {icon}
                    </div>
                    <h1 className="pt-10 text-2xl font-bold text-gray-90">{title}</h1>
                    <p className="mt-4 text-base text-gray-40 whitespace-pre-wrap">{subtitle}</p>
                </div>

                <div className="flex-1 flex flex-col justify-start mt-5">
                    {children}
                </div>

            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <button
                    onClick={onButtonClick || (() => navigate('/asset/main'))}
                    disabled={isButtonDisabled}
                    className={`w-full h-[90px] text-white font-bold text-[20px] rounded-t-[16px] pt-[3px] pb-[24px] px-[167px] transition-colors
                               ${isButtonDisabled ? 'bg-gray-20' : 'bg-primary-2'}`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}