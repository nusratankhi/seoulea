'use client';

import React, { useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ArrowLeft } from 'lucide-react';
import { ProductCard } from '@/components/catalog/ProductCard';
import { SAMPLE_PRODUCTS } from '@/lib/data/sampleData';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const matchedProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return SAMPLE_PRODUCTS.filter((product) => {
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchBengali = product.bengali_title?.toLowerCase().includes(q) || false;
      const matchBrand = product.brand?.name.toLowerCase().includes(q) || false;
      const matchCategory = product.category?.name.toLowerCase().includes(q) || false;
      const matchDescription = product.description.toLowerCase().includes(q);
      const matchIngredients = product.ingredients?.toLowerCase().includes(q) || false;

      return matchTitle || matchBengali || matchBrand || matchCategory || matchDescription || matchIngredients;
    });
  }, [query]);

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

        <div className="mb-8">
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa flex items-center gap-3">
            <Search className="w-6 h-6 text-seoulea-berry" />
            <span>Search Results for &ldquo;{query}&rdquo;</span>
          </h1>
          <p className="text-xs text-seoulea-cocoa/60 mt-1">
            Found {matchedProducts.length} authentic Korean skincare {matchedProducts.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {matchedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-seoulea-blush-soft shadow-boutique max-w-lg mx-auto">
            <Search className="w-12 h-12 text-seoulea-blush-dark mx-auto mb-3" />
            <h2 className="font-editorial text-xl font-bold text-seoulea-cocoa">
              No matching products found
            </h2>
            <p className="text-xs text-seoulea-cocoa/70 mt-2">
              Try searching for popular terms like &ldquo;serum&rdquo;, &ldquo;snail&rdquo;, &ldquo;sunscreen&rdquo;, &ldquo;toner&rdquo;, or brand names like &ldquo;COSRX&rdquo; and &ldquo;Joseon&rdquo;.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block px-6 py-2.5 bg-seoulea-berry text-white text-xs font-bold uppercase rounded-full hover:bg-seoulea-berry-dark"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {matchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-seoulea-ivory py-16 text-center text-xs text-seoulea-cocoa/60">
          Searching catalog...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
