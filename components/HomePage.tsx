import { Header, Page } from "zmp-ui";
import Gameplay from "./Gameplay";

export const HomePage: React.FC = () => {
  return (
    <Page hideScrollbar>
      <Header title="Test" showBackIcon={false} />
      <Gameplay />
    </Page>
  );
};
