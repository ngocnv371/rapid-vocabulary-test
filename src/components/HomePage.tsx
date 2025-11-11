import { BottomNavigation, Box, Header, Icon, Page } from "zmp-ui";
import Gameplay from "./Gameplay";

export const HomePage: React.FC = () => {
  return (
    <Page hideScrollbar>
      <Header title="Rapid Vocabulary Test" showBackIcon={false} />
      <Gameplay />
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
