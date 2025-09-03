import { Link } from 'react-router-dom';
import { useState } from 'react';

// 아이콘
import activeHomeIcon from '../../assets/Footer/active/homeIcon.png';
import activeAssetInformIcon from '../../assets/Footer/active/assetInformIcon.png';
import activeAssetPlanIcon from '../../assets/Footer/active/assetPlanIcon.png';
import activeGoalIcon from '../../assets/Footer/active/goalIcon.png';
import inactiveHomeIcon from '../../assets/Footer/inactive/homeIcon.png';
import inactiveAssetInformIcon from '../../assets/Footer/inactive/assetInformIcon.png';
import inactiveAssetPlanIcon from '../../assets/Footer/inactive/assetPlanIcon.png';
import inactiveGoalIcon from '../../assets/Footer/inactive/goalIcon.png';

const FOOTER_TAB = [
  {
    title: '홈',
    link: '',
    activeIcon: activeHomeIcon,
    inactiveIcon: inactiveHomeIcon,
  },
  {
    title: '자산 정보',
    link: '',
    activeIcon: activeAssetInformIcon,
    inactiveIcon: inactiveAssetInformIcon,
  },
  {
    title: 'AI 자산 설계',
    link: '',
    activeIcon: activeAssetPlanIcon,
    inactiveIcon: inactiveAssetPlanIcon,
  },
  {
    title: '목표 관리',
    link: '/goal-setting',
    activeIcon: activeGoalIcon,
    inactiveIcon: inactiveGoalIcon,
  },
];

export default function Footer() {
  const [onClicked, setOnClicked] = useState('홈');
  return (
    <div className="w-[393px] h-[90px] bg-white flex pl-[32px] pr-[24.5px] pt-[12px] justify-between border-t-[0.5px] border-gray-5 shadow-[0_0_4px_rgba(146,0,0,0.05)] absolute bottom-0">
      {FOOTER_TAB.map((item, idx) => (
        <Link
          key={idx}
          to={item.link}
          onClick={() => setOnClicked(item.title)}
          className="flex flex-col items-center gap-[7px]"
        >
          <img
            src={onClicked === item.title ? item.activeIcon : item.inactiveIcon}
            alt="tabIcon"
            className="w-[24px] h-[24px]"
          />
          <h1
            className={`text-[12px] font-medium ${
              onClicked === item.title ? 'text-primary-2' : 'text-gray-20'
            }`}
          >
            {item.title}
          </h1>
        </Link>
      ))}
    </div>
  );
}
