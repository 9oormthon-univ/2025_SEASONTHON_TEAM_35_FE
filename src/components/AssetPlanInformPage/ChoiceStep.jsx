export default function ChoiceStep({ title, keyword, options = [], value, onChange }) {
    const titleParts = keyword ? title.split(keyword) : [title];
    const handleSelect = (opt) => onChange(opt.value);

    return (
        <div className="p-5 pt-8">
            <h2 className="mt-1 mb-6 whitespace-pre-wrap text-[24px] font-bold leading-tight tracking-wide ">
                {keyword ? (<>{titleParts[0]}<span className="text-primary-1">{keyword}</span>{titleParts[1]}</>) : title}
            </h2>

            <div className="grid grid-cols-2 gap-3">
                {options.map((opt) => {
                    const selected = value === opt.value;
                    return (
                        <button
                            key={opt.value}
                            onClick={() => handleSelect(opt)}
                            className={`rounded-xl border px-4 py-3 text-left
                ${selected ? 'border-primary-1 ring-1 ring-primary-1 bg-primary-1/5' : 'border-gray-10'}`}
                        >
                            <div className="font-semibold">{opt.label}</div>
                            {opt.desc && <div className="text-sm text-gray-500 mt-1">{opt.desc}</div>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
