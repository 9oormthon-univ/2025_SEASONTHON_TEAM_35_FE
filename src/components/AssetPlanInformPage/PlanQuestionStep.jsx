import React from 'react';
import QuestionRenderer from './QuestionRenderer';

export default function PlanQuestionStep({ stepData, value, onChange, error }) {

    return (
        // 👇 레이아웃 div와 h2를 모두 제거하고 QuestionRenderer만 남깁니다.
        <div>
            <QuestionRenderer
                stepData={stepData}
                value={value}
                onChange={onChange}
            />
            {error && <p className="mt-2 text-sm text-error">{error}</p>}
        </div>
    );
}