import React from 'react';
import {Link} from "react-router-dom";

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
                    <p className="mt-2 text-[18px] text-gray-40">
                        {subtitle}
                    </p>
                </div>
            </div>

            <div className="absolute bottom-[150px] left-4 right-0">
                <Link
                    to="/ai/plan/inform"
                    className="flex items-center justify-center w-[353px] h-[55px] bg-primary-2 text-white font-bold text-[20px] rounded-[12px] "
                >
                    시작하기
                </Link>
            </div>
        </div>
    );
}