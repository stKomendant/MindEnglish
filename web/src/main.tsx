import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./pages/Home/Home.tsx";
import { Dictionary } from "./pages/Dictionary/Dictionary.tsx";
import { Game } from "./pages/Game/Game.tsx";
import { Statistics } from "./pages/Statistics/Statistics.tsx";
import { Settings } from "./pages/Settings/Settings.tsx";

import LayoutApp from "./components/Layout/Layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";

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
]);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>,
);
