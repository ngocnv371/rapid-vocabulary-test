import { BottomNavigation, Box, Header, Icon, Page } from "zmp-ui";
import Gameplay from "../components/Gameplay";
import NavBar from "../components/NavBar";

const SpiritPage: React.FC = () => {
  return (
    <Page hideScrollbar>
      <Header title="Rapid Vocabulary Test" />
      <Gameplay />
      <Box p={4}></Box>
      <NavBar activeKey="home" />
    </Page>
  );
};

export default SpiritPage;