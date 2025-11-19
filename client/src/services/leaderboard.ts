import { Profile } from "@/src/types";
import { supabase } from "./supabase";

// Score posting buffer - tracks last post time and pending scores per profile
interface BufferEntry {
  lastPostTime: number;
  pendingScore: number | null;
  timeoutId: NodeJS.Timeout | null;
}

const scorePostBuffer = new Map<number, BufferEntry>();
const POST_COOLDOWN_MS = 60000; // 1 minute

export function upsertProfile(
  payload: {
    name: string;
    zaloId: string;
    avatarUrl: string;
  },
  then?: (id: number) => void
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
        then?.(0);
      } else if (response.data) {
        const existingProfile = response.data as Profile;
        console.log("Profile found", existingProfile);
        supabase
          .from("profiles")
          .upsert([{
            id: existingProfile.id,
            name: payload.name,
            zalo_id: payload.zaloId,
            avatar_url: payload.avatarUrl,
          }])
          .then((f2) => {
            if (f2.error) {
              console.error("Error updating profile:", f2.error);
            } else {
              console.log("Profile updated successfully", f2.data);
            }
            then?.(existingProfile.id);
          });
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
            }
            then?.(response?.data?.id);
          });
      }
    });
}

function actuallyPostScore(profileId: number, score: number): void {
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
        // Remove the buffer entry on error so they can retry
        const entry = scorePostBuffer.get(profileId);
        if (entry) {
          entry.lastPostTime = 0; // Reset to allow immediate retry
        }
      } else {
        console.log("Score posted successfully", response);
      }
    });
}

export function postScore(profileId: number, score: number): void {
  console.log(`Posting score ${score} for profile ${profileId}`);
  
  const now = Date.now();
  const entry = scorePostBuffer.get(profileId);
  
  if (!entry) {
    // First time posting for this profile
    scorePostBuffer.set(profileId, {
      lastPostTime: now,
      pendingScore: null,
      timeoutId: null,
    });
    actuallyPostScore(profileId, score);
    return;
  }
  
  const timeSinceLastPost = now - entry.lastPostTime;
  
  if (timeSinceLastPost >= POST_COOLDOWN_MS) {
    // Cooldown has passed, post immediately
    entry.lastPostTime = now;
    entry.pendingScore = null;
    
    // Clear any pending timeout
    if (entry.timeoutId) {
      clearTimeout(entry.timeoutId);
      entry.timeoutId = null;
    }
    
    actuallyPostScore(profileId, score);
  } else {
    // Still in cooldown, buffer the score
    const remainingTime = POST_COOLDOWN_MS - timeSinceLastPost;
    const remainingSeconds = Math.ceil(remainingTime / 1000);
    
    // Keep the higher score
    if (entry.pendingScore === null || score > entry.pendingScore) {
      entry.pendingScore = score;
      console.log(`Score ${score} buffered for profile ${profileId}. Will post in ${remainingSeconds} seconds.`);
      
      // Clear existing timeout if any
      if (entry.timeoutId) {
        clearTimeout(entry.timeoutId);
      }
      
      // Schedule the post after cooldown
      entry.timeoutId = setTimeout(() => {
        if (entry.pendingScore !== null) {
          console.log(`Posting buffered score ${entry.pendingScore} for profile ${profileId}`);
          entry.lastPostTime = Date.now();
          const scoreToPost = entry.pendingScore;
          entry.pendingScore = null;
          entry.timeoutId = null;
          actuallyPostScore(profileId, scoreToPost);
        }
      }, remainingTime);
    } else {
      console.log(`Score ${score} ignored (lower than buffered score ${entry.pendingScore}) for profile ${profileId}.`);
    }
  }
}
