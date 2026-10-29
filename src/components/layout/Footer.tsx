'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import { DEFAULT_STORE_SETTINGS } from '@/lib/data/sampleData';

export function Footer() {
  return (
    <footer className="bg-seoulea-berry-dark text-white border-t-2 border-seoulea-gold/40">
      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-white/10 bg-black/10 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-seoulea-gold" />
            <span className="text-xs font-semibold tracking-wide">100% Authentic Korean Beauty</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4 text-seoulea-gold" />
            <span className="text-xs font-semibold tracking-wide">Fast Delivery Across Bangladesh</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-seoulea-gold" />
            <span className="text-xs font-semibold tracking-wide">Safe COD & Mobile Banking</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-seoulea-gold" />
            <span className="text-xs font-semibold tracking-wide">Dedicated Beauty Advisory</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-seoulea-gold/60 bg-seoulea-ivory">
                <Image
                  src="/images/seoulea-logo.jpg"
                  alt="Seouléa Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                  Seouléa
                </span>
                <p className="text-[10px] tracking-widest text-seoulea-gold font-medium uppercase">
                  Korean Skincare & Beauty
                </p>
              </div>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              Your Seoul-inspired beauty sanctuary in Bangladesh. We bring clinically-proven, gentle Korean formulas directly from Seoul to help you achieve your ultimate glass-skin glow.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={DEFAULT_STORE_SETTINGS.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-seoulea-gold hover:text-seoulea-cocoa flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={DEFAULT_STORE_SETTINGS.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-seoulea-gold hover:text-seoulea-cocoa flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={DEFAULT_STORE_SETTINGS.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-seoulea-gold hover:text-seoulea-cocoa flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold tracking-wider uppercase text-seoulea-gold">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link href="/shipping-returns" className="hover:text-seoulea-gold transition-colors">
                  Shipping & Delivery Info
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-seoulea-gold transition-colors">
                  Frequently Asked Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-seoulea-gold transition-colors">
                  About Seouléa Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-seoulea-gold transition-colors">
                  Contact Beauty Advisory
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-seoulea-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-seoulea-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold tracking-wider uppercase text-seoulea-gold">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link href="/category/cleanser" className="hover:text-seoulea-gold transition-colors">
                  Cleansers & Cleansing Balms
                </Link>
              </li>
              <li>
                <Link href="/category/toner" className="hover:text-seoulea-gold transition-colors">
                  Hydrating Toners & Essences
                </Link>
              </li>
              <li>
                <Link href="/category/serum" className="hover:text-seoulea-gold transition-colors">
                  Glow Serums & Ampoules
                </Link>
              </li>
              <li>
                <Link href="/category/moisturizer" className="hover:text-seoulea-gold transition-colors">
                  Ceramide Barrier Moisturizers
                </Link>
              </li>
              <li>
                <Link href="/category/sunscreen" className="hover:text-seoulea-gold transition-colors">
                  Invisible Korean Sunscreens SPF50+
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-seoulea-gold transition-colors">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold tracking-wider uppercase text-seoulea-gold">
              Store & Advisory
            </h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-seoulea-gold flex-shrink-0 mt-0.5" />
                <span>{DEFAULT_STORE_SETTINGS.contact_address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-seoulea-gold flex-shrink-0" />
                <span>{DEFAULT_STORE_SETTINGS.contact_phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-seoulea-gold flex-shrink-0" />
                <span>{DEFAULT_STORE_SETTINGS.contact_email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-seoulea-gold flex-shrink-0" />
                <span>{DEFAULT_STORE_SETTINGS.business_hours}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-seoulea-gold hover:text-white transition-colors border border-seoulea-gold/40 px-3 py-1.5 rounded-full"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Portal Login
              </Link>
            </div>
          </div>
        </div>

        {/* Manual Payment Methods Bar (matches the mockup footer!) */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-seoulea-gold block">
              Manual Payment Options
            </span>
            <p className="text-[11px] text-white/70 mt-0.5">
              Send Money to: bKash 017XXXXXXXX, Nagad 018XXXXXXXX, Rocket 019XXXXXXXX
            </p>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="bg-white text-[#E2136E] text-xs font-black px-2.5 py-1 rounded shadow-sm">
              bKash
            </span>
            <span className="bg-white text-[#F7941D] text-xs font-black px-2.5 py-1 rounded shadow-sm">
              nagad
            </span>
            <span className="bg-white text-[#8C3494] text-xs font-black px-2.5 py-1 rounded shadow-sm">
              Rocket
            </span>
            <span className="bg-white text-seoulea-cocoa text-xs font-bold px-2.5 py-1 rounded shadow-sm">
              COD Cash on Delivery
            </span>
          </div>
        </div>

        {/* Demo Data Disclaimer & Copyright */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-white/60 space-y-1">
          <p>
            &copy; {new Date().getFullYear()} Seouléa — Korean Skincare & Beauty. All rights reserved. Dhaka, Bangladesh.
          </p>
          <p className="text-white/40">
            * Note: Demo catalog data and sample photography are displayed for illustration and development. Replace with verified distributor catalog data before live customer transactions.
          </p>
        </div>
      </div>
    </footer>
  );
}
