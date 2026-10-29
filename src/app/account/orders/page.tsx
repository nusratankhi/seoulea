'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, ArrowRight, Eye, Clock, CheckCircle2 } from 'lucide-react';
import { formatBDT, getOrderStatusBadge, getPaymentStatusBadge } from '@/lib/utils/formatters';

const SAMPLE_CUSTOMER_ORDERS = [
  {
    id: 'ord_1',
    order_number: 'SEO-261029-4821',
    created_at: '2026-10-29T08:30:00Z',
    items_count: 2,
    total: 3040,
    payment_method: 'bkash',
    payment_status: 'Pending Verification',
    order_status: 'Processing',
  },
  {
    id: 'ord_2',
    order_number: 'SEO-261020-1940',
    created_at: '2026-10-20T14:15:00Z',
    items_count: 1,
    total: 1650,
    payment_method: 'cod',
    payment_status: 'Paid',
    order_status: 'Delivered',
  },
];

export default function CustomerOrdersPage() {
  return (
    <div className="bg-seoulea-ivory min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-seoulea-berry hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Account</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="font-editorial text-3xl font-bold text-seoulea-cocoa flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 text-seoulea-berry" />
            <span>My Order History</span>
          </h1>
          <p className="text-xs text-seoulea-cocoa/60 mt-1">
            Review order statuses, delivery tracking, and payment verification records.
          </p>
        </div>

        {SAMPLE_CUSTOMER_ORDERS.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-seoulea-blush-soft shadow-boutique">
            <p className="font-editorial text-lg font-bold text-seoulea-cocoa">
              You haven&apos;t placed any orders yet.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-block px-6 py-2.5 bg-seoulea-berry text-white text-xs font-bold uppercase rounded-full"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {SAMPLE_CUSTOMER_ORDERS.map((order) => {
              const orderBadge = getOrderStatusBadge(order.order_status);
              const payBadge = getPaymentStatusBadge(order.payment_status);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-seoulea-blush-soft p-5 sm:p-6 shadow-boutique hover:shadow-boutique-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-seoulea-cocoa">
                        {order.order_number}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${orderBadge.bg} ${orderBadge.text}`}
                      >
                        {orderBadge.label}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${payBadge.bg} ${payBadge.text}`}
                      >
                        {payBadge.label}
                      </span>
                    </div>

                    <p className="text-xs text-seoulea-cocoa/60">
                      Placed on {new Date(order.created_at).toLocaleDateString()} • {order.items_count} {order.items_count === 1 ? 'item' : 'items'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-0 border-seoulea-blush-soft/60">
                    <div className="text-right">
                      <span className="text-[10px] text-seoulea-cocoa/60 uppercase block">Total</span>
                      <span className="font-bold text-sm text-seoulea-berry">
                        {formatBDT(order.total)}
                      </span>
                    </div>

                    <Link
                      href={`/account/orders/${order.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-seoulea-berry bg-seoulea-blush-light hover:bg-seoulea-blush-soft border border-seoulea-blush transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Receipt</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
