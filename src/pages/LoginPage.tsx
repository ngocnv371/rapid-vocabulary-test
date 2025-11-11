import { Header, Page, useNavigate } from "zmp-ui";
import Auth from "../components/Auth";
import { useCallback } from "react";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSignInSuccess = useCallback(() => {
    navigate("/profile", { replace: true });
  }, []);

  return (
    <Page hideScrollbar>
      <Header title="Login" />
      <Auth onSignInSuccess={handleSignInSuccess} />
    </Page>
  );
};
