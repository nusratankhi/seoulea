'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/lib/data/sampleData';
import { formatBDT } from '@/lib/utils/formatters';

export function CuratedRoutines() {
  const step1 = SAMPLE_PRODUCTS[5]; // Dokdo cleanser
  const step2 = SAMPLE_PRODUCTS[2]; // Anua toner
  const step3 = SAMPLE_PRODUCTS[0]; // Rice serum
  const step4 = SAMPLE_PRODUCTS[3]; // Centella sunscreen

  const routineItems = [
    { step: '01', name: 'Low-pH Cleanse', product: step1, note: 'Wash away fine dust & sebum without barrier stripping' },
    { step: '02', name: 'Calm & Balance', product: step2, note: 'Soothe redness with 77% Heartleaf infusion' },
    { step: '03', name: 'Deep Glass Radiance', product: step3, note: 'Fade dark spots with Hanbang Rice & Alpha-Arbutin' },
    { step: '04', name: 'Shield & Hydrate', product: step4, note: 'Ultra-lightweight SPF50+ PA++++ invisible protection' },
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-white to-seoulea-ivory border-b border-seoulea-blush-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-seoulea-gold font-bold inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Expert K-Beauty Protocol
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-seoulea-cocoa mt-1">
              The 4-Step Seoul Glass Skin Routine
            </h2>
            <p className="text-xs sm:text-sm text-seoulea-cocoa/70 mt-2">
              Designed specifically for Bangladesh’s humid weather: high hydration, zero grease, and maximum calm barrier radiance.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-seoulea-berry text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-seoulea-berry-dark transition-colors self-start md:self-auto shadow-sm"
          >
            <span>Shop Routine Bundle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {routineItems.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl border border-seoulea-blush-soft p-5 shadow-boutique hover:shadow-boutique-lg transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-editorial text-2xl font-bold text-seoulea-gold">
                    {item.step}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-seoulea-blush-light text-seoulea-berry">
                    {item.name}
                  </span>
                </div>

                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-seoulea-ivory mb-4">
                  <Image
                    src={item.product.images[0]?.image_url || ''}
                    alt={item.product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-editorial text-sm font-bold text-seoulea-cocoa line-clamp-2">
                  {item.product.title}
                </h3>
                <p className="text-xs text-seoulea-cocoa/60 mt-2 leading-relaxed">
                  {item.note}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-seoulea-blush-soft/60 flex items-center justify-between">
                <span className="text-sm font-bold text-seoulea-berry">
                  {formatBDT(item.product.variants[0]?.sale_price ?? item.product.variants[0]?.regular_price ?? 0)}
                </span>
                <Link
                  href={`/product/${item.product.slug}`}
                  className="text-xs font-semibold text-seoulea-cocoa hover:text-seoulea-berry transition-colors flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
