import { BottomNavigation, Icon } from "zmp-ui";
import { useTranslation } from "react-i18next";

export default function NavBar({ activeKey }: { activeKey: string }) {
  const { t } = useTranslation();

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
        linkTo="/profile"
        icon={<Icon icon="zi-user" />}
        key="profile"
      />
    </BottomNavigation>
  );
}
