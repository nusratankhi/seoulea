'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, ShoppingBag, MapPin, Heart, Shield, Lock, Phone, Mail } from 'lucide-react';
import { useWishlist } from '@/lib/context/WishlistContext';

export default function AccountPage() {
  const { wishlistCount } = useWishlist();

  // Demo user profile state with Supabase Auth compatibility
  const [profile, setProfile] = useState({
    fullName: 'Nusrat Jahan',
    email: 'nusrat.jahan@example.com',
    phone: '01712345678',
    district: 'Dhaka',
    address: 'House 14, Road 7, Banani, Dhaka 1213',
  });

  return (
    <div className="bg-seoulea-ivory min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 sm:p-8 shadow-boutique mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-seoulea-blush-light border-2 border-seoulea-gold/60 flex items-center justify-center font-editorial text-2xl font-bold text-seoulea-berry">
              {profile.fullName.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-seoulea-gold">
                Seouléa Beauty Member
              </span>
              <h1 className="font-editorial text-2xl font-bold text-seoulea-cocoa">
                Welcome back, {profile.fullName}
              </h1>
              <p className="text-xs text-seoulea-cocoa/60 mt-0.5">
                {profile.email} • {profile.phone}
              </p>
            </div>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-seoulea-berry bg-seoulea-blush-light hover:bg-seoulea-blush-soft border border-seoulea-blush transition-colors"
          >
            <Shield className="w-4 h-4 text-seoulea-gold" />
            <span>Admin Control Panel</span>
          </Link>
        </div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Link
            href="/account/orders"
            className="bg-white rounded-2xl border border-seoulea-blush-soft p-6 shadow-boutique hover:shadow-boutique-lg transition-all group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-seoulea-blush-light flex items-center justify-center text-seoulea-berry group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-editorial text-base font-bold text-seoulea-cocoa group-hover:text-seoulea-berry transition-colors">
                Order History
              </h3>
              <p className="text-xs text-seoulea-cocoa/60 mt-0.5">
                Track status and order receipts
              </p>
            </div>
          </Link>

          <Link
            href="/wishlist"
            className="bg-white rounded-2xl border border-seoulea-blush-soft p-6 shadow-boutique hover:shadow-boutique-lg transition-all group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-seoulea-blush-light flex items-center justify-center text-seoulea-berry group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-editorial text-base font-bold text-seoulea-cocoa group-hover:text-seoulea-berry transition-colors">
                Saved Wishlist
              </h3>
              <p className="text-xs text-seoulea-cocoa/60 mt-0.5">
                {wishlistCount} saved K-Beauty formulas
              </p>
            </div>
          </Link>

          <div className="bg-white rounded-2xl border border-seoulea-blush-soft p-6 shadow-boutique flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-seoulea-blush-light flex items-center justify-center text-seoulea-gold">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-editorial text-base font-bold text-seoulea-cocoa">
                Saved Address
              </h3>
              <p className="text-xs text-seoulea-cocoa/60 mt-0.5">
                Banani, Dhaka (Default)
              </p>
            </div>
          </div>
        </div>

        {/* Profile Details & Password Card */}
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 sm:p-8 shadow-boutique space-y-6">
          <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3">
            Profile & Delivery Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <span className="font-bold text-seoulea-cocoa block mb-1">Full Name</span>
              <p className="bg-seoulea-ivory p-3 rounded-xl border border-seoulea-blush-soft text-seoulea-cocoa">
                {profile.fullName}
              </p>
            </div>
            <div>
              <span className="font-bold text-seoulea-cocoa block mb-1">Mobile Phone (Bangladesh)</span>
              <p className="bg-seoulea-ivory p-3 rounded-xl border border-seoulea-blush-soft text-seoulea-cocoa">
                {profile.phone}
              </p>
            </div>
            <div>
              <span className="font-bold text-seoulea-cocoa block mb-1">Email Address</span>
              <p className="bg-seoulea-ivory p-3 rounded-xl border border-seoulea-blush-soft text-seoulea-cocoa">
                {profile.email}
              </p>
            </div>
            <div>
              <span className="font-bold text-seoulea-cocoa block mb-1">Default Delivery Address</span>
              <p className="bg-seoulea-ivory p-3 rounded-xl border border-seoulea-blush-soft text-seoulea-cocoa">
                {profile.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
