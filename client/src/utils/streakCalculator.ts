import type { Score } from '../types';

/**
 * Calculate the current streak of consecutive days with at least one score.
 * The streak is considered active if there's a score today or yesterday.
 * 
 * @param scores - Array of score records with created_at timestamps
 * @returns The number of consecutive days with scores, or 0 if the streak is broken
 */
export function calculateStreak(scores: Score[]): number {
    if (scores.length === 0) return 0;

    // Get unique dates (YYYY-MM-DD format) from scores, sorted descending
    const scoreDates = Array.from(
        new Set(
            scores.map(s => new Date(s.created_at).toISOString().split('T')[0])
        )
    ).sort((a, b) => b.localeCompare(a));

    if (scoreDates.length === 0) return 0;

    // Check if today has a score
    const today = new Date().toISOString().split('T')[0];
    let currentStreak = 0;
    let checkDate = new Date();

    // Start from today or yesterday depending on if there's a score today
    if (scoreDates[0] === today) {
        currentStreak = 1;
        checkDate.setDate(checkDate.getDate() - 1);
    } else {
        // If no score today, check if yesterday has a score to continue streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (scoreDates[0] !== yesterdayStr) {
            // Streak is broken
            return 0;
        }
        currentStreak = 1;
        checkDate.setDate(checkDate.getDate() - 2);
    }

    // Count consecutive days going backwards
    for (let i = 1; i < scoreDates.length; i++) {
        const expectedDate = checkDate.toISOString().split('T')[0];
        
        if (scoreDates[i] === expectedDate) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            // Gap found, streak ends
            break;
        }
    }

    return currentStreak;
}
