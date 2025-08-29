export default function AmountStep({ title, value, onChange }) {
    const handleInputChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, '');
        if (isNaN(rawValue) && rawValue !== '') {
            return;
        }
        if (rawValue === '') {
            onChange('');
            return;
        }
        const formattedValue = Number(rawValue).toLocaleString('en-US');
        onChange(formattedValue);
    };

    return (
        <section className="flex h-[400px] flex-col justify-center bg-white text-start">
            <h2 className="mb-10 whitespace-pre-wrap text-2xl font-bold leading-tight">{title}</h2>

            {/* 입력란과 '원' 글자를 flex로 묶어둠*/}
            <div className="flex items-center">
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={value}
                    onChange={handleInputChange}
                    //너비 85%로 잡아둠
                    className="flex-2 min-w-1 appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 font-sans text-2xl font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-2"
                />
                {/* 원  컴포넌트  스타일 */}
                <span className="ml-4 text-2xl font-medium leading-tight ">
                    원
                </span>
            </div>

            <p className="mt-3 ml-1 text-sm text-gray-400">없으면 0을 입력해주세요.</p>
        </section>
    );
}