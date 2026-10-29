'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ShoppingBag, ArrowRight, Phone, Clock, Truck } from 'lucide-react';
import { formatBDT } from '@/lib/utils/formatters';
import { DEFAULT_STORE_SETTINGS } from '@/lib/data/sampleData';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'SEO-ORDER';
  const totalStr = searchParams.get('total') || '0';
  const paymentMethod = searchParams.get('payment') || 'cod';
  const total = parseFloat(totalStr);

  return (
    <div className="bg-seoulea-ivory min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-seoulea-blush-soft p-8 sm:p-12 shadow-boutique text-center space-y-6">
        
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-600 shadow-sm animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-seoulea-gold">
            Order Placed Successfully
          </span>
          <h1 className="font-editorial text-3xl font-bold text-seoulea-cocoa mt-1">
            Thank You for Shopping with Seouléa!
          </h1>
          <p className="text-xs sm:text-sm text-seoulea-cocoa/70 mt-2">
            Your authentic Korean skincare package is now being prepared for fulfillment.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-seoulea-ivory rounded-2xl p-6 border border-seoulea-blush-soft text-left space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-seoulea-cocoa/60">Order Reference Number:</span>
            <span className="font-mono font-bold text-seoulea-berry text-sm">
              {orderNumber}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-seoulea-cocoa/60">Total Amount:</span>
            <span className="font-bold text-seoulea-cocoa text-base">
              {formatBDT(total)}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-seoulea-cocoa/60">Payment Method:</span>
            <span className="font-bold uppercase text-seoulea-cocoa">
              {paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : `${paymentMethod.toUpperCase()} (Manual)`}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-seoulea-cocoa/60">Payment Status:</span>
            <span className="font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              {paymentMethod === 'cod' ? 'Payment Due upon Delivery' : 'Pending Verification'}
            </span>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="text-xs text-seoulea-cocoa/80 text-left space-y-2 border-t border-seoulea-blush-soft pt-4">
          <div className="flex items-start gap-2.5">
            <Truck className="w-4 h-4 text-seoulea-gold flex-shrink-0 mt-0.5" />
            <span>
              <strong>Fulfillment & Delivery:</strong> Inside Dhaka parcels arrive within 24–48 hours; all other districts within 3–4 days via trusted couriers.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-seoulea-gold flex-shrink-0 mt-0.5" />
            <span>
              <strong>Advisory Hotline:</strong> For updates or order amendments, WhatsApp us at {DEFAULT_STORE_SETTINGS.contact_phone}.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Link
            href="/shop"
            className="flex-1 py-3 px-6 rounded-2xl bg-seoulea-berry hover:bg-seoulea-berry-dark text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account/orders"
            className="flex-1 py-3 px-6 rounded-2xl border border-seoulea-blush text-seoulea-cocoa hover:bg-seoulea-blush-light font-bold text-xs uppercase tracking-wider transition-colors"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-seoulea-ivory py-16 text-center text-xs text-seoulea-cocoa/60">
          Loading order confirmation...
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
