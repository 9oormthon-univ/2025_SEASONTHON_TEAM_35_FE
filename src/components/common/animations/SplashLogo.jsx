import { Player } from '@lottiefiles/react-lottie-player';
import splashlogoJSON from '@/assets/lottie/Splash_Logo.json';

// props:
// - className: 외부 레이아웃 제어
export default function SplashLogo({
                                       size = 140,
                                       className = 'flex items-center justify-center pt-[180px] ',
                                       speed = 0.9,
                                   }) {
    const src =splashlogoJSON

    return (
        <div className={className} >
            <Player
                autoplay
                src={src}
                speed={speed}
                style={{ width: `${size}px`, height: `${size}px` }}
                keepLastFrame
            />
        </div>
    );
}
