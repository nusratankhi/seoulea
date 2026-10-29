'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/catalog/ProductCard';
import { SAMPLE_PRODUCTS } from '@/lib/data/sampleData';

export function LatestProducts() {
  const products = SAMPLE_PRODUCTS;

  return (
    <section className="py-12 bg-white border-b border-seoulea-blush-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-seoulea-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh From Seoul</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa mt-1 uppercase tracking-wider">
              Latest Products
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-seoulea-berry hover:text-seoulea-berry-dark uppercase tracking-wider group"
          >
            <span>View All Arrivals</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
