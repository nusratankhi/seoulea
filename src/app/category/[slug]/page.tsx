'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/catalog/ProductCard';
import { SAMPLE_CATEGORIES, SAMPLE_PRODUCTS } from '@/lib/data/sampleData';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = SAMPLE_CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = SAMPLE_PRODUCTS.filter((p) => p.category?.slug === category.slug);

  return (
    <div className="bg-seoulea-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-seoulea-berry hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Products</span>
          </Link>
        </div>

        {/* Category Header Hero */}
        <div className="relative rounded-3xl overflow-hidden mb-10 bg-white border border-seoulea-blush-soft shadow-boutique p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-seoulea-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Category Focus</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-seoulea-cocoa">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-seoulea-cocoa/80 leading-relaxed">
              {category.description}
            </p>
            <p className="text-xs text-seoulea-gold font-bold">
              {categoryProducts.length} authentic Korean formulas available
            </p>
          </div>

          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-seoulea-gold/40 shadow-sm flex-shrink-0">
            <Image
              src={category.image_url}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Grid */}
        {categoryProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-seoulea-blush-soft">
            <p className="font-editorial text-lg font-bold text-seoulea-cocoa">
              More products coming soon to this category!
            </p>
            <p className="text-xs text-seoulea-cocoa/60 mt-1">
              Our Seoul sourcing team is currently restocking new Korean shipments.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-block px-5 py-2.5 bg-seoulea-berry text-white text-xs font-bold rounded-full"
            >
              Explore Other Categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
