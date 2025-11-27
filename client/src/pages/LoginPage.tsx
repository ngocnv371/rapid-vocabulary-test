import { Header, Page, useNavigate } from "zmp-ui";
import Auth from "../components/Auth";
import { useCallback } from "react";
import { useAppContext } from "../contexts/AppContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { reloadUser } = useAppContext();
  const handleSignInSuccess = useCallback(() => {
    reloadUser();
    navigate("/profile", { replace: true });
  }, []);

  return (
    <Page 
      hideScrollbar
      className="relative min-h-screen w-full max-w-2xl mx-auto">
      <Header title="Login" />
      <Auth onSignInSuccess={handleSignInSuccess} />
    </Page>
  );
};

export default LoginPage;
