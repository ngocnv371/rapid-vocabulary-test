import { Header, Page, useNavigate } from "zmp-ui";
import Quiz from "../components/Quiz";
import ProgressBar from "../components/ProgressBar";
import React, { useCallback } from "react";
import { useAppContext } from "@/src/contexts/AppContext";
import { supabase } from "@/src/services/supabase";
import { setItem, setLastScore } from "../services/storage";
import { postScore } from "../services/leaderboard";
import { useTranslation } from "react-i18next";

const QuizPage: React.FC = () => {
  const { profileId } = useAppContext();
  const { t } = useTranslation();
  const [progress, setProgress] = React.useState({ current: 0, total: 0 });
  const navigate = useNavigate();

  const handleProgressUpdate = useCallback((current: number, total: number) => {
    console.log(`Progress: ${current} out of ${total}`);
    setProgress({ current, total });
    setLastScore(current);
  }, []);

  const handleGameOver = useCallback(
    async (score: number) => {
      if (profileId) {
        postScore(profileId, score);
      }
      navigate("/game-over");
    },
    [profileId]
  );

  const handleBackToCategories = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <Page hideScrollbar>
      <Header title={t('quiz.title')} />
      {progress.total > 0 && <ProgressBar current={progress.current} total={progress.total} />}
      <Quiz
        onGameOver={handleGameOver}
        onProgressUpdate={handleProgressUpdate}
        onBackToCategories={handleBackToCategories}
      />
    </Page>
  );
};

export default QuizPage;