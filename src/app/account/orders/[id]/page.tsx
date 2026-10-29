'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatBDT, getOrderStatusBadge, getPaymentStatusBadge } from '@/lib/utils/formatters';
import { SAMPLE_PRODUCTS } from '@/lib/data/sampleData';

export default function CustomerOrderDetailPage({ params }: { params: { id: string } }) {
  // Sample detailed order data for testing receipt view
  const order = {
    id: params.id,
    order_number: 'SEO-261029-4821',
    created_at: '2026-10-29T08:30:00Z',
    customer_name: 'Nusrat Jahan',
    customer_phone: '01712345678',
    shipping_address: {
      fullName: 'Nusrat Jahan',
      phone: '01712345678',
      district: 'Dhaka',
      area: 'Banani',
      streetAddress: 'House 14, Road 7, Banani, Dhaka 1213',
    },
    payment_method: 'bkash',
    payment_status: 'Pending Verification',
    payment_sender_phone: '01712345678',
    payment_transaction_id: '9B7K2P1L8M',
    order_status: 'Processing',
    subtotal: 2970,
    delivery_charge: 70,
    total: 3040,
    tracking_number: 'PATHAO-BD-89421',
    courier_name: 'Pathao Courier',
    items: [
      {
        id: 'oi_1',
        product_title: 'Glow Deep Rice + Arbutin Brightening Serum',
        variant_title: '30 ml',
        sku: 'BOJ-RICE-30ML',
        quantity: 1,
        unit_price: 1390,
        total_price: 1390,
      },
      {
        id: 'oi_2',
        product_title: 'Madagascar Centella Hyalu-Cica Sun Serum SPF50+',
        variant_title: '50 ml',
        sku: 'SKIN-SUN-50ML',
        quantity: 1,
        unit_price: 1580,
        total_price: 1580,
      },
    ],
  };

  const orderBadge = getOrderStatusBadge(order.order_status);
  const payBadge = getPaymentStatusBadge(order.payment_status);

  return (
    <div className="bg-seoulea-ivory min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-seoulea-berry hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Orders</span>
          </Link>
        </div>

        {/* Order Header Card */}
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 sm:p-8 shadow-boutique mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-seoulea-blush-soft pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-seoulea-gold">
                Official Order Receipt
              </span>
              <h1 className="font-mono text-xl sm:text-2xl font-bold text-seoulea-cocoa mt-0.5">
                {order.order_number}
              </h1>
              <p className="text-xs text-seoulea-cocoa/60 mt-1">
                Placed on {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${orderBadge.bg} ${orderBadge.text}`}>
                Status: {orderBadge.label}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${payBadge.bg} ${payBadge.text}`}>
                Payment: {payBadge.label}
              </span>
            </div>
          </div>

          {/* Courier Details */}
          {order.tracking_number && (
            <div className="bg-seoulea-ivory p-4 rounded-2xl border border-seoulea-blush-soft flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-seoulea-gold" />
                <span className="text-seoulea-cocoa font-medium">
                  Dispatched via <strong>{order.courier_name}</strong>
                </span>
              </div>
              <span className="font-mono font-bold text-seoulea-berry">
                Tracking: {order.tracking_number}
              </span>
            </div>
          )}

          {/* Customer & Address Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
            <div>
              <span className="font-bold text-seoulea-gold uppercase tracking-wider block mb-1">
                Delivery Address
              </span>
              <p className="font-semibold text-seoulea-cocoa">{order.shipping_address.fullName}</p>
              <p className="text-seoulea-cocoa/70">{order.shipping_address.phone}</p>
              <p className="text-seoulea-cocoa/70 mt-1">{order.shipping_address.streetAddress}</p>
              <p className="text-seoulea-cocoa/70">{order.shipping_address.area}, {order.shipping_address.district}</p>
            </div>

            <div>
              <span className="font-bold text-seoulea-gold uppercase tracking-wider block mb-1">
                Payment Information
              </span>
              <p className="font-semibold text-seoulea-cocoa uppercase">
                Method: {order.payment_method}
              </p>
              {order.payment_transaction_id && (
                <p className="text-seoulea-cocoa/70 mt-1 font-mono">
                  TrxID: {order.payment_transaction_id}
                </p>
              )}
              {order.payment_sender_phone && (
                <p className="text-seoulea-cocoa/70">
                  Sender Mobile: {order.payment_sender_phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 sm:p-8 shadow-boutique space-y-4">
          <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3">
            Item Breakdown
          </h2>

          <div className="divide-y divide-seoulea-blush-soft/60">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-seoulea-cocoa">{item.product_title}</h4>
                  <p className="text-[11px] text-seoulea-cocoa/60">
                    Variant: {item.variant_title} (SKU: {item.sku}) • Qty: {item.quantity}
                  </p>
                </div>
                <span className="font-bold text-seoulea-cocoa">{formatBDT(item.total_price)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-seoulea-blush-soft pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-seoulea-cocoa/70">
              <span>Subtotal</span>
              <span>{formatBDT(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-seoulea-cocoa/70">
              <span>Delivery Fee</span>
              <span>{formatBDT(order.delivery_charge)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-seoulea-cocoa border-t border-seoulea-blush-soft pt-2">
              <span>Grand Total</span>
              <span className="text-seoulea-berry">{formatBDT(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
