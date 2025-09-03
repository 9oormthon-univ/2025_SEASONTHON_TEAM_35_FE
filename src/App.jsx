import React from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet, Routes, Route } from "react-router-dom";
import AssetPage from "./pages/AssetPage/index.jsx";
import AssetEditPage from "./pages/AssetEditPage/index.jsx";
import {AssetProvider} from "./context/AssetContext.jsx";
import AssetPlanInformPage from "./pages/AssetPlanInformPage/index.jsx";
import UserInformPage from "@/pages/UserInformPage/index.jsx";
// import AssetPlanStartPage from "@/pages/AssetPlanStartPage/index.jsx";
// import AssetPlanResultPage from "@/pages/AssetPlanResultPage/index.jsx";

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
        element: <Navigate to="user/inform" replace />
      },
      {
        path: "asset/main",
        element: <AssetPage />
      },
      {
        path: "user/inform",
        element: <UserInformPage />
      },
      //{
       // path: "asset/inform",
        //element: <AssetInformPage />
      //},
      // 수정 페이지를 위한 동적 라우트 추가
      {
        path: "asset/edit/:mode",
        element: <AssetEditPage />
      },
      {
        path: "ai/plan/inform",
        element: <AssetPlanInformPage />
      },
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