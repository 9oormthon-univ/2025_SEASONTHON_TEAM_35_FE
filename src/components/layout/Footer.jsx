import { Link, useLocation } from 'react-router-dom';

// 아이콘
import activeHomeIcon from '../../assets/Footer/active/homeIcon.png';
import activeAssetInformIcon from '../../assets/Footer/active/assetInformIcon.png';
import activeAssetPlanIcon from '../../assets/Footer/active/assetPlanIcon.png';
import activeGoalIcon from '../../assets/Footer/active/goalIcon.png';
import inactiveHomeIcon from '../../assets/Footer/inactive/homeIcon.png';
import inactiveAssetInformIcon from '../../assets/Footer/inactive/assetInformIcon.png';
import inactiveAssetPlanIcon from '../../assets/Footer/inactive/assetPlanIcon.png';
import inactiveGoalIcon from '../../assets/Footer/inactive/goalIcon.png';

// 임시 경로!!(테스트용)
const FOOTER_TAB = [
  {
    title: '홈',
    link: '/home',
    activeIcon: activeHomeIcon,
    inactiveIcon: inactiveHomeIcon,
  },
  {
    title: '자산 정보',
    link: '/asset/main',
    activeIcon: activeAssetInformIcon,
    inactiveIcon: inactiveAssetInformIcon,
  },
  {
    title: 'AI 자산 설계',
    link: '/home/AI-asset-plan',
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
  const { pathname } = useLocation();
  return (
    <div className="w-[390px] h-[90px] bg-white flex pl-[32px] pr-[24.5px] pt-[12px] justify-between border-t-[0.5px] border-gray-5 shadow-[0_0_4px_rgba(146,0,0,0.05)] absolute bottom-0">
      {FOOTER_TAB.map((item, idx) => (
        <Link
          key={idx}
          to={item.link}
          className="flex flex-col items-center gap-[7px]"
        >
          <img
            src={pathname === item.link ? item.activeIcon : item.inactiveIcon}
            alt="tabIcon"
            className="w-[24px] h-[24px]"
          />
          <h1
            className={`text-[12px] font-medium ${
              pathname === item.link ? 'text-primary-2' : 'text-gray-20'
            }`}
          >
            {item.title}
          </h1>
        </Link>
      ))}
    </div>
  );
}
