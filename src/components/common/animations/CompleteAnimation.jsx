import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../../assets/lottie/complete.json";

export default function CompleteAnimation() {
    return (
        <div className="flex justify-center items-center">
            <Player
                autoplay
                loop={2}             // 반복 X, 한 번만 실행
                src={animationData}      // JSON 파일 불러오기
                style={{ height: "200px", width: "200px" }}
            />
        </div>
    );
}
