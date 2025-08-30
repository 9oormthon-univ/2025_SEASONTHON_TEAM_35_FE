export default function AmountStep({ title, value, onChange, error, totalSteps, currentStep }) {
    const handleInputChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, '');
        if (isNaN(rawValue) && rawValue !== '') return;
        if (rawValue === '') {
            onChange('');
            return;
        }
        const formattedValue = Number(rawValue).toLocaleString('en-US');
        onChange(formattedValue);
    };

    const inputBorderColor = error ? 'border-error ring-error focus:ring-error' : 'border-gray-10 focus:ring-primary-1';

    return (
        <div className="p-5 pt-8">

            {/* 제목 -  mt 값 조절로 프로그레스바와 간격 결정  */}
            <h2 className="mt-1 mb-8 whitespace-pre-wrap text-2xl font-bold leading-tight">{title}</h2>

            {/* 입력창 */}
            <div>
                <div className="flex items-center">
                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder="금액을 입력해 주세요"
                        value={value}
                        onChange={handleInputChange}
                        className={`
                            flex-1 min-w-0 appearance-none rounded-xl border bg-white px-4 py-2 
                            h-[50px]
                            font-sans text-xl font-medium shadow-sm 
                            focus:outline-none focus:ring-1 
                            placeholder:text-base placeholder:font-light placeholder:text-gray-400
                            ${inputBorderColor}
                        `}
                    />
                    <span className="ml-4 text-2xl font-medium leading-tight">원</span>
                </div>

                {/* 에러 메시지 */}
                <div className="mt-3 ml-1 h-4">
                    {error && (
                        <p className="text-sm text-error">{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
}