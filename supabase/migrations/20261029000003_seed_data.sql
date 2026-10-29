-- ====================================================================
-- SEOULÉA: Sample Demo Seed Data
-- Clearly labeled: Replace with verified distributor catalog data before production
-- ====================================================================

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

-- Payment Settings
INSERT INTO public.payment_settings (method, title, account_number, account_type, instructions, is_enabled, display_order)
VALUES
  ('cod', 'Cash on Delivery (COD)', 'N/A', 'Merchant', 'Pay with cash upon delivery to your doorstep anywhere in Bangladesh. Please keep exact change ready.', true, 1),
  ('bkash', 'bKash Send Money / Merchant', '017XXXXXXXX', 'Personal', '1. Go to your bKash App and select "Send Money".\n2. Enter our number: 017XXXXXXXX.\n3. Enter the exact order total amount in BDT.\n4. In reference, write your order number or phone.\n5. Copy the 10-character Transaction ID (TrxID) and enter it below.', true, 2),
  ('nagad', 'Nagad Send Money', '018XXXXXXXX', 'Personal', '1. Open Nagad App and choose "Send Money".\n2. Enter recipient number: 018XXXXXXXX.\n3. Enter the exact amount and confirm with your PIN.\n4. Input your Nagad Transaction ID below for manual verification.', true, 3),
  ('rocket', 'Rocket Send Money', '019XXXXXXXX-X', 'Personal', '1. Open Dutch-Bangla Rocket or dial *322#.\n2. Choose "Send Money" to 019XXXXXXXX-X.\n3. Complete transaction and paste your TrxID below.', true, 4)
ON CONFLICT (method) DO NOTHING;
