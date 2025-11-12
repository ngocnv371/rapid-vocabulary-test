import { useAppContext } from "@/src/contexts/AppContext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SpiritAnimalSelector from "./SpiritAnimalSelector";

export default function Gameplay() {
  const { hearts, useHeart, handleGameAttempt } = useAppContext();
  const navigate = useNavigate();

  const handleSpiritSelect = useCallback(() => {
    console.log("Spirit animal selected!");
    if (!handleGameAttempt()) return;
    useHeart();
    navigate("/quiz");
  }, [hearts, navigate, useHeart, handleGameAttempt]);

  return <SpiritAnimalSelector onSelect={handleSpiritSelect} />;
}
