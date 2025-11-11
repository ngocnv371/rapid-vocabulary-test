import { BottomNavigation, Box, Header, Icon, Page, useNavigate } from "zmp-ui";
import GameOver from "./GameOver";
import { useCallback } from "react";

export const GameOverPage: React.FC = () => {
  const navigate = useNavigate();
  const playAgain = useCallback(() => {
    console.log("Play Again clicked");
    navigate("/quiz", { replace: true });
  }, []);

  const login = useCallback(() => {
    console.log("Login clicked");
    navigate("/login", { replace: true });
  }, []);

  const viewLeaderboard = useCallback(() => {
    console.log("View Leaderboard clicked");
    navigate("/leaderboard", { replace: true });
  }, []);

  return (
    <Page hideScrollbar>
      <Header title="Rapid Vocabulary Test" showBackIcon={false} />
      <GameOver
        score={0}
        session={null}
        onPlayAgain={playAgain}
        onLoginToSave={login}
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
