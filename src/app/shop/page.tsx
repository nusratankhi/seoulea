'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/catalog/ProductCard';
import { SAMPLE_PRODUCTS, SAMPLE_CATEGORIES, SAMPLE_BRANDS } from '@/lib/data/sampleData';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialBrand = searchParams.get('brand') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const filteredProducts = useMemo(() => {
    let list = [...SAMPLE_PRODUCTS];

    if (selectedCategory) {
      list = list.filter((p) => p.category?.slug === selectedCategory);
    }

    if (selectedBrand) {
      list = list.filter((p) => p.brand?.slug === selectedBrand);
    }

    if (selectedSkinType !== 'all') {
      list = list.filter((p) => p.skin_types.includes(selectedSkinType as any));
    }

    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => {
          const priceA = a.variants[0]?.sale_price ?? a.variants[0]?.regular_price ?? 0;
          const priceB = b.variants[0]?.sale_price ?? b.variants[0]?.regular_price ?? 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        list.sort((a, b) => {
          const priceA = a.variants[0]?.sale_price ?? a.variants[0]?.regular_price ?? 0;
          const priceB = b.variants[0]?.sale_price ?? b.variants[0]?.regular_price ?? 0;
          return priceB - priceA;
        });
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        // featured
        break;
    }

    return list;
  }, [selectedCategory, selectedBrand, selectedSkinType, sortBy]);

  return (
    <div className="bg-seoulea-ivory min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-seoulea-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete K-Beauty Collection</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-seoulea-cocoa mt-2">
            All Korean Skincare & Beauty
          </h1>
          <p className="text-xs sm:text-sm text-seoulea-cocoa/70 mt-2">
            100% authentic dermatological essences, serums, barrier creams, and invisible sunscreens imported directly from Seoul.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-seoulea-blush-soft shadow-sm mb-8 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setShowFiltersMobile((prev) => !prev)}
            className="md:hidden inline-flex items-center gap-2 text-xs font-bold text-seoulea-cocoa border border-seoulea-blush-soft px-3 py-2 rounded-xl"
          >
            <Filter className="w-4 h-4 text-seoulea-berry" />
            <span>Filter Products</span>
          </button>

          <p className="text-xs text-seoulea-cocoa/70 font-medium">
            Showing <span className="font-bold text-seoulea-cocoa">{filteredProducts.length}</span> authentic products
          </p>

          <div className="flex items-center gap-2 ml-auto">
            <label className="text-xs font-medium text-seoulea-cocoa/70 hidden sm:inline">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-1.5 text-xs font-semibold text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="newest">New Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main Shop Grid & Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <aside className={`md:block space-y-6 ${showFiltersMobile ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-5 rounded-2xl border border-seoulea-blush-soft shadow-sm space-y-6">
              
              {/* Category Filter */}
              <div>
                <h3 className="font-editorial text-sm font-bold uppercase tracking-wider text-seoulea-cocoa mb-3">
                  Category
                </h3>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`block w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                      selectedCategory === ''
                        ? 'bg-seoulea-berry text-white font-bold'
                        : 'text-seoulea-cocoa/80 hover:bg-seoulea-blush-light'
                    }`}
                  >
                    All Categories
                  </button>
                  {SAMPLE_CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`block w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                        selectedCategory === c.slug
                          ? 'bg-seoulea-berry text-white font-bold'
                          : 'text-seoulea-cocoa/80 hover:bg-seoulea-blush-light'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="pt-4 border-t border-seoulea-blush-soft">
                <h3 className="font-editorial text-sm font-bold uppercase tracking-wider text-seoulea-cocoa mb-3">
                  Brand
                </h3>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => setSelectedBrand('')}
                    className={`block w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                      selectedBrand === ''
                        ? 'bg-seoulea-berry text-white font-bold'
                        : 'text-seoulea-cocoa/80 hover:bg-seoulea-blush-light'
                    }`}
                  >
                    All Brands
                  </button>
                  {SAMPLE_BRANDS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBrand(b.slug)}
                      className={`block w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                        selectedBrand === b.slug
                          ? 'bg-seoulea-berry text-white font-bold'
                          : 'text-seoulea-cocoa/80 hover:bg-seoulea-blush-light'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              {(selectedCategory || selectedBrand || selectedSkinType !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedBrand('');
                    setSelectedSkinType('all');
                  }}
                  className="w-full py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Product Cards Grid */}
          <div className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-seoulea-blush-soft p-12 text-center">
                <p className="font-editorial text-lg text-seoulea-cocoa font-bold">
                  No products found matching your criteria.
                </p>
                <p className="text-xs text-seoulea-cocoa/60 mt-1">
                  Try clearing some filters or searching with different terms.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedBrand('');
                  }}
                  className="mt-4 px-4 py-2 bg-seoulea-berry text-white text-xs font-semibold rounded-full hover:bg-seoulea-berry-dark"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-seoulea-ivory py-16 text-center text-xs text-seoulea-cocoa/60">
          Loading Korean Skincare Collection...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
