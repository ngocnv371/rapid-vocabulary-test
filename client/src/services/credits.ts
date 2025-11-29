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
 * Processes a product order and adds credits to the user's account
 * @param profileId The profile ID making the order
 * @param productId The ID of the product being purchased
 * @param credits The number of credits to add (including bonus)
 * @returns True if successful, false otherwise
 */
export async function purchaseProduct(
  profileId: number,
  productId: string,
): Promise<boolean> {
  try {
    // TODO: call edge function `/order?product_id=123` to initiate order processing
    return true;
  } catch (error) {
    console.error('Error processing order:', error);
    return false;
  }
}

/**
 * Fetches order history for a profile
 * @param profileId The profile ID to fetch orders for
 * @returns Array of orders, or empty array on error
 */
export async function fetchOrders(profileId: number): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, products(name, credits, bonus_credits)')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}
