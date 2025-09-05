import { useEffect, useMemo, useState } from 'react';
import { useAssets } from '../../context/AssetContext.jsx';
import RatioBar from './AssetAnalysis/RatioBar.jsx';
import AssetLegend from './AssetAnalysis/AssetLegend.jsx';

// Tailwind 색상 매핑만 유지
const COLOR_CLASS = {
    cash: 'bg-primary-2',
    deposit: 'bg-sub-1',
    savings: 'bg-sub-2',
    investment: 'bg-sub-3',
    etc: 'bg-gray-5',
};

export default function AssetAnalysis() {
    const { assetData, loading } = useAssets();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (reduceMotion) { setIsReady(true); return; }
        const t = requestAnimationFrame(() => setIsReady(true));
        return () => cancelAnimationFrame(t);
    }, []);

    // 자식들이 바로 쓸 수 있도록 colorClass를 주입해서 내려줌
    const items = useMemo(() => {
        // 1. assetData나 assetData.mainAssets가 없을 경우, 빈 배열을 반환하여 에러를 방지합니다.
        if (!assetData?.mainAssets) {
            return [];
        }
        // 2. 데이터가 있을 때만 map 함수를 실행합니다.
        return assetData.mainAssets.map(a => ({ ...a, colorClass: COLOR_CLASS[a.colorKey] }));
    }, [assetData]); // 3. 의존성 배열을 assetData 전체로 변경합니다.

    if (loading || !assetData) return null;

    return (
        <div className="w-[353px] flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h2 className="text-base font-bold pl-[4px]">자산 분석</h2>
            </div>

            <div className="w-[353px] h-[354px] bg-white rounded-xl shadow-sm p-4">
                <p className="text-[12px] font-semibold text-gray-50 mb-2">자산 비율</p>

                <RatioBar items={items} isReady={isReady} />
                <AssetLegend items={items} isReady={isReady} />
            </div>
        </div>
    );
}
