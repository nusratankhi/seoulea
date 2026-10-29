'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { formatBDT } from '@/lib/utils/formatters';
import { DEFAULT_STORE_SETTINGS } from '@/lib/data/sampleData';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, itemCount } = useCart();

  const freeDeliveryThreshold = DEFAULT_STORE_SETTINGS.free_delivery_threshold;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;

  if (items.length === 0) {
    return (
      <div className="bg-seoulea-ivory min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-seoulea-blush-soft p-8 text-center shadow-boutique">
          <div className="w-20 h-20 rounded-full bg-seoulea-blush-light mx-auto flex items-center justify-center text-seoulea-berry mb-4">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-editorial text-2xl font-bold text-seoulea-cocoa">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-seoulea-cocoa/70 mt-2">
            Explore authentic Korean serums, calming toners, and barrier moisturizers to begin your glowing skin journey.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 bg-seoulea-berry text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-seoulea-berry-dark transition-colors shadow-sm"
          >
            <span>Explore K-Beauty Shop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-seoulea-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-seoulea-berry hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <h1 className="font-editorial text-3xl font-bold text-seoulea-cocoa mb-8">
          Shopping Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Items List (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Free Delivery Banner */}
            <div className="bg-white p-4 rounded-2xl border border-seoulea-blush-soft shadow-sm">
              {remainingForFreeDelivery > 0 ? (
                <p className="text-xs text-seoulea-cocoa">
                  Add <span className="font-bold text-seoulea-berry">{formatBDT(remainingForFreeDelivery)}</span> more of authentic Korean products to unlock <span className="font-bold text-emerald-700">FREE delivery</span> across Bangladesh!
                </p>
              ) : (
                <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-seoulea-gold" />
                  Congratulations! Your order qualifies for FREE nationwide delivery!
                </p>
              )}
            </div>

            {/* Cart Items */}
            <div className="bg-white rounded-3xl border border-seoulea-blush-soft shadow-boutique divide-y divide-seoulea-blush-soft/60 overflow-hidden">
              {items.map((item) => {
                const primaryImage =
                  item.variant.image_url ||
                  item.product.images[0]?.image_url ||
                  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80';
                const unitPrice = item.variant.sale_price ?? item.variant.regular_price;
                const lineTotal = unitPrice * item.quantity;
                const hasDiscount =
                  item.variant.sale_price && item.variant.sale_price < item.variant.regular_price;

                return (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-seoulea-ivory border border-seoulea-blush-soft flex-shrink-0">
                        <Image
                          src={primaryImage}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-seoulea-gold">
                          {item.product.brand?.name}
                        </span>
                        <h3 className="font-editorial text-sm font-bold text-seoulea-cocoa line-clamp-1">
                          {item.product.title}
                        </h3>
                        <p className="text-xs text-seoulea-cocoa/60 mt-0.5">
                          Variant: <span className="font-semibold text-seoulea-cocoa">{item.variant.title}</span> (SKU: {item.variant.sku})
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold text-seoulea-berry">
                            {formatBDT(unitPrice)}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-seoulea-cocoa/40 line-through">
                              {formatBDT(item.variant.regular_price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls & Line Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-seoulea-blush-soft/50">
                      <div className="flex items-center border border-seoulea-blush-soft rounded-xl bg-seoulea-ivory overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-white text-seoulea-cocoa"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-seoulea-cocoa">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.variant.stock_quantity}
                          className="p-2 hover:bg-white text-seoulea-cocoa disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <span className="text-sm font-bold text-seoulea-cocoa block">
                          {formatBDT(lineTotal)}
                        </span>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-seoulea-cocoa/40 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={clearCart}
                className="text-xs font-semibold text-rose-600 hover:underline"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Order Summary Card (1 col) */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 shadow-boutique space-y-4">
              <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3">
                Order Summary
              </h2>

              <div className="space-y-2 text-xs text-seoulea-cocoa/80">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-bold text-seoulea-cocoa">{formatBDT(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Delivery (Inside Dhaka)</span>
                  <span className="font-medium text-emerald-700">
                    {isFreeDelivery ? 'FREE (Special Offer)' : '৳70'}
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-seoulea-cocoa/60">
                  <span>Outside Dhaka Delivery</span>
                  <span>{isFreeDelivery ? 'FREE' : '৳130'}</span>
                </div>
              </div>

              <div className="border-t border-seoulea-blush-soft pt-3 flex justify-between items-baseline">
                <span className="font-editorial text-base font-bold text-seoulea-cocoa">
                  Subtotal
                </span>
                <span className="text-2xl font-bold text-seoulea-berry">
                  {formatBDT(subtotal)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full mt-4 py-3.5 px-6 rounded-2xl bg-seoulea-berry hover:bg-seoulea-berry-dark text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md transform hover:-translate-y-0.5"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Assurances */}
            <div className="bg-seoulea-blush-light/50 rounded-2xl p-4 border border-seoulea-blush-soft text-xs text-seoulea-cocoa/80 space-y-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-seoulea-gold flex-shrink-0" />
                <span>100% Authentic Korean formulas guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-seoulea-gold flex-shrink-0" />
                <span>Cash on Delivery & bKash / Nagad accepted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
