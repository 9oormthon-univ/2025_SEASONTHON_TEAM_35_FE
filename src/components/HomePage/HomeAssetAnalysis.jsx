import { useEffect, useMemo, useState } from 'react';
import { useHome } from '@/context/HomeContext.jsx';
import RatioBar from '../AssetPage/AssetAnalysis/RatioBar.jsx';

const COLOR_CLASS = {
    cash: 'bg-primary-2',
    deposit: 'bg-sub-1',
    saving: 'bg-sub-2',
    invest: 'bg-sub-3',
    etc: 'bg-gray-5',
};

// 범례용 고정 데이터 (항상 5개 노출)
const LEGEND = [
    { key: 'cash',   label: '현금',  colorClass: COLOR_CLASS.cash },
    { key: 'deposit',label: '예금',  colorClass: COLOR_CLASS.deposit },
    { key: 'saving', label: '적금',  colorClass: COLOR_CLASS.saving },
    { key: 'invest', label: '투자',  colorClass: COLOR_CLASS.invest },
    { key: 'etc',    label: '기타',  colorClass: COLOR_CLASS.etc },
];

export default function HomeAssetAnalysis() {
    const { loading, error, home } = useHome();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (reduceMotion) { setIsReady(true); return; }
        const t = requestAnimationFrame(() => setIsReady(true));
        return () => cancelAnimationFrame(t);
    }, []);

    const items = useMemo(() => {
        if (!home) return [];
        return [
            { key: 'cash',    name: '현금', ratio: home.cashRatio,    colorClass: COLOR_CLASS.cash },
            { key: 'deposit', name: '예금', ratio: home.depositRatio, colorClass: COLOR_CLASS.deposit },
            { key: 'saving',  name: '적금', ratio: home.savingRatio,  colorClass: COLOR_CLASS.saving },
            { key: 'invest',  name: '투자', ratio: home.investRatio,  colorClass: COLOR_CLASS.invest },
            { key: 'etc',     name: '기타', ratio: home.etcRatio,     colorClass: COLOR_CLASS.etc },
        ];
    }, [home]);

    if (loading) return (
        <div className="w-[353px] h-[98px] bg-white rounded-xl shadow-sm flex items-center justify-center">
            <p className="text-gray-400 text-sm">자산 비율 불러오는 중…</p>
        </div>
    );
    if (error) return (
        <div className="w-[353px] h-[98px] bg-white rounded-xl shadow-sm flex items-center justify-center">
            <p className="text-red-500 text-sm">자산 비율을 불러오지 못했어요.</p>
        </div>
    );

    return (
        <div className="w-[353px] flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h2 className="text-base font-bold pl-[4px]">자산 분석</h2>
            </div>

            <div className="w-[353px] bg-white rounded-xl shadow-sm p-4">
                <RatioBar items={items} isReady={isReady} />

                <div className="mt-3 grid grid-cols-5 pl-1 pr-12">
                    {LEGEND.map(({ key, label, colorClass }) => (
                        <div key={key} className="flex items-center justify-start gap-2">
                            <span className={`w-2 h-2 rounded-full ${colorClass}`} aria-hidden="true" />
                            <span className="text-[12px] text-gray-60">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
