// import { useRef, useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
//
// // 온보딩 페이지 라우트와 해당 인덱스 매핑
// const onboardingRoutes = {
//     '/onboarding/1': 1,
//     '/onboarding/2': 2,
//     '/onboarding/3': 3,
//     '/onboarding/final': 4,
// };
//
// export function usePageTransitionDirection() {
//     const location = useLocation();
//     const [direction, setDirection] = useState(0);
//     const prevLocationRef = useRef(location);
//
//     useEffect(() => {
//         const currentPath = location.pathname;
//         const prevPath = prevLocationRef.current.pathname;
//
//         const currentIdx = onboardingRoutes[currentPath] || 0;
//         const prevIdx = onboardingRoutes[prevPath] || 0;
//
//         if (currentIdx > prevIdx) {
//             setDirection(1); // 다음 페이지로 이동
//         } else if (currentIdx < prevIdx) {
//             setDirection(-1); // 이전 페이지로 이동
//         } else {
//             setDirection(0); // 새로고침, 직접 URL 입력 등
//         }
//
//         prevLocationRef.current = location;
//     }, [location]);
//
//     return direction;
// }