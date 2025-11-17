import { Header, Page } from "zmp-ui";
import Profile from "../components/Profile";
import NavBar from "../components/NavBar";

const ProfilePage: React.FC = () => {
  return (
    <Page hideScrollbar>
      <Header title="Profile" />
      <Profile />
      <NavBar activeKey="profile" />
    </Page>
  );
};

export default ProfilePage;
