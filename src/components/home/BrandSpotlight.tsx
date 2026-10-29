'use client';

import React from 'react';
import Link from 'next/link';
import { SAMPLE_BRANDS } from '@/lib/data/sampleData';

export function BrandSpotlight() {
  return (
    <section className="py-12 bg-seoulea-ivory border-b border-seoulea-blush-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-seoulea-gold font-bold">
            Authentic Korean Beauty Houses
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa mt-1">
            Featured K-Beauty Brands
          </h2>
          <p className="text-xs text-seoulea-cocoa/70 mt-2">
            Directly sourced and curated from top dermatological and Hanbang laboratories across South Korea.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SAMPLE_BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={`/shop?brand=${brand.slug}`}
              className="bg-white p-5 rounded-2xl border border-seoulea-blush-soft/80 shadow-boutique hover:shadow-boutique-lg transition-all duration-300 flex flex-col items-center justify-center text-center group transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-seoulea-blush-light flex items-center justify-center font-editorial font-bold text-seoulea-berry text-lg group-hover:bg-seoulea-berry group-hover:text-white transition-colors mb-3">
                {brand.name.charAt(0)}
              </div>
              <h3 className="font-editorial text-sm font-bold text-seoulea-cocoa group-hover:text-seoulea-berry transition-colors">
                {brand.name}
              </h3>
              <span className="text-[10px] text-seoulea-gold font-medium mt-1">
                South Korea
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
