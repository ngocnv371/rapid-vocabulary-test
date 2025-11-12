import { useAppContext } from "@/src/contexts/AppContext";
import { BottomNavigation, Button, Header, Icon, Page } from "zmp-ui";
import LoginButton from "../components/LoginButton";
import Profile from "../components/Profile";

export const ProfilePage: React.FC = () => {
  return (
    <Page>
      <Header title="Profile" />
      <div className="flex flex-col gap-4 sm:gap-6 p-4">
        <LoginButton />
      </div>
      <Profile />
      <BottomNavigation fixed activeKey="profile">
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
