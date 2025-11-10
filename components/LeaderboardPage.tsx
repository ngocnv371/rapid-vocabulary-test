import { Header, Page } from "zmp-ui";
import Leaderboard from "./Leaderboard";

export const LeaderboardPage: React.FC = () => {
  return (
    <Page>
      <Header title="Leaderboard" />
      <Leaderboard />
    </Page>
  );
};
