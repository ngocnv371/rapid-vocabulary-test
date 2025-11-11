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

export function getLastScore(): number | null {
  try {
    const lastScore = getItem("last_score");
    if (lastScore) {
      const { score } = JSON.parse(lastScore);
      return score;
    }
  } catch (error) {
    console.error("Error retrieving last score:", error);
  }
  return null;
}

export function setLastScore(score: number): void {
  try {
    setItem("last_score", JSON.stringify({ score, category: null }));
  } catch (error) {
    console.error("Error saving last score:", error);
  }
}
