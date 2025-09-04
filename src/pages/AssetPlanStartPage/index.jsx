import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WizardHeader from '../../components/common/WizardHeader';

export default function AssetPlanStartPage() {
    const navigate = useNavigate();
    const title = "AI 자산 설계를 통해\n자산을 관리해요";
    const keyword = "AI 자산 설계";
    const subtitle = "가장 알맞은 자산 비율을 찾아드려요.";
    const titleParts = title.split(keyword);

    return (
        <div className="flex flex-col h-full bg-white relative">
            <WizardHeader showPrevButton={true} onClose={() => navigate('/asset/main')} />

            {/* 컨텐츠 영역 */}
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

            <div className="absolute bottom-8 left-4 right-0">
                <Link
                    to="/ai/plan/inform"
                    className="flex items-center justify-center w-[353px]  h-[55px] bg-primary-2 text-white font-bold text-[20px] rounded-[12px]   "
                >
                    시작하기
                </Link>
            </div>
        </div>
    );
}