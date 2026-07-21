import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./pages/Home/Home.tsx";
import { Dictionary } from "./pages/Dictionary/DictionaryPage.tsx";
import { Game } from "./pages/Game/Game.tsx";
import { Statistics } from "./pages/Statistics/Statistics.tsx";
import { Settings } from "./pages/Settings/Settings.tsx";

import LayoutApp from "./components/Layout/Layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "./pages/Auth/Layout/AuthLayout.tsx";
import { LoginPage } from "./pages/Auth/Login/LoginPage.tsx";
import { SignUpPage } from "./pages/Auth/Signup/SignUpPage.tsx";
import { ForgotPasswordPage } from "./pages/Auth/ForgotPassword/ForgotPasswordPage.tsx";
import { VerifyEmailPage } from "./pages/Auth/VerifyEmail/VerifyEmailPage.tsx";
import { ResetPasswordPage } from "./pages/Auth/ResetPassword/ResetPasswordPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutApp />,
    children: [
      {
        index: true,
        element: <Home />,
        path: "/",
      },
      {
        path: "dictionary",
        element: <Dictionary />,
      },
      {
        path: "game",
        element: <Game />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "verify-email",
        element: <VerifyEmailPage />,
      },
      {
        path: 'reset-password/:token',
        element: <ResetPasswordPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>,
);
