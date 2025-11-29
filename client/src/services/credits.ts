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
 * Initiates a product purchase by creating an order and payment link
 * @param productId The ID of the product being purchased
 * @returns Object with checkoutUrl and orderId if successful, null otherwise
 */
export async function purchaseProduct(
  productId: string,
): Promise<{ checkoutUrl: string; orderId: number } | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.error('User not authenticated');
      return null;
    }

    // Call edge function with product_id as query parameter
    const { data, error } = await supabase.functions.invoke(`order?product_id=${productId}`, {
      method: 'POST',
    });

    if (error) {
      console.error('Error creating order:', error);
      return null;
    }

    const { checkoutUrl, orderId } = data as { checkoutUrl: string; orderId: number };
    
    if (!checkoutUrl || !orderId) {
      console.error('Invalid response from order function');
      return null;
    }

    return { checkoutUrl, orderId };
  } catch (error) {
    console.error('Error processing order:', error);
    return null;
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
