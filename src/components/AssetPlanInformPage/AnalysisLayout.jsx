import React from 'react';
import { useNavigate } from 'react-router-dom';

// 로딩/완료 화면의 공통 뼈대를 제공하는 컴포넌트
export default function AnalysisLayout({
                                           title,
                                           subtitle,
                                           buttonText,
                                           isButtonDisabled = false,
                                           onButtonClick,
                                           children // 로딩 중에만 보일 회색 박스들을 위한 prop
                                       }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full bg-white text-center">
            {/* 상단 컨텐츠 */}
            <div className="flex-1 mt-7 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold text-gray-90">{title}</h1>
                <p className="mt-4 text-base text-gray-40 whitespace-pre-wrap">{subtitle}</p>
            </div>

            {/* 로딩 시 회색 박스 */}
            <div className="mt-1">
                {children}
            </div>

            {/* 하단 버튼 */}
            <div className=" ">
                <button
                    onClick={onButtonClick || (() => navigate('/asset/main'))}
                    disabled={isButtonDisabled}
                    className={`w-full h-[90px] text-white font-bold text-[20px] rounded-t-[16px] pt-[1px] pb-[24px] px-[167px] transition-colors
                               ${isButtonDisabled ? 'bg-gray-20' : 'bg-primary-2'}`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}