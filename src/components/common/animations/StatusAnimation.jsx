import { useEffect, useMemo } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingJSON from '@/assets/lottie/loading.json';
import completeJSON from '@/assets/lottie/complete.json';

// props:
// - type: 'loading' | 'complete'
// - size: px (기본 200)
// - loop: 강제 반복 여부(기본: loading=무한, complete=1회)
// - className: 외부 레이아웃 제어
export default function StatusAnimation({
                                            type = 'loading',
                                            size = 180,
                                            loop,
                                            className = 'flex items-center justify-center',
                                            ariaLabel,
                                        }) {
    const src = type === 'complete' ? completeJSON : loadingJSON;

    // type별 기본 loop 동작
    const resolvedLoop = useMemo(() => {
        if (typeof loop === 'boolean') return loop;
        return type === 'loading'; // loading: 무한반복 / complete: 1회
    }, [loop, type]);

    // 접근성: 모션 축소 환경 존중
    useEffect(() => {
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        // 필요 시 reduce면 재생/반복을 제한하는 추가 로직도 가능
    }, []);

    return (
        <div className={className} aria-label={ariaLabel ?? (type === 'loading' ? '로딩 중' : '완료')}>
            <Player
                autoplay
                loop={resolvedLoop}
                src={src}
                style={{ width: `${size}px`, height: `${size}px` }}
                keepLastFrame={type === 'complete'} // 완료 애니메이션 종료 프레임 유지
            />
        </div>
    );
}
