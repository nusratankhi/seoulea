'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  AlertTriangle,
  Users,
  Plus,
  ArrowRight,
  Database,
  ExternalLink,
  ShieldAlert,
  Boxes,
} from 'lucide-react';
import { formatBDT, getOrderStatusBadge, getPaymentStatusBadge } from '@/lib/utils/formatters';
import { SAMPLE_PRODUCTS } from '@/lib/data/sampleData';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export default function AdminDashboardPage() {
  const dbConnected = isSupabaseConfigured();

  // Metrics
  const totalSales = 384500;
  const totalOrdersCount = 128;
  const pendingVerificationCount = 3;
  const lowStockCount = SAMPLE_PRODUCTS.reduce((count, p) => {
    return count + p.variants.filter((v) => v.stock_quantity <= 10).length;
  }, 0);

  // Recent demo orders
  const recentOrders = [
    {
      id: 'ord_1',
      order_number: 'SEO-261029-4821',
      customer_name: 'Nusrat Jahan',
      customer_phone: '01712345678',
      district: 'Dhaka',
      total: 3040,
      payment_method: 'bkash',
      payment_status: 'Pending Verification',
      order_status: 'Pending',
      created_at: 'Just now',
    },
    {
      id: 'ord_2',
      order_number: 'SEO-261028-9124',
      customer_name: 'Tanvir Ahmed',
      customer_phone: '01819876543',
      district: 'Chattogram',
      total: 2450,
      payment_method: 'cod',
      payment_status: 'Unpaid',
      order_status: 'Confirmed',
      created_at: '2 hours ago',
    },
    {
      id: 'ord_3',
      order_number: 'SEO-261028-7612',
      customer_name: 'Fabiha Rahman',
      customer_phone: '01911223344',
      district: 'Sylhet',
      total: 4890,
      payment_method: 'nagad',
      payment_status: 'Paid',
      order_status: 'Shipped',
      created_at: 'Yesterday',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa">
            Executive Store Overview
          </h1>
          <p className="text-xs text-seoulea-cocoa/60 mt-1">
            Real-time sales, order verification, inventory warnings, and K-Beauty catalog metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 bg-seoulea-berry hover:bg-seoulea-berry-dark text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Supabase Status Alert (Transparent guidance) */}
      {!dbConnected && (
        <div className="bg-amber-50 border border-amber-300 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Supabase Database Connection Pending</strong>
              <span>
                Running in safe standalone development mode using high-fidelity sample data. To connect to live Supabase PostgreSQL, add your project credentials to <code>.env.local</code>.
              </span>
            </div>
          </div>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-3 py-1.5 bg-amber-200 hover:bg-amber-300 rounded-lg font-bold text-[11px] transition-colors"
          >
            Supabase Console
          </a>
        </div>
      )}

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Sales */}
        <div className="bg-white p-5 rounded-2xl border border-seoulea-blush-soft shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-seoulea-gold block">
              Total Revenue
            </span>
            <span className="font-editorial text-2xl font-bold text-seoulea-cocoa mt-1 block">
              {formatBDT(totalSales)}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
              +18.4% this month
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-seoulea-blush-light text-seoulea-berry flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-seoulea-blush-soft shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-seoulea-gold block">
              Total Orders
            </span>
            <span className="font-editorial text-2xl font-bold text-seoulea-cocoa mt-1 block">
              {totalOrdersCount}
            </span>
            <span className="text-[11px] text-seoulea-cocoa/60 mt-1 block">
              Nationwide Bangladesh
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-seoulea-blush-light text-seoulea-berry flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Verification */}
        <div className="bg-white p-5 rounded-2xl border border-seoulea-blush-soft shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
              Action Required
            </span>
            <span className="font-editorial text-2xl font-bold text-amber-800 mt-1 block">
              {pendingVerificationCount} Pending
            </span>
            <Link
              href="/admin/orders?status=pending"
              className="text-[11px] text-seoulea-berry font-bold hover:underline mt-1 block"
            >
              Verify bKash / Nagad TrxIDs &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Low Stock Warnings */}
        <div className="bg-white p-5 rounded-2xl border border-seoulea-blush-soft shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block">
              Stock Warnings
            </span>
            <span className="font-editorial text-2xl font-bold text-rose-800 mt-1 block">
              {lowStockCount} Variants Low
            </span>
            <Link
              href="/admin/inventory"
              className="text-[11px] text-seoulea-berry font-bold hover:underline mt-1 block"
            >
              View Inventory Alerts &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl border border-seoulea-blush-soft shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-seoulea-blush-soft pb-4">
          <div>
            <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-seoulea-cocoa/60 mt-0.5">
              Orders requiring dispatch, packing, or mobile payment reconciliation.
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="text-xs font-bold text-seoulea-berry hover:text-seoulea-berry-dark flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-seoulea-ivory text-seoulea-cocoa font-bold border-b border-seoulea-blush-soft">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-seoulea-blush-soft/60">
              {recentOrders.map((ord) => {
                const orderBadge = getOrderStatusBadge(ord.order_status);
                const payBadge = getPaymentStatusBadge(ord.payment_status);

                return (
                  <tr key={ord.id} className="hover:bg-seoulea-ivory/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-seoulea-cocoa">
                      {ord.order_number}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-seoulea-cocoa block">{ord.customer_name}</span>
                      <span className="text-[11px] text-seoulea-cocoa/60">{ord.customer_phone}</span>
                    </td>
                    <td className="py-3.5 px-4 text-seoulea-cocoa font-medium">
                      {ord.district}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-seoulea-berry">
                      {formatBDT(ord.total)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="uppercase text-[10px] font-bold block mb-0.5">
                        {ord.payment_method}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${payBadge.bg} ${payBadge.text}`}>
                        {payBadge.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${orderBadge.bg} ${orderBadge.text}`}>
                        {orderBadge.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/orders?highlight=${ord.id}`}
                        className="px-3 py-1.5 bg-seoulea-ivory hover:bg-seoulea-blush-light border border-seoulea-blush text-seoulea-berry font-bold rounded-lg transition-colors text-[11px]"
                      >
                        Inspect & Verify
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
