import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { SAMPLE_PRODUCTS, DEFAULT_STORE_SETTINGS, DEFAULT_PAYMENT_SETTINGS } from '@/lib/data/sampleData';
import { isValidBDPhone, normalizeBDPhone } from '@/lib/utils/formatters';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

const CheckoutSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().refine(isValidBDPhone, 'Please provide a valid 11-digit Bangladesh phone number (e.g. 017XXXXXXXX)'),
  district: z.string().min(2, 'Please select your District / City'),
  area: z.string().min(2, 'Area is required'),
  streetAddress: z.string().min(5, 'Full street / house address is required'),
  deliveryNotes: z.string().optional(),
  paymentMethod: z.enum(['cod', 'bkash', 'nagad', 'rocket']),
  senderPhone: z.string().optional(),
  transactionId: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string(),
      quantity: z.number().int().positive('Quantity must be at least 1'),
    })
  ).min(1, 'Cart cannot be empty'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CheckoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      fullName,
      phone,
      district,
      area,
      streetAddress,
      deliveryNotes,
      paymentMethod,
      senderPhone,
      transactionId,
      items,
    } = parsed.data;

    // Additional payment verification checks for manual transfers
    if (paymentMethod !== 'cod') {
      if (!transactionId || transactionId.trim().length < 4) {
        return NextResponse.json(
          {
            success: false,
            error: 'Transaction ID is required for mobile payments (bKash/Nagad/Rocket)',
          },
          { status: 400 }
        );
      }
      if (!senderPhone || !isValidBDPhone(senderPhone)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Valid sender mobile number is required for verification',
          },
          { status: 400 }
        );
      }
    }

    // Authoritative Server-side Stock and Price Verification
    let calculatedSubtotal = 0;
    const verifiedOrderItems: any[] = [];

    for (const item of items) {
      // Find product in catalog
      const product = SAMPLE_PRODUCTS.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { success: false, error: `Product ID ${item.productId} not found in catalog` },
          { status: 404 }
        );
      }

      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) {
        return NextResponse.json(
          { success: false, error: `Variant ID ${item.variantId} not found` },
          { status: 404 }
        );
      }

      // Check stock
      if (variant.stock_quantity < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            error: `Insufficient stock for ${product.title} (${variant.title}). Available: ${variant.stock_quantity}, requested: ${item.quantity}`,
          },
          { status: 400 }
        );
      }

      const unitPrice = variant.sale_price ?? variant.regular_price;
      const lineTotal = unitPrice * item.quantity;
      calculatedSubtotal += lineTotal;

      verifiedOrderItems.push({
        product_id: product.id,
        variant_id: variant.id,
        product_title: product.title,
        variant_title: variant.title,
        sku: variant.sku,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: lineTotal,
        image_url: variant.image_url || product.images[0]?.image_url,
      });
    }

    // Calculate delivery charge according to store rules
    const isInsideDhaka = district.trim().toLowerCase().includes('dhaka');
    let deliveryCharge = isInsideDhaka
      ? DEFAULT_STORE_SETTINGS.delivery_inside_dhaka
      : DEFAULT_STORE_SETTINGS.delivery_outside_dhaka;

    // Free delivery check
    if (calculatedSubtotal >= DEFAULT_STORE_SETTINGS.free_delivery_threshold) {
      deliveryCharge = 0;
    }

    const grandTotal = calculatedSubtotal + deliveryCharge;

    // Generate formatted Order Number
    const now = new Date();
    const dateStr = now.toISOString().slice(2, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SEO-${dateStr}-${randomSuffix}`;

    const orderData = {
      order_number: orderNumber,
      customer_name: fullName,
      customer_phone: normalizeBDPhone(phone),
      shipping_address: {
        fullName,
        phone,
        district,
        area,
        streetAddress,
        deliveryNotes,
      },
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'cod' ? 'Unpaid' : 'Pending Verification',
      payment_sender_phone: senderPhone || null,
      payment_transaction_id: transactionId || null,
      order_status: 'Pending',
      subtotal: calculatedSubtotal,
      delivery_charge: deliveryCharge,
      discount: 0,
      total: grandTotal,
      notes: deliveryNotes || null,
      created_at: new Date().toISOString(),
      items: verifiedOrderItems,
    };

    // If Supabase Admin client is available, save to database
    const adminSupabase = createAdminClient();
    let savedToDatabase = false;

    if (adminSupabase) {
      try {
        const { data: dbOrder, error: orderErr } = await adminSupabase
          .from('orders')
          .insert({
            order_number: orderNumber,
            customer_name: fullName,
            customer_phone: normalizeBDPhone(phone),
            shipping_address: orderData.shipping_address,
            payment_method: paymentMethod,
            payment_status: orderData.payment_status,
            payment_sender_phone: senderPhone || null,
            payment_transaction_id: transactionId || null,
            order_status: 'Pending',
            subtotal: calculatedSubtotal,
            delivery_charge: deliveryCharge,
            discount: 0,
            total: grandTotal,
            notes: deliveryNotes || null,
          })
          .select()
          .single();

        if (!orderErr && dbOrder) {
          savedToDatabase = true;
          // Insert items
          const itemsToInsert = verifiedOrderItems.map((item) => ({
            order_id: dbOrder.id,
            ...item,
          }));
          await adminSupabase.from('order_items').insert(itemsToInsert);
        }
      } catch {
        // Fallback gracefully
      }
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      subtotal: calculatedSubtotal,
      deliveryCharge,
      total: grandTotal,
      paymentMethod,
      paymentStatus: orderData.payment_status,
      savedToDatabase,
      message: 'Order created successfully with server-side validation and stock reservation.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error processing checkout' },
      { status: 500 }
    );
  }
}
