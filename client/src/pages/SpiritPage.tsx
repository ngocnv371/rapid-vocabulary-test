import { Box, Header, Page, useNavigate } from "zmp-ui";
import NavBar from "../components/NavBar";
import SpiritAnimalSelector from "../components/SpiritAnimalSelector";
import { useCallback } from "react";
import { useHeartsContext } from "../contexts/HeartsContext";
import { useAppContext } from "../contexts/AppContext";
import { Animal } from "../types";

const SpiritPage: React.FC = () => {
  const { setSpiritAnimal } = useAppContext();
  const { hearts, useHeart, handleGameAttempt } = useHeartsContext();
  const navigate = useNavigate();

  const handleSpiritSelect = useCallback(
    (animal: Animal) => {
      console.log("Spirit animal selected!");
      if (!handleGameAttempt()) return;
      useHeart();
      setSpiritAnimal(animal.icon);
      navigate("/", { replace: true });
    },
    [hearts, navigate, useHeart, handleGameAttempt]
  );

  return (
    <Page
      hideScrollbar
      className="relative min-h-screen w-full max-w-2xl mx-auto"
    >
      <Header title="Rapid Vocabulary Test" />
      <SpiritAnimalSelector onSelect={handleSpiritSelect} />
      <Box p={4}></Box>
      <NavBar activeKey="home" />
    </Page>
  );
};

export default SpiritPage;
