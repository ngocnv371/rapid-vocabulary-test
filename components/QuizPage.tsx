import { Header, Page, useNavigate } from "zmp-ui";
import Quiz from "./Quiz";

export const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const handleGameOver = (score: number) => {
    console.log("Game over! Final score:", score);
    navigate("/game-over");
  };

  return (
    <Page>
      <Header title="Quiz"/>
      <Quiz onGameOver={handleGameOver} />
    </Page>
  );
};
