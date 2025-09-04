import CustomRadio from './CustomRadio';
import ToggleCard from './ToggleCard';
import ToggleBox from "./ToggleBox.jsx";
import TogglePill from "./TogglePill.jsx";

export default function QuestionRenderer({ stepData, value, onChange }) {
    const { key, type, options = [] } = stepData;

    switch (type) {
        case 'radio':
            return (
                <div className="space-y-1">
                    {options.map((option) => (
                        <CustomRadio
                            key={option.value}
                            name={key}
                            option={option}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    ))}
                </div>
            );

        case 'toggle':
            // 모든 styleVariant에서 onClick이 onChange를 직접 호출하도록 수정
            if (stepData.styleVariant === 'card') {
                return (
                    <div className="space-y-3">
                        {options.map((option) => (
                            <ToggleCard
                                key={option.value}
                                option={option}
                                isSelected={value === option.value}
                                onClick={() => onChange(option.value)}
                            />
                        ))}
                    </div>
                );
            } else if (stepData.styleVariant === 'box') {
                return (
                    <div className="flex items-center gap-3">
                        {options.map((option) => (
                            <ToggleBox
                                key={option.value}
                                option={option}
                                isSelected={value === option.value}
                                onClick={() => onChange(option.value)}
                            />
                        ))}
                    </div>
                );
            } else if (stepData.styleVariant === 'pill') {
                return (
                    <div className="flex-col items-start inline-flex gap-2 ">
                        {options.map((option) => (
                            <TogglePill
                                key={option.value}
                                option={option}
                                isSelected={value === option.value}
                                onClick={onChange}
                            />
                        ))}
                    </div>
                );
            }
            return <div>기본 토글 UI</div>;

        default:
            return <div>알 수 없는 질문 타입입니다.</div>;
    }
}