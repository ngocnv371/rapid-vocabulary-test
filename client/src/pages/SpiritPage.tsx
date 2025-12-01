import { Box, Header, Page, useNavigate } from "zmp-ui";
import NavBar from "../components/NavBar";
import SpiritAnimalSelector from "../components/SpiritAnimalSelector";
import { useCallback } from "react";
import { useCreditsContext } from "../contexts/CreditsContext";
import { useAppContext } from "../contexts/AppContext";
import { Animal } from "../types";

const SpiritPage: React.FC = () => {
  const { setSpiritAnimal } = useAppContext();
  const { credits, useCredit, handleGameAttempt } = useCreditsContext();
  const navigate = useNavigate();

  const handleSpiritSelect = useCallback(
    (animal: Animal) => {
      console.log("Spirit animal selected!");
      if (!handleGameAttempt()) return;
      useCredit();
      setSpiritAnimal(animal.icon);
      navigate("/", { replace: true });
    },
    [credits, navigate, useCredit, handleGameAttempt]
  );

  return (
    <Page
      hideScrollbar
      className="relative min-h-screen w-full max-w-2xl mx-auto"
    >
      <Header title="Voka" />
      <SpiritAnimalSelector onSelect={handleSpiritSelect} />
      <Box p={4}></Box>
      <NavBar activeKey="home" />
    </Page>
  );
};

export default SpiritPage;
