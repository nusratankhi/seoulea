'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SAMPLE_CATEGORIES } from '@/lib/data/sampleData';

export function CategoryCircles() {
  const featuredCategories = SAMPLE_CATEGORIES.slice(0, 5);

  return (
    <section className="py-10 bg-seoulea-ivory border-b border-seoulea-blush-soft/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-seoulea-gold font-bold">
            Curated Formulations
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa mt-1">
            Shop by Category
          </h2>
          <div className="w-16 h-0.5 bg-seoulea-gold mx-auto mt-2 rounded-full" />
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-10 overflow-x-auto pb-4 no-scrollbar">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center group flex-shrink-0"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 border-2 border-seoulea-gold/60 group-hover:border-seoulea-berry bg-white shadow-boutique transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-seoulea-blush-light">
                  <Image
                    src={cat.image_url}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="mt-3 text-xs sm:text-sm font-semibold text-seoulea-cocoa group-hover:text-seoulea-berry transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
