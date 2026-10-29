'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/lib/context/WishlistContext';
import { SAMPLE_PRODUCTS } from '@/lib/data/sampleData';
import { ProductCard } from '@/components/catalog/ProductCard';

export default function WishlistPage() {
  const { wishlistIds } = useWishlist();

  const wishlistProducts = SAMPLE_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

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
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="font-editorial text-3xl font-bold text-seoulea-cocoa flex items-center gap-3">
            <Heart className="w-7 h-7 text-seoulea-berry fill-current" />
            <span>My Wishlist ({wishlistProducts.length})</span>
          </h1>
          <p className="text-xs text-seoulea-cocoa/60 mt-1">
            Your saved Korean holy-grail skincare formulas.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-seoulea-blush-soft shadow-boutique max-w-md mx-auto">
            <Heart className="w-12 h-12 text-seoulea-blush-dark mx-auto mb-3" />
            <h2 className="font-editorial text-xl font-bold text-seoulea-cocoa">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-seoulea-cocoa/70 mt-2">
              Save your favorite serums, toners, and moisturizers while browsing to easily buy them later.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-seoulea-berry text-white text-xs font-bold uppercase rounded-full hover:bg-seoulea-berry-dark"
            >
              <span>Discover K-Beauty</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
