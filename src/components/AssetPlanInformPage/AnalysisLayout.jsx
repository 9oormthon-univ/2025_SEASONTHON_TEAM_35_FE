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
            {/* 버튼을 제외한 전체 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col">

                {/* 1. 상단 컨텐츠: 제목과 아이콘 (위치 고정) */}
                <div className="pt-60">
                    <div className="w-20 h-20 mx-auto flex items-center justify-center">
                        {icon}
                    </div>
                    <h1 className="pt-10 text-2xl font-bold text-gray-90">{title}</h1>
                    <p className="mt-4 text-base text-gray-40 whitespace-pre-wrap">{subtitle}</p>
                </div>

                {/* 2. 중간 컨텐츠: 회색 박스 (남는 공간 차지) */}
                {/* 이 영역이 남은 공간을 모두 차지하며, 내부 컨텐츠를 위쪽(justify-start)으로 정렬합니다. */}
                <div className="flex-1 flex flex-col justify-start mt-5">
                    {children}
                </div>

            </div>

            {/* 하단 버튼 */}
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