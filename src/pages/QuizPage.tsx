import { Header, Page, useNavigate } from "zmp-ui";
import Quiz from "../components/Quiz";
import ProgressBar from "../components/ProgressBar";
import React, { useCallback } from "react";
import { useHearts } from "@/src/contexts/HeartsContext";
import { supabase } from "@/src/services/supabase";
import { setItem, setLastScore } from "../services/storage";
import { postScore } from "../services/leaderboard";

export const QuizPage: React.FC = () => {
  const { session } = useHearts();
  const [progress, setProgress] = React.useState({ current: 0, total: 0 });
  const navigate = useNavigate();

  const handleProgressUpdate = useCallback((current: number, total: number) => {
    console.log(`Progress: ${current} out of ${total}`);
    setProgress({ current, total });
    setLastScore(current);
  }, []);

  const handleGameOver = useCallback(
    async (score: number) => {
      if (session) {
        postScore(session.user.id, score);
      }
      navigate("/game-over");
    },
    [session]
  );

  return (
    <Page>
      <Header title="Quiz" />
      <ProgressBar current={progress.current} total={progress.total} />
      <Quiz
        onGameOver={handleGameOver}
        onProgressUpdate={handleProgressUpdate}
      />
    </Page>
  );
};
