import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import GoalSettingPage from './pages/GoalSettingPage';
import AIAssetPlanPage from './pages/AIAssetPlanPage';
import ETFExplanation from './pages/AIAssetPlanPage/ETFExplanation';
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet, Routes, Route } from "react-router-dom";
import AssetPage from "./pages/AssetPage/index.jsx";
import {AssetProvider} from "./context/AssetContext.jsx";
import AssetPlanInformPage from "./pages/AssetPlanInformPage/index.jsx";
import UserInformPage from "@/pages/UserInformPage/index.jsx";
import UserInformResultPage from "@/pages/UserInformResultPage/index.jsx";
import AssetPlanStartPage from "@/pages/AssetPlanStartPage/index.jsx";
import AssetPlanResultPage from "@/pages/AssetPlanResultPage/index.jsx";
import TempPage from "@/pages/TempPage.jsx";

function RootLayout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [

      {
        index: true,
        element: <TempPage/> //<Navigate to="user/inform" replace />
      },
      {
        path: "asset/main",
        element: <AssetPage />
      },
      {
        path: "user/inform",
        element: <UserInformPage />
      },
      {
        path: "user/inform/result",
        element: <UserInformResultPage />
      },
      {
        path: "ai/plan/start",
        element: <AssetPlanStartPage />
      },
      {
        path: "ai/plan/inform",
        element: <AssetPlanInformPage />
      },
      {
        path: "/ai/plan/inform/result",
        element: <AssetPlanResultPage />,
      },
      { index: true, element: <Navigate to="/login" replace /> },
      { path: 'home', element: <HomePage /> },
      { path: 'home/inform', element: <div></div> },
      { path: 'login', element: <LoginPage /> },
      { path: 'my-page', element: <MyPage /> },
      { path: 'goal-setting', element: <GoalSettingPage /> },
      { path: 'home/AI-asset-plan', element: <AIAssetPlanPage /> },
      { path: 'home/AI-asset-plan/ETF', element: <ETFExplanation /> },
    ],
  },
]);

export default function App() {
  return (
      <div className="flex justify-center min-h-screen bg-[#E5E5E5] pt-6">
        <div className="w-[390px] h-[852px] bg-white shadow-lg overflow-hidden">
          <AssetProvider>
            <RouterProvider router={router} />
          </AssetProvider>
        </div>
      </div>
  );
}
