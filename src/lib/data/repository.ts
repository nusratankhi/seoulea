import { Product, Category, Brand, Order, PaymentSetting, StoreSettings } from '../types';
import {
  SAMPLE_PRODUCTS,
  SAMPLE_CATEGORIES,
  SAMPLE_BRANDS,
  DEFAULT_STORE_SETTINGS,
  DEFAULT_PAYMENT_SETTINGS,
} from './sampleData';
import { isSupabaseConfigured, createClient } from '../supabase/client';

export class DataRepository {
  /**
   * Returns all active products with variants, brand, and category.
   */
  static async getProducts(): Promise<{ data: Product[]; isFromDatabase: boolean }> {
    if (!isSupabaseConfigured()) {
      return { data: SAMPLE_PRODUCTS, isFromDatabase: false };
    }

    try {
      const client = createClient();
      if (!client) return { data: SAMPLE_PRODUCTS, isFromDatabase: false };

      const { data, error } = await client
        .from('products')
        .select(`
          *,
          brand:brands(*),
          category:categories(*),
          images:product_images(*),
          variants:product_variants(*)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return { data: SAMPLE_PRODUCTS, isFromDatabase: false };
      }

      return { data: data as Product[], isFromDatabase: true };
    } catch {
      return { data: SAMPLE_PRODUCTS, isFromDatabase: false };
    }
  }

  /**
   * Returns a single product by slug.
   */
  static async getProductBySlug(slug: string): Promise<Product | null> {
    const { data } = await this.getProducts();
    const found = data.find((p) => p.slug === slug);
    return found || null;
  }

  /**
   * Returns categories.
   */
  static async getCategories(): Promise<{ data: Category[]; isFromDatabase: boolean }> {
    if (!isSupabaseConfigured()) {
      return { data: SAMPLE_CATEGORIES, isFromDatabase: false };
    }

    try {
      const client = createClient();
      if (!client) return { data: SAMPLE_CATEGORIES, isFromDatabase: false };

      const { data, error } = await client
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return { data: SAMPLE_CATEGORIES, isFromDatabase: false };
      }

      return { data: data as Category[], isFromDatabase: true };
    } catch {
      return { data: SAMPLE_CATEGORIES, isFromDatabase: false };
    }
  }

  /**
   * Returns brands.
   */
  static async getBrands(): Promise<{ data: Brand[]; isFromDatabase: boolean }> {
    if (!isSupabaseConfigured()) {
      return { data: SAMPLE_BRANDS, isFromDatabase: false };
    }

    try {
      const client = createClient();
      if (!client) return { data: SAMPLE_BRANDS, isFromDatabase: false };

      const { data, error } = await client
        .from('brands')
        .select('*')
        .order('name', { ascending: true });

      if (error || !data || data.length === 0) {
        return { data: SAMPLE_BRANDS, isFromDatabase: false };
      }

      return { data: data as Brand[], isFromDatabase: true };
    } catch {
      return { data: SAMPLE_BRANDS, isFromDatabase: false };
    }
  }

  /**
   * Returns payment settings.
   */
  static async getPaymentSettings(): Promise<{ data: PaymentSetting[]; isFromDatabase: boolean }> {
    if (!isSupabaseConfigured()) {
      return { data: DEFAULT_PAYMENT_SETTINGS, isFromDatabase: false };
    }

    try {
      const client = createClient();
      if (!client) return { data: DEFAULT_PAYMENT_SETTINGS, isFromDatabase: false };

      const { data, error } = await client
        .from('payment_settings')
        .select('*')
        .eq('is_enabled', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return { data: DEFAULT_PAYMENT_SETTINGS, isFromDatabase: false };
      }

      return { data: data as PaymentSetting[], isFromDatabase: true };
    } catch {
      return { data: DEFAULT_PAYMENT_SETTINGS, isFromDatabase: false };
    }
  }

  /**
   * Returns store settings.
   */
  static async getStoreSettings(): Promise<StoreSettings> {
    return DEFAULT_STORE_SETTINGS;
  }
}
