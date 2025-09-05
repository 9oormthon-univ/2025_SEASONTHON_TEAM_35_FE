export default function RatioBar({ items, isReady }) {
    return (
        <div className="mt-3 w-full h-[24px] flex rounded-[4px] overflow-hidden">
            {items.map((item, i) => (
                <div
                    key={item.key}
                    className={`h-full ${item.colorClass ?? ''}`}
                    style={{
                        width: isReady ? `${item.ratio}%` : '0%',
                        marginRight: i < items.length - 1 ? '2px' : '0px',
                        transitionProperty: 'width',
                        transitionDuration: '900ms',
                        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        transitionDelay: `${i * 70}ms`,
                    }}
                    aria-label={`${item.name} ${item.ratio}%`}
                />
            ))}
        </div>
    );
}
