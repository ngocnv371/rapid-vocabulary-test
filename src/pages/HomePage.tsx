import { BottomNavigation, Box, Header, Icon, Page } from "zmp-ui";
import Gameplay from "../components/Gameplay";
import NavBar from "../components/NavBar";

export const HomePage: React.FC = () => {
  return (
    <Page hideScrollbar>
      <Header title="Rapid Vocabulary Test" showBackIcon={false} />
      <Gameplay />
      <Box p={4}></Box>
      <NavBar activeKey="home" />
    </Page>
  );
};
