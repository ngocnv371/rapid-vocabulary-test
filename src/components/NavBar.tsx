import { BottomNavigation, Icon } from "zmp-ui";
import { useAppContext } from "../contexts/AppContext";

export default function NavBar({ activeKey }: { activeKey: string }) {
  const { spiritAnimal } = useAppContext();
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
        label=""
        linkTo="/profile"
        icon={spiritAnimal || <Icon icon="zi-user" />}
        key="profile"
      />
    </BottomNavigation>
  );
}
