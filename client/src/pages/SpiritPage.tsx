import { BottomNavigation, Box, Header, Icon, Page } from "zmp-ui";
import Gameplay from "../components/Gameplay";
import NavBar from "../components/NavBar";

const SpiritPage: React.FC = () => {
  return (
    <Page 
      hideScrollbar
      className="relative min-h-screen w-full max-w-2xl mx-auto relative">
      <Header title="Rapid Vocabulary Test" />
      <Gameplay />
      <Box p={4}></Box>
      <NavBar activeKey="home" />
    </Page>
  );
};

export default SpiritPage;