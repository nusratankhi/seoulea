'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { formatBDT } from '@/lib/utils/formatters';
import { DEFAULT_STORE_SETTINGS } from '@/lib/data/sampleData';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  if (!isOpen) return null;

  const freeDeliveryThreshold = DEFAULT_STORE_SETTINGS.free_delivery_threshold;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-seoulea-cocoa/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-seoulea-blush-soft flex items-center justify-between bg-seoulea-ivory">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-seoulea-berry" />
              <h2 className="font-editorial text-xl font-bold text-seoulea-cocoa">
                Your Shopping Bag ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-seoulea-cocoa/60 hover:text-seoulea-berry rounded-full hover:bg-seoulea-blush-soft/50 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-seoulea-blush-light px-6 py-3 border-b border-seoulea-blush-soft">
            {remainingForFreeDelivery > 0 ? (
              <p className="text-xs text-seoulea-cocoa text-center">
                Add <span className="font-bold text-seoulea-berry">{formatBDT(remainingForFreeDelivery)}</span> more for <span className="font-bold text-emerald-700">FREE delivery</span> across Bangladesh!
              </p>
            ) : (
              <p className="text-xs text-emerald-700 font-semibold text-center flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Congratulations! You’ve unlocked FREE delivery!
              </p>
            )}
            <div className="w-full bg-seoulea-blush-soft h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-seoulea-berry h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-seoulea-blush-soft/60">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-seoulea-ivory flex items-center justify-center mb-4 text-seoulea-blush-dark">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-lg font-bold text-seoulea-cocoa">
                  Your bag is empty
                </h3>
                <p className="text-sm text-seoulea-cocoa/70 mt-1 max-w-xs">
                  Discover authentic Korean serums, toners, and moisturizers for your pathway to glass skin.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-6 inline-flex items-center gap-2 bg-seoulea-berry text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-seoulea-berry-dark transition-colors shadow-sm"
                >
                  Start Shopping
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const primaryImage =
                  item.variant.image_url ||
                  item.product.images[0]?.image_url ||
                  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80';
                const unitPrice = item.variant.sale_price ?? item.variant.regular_price;
                const hasDiscount = !!item.variant.sale_price && item.variant.sale_price < item.variant.regular_price;

                return (
                  <div key={item.id} className="py-4 flex gap-4 items-start group">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-seoulea-blush-soft flex-shrink-0 bg-seoulea-ivory">
                      <Image
                        src={primaryImage}
                        alt={item.product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-seoulea-cocoa line-clamp-1">
                        {item.product.title}
                      </h4>
                      {item.product.bengali_title && (
                        <p className="text-[11px] text-seoulea-cocoa/60 line-clamp-1">
                          {item.product.bengali_title}
                        </p>
                      )}
                      <p className="text-xs text-seoulea-gold font-medium mt-0.5">
                        Variant: {item.variant.title}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm font-bold text-seoulea-berry">
                          {formatBDT(unitPrice)}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-seoulea-cocoa/40 line-through">
                            {formatBDT(item.variant.regular_price)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper and Remove Action */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-seoulea-blush-soft rounded-lg overflow-hidden bg-seoulea-ivory">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-white text-seoulea-cocoa/80 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-seoulea-cocoa">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.variant.stock_quantity}
                            className="p-1.5 hover:bg-white text-seoulea-cocoa/80 disabled:opacity-30 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-seoulea-cocoa/40 hover:text-rose-600 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer with Subtotal & Checkout Button */}
          {items.length > 0 && (
            <div className="p-6 border-t border-seoulea-blush-soft bg-seoulea-ivory space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold text-seoulea-cocoa">
                <span>Subtotal</span>
                <span className="text-lg font-bold text-seoulea-berry">
                  {formatBDT(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-seoulea-cocoa/60">
                Taxes & delivery fees calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full text-center py-2.5 px-4 rounded-xl border border-seoulea-blush/80 text-xs font-bold text-seoulea-cocoa hover:bg-seoulea-blush-light transition-colors"
                >
                  View Full Bag
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full text-center py-2.5 px-4 rounded-xl bg-seoulea-berry text-white text-xs font-bold hover:bg-seoulea-berry-dark transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
