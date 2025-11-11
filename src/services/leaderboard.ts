import { supabase } from "./supabase";

export function postScore(userId: string, score: number): void {
  console.log(`Posting score ${score} for user ${userId}`);
  supabase
    .from("scores")
    .insert([
      {
        user_id: userId,
        score: score,
        category: null,
      },
    ])
    .select()
    .then(
      (data) => {
        if (data.error) {
          console.error("Error posting score:", data.error);
        } else {
          console.log("Score posted successfully", data);
        }
      }
    );
}
