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
        path: "/ai/plan/result",
        element: <AssetPlanResultPage />,
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