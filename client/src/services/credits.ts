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

/**
 * Adds credits to a user's account
 * @param profileId The profile ID to add credits to
 * @param amount The amount of credits to add
 * @returns True if successful, false otherwise
 */
export async function addCredits(profileId: number, amount: number): Promise<boolean> {
  try {
    const { error } = await supabase.rpc('add_credits', {
      p_profile_id: profileId,
      p_amount: amount,
    });

    if (error) {
      console.error('Error adding credits:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error adding credits:', error);
    return false;
  }
}

/**
 * Processes a product purchase and adds credits to the user's account
 * @param profileId The profile ID making the purchase
 * @param productId The ID of the product being purchased
 * @param credits The number of credits to add
 * @returns True if successful, false otherwise
 */
export async function purchaseProduct(
  profileId: number,
  productId: string,
  credits: number
): Promise<boolean> {
  try {
    // In a real implementation, you would:
    // 1. Call Zalo Pay API to process payment
    // 2. Wait for payment confirmation
    // 3. Only then add credits
    
    // For now, we'll simulate a successful purchase and add credits directly
    // You should replace this with actual payment integration
    
    // Log the purchase attempt
    console.log('Processing purchase:', { profileId, productId, credits });
    
    // Add credits to the user's account
    const success = await addCredits(profileId, credits);
    
    if (success) {
      // Optionally log the purchase in a transactions table
      await logPurchase(profileId, productId, credits);
    }
    
    return success;
  } catch (error) {
    console.error('Error processing purchase:', error);
    return false;
  }
}

/**
 * Logs a purchase transaction (optional)
 * @param profileId The profile ID making the purchase
 * @param productId The ID of the product purchased
 * @param credits The number of credits purchased
 */
async function logPurchase(
  profileId: number,
  productId: string,
  credits: number
): Promise<void> {
  try {
    // This assumes you have a 'purchases' or 'transactions' table
    // You may need to create this table in your database
    await supabase.from('purchases').insert({
      profile_id: profileId,
      product_id: productId,
      credits_amount: credits,
      purchased_at: new Date().toISOString(),
    });
  } catch (error) {
    // Don't fail the purchase if logging fails
    console.error('Error logging purchase:', error);
  }
}
