-- ====================================================================
-- SEOULÉA: Row Level Security (RLS) & Security Policies
-- ====================================================================

-- 1. Helper function to check if current user is admin or staff
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

-- 2. Automatically create profile on new auth user signup
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
    'customer' -- CRITICAL: ALWAYS DEFAULT TO 'customer', NEVER 'admin'!
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Enable RLS on all tables
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
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- 4. Profiles Policies
CREATE POLICY "Public profiles are viewable by self and admins"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    -- Prevent customers from escalating their own role
    (role = (SELECT role FROM public.profiles WHERE id = auth.uid()) OR public.is_admin())
  );

-- 5. Addresses Policies
CREATE POLICY "Users can manage their own addresses"
  ON public.addresses FOR ALL
  USING (auth.uid() = user_id OR public.is_admin());

-- 6. Catalog Policies (Brands, Categories, Products, Images, Variants)
CREATE POLICY "Public read access for active brands"
  ON public.brands FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage brands"
  ON public.brands FOR ALL
  USING (public.is_admin());

CREATE POLICY "Public read access for categories"
  ON public.categories FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (public.is_admin());

CREATE POLICY "Public read access for active products"
  ON public.products FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (public.is_admin());

CREATE POLICY "Public read access for product images"
  ON public.product_images FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage product images"
  ON public.product_images FOR ALL
  USING (public.is_admin());

CREATE POLICY "Public read access for active variants"
  ON public.product_variants FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage product variants"
  ON public.product_variants FOR ALL
  USING (public.is_admin());

-- 7. Orders & Order Items Policies
CREATE POLICY "Customers can view only their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = customer_id OR public.is_admin());

CREATE POLICY "Anyone can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Customers can view their own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.customer_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Anyone can insert order items during checkout"
  ON public.order_items FOR INSERT
  WITH CHECK (TRUE);

-- 8. Inventory Movements & Admin Logs
CREATE POLICY "Admins can view inventory movements"
  ON public.inventory_movements FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can view and create admin activity logs"
  ON public.admin_activity_logs FOR ALL
  USING (public.is_admin());

-- 9. Slides, Store & Payment Settings
CREATE POLICY "Public can view active slides"
  ON public.homepage_slides FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage slides"
  ON public.homepage_slides FOR ALL
  USING (public.is_admin());

CREATE POLICY "Public can read store settings"
  ON public.store_settings FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can update store settings"
  ON public.store_settings FOR ALL
  USING (public.is_admin());

CREATE POLICY "Public can view enabled payment methods"
  ON public.payment_settings FOR SELECT
  USING (is_enabled = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage payment settings"
  ON public.payment_settings FOR ALL
  USING (public.is_admin());
