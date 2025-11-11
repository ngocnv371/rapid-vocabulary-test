import { Header, Page, useNavigate } from "zmp-ui";
import Quiz from "./Quiz";
import ProgressBar from "./ProgressBar";
import React, { useCallback } from "react";
import { useHearts } from "@/src/contexts/HeartsContext";
import { supabase } from "@/src/services/supabase";
import { nativeStorage } from "zmp-sdk";

export const QuizPage: React.FC = () => {
  const { session } = useHearts();
  const [progress, setProgress] = React.useState({ current: 0, total: 0 });
  const navigate = useNavigate();

  const handleProgressUpdate = useCallback((current: number, total: number) => {
    console.log(`Progress: ${current} out of ${total}`);
    setProgress({ current, total });
    try {
      nativeStorage.setItem(
        "last_score",
        JSON.stringify({ score: current, category: null })
      );
    } catch (error) {
      console.error("Error saving last score:", error);
    }
  }, []);

  const handleGameOver = useCallback(
    async (score: number) => {
      if (session) {
        await supabase
          .from("scores")
          .insert([
            {
              user_id: session.user.id,
              score: score,
              category: null,
            },
          ])
          .select();
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
