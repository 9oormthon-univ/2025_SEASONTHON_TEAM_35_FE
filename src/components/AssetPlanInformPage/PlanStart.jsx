import React from 'react';

// '시작하기' 버튼 클릭 시 호출될 onStart 함수를 props로 받습니다.
export default function PlanStart({ onStart }) {
    const title = "AI 자산 설계를 통해\n자산을 관리해요";
    const keyword = "AI 자산 설계";
    const titleParts = title.split(keyword);

    return (
        <div className="flex flex-col h-full p-5 pt-16 text-center">
            {/* 상단 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="w-48 h-48 mb-8 bg-gray-10 rounded-full" /> {/* 임시 이미지 */}

                <h1 className="text-2xl font-bold whitespace-pre-wrap">
                    <span className="text-primary-1">{keyword}</span>
                    {titleParts[1]}
                </h1>

                <p className="mt-4 text-[18px] text-gray-40">
                    가장 알맞은 자산 비율을 찾아드려요.
                </p>
            </div>

            {/* 하단 버튼 영역 */}
            <div className="pb-5">
                <button
                    onClick={onStart}
                    className="w-full h-[60px] bg-primary-2 text-white font-bold text-lg rounded-xl"
                >
                    시작하기
                </button>
            </div>
        </div>
    );
}