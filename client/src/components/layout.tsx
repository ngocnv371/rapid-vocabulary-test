import React, { FC, lazy, Suspense } from "react";
import { Route } from "react-router";
import { Box, AnimationRoutes } from "zmp-ui";
import { getSystemInfo } from "zmp-sdk";
import Spinner from "./Spinner";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("../pages/HomePage"));
const LeaderboardPage = lazy(() => import("../pages/LeaderboardPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const QuizPage = lazy(() => import("../pages/QuizPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const GameOverPage = lazy(() => import("../pages/GameOverPage"));
const SpiritPage = lazy(() => import("../pages/SpiritPage"));
const TestPage = lazy(() => import("../pages/TestPage"));

if (import.meta.env.DEV) {
  document.body.style.setProperty("--zaui-safe-area-inset-top", "24px");
} else if (getSystemInfo().platform === "android") {
  const statusBarHeight =
    window.ZaloJavaScriptInterface?.getStatusBarHeight() ?? 0;
  const androidSafeTop = Math.round(statusBarHeight / window.devicePixelRatio);
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

export const Layout: FC = () => {

  return (
    <Box flex flexDirection="column" className="h-screen">
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Suspense fallback={<Spinner />}>
          <AnimationRoutes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/leaderboard" element={<LeaderboardPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/quiz" element={<QuizPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/game-over" element={<GameOverPage />}></Route>
            <Route path="/spirit-animal" element={<SpiritPage />}></Route>
            <Route path="/test" element={<TestPage />}></Route>
          </AnimationRoutes>
        </Suspense>
      </Box>
    </Box>
  );
};
