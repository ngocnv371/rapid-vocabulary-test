import { Header, Page } from "zmp-ui";
import Leaderboard from "../components/Leaderboard";
import NavBar from "../components/NavBar";

const LeaderboardPage: React.FC = () => {
  return (
    <Page hideScrollbar style={{ 
      overscrollBehavior: 'none',
      WebkitOverflowScrolling: 'touch',
      touchAction: 'pan-y'
    }}>
      <Header title="Leaderboard" />
      <Leaderboard />
      <NavBar activeKey="leaderboard" />
    </Page>
  );
};

export default LeaderboardPage;
