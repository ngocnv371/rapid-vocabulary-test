import { BottomNavigation, Header, Icon, Page } from "zmp-ui";
import Leaderboard from "./Leaderboard";

export const LeaderboardPage: React.FC = () => {
  return (
    <Page>
      <Header title="Leaderboard" />
      <Leaderboard />
      <BottomNavigation fixed activeKey="leaderboard">
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
