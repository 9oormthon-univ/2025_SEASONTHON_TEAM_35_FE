import React from 'react';

// Wizard의 내용(content) 영역만 담당하는 컴포넌트입니다.
export default function PlanStartStep({ stepData }) {
    const { title, keyword, subtitle } = stepData;
    const titleParts = title.split(keyword);

    return (
        <div className="flex flex-col h-full p-5 pt-8 text-center">
            {/* 상단 텍스트 영역 */}
            <h1 className="text-2xl font-bold whitespace-pre-wrap leading-tight">
                {titleParts[0]}
                <span className="text-primary-1">{keyword}</span>
                {titleParts[1]}
            </h1>
            <p className="mt-4 text-[18px] text-gray-40">
                {subtitle}
            </p>


        </div>
    );
}