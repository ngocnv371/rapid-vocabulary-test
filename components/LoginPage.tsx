import { Header, Page } from "zmp-ui";
import Auth from "./Auth";

export const LoginPage: React.FC = () => {
  return (
    <Page hideScrollbar>
      <Header title="Login" />
      <Auth />
    </Page>
  );
};
