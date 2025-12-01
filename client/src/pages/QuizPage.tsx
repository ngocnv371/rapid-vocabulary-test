import { Header, Page, useNavigate } from "zmp-ui";
import Quiz from "../components/Quiz";
import React, { useCallback, useEffect } from "react";
import { useAppContext } from "@/src/contexts/AppContext";
import { useCreditsContext } from "@/src/contexts/CreditsContext";
import { setLastScore } from "../services/storage";
import { postScore } from "../services/leaderboard";
import { useTranslation } from "react-i18next";
import CreditsButton from "../components/CreditsButton";
import OutOfCreditsCard from "../components/OutOfCreditsCard";
import StreakBar from "../components/StreakBar";

const QuizPage: React.FC = () => {
  const { profile } = useAppContext();
  const [canPlay, setCanPlay] = React.useState(false);
  const { handleGameAttempt, useCredit } = useCreditsContext();
  const { t } = useTranslation();
  const [progress, setProgress] = React.useState({ current: 0, total: 0 });
  const navigate = useNavigate();

  // Check if user has credits when entering quiz page
  useEffect(() => {
    const check = handleGameAttempt();
    setCanPlay(check);
  }, [handleGameAttempt]);

  const handleProgressUpdate = useCallback((current: number, total: number) => {
    console.log(`Progress: ${current} out of ${total}`);
    setProgress({ current, total });
    setLastScore(current);
  }, []);

  const handleGameOver = useCallback(
    async (score: number) => {
      if (profile?.id) {
        postScore(profile.id, score);
        // Optimistically reduce credits after posting score
        useCredit();
      }
      navigate("/game-over");
    },
    [profile?.id, useCredit, navigate]
  );

  const handleBackToCategories = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <Page
      hideScrollbar
      className="relative min-h-screen w-full max-w-2xl mx-auto"
    >
      {progress.total > 0 && (
        <div className="mt-1">
          <StreakBar streak={progress.current} />
        </div>
      )}
      <CreditsButton />
      <OutOfCreditsCard />
      {canPlay && (
        <Quiz
          onGameOver={handleGameOver}
          onProgressUpdate={handleProgressUpdate}
          onBackToCategories={handleBackToCategories}
        />
      )}
    </Page>
  );
};

export default QuizPage;
