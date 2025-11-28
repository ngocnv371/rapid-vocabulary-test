import { supabase } from "./supabase";

export function postScore(profileId: number, score: number): void {
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
