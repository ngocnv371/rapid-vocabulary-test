import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box, AnimationRoutes } from "zmp-ui";
import { getSystemInfo } from "zmp-sdk";
import { HomePage } from "../pages/HomePage";
import { LeaderboardPage } from "../pages/LeaderboardPage";
import { ProfilePage } from "../pages/ProfilePage";
import { QuizPage } from "../pages/QuizPage";
import { LoginPage } from "../pages/LoginPage";
import { GameOverPage } from "../pages/GameOverPage";

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
        <AnimationRoutes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/leaderboard" element={<LeaderboardPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/quiz" element={<QuizPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/game-over" element={<GameOverPage />}></Route>
        </AnimationRoutes>
      </Box>
    </Box>
  );
};
