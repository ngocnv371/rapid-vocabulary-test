import { supabase } from './supabase';
import type { Product } from '../types';

/**
 * Fetches all active products from the database
 * @returns Array of products, or empty array on error
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('price', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

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
 * @param credits The number of credits to add (including bonus)
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
    // 3. Only then create the purchase record
    
    // For now, we'll simulate a successful payment and create a purchase record
    // The trigger on the purchases table will automatically add the credits
    
    // Fetch product details to get the price
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('price, currency')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      console.error('Error fetching product:', productError);
      return false;
    }

    // Create purchase record (trigger will add credits automatically)
    const { error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        profile_id: profileId,
        product_id: productId,
        credits_amount: credits,
        price_paid: product.price,
        currency: product.currency,
        payment_status: 'completed',
        payment_id: `sim_${Date.now()}`, // Simulated payment ID
      });

    if (purchaseError) {
      console.error('Error creating purchase:', purchaseError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error processing purchase:', error);
    return false;
  }
}

/**
 * Fetches purchase history for a profile
 * @param profileId The profile ID to fetch purchases for
 * @returns Array of purchases, or empty array on error
 */
export async function fetchPurchases(profileId: number): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('purchases')
      .select('*, products(name, credits, bonus_credits)')
      .eq('profile_id', profileId)
      .order('purchased_at', { ascending: false });

    if (error) {
      console.error('Error fetching purchases:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching purchases:', error);
    return [];
  }
}
