import React from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import AssetInformPage from "./pages/AssetInformPage/index.jsx";

function RootLayout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true,
        element: <Navigate to="/home/inform" replace />
      },
      { path: "home/inform",
        element:  <AssetInformPage/>
      },
    ],
  },
]);
export default function App() {
  return (
      <div className="flex justify-center min-h-screen bg-#E5E5E5 pt-6">
        <div className="w-[390px] h-[852px] bg-white shadow-lg overflow-hidden">
          <RouterProvider router={router} />
        </div>
      </div>
  );
}

