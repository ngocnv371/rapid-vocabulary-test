import { BottomNavigation, Icon } from "zmp-ui";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../contexts/AppContext";

export default function NavBar({ activeKey }: { activeKey: string }) {
  const { t } = useTranslation();
  const { profile } = useAppContext();

  return (
    <BottomNavigation activeKey={activeKey} style={{ position: "sticky", bottom: 0 }}>
      <BottomNavigation.Item
        label={t("nav.home")}
        linkTo="/"
        icon={<Icon icon="zi-home" />}
        key="home"
      />
      <BottomNavigation.Item
        label={t("nav.leaderboard")}
        linkTo="/leaderboard"
        icon={<Icon icon="zi-list-1" />}
        key="leaderboard"
      />
      <BottomNavigation.Item
        label={t("nav.shop")}
        linkTo="/shop"
        icon={<Icon icon="zi-lock" />}
        key="shop"
      />
      <BottomNavigation.Item
        label={t("nav.profile")}
        linkTo={profile?.id ? `/profile/${profile.id}` : "/login"}
        icon={<Icon icon="zi-user" />}
        key="profile"
      />
    </BottomNavigation>
  );
}
