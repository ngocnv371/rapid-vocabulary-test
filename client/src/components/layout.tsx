import { FC, lazy, Suspense } from "react";
import { Route } from "react-router";
import { Box, AnimationRoutes } from "zmp-ui";
import Spinner from "./Spinner";
import TestMenuToggle from "./TestMenuToggle";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("../pages/HomePage"));
const LeaderboardPage = lazy(() => import("../pages/LeaderboardPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const EditProfilePage = lazy(() => import("../pages/EditProfilePage"));
const QuizPage = lazy(() => import("../pages/QuizPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const GameOverPage = lazy(() => import("../pages/GameOverPage"));
const SpiritPage = lazy(() => import("../pages/SpiritPage"));
const TestPage = lazy(() => import("../pages/TestPage"));
const ScorePostingTestPage = lazy(() => import("../pages/tests/ScorePostingTestPage"));
const ShopPage = lazy(() => import("../pages/ShopPage"));

document.body.style.setProperty("--zaui-safe-area-inset-top", "24px");

export const Layout: FC = () => {
  return (
    <Box flex flexDirection="column" className="h-screen">
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Suspense fallback={<Spinner />}>
          <AnimationRoutes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/leaderboard" element={<LeaderboardPage />}></Route>
            <Route path="/shop" element={<ShopPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/profile/edit" element={<EditProfilePage />}></Route>
            <Route path="/quiz" element={<QuizPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/game-over" element={<GameOverPage />}></Route>
            <Route path="/spirit-animal" element={<SpiritPage />}></Route>
            <Route path="/test" element={<TestPage />}></Route>
            <Route path="/test/score-posting" element={<ScorePostingTestPage />}></Route>
          </AnimationRoutes>
        </Suspense>
      </Box>
      <TestMenuToggle />
    </Box>
  );
};
