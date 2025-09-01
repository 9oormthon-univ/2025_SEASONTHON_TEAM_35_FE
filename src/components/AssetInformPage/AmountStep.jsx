export default function AmountStep({ title, keyword, value, onChange, error }) {
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

    // ✨ 키워드를 기준으로 제목 텍스트를 분리합니다.
    const titleParts = keyword ? title.split(keyword) : [title];

    return (
        <div className="p-5 pt-8">
            {/* 제목 */}
            <h2 className="mt-1 mb-8 whitespace-pre-wrap text-2xl font-bold leading-tight">
                {/* keyword에는 강조 표시 */}
                {keyword ? (
                    <>
                        {titleParts[0]}
                        <span className="text-primary-1">{keyword}</span>
                        {titleParts[1]}
                    </>
                ) : (
                    title
                )}
            </h2>

            {/* 입력창 (이하 동일) */}
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
                <div className="mt-3 ml-1 h-4">
                    {error && (<p className="text-sm text-error">{error}</p>)}
                </div>
            </div>
        </div>
    );
}