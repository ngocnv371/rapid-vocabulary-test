import { Profile, UserInfo } from "@/src/types";
import { supabase } from "./supabase";

export function getUserInfo(): Promise<{ userInfo: UserInfo }> {
  return new Promise((resolve) => {
    resolve({
      userInfo: {
        id: "123456",
        name: "John Doe",
        avatar: "https://example.com/avatar.jpg",
      },
    });
  });
}

export function upsertProfile(
  payload: {
    name: string;
    userId?: string;
    zaloId?: string;
    avatarUrl: string;
  },
  then?: (id: number) => void
): void {
  console.log(`Upserting profile`, payload);
  
  // Build query based on available identifiers
  if (payload.userId) {
    (supabase
      .from("profiles")
      .select("*")
      .eq("user_id" as any, payload.userId as any) as any)
      .maybeSingle()
      .then((response: any) => {
        handleProfileResponse(response, payload, then);
      });
  } else if (payload.zaloId) {
    (supabase
      .from("profiles")
      .select("*")
      .eq("zalo_id" as any, payload.zaloId as any) as any)
      .maybeSingle()
      .then((response: any) => {
        handleProfileResponse(response, payload, then);
      });
  } else {
    console.error("Either userId or zaloId must be provided");
    then?.(0);
  }
}

function handleProfileResponse(
  response: any,
  payload: {
    name: string;
    userId?: string;
    zaloId?: string;
    avatarUrl: string;
  },
  then?: (id: number) => void
): void {
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
        user_id: existingProfile.user_id,
        name: payload.name,
        zalo_id: payload.zaloId || existingProfile.zalo_id,
        avatar_url: payload.avatarUrl,
      } as any])
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
      .upsert([{
        user_id: payload.userId || null,
        name: payload.name,
        zalo_id: payload.zaloId || null,
        avatar_url: payload.avatarUrl,
      } as any])
      .select()
      .single()
      .then((response) => {
        if (response.error) {
          console.error("Error upserting profile:", response.error);
          then?.(0);
        } else {
          console.log("Profile upserted successfully", response.data);
          then?.((response.data as any).id);
        }
      });
  }
}
