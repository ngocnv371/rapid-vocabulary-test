import { BottomNavigation, Header, Icon, Page } from "zmp-ui";
import Leaderboard from "../components/Leaderboard";
import NavBar from "../components/NavBar";

const LeaderboardPage: React.FC = () => {
  return (
    <Page hideScrollbar>
      <Header title="Leaderboard" />
      <Leaderboard />
      <NavBar activeKey="leaderboard" />
    </Page>
  );
};

export default LeaderboardPage;
