import { BottomNavigation, Box, Header, Icon, Page } from "zmp-ui";
import Gameplay from "./Gameplay";

export const HomePage: React.FC = () => {
  return (
    <Page hideScrollbar>
      <Header title="Rapid Vocabulary Test" showBackIcon={false} />
      <Gameplay />
      <Box p={4}></Box>
      <BottomNavigation fixed>
        <BottomNavigation.Item label="Home" icon={<Icon icon="zi-home" />} key='home' />
        <BottomNavigation.Item label="Leaderboard" icon={<Icon icon="zi-list-1" />} key='leaderboard' />
        <BottomNavigation.Item label="Profile" icon={<Icon icon="zi-user" />} key='profile' />
      </BottomNavigation>
    </Page>
  );
};
