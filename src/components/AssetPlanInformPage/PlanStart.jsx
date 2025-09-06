import React from 'react';
import assetPlan from "@/assets/AssetPlanInform/assetplan.png";

export default function PlanStart({ title, keyword, subtitle, onStart }) {
    const titleParts = title.split(keyword);

    return (
        <div className="flex flex-col h-full bg-white relative">
            <div className="flex-1">
                <div className="p-5 pt-8">
                    <h1 className="mt-7 mb-4 whitespace-pre-wrap text-2xl font-bold leading-tight">
                        {titleParts[0]}
                        <span className="text-primary-1">{keyword}</span>
                        {titleParts[1]}
                    </h1>
                    <p className="mt-2 text-[18px] text-gray-40">{subtitle}</p>
                </div>
            </div>

            <div className="flex-grow flex justify-center items-center mb-[200px] ">
                <img className="h-[240px] w-[230px]" src={assetPlan} alt='asset'/>
            </div>

            <div className="absolute bottom-[50px] left-4 right-0">
                   <button
                     type="button"
                     onClick={(e) => { e.preventDefault(); e.stopPropagation(); onStart?.(); }}
                     className="flex items-center justify-center w-[353px] h-[55px] bg-primary-2 text-white font-bold text-[20px] rounded-[12px]"
                   >
                     시작하기
                   </button>
            </div>
        </div>
    );
}