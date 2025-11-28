import { supabase } from './supabase';

/**
 * Fetches the current credit amount for a given profile
 * @param profileId The profile ID to fetch credits for
 * @returns The credit amount, or null if not found or on error
 */
export async function fetchCredits(profileId: number): Promise<number | null> {
  try {
    const { data, error } = await supabase
      .from('credits')
      .select('amount')
      .eq('profile_id', profileId)
      .single();

    if (error) {
      console.error('Error fetching credits:', error);
      return null;
    }

    return data?.amount ?? null;
  } catch (error) {
    console.error('Error fetching credits:', error);
    return null;
  }
}
