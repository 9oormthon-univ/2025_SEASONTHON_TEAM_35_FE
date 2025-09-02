import React from 'react';
import QuestionRenderer from './QuestionRenderer';

export default function PlanQuestionStep({ stepData, value, onChange, error }) {
    const { keyword, title } = stepData;
    const titleParts = keyword ? title.split(keyword) : [title];

    return (
        <div className="p-5 pt-8">
            {/* 제목 부분은 그대로 유지됩니다. */}
            <h2 className="mt-1 mb-8 whitespace-pre-wrap text-2xl font-bold leading-tight">
                {keyword ? (
                    <>
                        {titleParts[0]}<span className="text-primary-1">{keyword}</span>{titleParts[1]}
                    </>
                ) : (
                    title
                )}
            </h2>

            {/* 렌더링 로직은 QuestionRenderer에서 정의*/}
            <div>
                <QuestionRenderer
                    stepData={stepData}
                    value={value}
                    onChange={onChange}
                />
                {error && <p className="mt-2 text-sm text-error">{error}</p>}
            </div>
        </div>
    );
}