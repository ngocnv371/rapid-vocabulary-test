import { BottomNavigation, Icon } from "zmp-ui";

export default function NavBar({ activeKey }: { activeKey: string }) {
  return (
    <BottomNavigation fixed activeKey={activeKey}>
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
  );
}
