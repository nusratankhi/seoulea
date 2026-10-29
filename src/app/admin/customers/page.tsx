'use client';

import React, { useState } from 'react';
import { Users, Search, Mail, Phone, MapPin, Eye } from 'lucide-react';

interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  district: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
}

export default function AdminCustomersPage() {
  const [customers] = useState<CustomerProfile[]>([
    {
      id: 'cust_1',
      name: 'Nusrat Jahan',
      phone: '01712345678',
      email: 'nusrat.jahan@example.com',
      district: 'Dhaka',
      ordersCount: 4,
      totalSpent: 12450,
      joinedDate: '2026-02-14',
    },
    {
      id: 'cust_2',
      name: 'Tanvir Ahmed',
      phone: '01819876543',
      email: 'tanvir.ahmed@example.com',
      district: 'Chattogram',
      ordersCount: 2,
      totalSpent: 4890,
      joinedDate: '2026-03-01',
    },
    {
      id: 'cust_3',
      name: 'Fabiha Rahman',
      phone: '01911223344',
      email: 'fabiha.r@example.com',
      district: 'Sylhet',
      ordersCount: 3,
      totalSpent: 9600,
      joinedDate: '2026-04-10',
    },
  ]);

  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa">
          Customer Accounts
        </h1>
        <p className="text-xs text-seoulea-cocoa/60 mt-1">
          View customer delivery addresses, contact details, and lifetime spending.
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-seoulea-blush-soft shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by customer name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl py-2 pl-3.5 pr-9 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
          />
          <Search className="w-4 h-4 text-seoulea-cocoa/40 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
        <span className="text-xs font-semibold text-seoulea-cocoa/60">
          {filtered.length} Customer Profiles
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-seoulea-blush-soft shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-seoulea-ivory text-seoulea-cocoa font-bold border-b border-seoulea-blush-soft">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Lifetime Spent</th>
                <th className="py-3 px-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-seoulea-blush-soft/60">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-seoulea-ivory/40">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-seoulea-cocoa text-sm block">{c.name}</span>
                    <span className="text-[10px] text-seoulea-gold font-mono">{c.id}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-seoulea-cocoa block">{c.phone}</span>
                    <span className="text-seoulea-cocoa/60 text-[11px]">{c.email}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-seoulea-cocoa">
                    {c.district}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-seoulea-cocoa">
                    {c.ordersCount} orders
                  </td>
                  <td className="py-3.5 px-4 font-bold text-seoulea-berry">
                    ৳{c.totalSpent.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-seoulea-cocoa/60">
                    {c.joinedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
