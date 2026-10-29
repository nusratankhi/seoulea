export type SkinType = 'all' | 'dry' | 'oily' | 'combination' | 'sensitive' | 'acne-prone' | 'normal';

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  description?: string;
  country: string;
  is_featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url: string;
  parent_id?: string | null;
  sort_order: number;
  is_active: boolean;
  is_featured: boolean;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  title: string; // e.g. "50ml", "100ml", "Single", "Duo Pack"
  attribute_name: string; // e.g. "Size", "Shade"
  attribute_value: string; // e.g. "50ml", "100ml"
  regular_price: number; // in BDT
  sale_price?: number | null; // in BDT
  stock_quantity: number;
  image_url?: string;
  is_active: boolean;
  barcode?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

export interface Product {
  id: string;
  title: string;
  bengali_title?: string;
  slug: string;
  brand_id: string;
  brand?: Brand;
  category_id: string;
  category?: Category;
  description: string;
  short_description?: string;
  ingredients?: string;
  directions?: string;
  skin_types: SkinType[];
  target_concerns?: string[];
  is_active: boolean;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  rating: number;
  reviews_count: number;
  images: ProductImage[];
  variants: ProductVariant[];
  created_at: string;
}

export interface CartItem {
  id: string; // cart item ID
  productId: string;
  variantId: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  district: string; // e.g. "Dhaka", "Chattogram", "Sylhet"
  area: string;
  streetAddress: string;
  deliveryNotes?: string;
}

export type PaymentMethodType = 'cod' | 'bkash' | 'nagad' | 'rocket';

export interface PaymentSetting {
  id: string;
  method: PaymentMethodType;
  title: string;
  account_number: string;
  account_type: 'Merchant' | 'Personal';
  instructions: string;
  is_enabled: boolean;
  display_order: number;
  badge_url?: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Return Requested'
  | 'Returned';

export type PaymentStatus =
  | 'Unpaid'
  | 'Pending Verification'
  | 'Paid'
  | 'Failed'
  | 'Refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string;
  product_title: string;
  variant_title: string;
  sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  image_url?: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id?: string | null;
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  shipping_address: DeliveryAddress;
  payment_method: PaymentMethodType;
  payment_status: PaymentStatus;
  payment_sender_phone?: string;
  payment_transaction_id?: string;
  payment_verified_at?: string;
  payment_verified_by?: string;
  order_status: OrderStatus;
  subtotal: number;
  delivery_charge: number;
  discount: number;
  total: number;
  notes?: string;
  internal_notes?: string;
  tracking_number?: string;
  courier_name?: string;
  is_suspicious?: boolean;
  suspicious_reason?: string;
  created_at: string;
  items?: OrderItem[];
}

export interface HomepageSlide {
  id: string;
  title: string;
  subtitle: string;
  tagline?: string;
  button_text: string;
  button_url: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface StoreSettings {
  store_name: string;
  tagline: string;
  announcement_bar_text: string;
  announcement_bar_enabled: boolean;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  business_hours: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  whatsapp_number: string;
  delivery_inside_dhaka: number;
  delivery_outside_dhaka: number;
  free_delivery_threshold: number;
}
