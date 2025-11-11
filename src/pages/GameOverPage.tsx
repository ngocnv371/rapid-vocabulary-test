import { BottomNavigation, Box, Header, Icon, Page, useNavigate } from "zmp-ui";
import GameOver from "../components/GameOver";
import React, { useCallback, useEffect } from "react";
import { getItem } from "../services/storage";

export const GameOverPage: React.FC = () => {
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
    try {
      const lastScore = getItem("last_score");
      if (lastScore) {
        const { score } = JSON.parse(lastScore);
        console.log("Last score loaded:", score);
        setScore(score);
      }
    } catch (error) {
      console.error("Error loading last score:", error);
    }
  }, []);

  return (
    <Page hideScrollbar>
      <Header title="Rapid Vocabulary Test" showBackIcon={false} />
      <GameOver
        score={score}
        onPlayAgain={playAgain}
        onViewLeaderboard={viewLeaderboard}
      />
      <Box p={4}></Box>
      <BottomNavigation fixed>
        <BottomNavigation.Item
          label="Home"
          linkTo="/"
          icon={<Icon icon="zi-home" />}
          key="home"
        />
        <BottomNavigation.Item
          label="Leaderboard"
          linkTo="/leaderboard"
          icon={<Icon icon="zi-list-1" />}
          key="leaderboard"
        />
        <BottomNavigation.Item
          label="Profile"
          linkTo="/profile"
          icon={<Icon icon="zi-user" />}
          key="profile"
        />
      </BottomNavigation>
    </Page>
  );
};
