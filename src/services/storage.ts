import { nativeStorage } from "zmp-sdk";

export function setItem(key: string, value: string): void {
  try {
    nativeStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving to storage:", error);
    localStorage.setItem(key, value);
  }
}

export function getItem(key: string): string | null {
  try {
    return nativeStorage.getItem(key);
  } catch (error) {
    console.error("Error retrieving from storage:", error);
    return localStorage.getItem(key);
  }
}
