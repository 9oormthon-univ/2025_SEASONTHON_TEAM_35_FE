import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import goIcon from '../../assets/icons/goIcon.png';

// 임시 데이터
const analysisData = [
    { name: '예금 및 현금', value: 60.0, amount: '7,200,000', color: '#00E8C0' },
    { name: '투자', value: 30.0, amount: '3,600,000', color: '#58A9FF' },
    { name: '기타 자산', value: 10.0, amount: '1,200,000', color: '#FFD562' },
];

export default function AssetAnalysis() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // 사용자 환경설정에 'reduce motion'이 켜져있으면 애니메이션 생략
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (reduceMotion) {
            setIsReady(true);
            return;
        }
        const t = requestAnimationFrame(() => setIsReady(true));
        return () => cancelAnimationFrame(t);
    }, []);

    return (
        <div className="w-[361px] flex flex-col gap-2">
            {/* 헤더 */}
            <div className="flex justify-between items-center">
                <h2 className="text-base text-gray-100 font-bold pl-[4px]">자산 분석</h2>
                <Link
                    to="/asset-input"
                    className="flex items-center text-xs text-gray-40 pr-[4px] gap-[8px]"
                >
                    수정하기
                    <img src={goIcon} alt="상세보기" className="w-[4px] h-[8px] cursor-pointer" />
                </Link>
            </div>

            {/* 컨텐츠 카드 */}
            <div className="w-[361px] h-[244px] bg-white rounded-xl shadow-sm p-4">
                {/* 자산 비율 */}
                <p className="text-[12px] font-semibold text-gray-50 mb-2">자산 비율</p>

                {/* 비율 막대 그래프 (등장 모션) */}
                <div className="w-[321px] h-[24px] flex rounded-[3px] overflow-hidden space-x-[3px]">
                    {analysisData.map((item, i) => (
                        <div
                            key={item.name}
                            className="h-full"
                            style={{
                                backgroundColor: item.color,
                                width: isReady ? `${item.value}%` : '0%',
                                transitionProperty: 'width',
                                transitionDuration: '900ms',
                                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', // easeOutCubic-ish
                                transitionDelay: `${i * 70}ms`,
                            }}
                            aria-label={`${item.name} ${item.value}%`}
                        />
                    ))}
                </div>

                {/* 항목별 범례 리스트 (옵션: 살짝 페이드 인) */}
                <div className="mt-3">
                    {analysisData.map((item, index) => (
                        <div
                            key={item.name}
                            className={`flex items-center py-2 px-1 ${
                                index < analysisData.length - 1 ? 'border-b border-gray-10' : ''
                            }`}
                            style={{
                                opacity: isReady ? 1 : 0,
                                transform: isReady ? 'translateY(0px)' : 'translateY(4px)',
                                transition: 'opacity 420ms ease, transform 420ms ease',
                                transitionDelay: `${200 + index * 50}ms`,
                            }}
                        >
                            <div
                                className="w-2 h-2 rounded-full mr-4"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-[12px] font-medium text-gray-100">{item.name}</span>
                            <span className="ml-1 text-[12px] text-gray-30">({item.value.toFixed(1)}%)</span>
                            <span className="ml-auto text-sm text-gray-100 font-medium mr-4">
                {item.amount} 원
              </span>
                            <Link to={`/asset-details/${item.name}`}>
                                <img src={goIcon} alt="상세보기" className="w-[4px] h-[8px] cursor-pointer" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* AI 자산 설계 보기 링크 */}
                <div className="text-center mt-2">
                    <Link to="/ai-asset-design" className="text-xs text-gray-40">
                        AI 자산 설계 보기 &gt;
                    </Link>
                </div>
            </div>
        </div>
    );
}
