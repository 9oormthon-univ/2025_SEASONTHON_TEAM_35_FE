import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAssets } from '../../context/AssetContext.jsx';
import fixIcon from '../../assets/icons/fix.png';

// 색상 토큰 매핑
const COLORS = {
    cash:       { class: 'bg-primary-2' },
    deposit:    { class: 'bg-sub-1' },
    savings:    { class: 'bg-sub-2' },
    investment: { class: 'bg-sub-3' },
    etc:        { class: 'bg-gray-5' },
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

    if (loading || !assetData) return null;

    const analysisData = assetData.mainAssets; // 👈 이제 가공된 데이터를 바로 사용

    return (
        <div className="w-[353px] flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h2 className="text-base font-bold pl-[4px]">자산 분석</h2>
            </div>

            <div className="w-[353px] min-h-[250px] bg-white rounded-xl shadow-sm p-4">
                <p className="text-[12px] font-semibold text-gray-50 mb-2">자산 비율</p>

                {/* 비율 막대 그래프 */}
                <div className="w-full h-[24px] flex rounded-[3px] overflow-hidden">
                    {analysisData.map((item, i) => {
                        const token = COLORS[item.colorKey];
                        return (
                            <div
                                key={item.key}
                                className={`h-full ${token.class ?? ''}`}
                                style={{
                                    // backgroundColor: token.var,  ❌ 제거
                                    width: isReady ? `${item.ratio}%` : '0%',
                                    marginRight: i < analysisData.length - 1 ? '2px' : '0px',
                                    transitionProperty: 'width',
                                    transitionDuration: '900ms',
                                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                                    transitionDelay: `${i * 70}ms`,
                                }}
                                aria-label={`${item.name} ${item.ratio}%`}
                            />
                        );
                    })}
                </div>

                {/* 범례 */}
                <div className="mt-3">
                    {analysisData.map((item, index) => {
                        const token = COLORS[item.colorKey];
                        return (
                            <div
                                key={item.key}
                                className={`flex items-center py-[6px] px-1 ${index < analysisData.length - 1 ? 'border-b border-gray-10' : ''}`}
                                style={{
                                    opacity: isReady ? 1 : 0,
                                    transform: isReady ? 'translateY(0px)' : 'translateY(4px)',
                                    transition: 'opacity 420ms ease, transform 420ms ease',
                                    transitionDelay: `${200 + index * 50}ms`,
                                }}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full mr-4 ${token.class ?? ''}`}
                                    style={{ backgroundColor: token.var }}
                                />
                                <div>
                                    <span className="text-[12px] font-semibold text-gray-100">{item.name}</span>
                                    <div className="text-[12px] text-gray-30">({(item.ratio ?? 0).toFixed(1)}%)</div>
                                </div>
                                <span className="ml-auto text-sm text-gray-100 font-medium mr-4">
                  {(item.amount ?? 0).toLocaleString('en-US')} 원
                </span>

                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
