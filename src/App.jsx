import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Layout from "@/components/layout/Layout.jsx";
import { AssetProvider } from "./context/AssetContext.jsx";

//page import (추후 파일로 정리)
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import GoalSettingPage from './pages/GoalSettingPage';
import AIAssetPlanPage from './pages/AIAssetPlanPage';
import ETFExplanation from './pages/AIAssetPlanPage/ETFExplanation';
import AssetPage from "./pages/AssetPage/index.jsx";
import AssetPlanInformPage from "./pages/AssetPlanInformPage/index.jsx";
import UserInformPage from "@/pages/UserInformPage/index.jsx";
import UserInformResultPage from "@/pages/UserInformResultPage/index.jsx";
import AssetPlanStartPage from "@/pages/AssetPlanStartPage/index.jsx";
import AssetPlanResultPage from "@/pages/AssetPlanResultPage/index.jsx";
import SplashPage from "@/pages/SplashPage/index.jsx";
import OnBoardingPage1 from "@/pages/OnBoardingPage/OnBoardingPage1.jsx";
import OnBoardingPage2 from "@/pages/OnBoardingPage/OnBoardingPage2.jsx";
import OnBoardingPage3 from "@/pages/OnBoardingPage/OnBoarding3.jsx";
import OnBoardingFinal from "@/pages/OnBoardingPage/OnBoardingFinal.jsx";

function AnimatedRoutes() {
  const location = useLocation();

  return (
      // AnimatePresence 페이지 간 전환 인식하고 애니메이션 적용해주는 역할
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding/1" element={<OnBoardingPage1 />} />
          <Route path="/onboarding/2" element={<OnBoardingPage2 />} />
          <Route path="/onboarding/3" element={<OnBoardingPage3 />} />
          <Route path="/onboarding/final" element={<OnBoardingFinal />} />
          <Route path="/home" element={<Layout title="홈"><HomePage /></Layout>} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/asset/main" element={<AssetPage />} />
          <Route path="/user/inform" element={<UserInformPage />} />
          <Route path="/user/inform/result" element={<UserInformResultPage />} />
          <Route path="/home/AI-asset-plan" element={<AIAssetPlanPage />} />
          <Route path="/home/AI-asset-plan/ETF" element={<ETFExplanation />} />
          <Route path="/ai/plan/start" element={<AssetPlanStartPage />} />
          <Route path="/ai/plan/inform" element={<AssetPlanInformPage />} />
          <Route path="/ai/plan/inform/result" element={<AssetPlanResultPage />} />
          <Route path="/goal-setting" element={<Layout title="목표 관리"><GoalSettingPage /></Layout>} />

          {/* 일치하는 경로가 없을 경우, 홈으로 리다이렉트  */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
  );
}

export default function App() {
  return (
      <div className="flex justify-center min-h-screen bg-[#E5E5E5] pt-6">
        <div className="w-[390px] h-[852px] bg-white shadow-lg overflow-hidden">
          <AssetProvider>
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </AssetProvider>
        </div>
      </div>
  );
}