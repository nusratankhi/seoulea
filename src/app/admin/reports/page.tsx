'use client';

import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Package, PieChart, Users } from 'lucide-react';
import { formatBDT } from '@/lib/utils/formatters';

export default function AdminReportsPage() {
  const salesByMonth = [
    { month: 'Jun 2026', revenue: 195000, orders: 74 },
    { month: 'Jul 2026', revenue: 242000, orders: 88 },
    { month: 'Aug 2026', revenue: 290000, orders: 104 },
    { month: 'Sep 2026', revenue: 320000, orders: 115 },
    { month: 'Oct 2026', revenue: 384500, orders: 128 },
  ];

  const topProducts = [
    { title: 'Glow Deep Rice + Arbutin Brightening Serum', brand: 'Beauty of Joseon', soldUnits: 84, revenue: 116760 },
    { title: 'Advanced Snail 96 Mucin Power Essence', brand: 'COSRX', soldUnits: 76, revenue: 125400 },
    { title: 'Madagascar Centella Hyalu-Cica Sun Serum', brand: 'SKIN1004', soldUnits: 68, revenue: 105400 },
    { title: 'Heartleaf 77% Soothing Pore Toner', brand: 'Anua', soldUnits: 55, revenue: 103950 },
  ];

  const paymentShare = [
    { method: 'bKash Send Money', percentage: '48%', orders: 61 },
    { method: 'Cash on Delivery (COD)', percentage: '36%', orders: 46 },
    { method: 'Nagad Send Money', percentage: '12%', orders: 15 },
    { method: 'Rocket Send Money', percentage: '4%', orders: 6 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa">
          Sales & Analytics Reports
        </h1>
        <p className="text-xs text-seoulea-cocoa/60 mt-1">
          Historical revenue performance, top selling K-Beauty items, and payment method distribution across Bangladesh.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-seoulea-blush-soft shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-seoulea-gold block">
            Average Order Value (AOV)
          </span>
          <span className="font-editorial text-2xl font-bold text-seoulea-cocoa mt-1 block">
            ৳3,003
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            Healthy skincare bundle rate
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-seoulea-blush-soft shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-seoulea-gold block">
            Fulfillment Delivery Rate
          </span>
          <span className="font-editorial text-2xl font-bold text-seoulea-cocoa mt-1 block">
            96.8%
          </span>
          <span className="text-[11px] text-seoulea-cocoa/60 mt-1 block">
            Across all 64 districts
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-seoulea-blush-soft shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-seoulea-gold block">
            Prepaid Mobile Share
          </span>
          <span className="font-editorial text-2xl font-bold text-seoulea-cocoa mt-1 block">
            64.0%
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            High customer trust ratio
          </span>
        </div>
      </div>

      {/* Monthly Revenue Breakdown Table */}
      <div className="bg-white rounded-3xl border border-seoulea-blush-soft shadow-sm p-6 space-y-4">
        <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-seoulea-gold" />
          <span>Monthly Revenue Growth (Last 5 Months)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-seoulea-ivory font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft">
              <tr>
                <th className="py-3 px-4">Month</th>
                <th className="py-3 px-4">Completed Orders</th>
                <th className="py-3 px-4">Gross Revenue (BDT)</th>
                <th className="py-3 px-4">Growth %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-seoulea-blush-soft/60">
              {salesByMonth.map((m, idx) => (
                <tr key={m.month} className="hover:bg-seoulea-ivory/40">
                  <td className="py-3 px-4 font-bold text-seoulea-cocoa">{m.month}</td>
                  <td className="py-3 px-4 font-semibold text-seoulea-cocoa/80">{m.orders} orders</td>
                  <td className="py-3 px-4 font-bold text-seoulea-berry">{formatBDT(m.revenue)}</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">
                    {idx === 0 ? '-' : `+${Math.round(((m.revenue - salesByMonth[idx - 1].revenue) / salesByMonth[idx - 1].revenue) * 100)}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products & Payment Methods Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Products */}
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft shadow-sm p-6 space-y-4">
          <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-seoulea-gold" />
            <span>Top Performing K-Beauty Items</span>
          </h2>

          <div className="divide-y divide-seoulea-blush-soft/60 text-xs">
            {topProducts.map((tp, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center">
                <div>
                  <strong className="text-seoulea-cocoa block line-clamp-1">{tp.title}</strong>
                  <span className="text-[10px] text-seoulea-gold font-bold uppercase">{tp.brand}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-seoulea-berry block">{formatBDT(tp.revenue)}</span>
                  <span className="text-[10px] text-seoulea-cocoa/60">{tp.soldUnits} bottles sold</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Channel Breakdown */}
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft shadow-sm p-6 space-y-4">
          <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-seoulea-gold" />
            <span>Payment Method Distribution</span>
          </h2>

          <div className="divide-y divide-seoulea-blush-soft/60 text-xs">
            {paymentShare.map((ps, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center">
                <div>
                  <strong className="text-seoulea-cocoa block">{ps.method}</strong>
                  <span className="text-[10px] text-seoulea-cocoa/60">{ps.orders} processed orders</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-seoulea-berry text-sm">{ps.percentage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
