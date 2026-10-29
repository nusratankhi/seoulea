-- ====================================================================
-- SEOULÉA: COMPLETE ALL-IN-ONE SUPABASE DATABASE SETUP
-- Korean Skincare & Beauty Platform
-- ====================================================================
-- Run this entire script once in the Supabase Dashboard -> SQL Editor!
-- It will create all tables, indexes, RLS policies, sample data, and RPCs.
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'staff', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Customer Delivery Addresses
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  district TEXT NOT NULL,
  area TEXT NOT NULL,
  street_address TEXT NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Brands
CREATE TABLE IF NOT EXISTS public.brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  country TEXT NOT NULL DEFAULT 'South Korea',
  logo_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Products
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  bengali_title TEXT,
  slug TEXT NOT NULL UNIQUE,
  brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  ingredients TEXT,
  directions TEXT,
  skin_types TEXT[] DEFAULT '{}',
  target_concerns TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_new_arrival BOOLEAN NOT NULL DEFAULT FALSE,
  is_best_seller BOOLEAN NOT NULL DEFAULT FALSE,
  rating NUMERIC(3,2) NOT NULL DEFAULT 5.00,
  reviews_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Product Images
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Product Variants (Purchasable combinations with stock & BDT prices)
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  attribute_name TEXT NOT NULL DEFAULT 'Size',
  attribute_value TEXT NOT NULL,
  regular_price NUMERIC(10,2) NOT NULL CHECK (regular_price >= 0),
  sale_price NUMERIC(10,2) CHECK (sale_price IS NULL OR sale_price >= 0),
  stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  barcode TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Inventory Movement Audit
CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
  change_amount INT NOT NULL,
  reason TEXT NOT NULL,
  reference_order_id UUID,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cod', 'bkash', 'nagad', 'rocket')),
  payment_status TEXT NOT NULL DEFAULT 'Unpaid' CHECK (payment_status IN ('Unpaid', 'Pending Verification', 'Paid', 'Failed', 'Refunded')),
  payment_sender_phone TEXT,
  payment_transaction_id TEXT,
  payment_verified_at TIMESTAMPTZ,
  payment_verified_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_status TEXT NOT NULL DEFAULT 'Pending' CHECK (order_status IN ('Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Return Requested', 'Returned')),
  subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
  delivery_charge NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (delivery_charge >= 0),
  discount NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
  total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
  notes TEXT,
  internal_notes TEXT,
  tracking_number TEXT,
  courier_name TEXT,
  is_suspicious BOOLEAN NOT NULL DEFAULT FALSE,
  suspicious_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Order Items (Snapshot preserving historical price)
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  product_title TEXT NOT NULL,
  variant_title TEXT NOT NULL,
  sku TEXT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
  total_price NUMERIC(10,2) NOT NULL CHECK (total_price >= 0),
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Payment Settings (Configurable manual bKash, Nagad, Rocket, COD)
CREATE TABLE IF NOT EXISTS public.payment_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  method TEXT NOT NULL UNIQUE CHECK (method IN ('cod', 'bkash', 'nagad', 'rocket')),
  title TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_type TEXT NOT NULL DEFAULT 'Personal',
  instructions TEXT NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Store Settings
CREATE TABLE IF NOT EXISTS public.store_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Homepage Slides
CREATE TABLE IF NOT EXISTS public.homepage_slides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  tagline TEXT,
  button_text TEXT NOT NULL DEFAULT 'Shop Now',
  button_url TEXT NOT NULL DEFAULT '/shop',
  image_url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  );
$$;

-- Trigger to create profile upon Auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Customer'),
    'customer'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_slides ENABLE ROW LEVEL SECURITY;

-- Catalog Policies: Public Read
CREATE POLICY "Public read brands" ON public.brands FOR SELECT USING (TRUE);
CREATE POLICY "Admin manage brands" ON public.brands FOR ALL USING (public.is_admin());

CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (is_active = TRUE OR public.is_admin());
CREATE POLICY "Admin manage categories" ON public.categories FOR ALL USING (public.is_admin());

CREATE POLICY "Public read products" ON public.products FOR SELECT USING (is_active = TRUE OR public.is_admin());
CREATE POLICY "Admin manage products" ON public.products FOR ALL USING (public.is_admin());

CREATE POLICY "Public read product_images" ON public.product_images FOR SELECT USING (TRUE);
CREATE POLICY "Admin manage product_images" ON public.product_images FOR ALL USING (public.is_admin());

CREATE POLICY "Public read product_variants" ON public.product_variants FOR SELECT USING (is_active = TRUE OR public.is_admin());
CREATE POLICY "Admin manage product_variants" ON public.product_variants FOR ALL USING (public.is_admin());

-- Order Policies
CREATE POLICY "Customers read own orders" ON public.orders FOR SELECT USING (auth.uid() = customer_id OR public.is_admin());
CREATE POLICY "Public create orders" ON public.orders FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin update orders" ON public.orders FOR UPDATE USING (public.is_admin());

CREATE POLICY "Customers read own items" ON public.order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND (orders.customer_id = auth.uid() OR public.is_admin())
  )
);
CREATE POLICY "Public insert order items" ON public.order_items FOR INSERT WITH CHECK (TRUE);

-- Payment Settings
CREATE POLICY "Public read payment_settings" ON public.payment_settings FOR SELECT USING (is_enabled = TRUE OR public.is_admin());
CREATE POLICY "Admin manage payment_settings" ON public.payment_settings FOR ALL USING (public.is_admin());

-- Slides & Settings
CREATE POLICY "Public read slides" ON public.homepage_slides FOR SELECT USING (is_active = TRUE OR public.is_admin());
CREATE POLICY "Admin manage slides" ON public.homepage_slides FOR ALL USING (public.is_admin());

CREATE POLICY "Public read store_settings" ON public.store_settings FOR SELECT USING (TRUE);
CREATE POLICY "Admin manage store_settings" ON public.store_settings FOR ALL USING (public.is_admin());

-- ====================================================================
-- ATOMIC ORDER TRANSACTION FUNCTION
-- ====================================================================

