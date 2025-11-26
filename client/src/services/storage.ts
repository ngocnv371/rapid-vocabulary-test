export function getLastScore(): number | null {
  try {
    const lastScore = localStorage.getItem("last_score");
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
    localStorage.setItem("last_score", JSON.stringify({ score, category: null }));
  } catch (error) {
    console.error("Error saving last score:", error);
  }
}
