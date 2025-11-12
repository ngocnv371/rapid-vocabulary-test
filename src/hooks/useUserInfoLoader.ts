import { useEffect, useState } from "react";
import { getUserInfo, type UserInfo } from "zmp-sdk";
import { upsertProfile } from "../services/leaderboard";

export function useUserInfoLoader() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [profileId, setProfileId] = useState<number | null>(null);
  useEffect(() => {
    console.log("Fetching user info from Zalo...");
    getUserInfo().then(
      (user) => {
        console.log("User info from Zalo:", user);
        setUser(user.userInfo);
      },
      (reason) => {
        console.error("Failed to get user info from Zalo:", reason);
      }
    );
  }, []);

  // when user changes, upsert profile
  useEffect(() => {
    if (!user?.id) {
      return;
    }

    console.log("Current user state:", user?.id, user?.name, user?.avatar);
    upsertProfile(
      {
        zaloId: user?.id,
        name: user?.name,
        avatarUrl: user?.avatar,
      },
      (id) => {
        setProfileId(id);
      }
    );
  }, [user?.id, user?.name, user?.avatar]);
  return { user, profileId };
}
