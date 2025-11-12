import { useAppContext } from "@/src/contexts/AppContext";
import { useCallback } from "react";
import { useNavigate } from "zmp-ui";

export default function LoginButton() {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const onLoginToSave = useCallback(() => {
    navigate("/login");
  }, []);

  if (user) {
    return null;
  }

  return (
    <button
      onClick={onLoginToSave}
      className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-green-500/30 hover:bg-green-700/50 hover:border-green-500 text-lg font-semibold text-white bg-green-600"
    >
      Login to Save Score
    </button>
  );
}
