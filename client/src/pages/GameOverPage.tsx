import { BottomNavigation, Box, Header, Icon, Page, useNavigate } from "zmp-ui";
import GameOver from "../components/GameOver";
import React, { useCallback, useEffect } from "react";
import { getItem, getLastScore } from "../services/storage";
import NavBar from "../components/NavBar";
import { useTranslation } from "react-i18next";

const GameOverPage: React.FC = () => {
  const { t } = useTranslation();
  const [score, setScore] = React.useState(0);
  const navigate = useNavigate();
  const playAgain = useCallback(() => {
    console.log("Play Again clicked");
    navigate("/quiz", { replace: true });
  }, []);

  const viewLeaderboard = useCallback(() => {
    console.log("View Leaderboard clicked");
    navigate("/leaderboard", { replace: true });
  }, []);

  // load last_score
  useEffect(() => {
    const lastScore = getLastScore();
    setScore(lastScore);
  }, []);

  return (
    <Page
      hideScrollbar
      className="relative min-h-screen w-full max-w-2xl mx-auto"
    >
      <Header title={t("gameOver.title")} showBackIcon={false} />
      <GameOver
        score={score}
        onPlayAgain={playAgain}
        onViewLeaderboard={viewLeaderboard}
      />
      <Box p={4}></Box>
      <NavBar activeKey="" />
    </Page>
  );
};

export default GameOverPage;
