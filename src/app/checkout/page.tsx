'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { formatBDT, isValidBDPhone } from '@/lib/utils/formatters';
import { DEFAULT_STORE_SETTINGS, DEFAULT_PAYMENT_SETTINGS } from '@/lib/data/sampleData';
import { PaymentMethodType } from '@/lib/types';

const BD_DISTRICTS = [
  'Dhaka',
  'Gazipur',
  'Narayanganj',
  'Chattogram',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Comilla',
  'Bogra',
  'Jessore',
  'Cox’s Bazar',
  'Other District',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [area, setArea] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('cod');
  const [senderPhone, setSenderPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // UI & Loading States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Delivery Calculations
  const isInsideDhaka = district.toLowerCase().includes('dhaka');
  const isFreeDelivery = subtotal >= DEFAULT_STORE_SETTINGS.free_delivery_threshold;
  const deliveryCharge = isFreeDelivery
    ? 0
    : isInsideDhaka
    ? DEFAULT_STORE_SETTINGS.delivery_inside_dhaka
    : DEFAULT_STORE_SETTINGS.delivery_outside_dhaka;

  const grandTotal = subtotal + deliveryCharge;

  // Selected Payment Method Config
  const selectedPaymentConfig = DEFAULT_PAYMENT_SETTINGS.find(
    (p) => p.method === paymentMethod
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic frontend checks
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!isValidBDPhone(phone)) {
      setErrorMessage('Please provide a valid 11-digit Bangladesh phone number (e.g. 01712345678).');
      return;
    }

    if (!streetAddress.trim() || streetAddress.trim().length < 5) {
      setErrorMessage('Please enter a complete street / house address for accurate courier delivery.');
      return;
    }

    if (paymentMethod !== 'cod') {
      if (!transactionId.trim()) {
        setErrorMessage('Please provide the Transaction ID (TrxID) for manual payment verification.');
        return;
      }
      if (!senderPhone || !isValidBDPhone(senderPhone)) {
        setErrorMessage('Please provide the valid mobile number from which the money was sent.');
        return;
      }
    }

    if (items.length === 0) {
      setErrorMessage('Your shopping bag is empty.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          district,
          area: area || district,
          streetAddress,
          deliveryNotes,
          paymentMethod,
          senderPhone: senderPhone || undefined,
          transactionId: transactionId || undefined,
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to place order. Please review your information.');
        setIsSubmitting(false);
        return;
      }

      // Order created successfully! Clear cart & redirect to confirmation
      clearCart();
      router.push(
        `/checkout/success?orderNumber=${data.orderNumber}&total=${data.total}&payment=${paymentMethod}`
      );
    } catch {
      setErrorMessage('A network error occurred while submitting your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-seoulea-ivory min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-seoulea-blush-soft p-8 text-center shadow-boutique">
          <ShoppingBag className="w-12 h-12 text-seoulea-berry mx-auto mb-3" />
          <h2 className="font-editorial text-2xl font-bold text-seoulea-cocoa">
            No Items in Checkout
          </h2>
          <p className="text-xs text-seoulea-cocoa/70 mt-2">
            Please add your favorite Korean skincare products to your bag before checking out.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 bg-seoulea-berry text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full"
          >
            <span>Back to Shop</span>
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
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-seoulea-berry hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Bag</span>
          </Link>
        </div>

        <h1 className="font-editorial text-3xl font-bold text-seoulea-cocoa mb-8">
          Secure Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form: Delivery Address & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Error Notification */}
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. Recipient Details */}
            <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 shadow-boutique space-y-4">
              <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa flex items-center gap-2 border-b border-seoulea-blush-soft pb-3">
                <span className="w-6 h-6 rounded-full bg-seoulea-berry text-white text-xs flex items-center justify-center font-sans">
                  1
                </span>
                <span>Delivery Address (Bangladesh)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-seoulea-cocoa block mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samia Rahman"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2.5 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-seoulea-cocoa block mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2.5 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                  />
                  <span className="text-[10px] text-seoulea-cocoa/60 mt-1 block">
                    Courier rider will call this number for delivery.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-seoulea-cocoa block mb-1">
                    District / City *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2.5 text-xs text-seoulea-cocoa font-semibold focus:outline-none focus:border-seoulea-gold"
                  >
                    {BD_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d} {d === 'Dhaka' ? '(Delivery: ৳70)' : '(Delivery: ৳130)'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-seoulea-cocoa block mb-1">
                    Thana / Area *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Banani / Dhanmondi / GEC"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2.5 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-seoulea-cocoa block mb-1">
                  Full Street Address & House Details *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="House number, Road number, Flat / Floor number, Landmark..."
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2.5 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-seoulea-cocoa block mb-1">
                  Special Delivery Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please deliver after 3 PM or call before arriving"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                />
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 shadow-boutique space-y-4">
              <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa flex items-center gap-2 border-b border-seoulea-blush-soft pb-3">
                <span className="w-6 h-6 rounded-full bg-seoulea-berry text-white text-xs flex items-center justify-center font-sans">
                  2
                </span>
                <span>Payment Method</span>
              </h2>

              {/* Payment Method Radio Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DEFAULT_PAYMENT_SETTINGS.map((pm) => {
                  const isSelected = paymentMethod === pm.method;
                  return (
                    <button
                      key={pm.method}
                      type="button"
                      onClick={() => setPaymentMethod(pm.method)}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'border-seoulea-berry bg-seoulea-blush-light shadow-sm'
                          : 'border-seoulea-blush-soft bg-seoulea-ivory hover:border-seoulea-gold'
                      }`}
                    >
                      <span className="text-xs font-bold text-seoulea-cocoa">
                        {pm.method.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-seoulea-cocoa/70">
                        {pm.method === 'cod' ? 'Cash on Delivery' : 'Send Money'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Payment Instructions Panel */}
              <div className="bg-seoulea-ivory rounded-2xl p-4 border border-seoulea-blush-soft space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-seoulea-berry uppercase tracking-wide">
                    {selectedPaymentConfig?.title}
                  </span>
                  {paymentMethod !== 'cod' && (
                    <span className="text-xs font-bold bg-white text-seoulea-cocoa px-2.5 py-1 rounded-md border border-seoulea-blush-soft">
                      Number: {selectedPaymentConfig?.account_number}
                    </span>
                  )}
                </div>

                <p className="text-xs text-seoulea-cocoa/80 leading-relaxed whitespace-pre-line">
                  {selectedPaymentConfig?.instructions}
                </p>

                {/* Additional Inputs for Manual Mobile Banking */}
                {paymentMethod !== 'cod' && (
                  <div className="pt-3 border-t border-seoulea-blush-soft/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-seoulea-cocoa block mb-1">
                        Your Sender Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="01XXXXXXXXX"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        className="w-full bg-white border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-seoulea-cocoa block mb-1">
                        Transaction ID (TrxID) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 9J4K2L8M1P"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-white border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs text-seoulea-cocoa uppercase focus:outline-none focus:border-seoulea-gold"
                      />
                    </div>
                    <div className="sm:col-span-2 text-[10px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      * Note: Mobile payment status remains &ldquo;Pending Verification&rdquo; until verified by our accounts staff against bank statements.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 shadow-boutique space-y-4">
              <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3">
                Order Review ({items.length} items)
              </h2>

              {/* Items Preview */}
              <div className="max-h-64 overflow-y-auto divide-y divide-seoulea-blush-soft/50 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-seoulea-ivory border border-seoulea-blush-soft flex-shrink-0">
                        <Image
                          src={
                            item.variant.image_url ||
                            item.product.images[0]?.image_url ||
                            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80'
                          }
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-seoulea-cocoa truncate">{item.product.title}</p>
                        <p className="text-[11px] text-seoulea-cocoa/60">
                          {item.variant.title} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-seoulea-cocoa flex-shrink-0">
                      {formatBDT((item.variant.sale_price ?? item.variant.regular_price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="border-t border-seoulea-blush-soft pt-3 space-y-2 text-xs text-seoulea-cocoa/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-seoulea-cocoa">{formatBDT(subtotal)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>
                    Delivery ({isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka'})
                  </span>
                  <span className="font-bold text-emerald-700">
                    {deliveryCharge === 0 ? 'FREE' : formatBDT(deliveryCharge)}
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="border-t border-seoulea-blush-soft pt-3 flex justify-between items-baseline">
                <span className="font-editorial text-lg font-bold text-seoulea-cocoa">
                  Total Payable
                </span>
                <span className="text-2xl font-bold text-seoulea-berry">
                  {formatBDT(grandTotal)}
                </span>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-4 px-6 rounded-2xl bg-seoulea-berry hover:bg-seoulea-berry-dark text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-seoulea-gold" />
                    <span>Confirm Order ({formatBDT(grandTotal)})</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-seoulea-cocoa/60 pt-1">
                By confirming your order, you agree to Seouléa’s store delivery and return policies.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
