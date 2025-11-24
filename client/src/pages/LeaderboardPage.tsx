import { Header, Page } from "zmp-ui";
import Leaderboard from "../components/Leaderboard";
import NavBar from "../components/NavBar";
import { useTranslation } from "react-i18next";

const LeaderboardPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page
      hideScrollbar
      style={{
        overscrollBehavior: "none",
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-y",
      }}
      className="relative min-h-screen w-full max-w-2xl mx-auto relative"
    >
      <Header title={t("leaderboard.title")} />
      <Leaderboard />
      <NavBar activeKey="leaderboard" />
    </Page>
  );
};

export default LeaderboardPage;
