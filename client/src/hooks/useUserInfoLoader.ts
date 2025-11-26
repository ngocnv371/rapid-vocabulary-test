import { useCallback, useEffect, useState } from "react";
import { getUserInfo, upsertProfile } from "../services/profile";
import { UserInfo } from "../types";

export function useUserInfoLoader() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [profileId, setProfileId] = useState<number | null>(null);
  const reload = useCallback(() => {
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

  // initial load
  useEffect(() => {
    reload();
  }, [reload]);

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
  return { user, profileId, reload };
}
