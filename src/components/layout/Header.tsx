'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Instagram,
  Facebook,
  Youtube,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { SAMPLE_CATEGORIES, DEFAULT_STORE_SETTINGS } from '@/lib/data/sampleData';

export function Header() {
  const router = useRouter();
  const { openCart, itemCount, subtotal } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-seoulea-blush-soft transition-all shadow-sm">
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-seoulea-cocoa hover:bg-seoulea-blush-light focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-seoulea-gold/40 shadow-sm flex-shrink-0 bg-seoulea-ivory">
                <Image
                  src="/images/seoulea-logo.jpg"
                  alt="Seouléa Logo"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-editorial text-2xl font-bold tracking-tight text-seoulea-cocoa group-hover:text-seoulea-berry transition-colors leading-none">
                  Seouléa
                </span>
                <span className="text-[10px] uppercase tracking-widest text-seoulea-gold font-medium mt-1">
                  Korean Skincare & Beauty
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search Korean serums, toners, sunscreens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-seoulea-ivory border border-seoulea-blush/60 rounded-full py-2.5 pl-4 pr-11 text-sm text-seoulea-cocoa placeholder-seoulea-cocoa/50 focus:outline-none focus:border-seoulea-gold focus:ring-1 focus:ring-seoulea-gold transition-all"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-seoulea-cocoa/70 hover:text-seoulea-berry transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right: Social Icons, Account & Badges */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Social Media Links (desktop) */}
            <div className="hidden xl:flex items-center gap-2 pr-2 border-r border-seoulea-blush-soft">
              <a
                href={DEFAULT_STORE_SETTINGS.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-seoulea-cocoa/70 hover:text-seoulea-berry hover:bg-seoulea-blush-light rounded-full transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={DEFAULT_STORE_SETTINGS.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-seoulea-cocoa/70 hover:text-seoulea-berry hover:bg-seoulea-blush-light rounded-full transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={DEFAULT_STORE_SETTINGS.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-seoulea-cocoa/70 hover:text-seoulea-berry hover:bg-seoulea-blush-light rounded-full transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {/* Account Menu */}
            <div className="relative">
              <button
                onClick={() => setAccountDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 py-1.5 px-2.5 text-sm font-medium text-seoulea-cocoa hover:text-seoulea-berry hover:bg-seoulea-blush-light rounded-full transition-colors"
                aria-label="Account Menu"
              >
                <User className="w-4 h-4 text-seoulea-gold" />
                <span className="hidden sm:inline">Account</span>
                <ChevronDown className="w-3.5 h-3.5 text-seoulea-cocoa/60" />
              </button>

              {accountDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-boutique border border-seoulea-blush-soft py-2 z-50 animate-fade-in"
                  onMouseLeave={() => setAccountDropdownOpen(false)}
                >
                  <Link
                    href="/account"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-seoulea-cocoa hover:bg-seoulea-blush-light transition-colors"
                  >
                    <User className="w-4 h-4 text-seoulea-cocoa/70" />
                    Customer Dashboard
                  </Link>
                  <Link
                    href="/account/orders"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-seoulea-cocoa hover:bg-seoulea-blush-light transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-seoulea-cocoa/70" />
                    My Order History
                  </Link>
                  <div className="border-t border-seoulea-blush-soft my-1"></div>
                  <Link
                    href="/admin"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-seoulea-berry hover:bg-seoulea-blush-light transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-seoulea-gold" />
                    Admin Portal
                  </Link>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-2 text-seoulea-cocoa hover:text-seoulea-berry hover:bg-seoulea-blush-light rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-seoulea-berry text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-seoulea-ivory hover:bg-seoulea-blush-light border border-seoulea-blush/80 rounded-full px-3 py-1.5 transition-all text-seoulea-cocoa"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-seoulea-berry" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-seoulea-berry text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden md:inline text-seoulea-cocoa">
                ৳{Math.round(subtotal).toLocaleString('en-IN')}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Row (visible on small screens) */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search Korean skincare..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-seoulea-ivory border border-seoulea-blush/60 rounded-full py-2 pl-4 pr-10 text-xs text-seoulea-cocoa placeholder-seoulea-cocoa/50 focus:outline-none focus:border-seoulea-gold"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-seoulea-cocoa/70"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Category Navigation Bar (Desktop) */}
      <nav className="bg-seoulea-berry text-white hidden lg:block shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-8 py-2.5 text-sm font-medium tracking-wide">
            <li>
              <Link
                href="/shop"
                className="hover:text-seoulea-gold transition-colors font-semibold uppercase text-xs tracking-wider"
              >
                All Products
              </Link>
            </li>
            {SAMPLE_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="hover:text-seoulea-gold transition-colors text-xs uppercase tracking-wider text-white/90 hover:font-semibold"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/shop?filter=routines"
                className="text-seoulea-gold hover:text-white transition-colors font-semibold uppercase text-xs tracking-wider flex items-center gap-1"
              >
                <span>✨ Glass Skin Routines</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-seoulea-cocoa/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-seoulea-ivory shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-seoulea-blush-soft">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-seoulea-gold/40">
                    <Image
                      src="/images/seoulea-logo.jpg"
                      alt="Seouléa"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-editorial text-xl font-bold text-seoulea-cocoa">
                    Seouléa
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-seoulea-cocoa/70 hover:text-seoulea-berry"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-xs uppercase font-bold text-seoulea-gold tracking-wider">
                  Product Categories
                </p>
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-lg text-sm font-semibold text-seoulea-cocoa hover:bg-seoulea-blush-soft/50"
                  >
                    All Products
                  </Link>
                  {SAMPLE_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 px-3 rounded-lg text-sm text-seoulea-cocoa/90 hover:bg-seoulea-blush-soft/50 flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="pt-4 border-t border-seoulea-blush-soft space-y-2">
                  <p className="text-xs uppercase font-bold text-seoulea-gold tracking-wider">
                    Customer Account
                  </p>
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-3 text-sm text-seoulea-cocoa hover:bg-seoulea-blush-soft/50 rounded-lg"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/account/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-3 text-sm text-seoulea-cocoa hover:bg-seoulea-blush-soft/50 rounded-lg"
                  >
                    Order History
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-3 text-sm text-seoulea-cocoa hover:bg-seoulea-blush-soft/50 rounded-lg"
                  >
                    Wishlist ({wishlistCount})
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-3 text-sm font-bold text-seoulea-berry hover:bg-seoulea-blush-soft/50 rounded-lg"
                  >
                    Admin Dashboard
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-seoulea-blush-soft text-xs text-seoulea-cocoa/60 text-center">
              <p>Hotline: {DEFAULT_STORE_SETTINGS.contact_phone}</p>
              <p className="mt-1">Banani, Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
