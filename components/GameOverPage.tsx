import { BottomNavigation, Box, Header, Icon, Page } from "zmp-ui";
import GameOver from "./GameOver";

export const GameOverPage: React.FC = () => {
  return (
    <Page hideScrollbar>
      <Header title="Rapid Vocabulary Test" showBackIcon={false} />
      <GameOver score={0} session={null} />
      <Box p={4}></Box>
      <BottomNavigation fixed>
        <BottomNavigation.Item label="Home" icon={<Icon icon="zi-home" />} />
        <BottomNavigation.Item label="Leaderboard" icon={<Icon icon="zi-list-1" />} />
        <BottomNavigation.Item label="Profile" icon={<Icon icon="zi-user" />} />
      </BottomNavigation>
    </Page>
  );
};
