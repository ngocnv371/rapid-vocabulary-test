import { supabase } from "./supabase";

export function upsertProfile(
  payload: {
    name: string;
    zaloId: string;
    avatarUrl: string;
  },
  success?: (id: number) => void
): void {
  console.log(`Upserting profile`, payload);
  // find existing profile by zaloId
  supabase
    .from("profiles")
    .select("*")
    .eq("zalo_id", payload.zaloId)
    .maybeSingle()
    .then((response) => {
      if (response.error) {
        console.error("Error fetching profile:", response);
      } else if (response.data) {
        console.log("Profile found", response.data);
        success?.(response?.data?.id);
      } else {
        console.log("No profile found, creating new one");
        supabase
          .from("profiles")
          .upsert({
            name: payload.name,
            zalo_id: payload.zaloId,
            avatar_url: payload.avatarUrl,
          })
          .select()
          .single()
          .then((response) => {
            if (response.error) {
              console.error("Error upserting profile:", response.error);
            } else {
              console.log("Profile upserted successfully", response.data);
              success?.(response?.data?.id);
            }
          });
      }
    });
}

export function postScore(profileId: number, score: number): void {
  console.log(`Posting score ${score} for profile ${profileId}`);
  supabase
    .from("scores")
    .insert([
      {
        profile_id: profileId,
        score: score,
        category: "1000", // HACK: hardcoded for now
      },
    ])
    .select()
    .single()
    .then((response) => {
      if (response.error) {
        console.error("Error posting score:", response.error);
      } else {
        console.log("Score posted successfully", response);
      }
    });
}
