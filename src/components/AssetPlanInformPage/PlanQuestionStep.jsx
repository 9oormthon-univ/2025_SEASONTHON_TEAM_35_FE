import React from 'react';
import QuestionRenderer from './QuestionRenderer';

export default function PlanQuestionStep({ stepData, value, onChange, error }) {

    return (
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