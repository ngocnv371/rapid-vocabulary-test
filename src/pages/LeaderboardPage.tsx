import { BottomNavigation, Header, Icon, Page } from "zmp-ui";
import Leaderboard from "../components/Leaderboard";
import NavBar from "../components/NavBar";

export const LeaderboardPage: React.FC = () => {
  return (
    <Page>
      <Header title="Leaderboard" />
      <Leaderboard />
      <NavBar activeKey="leaderboard" />
    </Page>
  );
};
