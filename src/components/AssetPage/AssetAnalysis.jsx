import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAssets } from '../../context/AssetContext.jsx';
import goIcon from '../../assets/icons/goIcon.png';
import fixIcon from '../../assets/icons/fix.png';
// 자산 key에 맞는 이름과 색상을 매핑하는 객체
const ASSET_DETAILS = {
    cash: { name: '예금 및 현금', color: '#00E8C0' },
    stock: { name: '투자', color: '#58A9FF' },
    bitcoin: { name: '투자', color: '#58A9FF' },
    bond: { name: '투자', color: '#58A9FF' },
    etf: { name: '투자', color: '#58A9FF' },
    etc: { name: '기타 자산', color: '#FFD562' },
};

export default function AssetAnalysis() {
    const { assetData, loading } = useAssets();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (reduceMotion) {
            setIsReady(true);
            return;
        }
        const t = requestAnimationFrame(() => setIsReady(true));
        return () => cancelAnimationFrame(t);
    }, []);

    if (loading || !assetData) {
        return null;
    }

    // Context의 데이터를 UI에 필요한 형태로 가공
    const analysisData = [
        {
            name: '예금 및 현금',
            amount: assetData.amounts?.cash || 0,
            value: assetData.ratios?.cash || 0,
            color: ASSET_DETAILS.cash.color,
            mode: 'cash'
        },
        {
            name: '투자',
            amount: (assetData.amounts?.stock || 0) + (assetData.amounts?.bitcoin || 0) + (assetData.amounts?.bond || 0) + (assetData.amounts?.etf || 0),
            value: (assetData.ratios?.stock || 0) + (assetData.ratios?.bitcoin || 0) + (assetData.ratios?.bond || 0) + (assetData.ratios?.etf || 0),
            color: ASSET_DETAILS.stock.color,
            mode: 'investment'
        },
        {
            name: '기타 자산',
            amount: assetData.amounts?.etc || 0,
            value: assetData.ratios?.etc || 0,
            color: ASSET_DETAILS.etc.color,
            mode: 'etc'
        },
    ].filter(item => item.amount > 0);

    return (
        <div className="w-[353px] flex flex-col gap-2">
            {/* 헤더 */}
            <div className="flex justify-between items-center">
                <h2 className="text-base font-bold pl-[4px]">자산 분석</h2>
                <Link to="/asset/edit/all" className="flex items-center text-[12px] text-gray-40 pr-1">
                    <span>전체 수정</span>
                    <img src={goIcon} alt="수정하기" className="w-1 h-2 ml-2" />
                </Link>
            </div>

            <div className="w-[353px] min-h-[178px] bg-white rounded-xl shadow-sm p-4">
                {/* 자산 비율 */}
                <p className="text-[12px] font-semibold text-gray-50 mb-2">자산 비율</p>

                {/* 비율 막대 그래프 (모션) */}
                <div className="w-full h-[24px] flex rounded-[3px] overflow-hidden">
                    {analysisData.map((item, i) => (
                        <div
                            key={item.name}
                            className="h-full"
                            style={{
                                backgroundColor: item.color,
                                width: isReady ? `${item.value}%` : '0%',
                                // 막대 사이에 미세한 간격을 주기 위한 트릭
                                marginRight: i < analysisData.length - 1 ? '2px' : '0px',
                                transitionProperty: 'width',
                                transitionDuration: '900ms',
                                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                                transitionDelay: `${i * 70}ms`,
                            }}
                            aria-label={`${item.name} ${item.value}%`}
                        />
                    ))}
                </div>

                {/* 항목별 범례 리스트 */}
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
                                {/* 숫자에 콤마를 추가하는 로직 적용 */}
                                {item.amount.toLocaleString('en-US')} 원
                            </span>
                            {/* 수정 페이지로 가는 링크 경로 수정 */}
                            <Link to={`/asset/edit/${item.mode}`}>
                                <img src={fixIcon} alt="수정하기" className="w-[10px] h-[10px] cursor-pointer" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}