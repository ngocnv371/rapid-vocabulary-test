import { Header, Page } from "zmp-ui";
import Profile from "../components/Profile";
import NavBar from "../components/NavBar";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page hideScrollbar>
      <Header title={t('profile.title')} />
      <LanguageSwitcher />
      <Profile />
      <NavBar activeKey="profile" />
    </Page>
  );
};

export default ProfilePage;
