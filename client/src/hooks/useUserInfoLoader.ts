import { useCallback, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { type User } from "@supabase/supabase-js";
import { Profile } from "../types";

export function useUserInfoLoader() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const reload = useCallback(async () => {
    console.log("Checking Supabase auth user...");
    let { data } = await supabase.auth.getUser();
    let user = data?.user;
    if (!user) {
      console.log("No auth user, signing in anonymously...");
      const res = await supabase.auth.signInAnonymously();
      user = res.data.user;
    }

    if (!user) {
      console.error("Failed to get or create auth user.");
      return;
    }

    setUser(user);
  }, []);

  // initial load
  useEffect(() => {
    reload();
  }, [reload]);

  // when user changes, process profile
  useEffect(() => {
    if (!user?.id) {
      return;
    }

    console.log("Loading profile for user", user.id);
    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .then((response) => {
        if (response.error) {
          console.error("Error fetching profile:", response.error);
          setProfile(null);
        } else if (response.data) {
          const profile = response.data;
          console.log("Profile found", profile);
          setProfile(profile);
        }
      });
  }, [user]);

  return { user, profile, reload };
}
