import { Header, Page, useNavigate } from "zmp-ui";
import Quiz from "./Quiz";
import ProgressBar from "./ProgressBar";
import React, { useCallback } from "react";

export const QuizPage: React.FC = () => {
  const [progress, setProgress] = React.useState({ current: 0, total: 0 });
  const navigate = useNavigate();
  const handleGameOver = (score: number) => {
    console.log("Game over! Final score:", score);
    navigate("/game-over");
  };

  const handleProgressUpdate = useCallback((current: number, total: number) => {
    console.log(`Progress: ${current} out of ${total}`);
    setProgress({ current, total });
  }, []);

  return (
    <Page>
      <Header title="Quiz"/>
      <ProgressBar current={progress.current} total={progress.total} />
      <Quiz onGameOver={handleGameOver} onProgressUpdate={handleProgressUpdate} />
    </Page>
  );
};
