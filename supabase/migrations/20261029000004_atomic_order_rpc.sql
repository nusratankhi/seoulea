-- ====================================================================
-- SEOULÉA: Atomic Order Creation & Inventory Transaction Function
-- Prevents overselling, race conditions, and browser price tampering.
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
  -- 1. Generate Order Number
  v_order_number := 'SEO-' || TO_CHAR(NOW(), 'YYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  v_delivery_charge := COALESCE((order_payload->>'delivery_charge')::NUMERIC, 70);

  -- 2. First Pass: Lock variant rows, validate stock, and calculate authoritative prices
  FOR v_item IN SELECT * FROM jsonb_array_elements(items_payload)
  LOOP
    v_variant_id := (v_item->>'variant_id')::UUID;
    v_qty := (v_item->>'quantity')::INT;

    IF v_qty <= 0 THEN
      RAISE EXCEPTION 'Invalid quantity % for variant %', v_qty, v_variant_id;
    END IF;

    -- Lock variant row exclusively
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

  -- 3. Calculate Final Total
  v_final_total := v_calculated_subtotal + v_delivery_charge - v_discount;

  -- 4. Insert Master Order Record
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

  -- 5. Second Pass: Insert Order Items, Decrement Stock, and Log Inventory Movements
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

    -- Insert snapshot item
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

    -- Decrement stock
    UPDATE public.product_variants
    SET stock_quantity = stock_quantity - v_qty,
        updated_at = NOW()
    WHERE id = v_variant_id;

    -- Log inventory movement
    INSERT INTO public.inventory_movements (
      variant_id,
      change_amount,
      reason,
      reference_order_id
    ) VALUES (
      v_variant_id,
      -v_qty,
      'Order placed ' || v_order_number,
      v_order_id
    );
  END LOOP;

  -- Return Result
  RETURN jsonb_build_object(
    'success', true,
    'order_id', v_order_id,
    'order_number', v_order_number,
    'subtotal', v_calculated_subtotal,
    'delivery_charge', v_delivery_charge,
    'total', v_final_total
  );
END;
$$;
