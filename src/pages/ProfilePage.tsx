import { useAppContext } from "@/src/contexts/AppContext";
import { BottomNavigation, Button, Header, Icon, Page } from "zmp-ui";
import Profile from "../components/Profile";
import NavBar from "../components/NavBar";

export const ProfilePage: React.FC = () => {
  return (
    <Page hideScrollbar>
      <Header title="Profile" />
      <Profile />
      <NavBar activeKey="profile" />
    </Page>
  );
};
