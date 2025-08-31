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
import AIAssetPlanPage from './pages/AIAssetPlanPage/AIAssetPlanPage';

function RootLayout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: 'home', element: <HomePage /> },
      { path: 'home/inform', element: <div></div> },
      { path: 'login', element: <LoginPage /> },
      { path: 'my-page', element: <MyPage /> },
      { path: 'home/AI-asset-plan', element: <AIAssetPlanPage /> },
    ],
  },
]);
export default function App() {
  return (
    <div className="flex justify-center min-h-screen bg-#E5E5E5 pt-6">
      <div className="w-[393px] h-[852px] bg-white shadow-lg overflow-hidden relative">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
