import React from 'react';
import BaseWizard from '../common/wizard/BaseWizard';
import FormStep from './FormStep'; // 같은 폴더에 있는 FormStep을 import

export default function UserInformWizard(props) {
    return (
        <BaseWizard
            {...props}
            // 👇 사용자 정보 입력은 'plan' 페이로드와 유사한 플랫 객체를 사용
            payloadType="plan"
            renderStep={({ stepData, value, onChange, error }) => (
                <FormStep
                    stepData={stepData}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            )}
        />
    );
}