CREATE OR REPLACE FUNCTION public.create_order_atomic(
  order_payload JSONB,
  items_payload JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_order_id UUID;
  v_order_number TEXT;
  v_item JSONB;
  v_variant_id UUID;
  v_qty INT;
  v_current_stock INT;
  v_unit_price NUMERIC(10,2);
  v_line_total NUMERIC(10,2);
  v_calculated_subtotal NUMERIC(10,2) := 0;
  v_delivery_charge NUMERIC(10,2);
  v_discount NUMERIC(10,2) := 0;
  v_final_total NUMERIC(10,2);
  v_product_id UUID;
  v_product_title TEXT;
  v_variant_title TEXT;
  v_sku TEXT;
  v_image_url TEXT;
BEGIN
  v_order_number := 'SEO-' || TO_CHAR(NOW(), 'YYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  v_delivery_charge := COALESCE((order_payload->>'delivery_charge')::NUMERIC, 70);

  -- 1. Validate Stock & Authoritative Prices
  FOR v_item IN SELECT * FROM jsonb_array_elements(items_payload)
  LOOP
    v_variant_id := (v_item->>'variant_id')::UUID;
    v_qty := (v_item->>'quantity')::INT;

    IF v_qty <= 0 THEN
      RAISE EXCEPTION 'Invalid quantity % for variant %', v_qty, v_variant_id;
    END IF;

    SELECT stock_quantity, COALESCE(sale_price, regular_price), title, sku, image_url
    INTO v_current_stock, v_unit_price, v_variant_title, v_sku, v_image_url
    FROM public.product_variants
    WHERE id = v_variant_id
    FOR UPDATE;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Variant % not found', v_variant_id;
    END IF;

    IF v_current_stock < v_qty THEN
      RAISE EXCEPTION 'Insufficient stock for % (Available: %, Requested: %)', v_sku, v_current_stock, v_qty;
    END IF;

    v_line_total := v_unit_price * v_qty;
    v_calculated_subtotal := v_calculated_subtotal + v_line_total;
  END LOOP;

  v_final_total := v_calculated_subtotal + v_delivery_charge - v_discount;

  -- 2. Insert Order
  INSERT INTO public.orders (
    order_number,
    customer_id,
    customer_name,
    customer_email,
    customer_phone,
    shipping_address,
    payment_method,
    payment_status,
    payment_sender_phone,
    payment_transaction_id,
    order_status,
    subtotal,
    delivery_charge,
    discount,
    total,
    notes
  ) VALUES (
    v_order_number,
    NULLIF(order_payload->>'customer_id', '')::UUID,
    order_payload->>'customer_name',
    order_payload->>'customer_email',
    order_payload->>'customer_phone',
    order_payload->'shipping_address',
    order_payload->>'payment_method',
    CASE
      WHEN (order_payload->>'payment_method') = 'cod' THEN 'Unpaid'
      ELSE 'Pending Verification'
    END,
    order_payload->>'payment_sender_phone',
    order_payload->>'payment_transaction_id',
    'Pending',
    v_calculated_subtotal,
    v_delivery_charge,
    v_discount,
    v_final_total,
    order_payload->>'notes'
  )
  RETURNING id INTO v_order_id;

  -- 3. Insert Items and Decrement Stock
  FOR v_item IN SELECT * FROM jsonb_array_elements(items_payload)
  LOOP
    v_variant_id := (v_item->>'variant_id')::UUID;
    v_qty := (v_item->>'quantity')::INT;

    SELECT pv.title, pv.sku, COALESCE(pv.sale_price, pv.regular_price), pv.image_url, p.id, p.title
    INTO v_variant_title, v_sku, v_unit_price, v_image_url, v_product_id, v_product_title
    FROM public.product_variants pv
    JOIN public.products p ON p.id = pv.product_id
    WHERE pv.id = v_variant_id;

    v_line_total := v_unit_price * v_qty;

    INSERT INTO public.order_items (
      order_id,
      product_id,
      variant_id,
      product_title,
      variant_title,
      sku,
      quantity,
      unit_price,
      total_price,
      image_url
    ) VALUES (
      v_order_id,
      v_product_id,
      v_variant_id,
      v_product_title,
      v_variant_title,
      v_sku,
      v_qty,
      v_unit_price,
      v_line_total,
      v_image_url
    );

    UPDATE public.product_variants
    SET stock_quantity = stock_quantity - v_qty,
        updated_at = NOW()
    WHERE id = v_variant_id;
  END LOOP;

  RETURN jsonb_build_object(
    'success', true,
    'order_id', v_order_id,
    'order_number', v_order_number,
    'total', v_final_total
  );
END;
$$;

-- ====================================================================
-- INITIAL SAMPLE DATA SEED
-- ====================================================
-- Brands
INSERT INTO public.brands (id, name, slug, country, description, is_featured)
VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Beauty of Joseon', 'beauty-of-joseon', 'South Korea', 'Traditional Korean Hanbang ingredients reinterpreted for modern glowing skin.', true),
  ('b1000000-0000-0000-0000-000000000002', 'COSRX', 'cosrx', 'South Korea', 'Dermatological skincare focused on skin-friendly gentle, high-impact actives.', true),
  ('b1000000-0000-0000-0000-000000000003', 'Anua', 'anua', 'South Korea', 'Formulated with heartleaf extract to soothe irritated skin and rebuild barrier health.', true),
  ('b1000000-0000-0000-0000-000000000004', 'SKIN1004', 'skin1004', 'South Korea', 'Madagascar Centella Asiatica focused calming formulas for hypersensitive skin.', true),
  ('b1000000-0000-0000-0000-000000000005', 'Laneige', 'laneige', 'South Korea', 'Water Science technology unlocking luminous glass hydration and plump lip care.', true),
  ('b1000000-0000-0000-0000-000000000006', 'Round Lab', 'round-lab', 'South Korea', 'Pristine Ulleungdo deep-sea water and birch juice mineral nourishment.', true)
ON CONFLICT (name) DO NOTHING;

-- Categories
INSERT INTO public.categories (id, name, slug, description, image_url, sort_order, is_active, is_featured)
VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Cleanser', 'cleanser', 'Balms, oil cleansers, and soothing low-pH facial foams.', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80', 1, true, true),
  ('c1000000-0000-0000-0000-000000000002', 'Toner', 'toner', 'Hydrating essences, balancing toners, and exfoliating skin preps.', 'https://images.unsplash.com/photo-1608248597359-009761005a96?auto=format&fit=crop&w=400&q=80', 2, true, true),
  ('c1000000-0000-0000-0000-000000000003', 'Serum', 'serum', 'Concentrated ampoules, glow serums, and skin barrier boosters.', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80', 3, true, true),
  ('c1000000-0000-0000-0000-000000000004', 'Moisturizer', 'moisturizer', 'Ceramide barrier creams, lightweight gel hydrators, and night balms.', 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=400&q=80', 4, true, true),
  ('c1000000-0000-0000-0000-000000000005', 'Sunscreen', 'sunscreen', 'Lightweight chemical and physical SPF 50+ PA++++ Korean sun screens.', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80', 5, true, true)
ON CONFLICT (slug) DO NOTHING;

-- Initial Products
INSERT INTO public.products (id, title, bengali_title, slug, brand_id, category_id, description, short_description, ingredients, skin_types, is_active, is_featured, is_best_seller, rating, reviews_count)
VALUES
  (
    'd1000000-0000-0000-0000-000000000001',
    'Glow Deep Rice + Arbutin Brightening Serum',
    'গ্লো ডিপ রাইস ও আরবুটিন সিরাম',
    'glow-deep-rice-arbutin-serum',
    'b1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000003',
    'Formulated with 68% Rice Bran Water and 2% Alpha-Arbutin to effectively fade dark spots, hyperpigmentation, and achieve a glassy, even radiance.',
    'Pure Korean Hanbang brightening serum for glass skin and dark spot correction.',
    'Oryza Sativa (Rice) Bran Water, Glycerin, Alpha-Arbutin, Niacinamide, Panthenol.',
    ARRAY['all', 'combination', 'sensitive'],
    true, true, true, 4.9, 38
  ),
  (
    'd1000000-0000-0000-0000-000000000002',
    'Advanced Snail 96 Mucin Power Essence',
    'অ্যাডভান্সড স্নেল ৯৬ মুসিন পাওয়ার এসেন্স',
    'advanced-snail-96-mucin-power-essence',
    'b1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000002',
    'Enriched with 96.3% skin-boosting snail secretion filtrate to deeply hydrate, repair compromised skin barriers, and boost natural collagen elasticity.',
    'Cult favorite essence for intensive hydration, barrier soothing, and instant plump glow.',
    'Snail Secretion Filtrate, Betaine, Sodium Hyaluronate, Allantoin, Panthenol, Arginine.',
    ARRAY['dry', 'oily', 'combination', 'sensitive', 'acne-prone'],
    true, true, true, 5.0, 64
  ),
  (
    'd1000000-0000-0000-0000-000000000003',
    'Heartleaf 77% Soothing Pore Toner',
    'হার্টলিফ ৭৭% সুদিং পোর টোনার',
    'heartleaf-77-soothing-toner',
    'b1000000-0000-0000-0000-000000000003',
    'c1000000-0000-0000-0000-000000000002',
    'Korea’s #1 ranking soothing toner containing 77% Houttuynia Cordata (Heartleaf) extract grown in Korea.',
    'Korea’s award-winning calming toner for sensitive and breakout-prone complexions.',
    'Houttuynia Cordata Extract (77%), Glycerin, Betaine, Panthenol.',
    ARRAY['acne-prone', 'sensitive', 'oily'],
    true, true, true, 4.8, 42
  ),
  (
    'd1000000-0000-0000-0000-000000000004',
    'Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+',
    'মাদাগাস্কার সেন্টেলা হিয়ালু-সিকা ওয়াটার সান সিরাম',
    'madagascar-centella-sun-serum-spf50',
    'b1000000-0000-0000-0000-000000000004',
    'c1000000-0000-0000-0000-000000000005',
    'Weightless chemical sunscreen with serum-like texture. Absorbs with zero white cast in Bangladesh’s climate.',
    'Ultra-lightweight hydrating daily sunscreen with zero sticky residue.',
    'Water, Propanediol, Niacinamide, Centella Asiatica Extract.',
    ARRAY['all', 'dry', 'oily', 'sensitive'],
    true, true, true, 4.9, 51
  )
ON CONFLICT (slug) DO NOTHING;

-- Initial Variants with Stock & Prices
INSERT INTO public.product_variants (product_id, sku, title, attribute_name, attribute_value, regular_price, sale_price, stock_quantity, is_active)
VALUES
  ('d1000000-0000-0000-0000-000000000001', 'BOJ-RICE-30ML', '30 ml', 'Size', '30 ml', 1550, 1390, 24, true),
  ('d1000000-0000-0000-0000-000000000001', 'BOJ-RICE-50ML', '50 ml', 'Size', '50 ml', 2200, 1950, 15, true),
  ('d1000000-0000-0000-0000-000000000002', 'COSRX-SNAIL-100ML', '100 ml', 'Size', '100 ml', 1850, 1650, 30, true),
  ('d1000000-0000-0000-0000-000000000003', 'ANUA-HL-250ML', '250 ml', 'Size', '250 ml', 2150, 1890, 18, true),
  ('d1000000-0000-0000-0000-000000000004', 'SKIN-SUN-50ML', '50 ml', 'Size', '50 ml', 1750, 1550, 35, true)
ON CONFLICT (sku) DO NOTHING;

-- Initial Product Images
INSERT INTO public.product_images (product_id, image_url, alt_text, sort_order, is_primary)
VALUES
  ('d1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', 'Glow Deep Rice Serum', 1, true),
  ('d1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1608248597359-009761005a96?auto=format&fit=crop&w=800&q=80', 'COSRX Snail Essence', 1, true),
  ('d1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', 'Anua Heartleaf 77 Toner', 1, true),
  ('d1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80', 'SKIN1004 Sun Serum', 1, true);

-- Payment Settings
INSERT INTO public.payment_settings (method, title, account_number, account_type, instructions, is_enabled, display_order)
VALUES
  ('cod', 'Cash on Delivery (COD)', 'N/A', 'Merchant', 'Pay with cash upon delivery to your doorstep anywhere in Bangladesh. Please keep exact change ready.', true, 1),
  ('bkash', 'bKash Send Money / Merchant', '017XXXXXXXX', 'Personal', '1. Go to your bKash App and select "Send Money".\n2. Enter our number: 017XXXXXXXX.\n3. Enter the exact order total amount in BDT.\n4. In reference, write your order number or phone.\n5. Copy the 10-character Transaction ID (TrxID) and enter it below.', true, 2),
  ('nagad', 'Nagad Send Money', '018XXXXXXXX', 'Personal', '1. Open Nagad App and choose "Send Money".\n2. Enter recipient number: 018XXXXXXXX.\n3. Enter the exact amount and confirm with your PIN.\n4. Input your Nagad Transaction ID below for manual verification.', true, 3),
  ('rocket', 'Rocket Send Money', '019XXXXXXXX-X', 'Personal', '1. Open Dutch-Bangla Rocket or dial *322#.\n2. Choose "Send Money" to 019XXXXXXXX-X.\n3. Complete transaction and paste your TrxID below.', true, 4)
ON CONFLICT (method) DO NOTHING;
