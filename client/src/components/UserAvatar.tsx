import { Avatar } from "zmp-ui";
import { useAppContext } from "../contexts/AppContext";

export default function UserAvatar() {
  const { spiritAnimal, profile } = useAppContext();
  return (
    <div className="relative inline-block ring-4 ring-purple-400/50 rounded-full shadow-2xl transform hover:scale-105 transition-transform duration-300">
      {profile?.avatar_url ? (
        <Avatar src={profile?.avatar_url} size={96} />
      ) : (
        <div className="text-7xl w-[96px] h-[96px]">{spiritAnimal}</div>
      )}
    </div>
  );
}
