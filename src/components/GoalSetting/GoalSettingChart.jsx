import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useMotionValueEvent,
} from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GoalSettingChart() {
  const value = 12000000;
  const max = 20000000;
  const percentage = (value / max) * 100;

  // MotionValue로 애니메이션 제어
  const progress = useMotionValue(0);

  // 스프링 애니메이션
  const spring = useSpring(progress, {
    stiffness: 700,
    damping: 700,
  });

  // 금액 변환 (MotionValue → 금액)
  const animatedMoney = useTransform(spring, (val) =>
    Math.round((val / 100) * max)
  );

  // 실제 표시할 숫자 상태값
  const [displayPercent, setDisplayPercent] = useState(0);
  const [displayMoney, setDisplayMoney] = useState(0);

  // MotionValue 변경될 때마다 state 업데이트
  useMotionValueEvent(spring, 'change', (val) => {
    setDisplayPercent(Math.round(val));
  });
  useMotionValueEvent(animatedMoney, 'change', (val) => {
    setDisplayMoney(val);
  });

  useEffect(() => {
    // 0 → percentage까지 애니메이션
    animate(progress, percentage, {
      duration: 0.5,
      ease: 'easeInOut',
    });
  }, [percentage]);

  return (
    <div className="h-[261px] p-[20px] flex flex-col gap-[20px] mb-[16px]">
      <div className="flex flex-col">
        <p className="text-gray-40 text-[14px] font-bold">1년 동안</p>
        <h1 className="text-gray-80 text-[20px] font-bold">
          목표 금액의 <span className="text-primary-1">{displayPercent}%</span>{' '}
          를 달성했어요
        </h1>
      </div>

      {/* ✅ 게이지 차트 */}
      <div className="w-[282px] h-[153px] relative self-center">
        <CircularProgressbar
          value={displayPercent}
          circleRatio={0.5}
          strokeWidth={5}
          styles={buildStyles({
            rotation: 0.75,
            strokeLinecap: 'round',
            pathColor: '#00D6B3',
            trailColor: '#D7DDE1',
          })}
        />

        {/* ✅ 중앙 텍스트 */}
        <div className="absolute top-[95px] left-1/2 flex flex-col items-center -translate-x-1/2 -translate-y-1/3">
          <span className="text-[12px] font-bold text-[#00BA9B]">
            결혼 자금
          </span>
          <span className="relative font-bold text-[24px]">
            <span className="bg-[#99EFE1] absolute left-0 bottom-[3px] w-full h-[13px] -z-10"></span>
            {displayMoney.toLocaleString()}
          </span>
          <span className="text-[16px] text-[#A7AEB3]">
            / {max.toLocaleString()} 원
          </span>
        </div>
      </div>
    </div>
  );
}
