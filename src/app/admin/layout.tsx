'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Boxes,
  CreditCard,
  Settings,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Database,
} from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dbConnected = isSupabaseConfigured();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Products & Variants', href: '/admin/products', icon: Package },
    { label: 'Categories', href: '/admin/categories', icon: Layers },
    { label: 'Orders & Payments', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Inventory Stock', href: '/admin/inventory', icon: Boxes },
    { label: 'Customers', href: '/admin/customers', icon: Users },
    { label: 'Payment Settings', href: '/admin/payments', icon: CreditCard },
    { label: 'Store & Slides', href: '/admin/settings', icon: Settings },
    { label: 'Reports & Sales', href: '/admin/reports', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F2] flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-seoulea-cocoa-dark text-white flex-shrink-0 flex flex-col justify-between hidden md:flex border-r border-seoulea-gold/20">
        <div>
          {/* Logo & Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-seoulea-gold bg-white">
                <Image
                  src="/images/seoulea-logo.jpg"
                  alt="Seouléa"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-editorial text-xl font-bold text-white tracking-wide block leading-none">
                  Seouléa
                </span>
                <span className="text-[10px] text-seoulea-gold uppercase tracking-widest font-semibold">
                  Admin Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-seoulea-berry text-white shadow-sm font-bold'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-seoulea-gold' : 'text-white/60'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Database Status & Storefront Link */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="bg-black/30 p-3 rounded-xl border border-white/10 text-[11px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-white/60 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-seoulea-gold" />
                Supabase:
              </span>
              <span
                className={`font-bold px-2 py-0.5 rounded-full text-[9px] ${
                  dbConnected
                    ? 'bg-emerald-900/60 text-emerald-300'
                    : 'bg-amber-900/60 text-amber-300'
                }`}
              >
                {dbConnected ? 'CONNECTED' : 'STANDALONE MODE'}
              </span>
            </div>
            {!dbConnected && (
              <p className="text-[10px] text-white/50 leading-tight pt-1">
                Running in safe local mode with verified demo catalog. Connect Supabase keys in .env.local for production sync.
              </p>
            )}
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
          >
            <span>View Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5 text-seoulea-gold" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-seoulea-blush-soft px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-lg font-bold text-seoulea-cocoa">
              Management Portal
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-seoulea-blush-light text-seoulea-berry font-bold border border-seoulea-blush">
              Role: System Administrator
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-seoulea-cocoa hover:text-seoulea-berry flex items-center gap-1 md:hidden"
            >
              <span>Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-seoulea-cocoa text-white flex items-center justify-center text-xs font-bold font-editorial">
                SA
              </div>
              <span className="text-xs font-bold text-seoulea-cocoa hidden sm:inline">
                Admin (Seouléa HQ)
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Admin Body */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
