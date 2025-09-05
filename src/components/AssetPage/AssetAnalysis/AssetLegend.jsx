import cashIcon from '../../../assets/AssetPage/cash.png';
import depositIcon from '../../../assets/AssetPage/deposit.png';
import savingsIcon from '../../../assets/AssetPage/savings.png';
import investmentIcon from '../../../assets/AssetPage/investment.png';
import etcIcon from '../../../assets/AssetPage/etc.png';

const ICONS = {
    cash: cashIcon,
    deposit: depositIcon,
    savings: savingsIcon,
    investment: investmentIcon,
    etc: etcIcon,
};

export default function AssetLegend({ items, isReady }) {
    return (
        <div className="mt-3">
            {items.map((item, index) => (
                <div
                    key={item.key}
                    className={`flex items-center py-[8px] px-1 ${index < items.length - 1 ? 'border-b border-gray-10' : ''}`}
                    // 모션 추가 (처음 나올 때)
                    style={{
                        opacity: isReady ? 1 : 0,
                        transform: isReady ? 'translateY(0px)' : 'translateY(4px)',
                        transition: 'opacity 420ms ease, transform 420ms ease',
                        transitionDelay: `${200 + index * 50}ms`,
                    }}
                >
                    <img src={ICONS[item.key]} alt={item.name} className="w-6 h-6 mr-4" />
                    <div className="leading-tight">
                        <span className="text-[12px] font-semibold text-gray-100">{item.name}</span>
                        <div className="text-[12px] text-gray-30">({(item.ratio ?? 0).toFixed(1)}%)</div>
                    </div>
                    <span className="ml-auto text-[12px] text-gray-100 font-semibold mr-4">
                        {(item.amount ?? 0).toLocaleString('en-US')} 원
                    </span>
                </div>
            ))}
        </div>
    );
}
