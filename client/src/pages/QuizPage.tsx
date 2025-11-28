import { Header, Page, useNavigate } from "zmp-ui";
import Quiz from "../components/Quiz";
import ProgressBar from "../components/ProgressBar";
import React, { useCallback, useEffect } from "react";
import { useAppContext } from "@/src/contexts/AppContext";
import { useCreditsContext } from "@/src/contexts/CreditsContext";
import { setLastScore } from "../services/storage";
import { postScore } from "../services/leaderboard";
import { useTranslation } from "react-i18next";
import OutOfCreditsHandler from "../components/OutOfCreditsHandler";
import CreditsButton from "../components/CreditsButton";

const QuizPage: React.FC = () => {
  const { profile, user } = useAppContext();
  const { canPlayGame, handleGameAttempt, useCredit } = useCreditsContext();
  const { t } = useTranslation();
  const [progress, setProgress] = React.useState({ current: 0, total: 0 });
  const navigate = useNavigate();
  const isAnonymous = user?.is_anonymous ?? true;

  // Check if user has credits when entering quiz page
  useEffect(() => {
    if (!isAnonymous && !canPlayGame()) {
      // Trigger out of credits dialog
      handleGameAttempt();
      // Navigate back to home
      navigate("/", { replace: true });
    }
  }, [isAnonymous, canPlayGame, handleGameAttempt, navigate]);

  const handleProgressUpdate = useCallback((current: number, total: number) => {
    console.log(`Progress: ${current} out of ${total}`);
    setProgress({ current, total });
    setLastScore(current);
  }, []);

  const handleGameOver = useCallback(
    async (score: number) => {
      if (profile?.id && !isAnonymous) {
        postScore(profile.id, score);
        // Optimistically reduce credits after posting score
        useCredit();
      }
      navigate("/game-over");
    },
    [profile?.id, isAnonymous, useCredit, navigate]
  );

  const handleBackToCategories = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <Page
      hideScrollbar
      className="relative min-h-screen w-full max-w-2xl mx-auto"
    >
      <Header title={t("quiz.title")} />
      {progress.total > 0 && (
        <ProgressBar current={progress.current} total={progress.total} />
      )}
      <CreditsButton />
      <OutOfCreditsHandler />
      <Quiz
        onGameOver={handleGameOver}
        onProgressUpdate={handleProgressUpdate}
        onBackToCategories={handleBackToCategories}
      />
    </Page>
  );
};

export default QuizPage;
