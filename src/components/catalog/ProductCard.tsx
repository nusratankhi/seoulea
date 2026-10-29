'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, Star, ShoppingBag, Zap, Check } from 'lucide-react';
import { Product, ProductVariant } from '@/lib/types';
import { formatBDT } from '@/lib/utils/formatters';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Active selected variant state (defaults to first variant)
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const activeVariant: ProductVariant | undefined =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = !activeVariant || activeVariant.stock_quantity <= 0;
  const unitPrice = activeVariant?.sale_price ?? activeVariant?.regular_price ?? 0;
  const hasDiscount =
    activeVariant?.sale_price && activeVariant.sale_price < activeVariant.regular_price;

  const primaryImage =
    activeVariant?.image_url ||
    product.images[0]?.image_url ||
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80';

  const handleAddToCart = () => {
    if (isOutOfStock || !activeVariant) return;
    addItem(product, activeVariant.id, 1);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock || !activeVariant) return;
    addItem(product, activeVariant.id, 1);
    router.push('/checkout');
  };

  return (
    <div className="bg-white rounded-2xl border border-seoulea-blush-soft p-3 sm:p-4 shadow-boutique hover:shadow-boutique-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top Image Container */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-seoulea-ivory mb-3 border border-seoulea-blush-soft/50">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={primaryImage}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {hasDiscount && (
              <span className="bg-seoulea-berry text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                Offer
              </span>
            )}
            {product.is_best_seller && (
              <span className="bg-seoulea-gold text-seoulea-cocoa-dark text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                Best Seller
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md shadow-sm transition-all duration-200 ${
              inWishlist
                ? 'bg-seoulea-berry text-white'
                : 'bg-white/80 text-seoulea-cocoa/70 hover:text-seoulea-berry hover:bg-white'
            }`}
            aria-label="Wishlist toggle"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-seoulea-cocoa/60 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-white text-seoulea-cocoa font-bold text-xs uppercase px-3 py-1 rounded-full shadow">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Brand & Rating */}
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="text-seoulea-gold font-bold uppercase tracking-wider">
            {product.brand?.name || 'Korean Beauty'}
          </span>
          <div className="flex items-center text-amber-500 font-semibold gap-0.5">
            <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" />
            <span>{product.rating}</span>
            <span className="text-seoulea-cocoa/40 text-[10px]">({product.reviews_count})</span>
          </div>
        </div>

        {/* Product Title */}
        <Link href={`/product/${product.slug}`} className="block group-hover:text-seoulea-berry transition-colors">
          <h3 className="font-editorial text-sm font-bold text-seoulea-cocoa line-clamp-1 leading-snug">
            {product.title}
          </h3>
          {product.bengali_title && (
            <p className="text-xs text-seoulea-cocoa/60 line-clamp-1 mt-0.5">
              {product.bengali_title}
            </p>
          )}
        </Link>

        {/* Variant Selector (if product has multiple variants) */}
        {product.variants.length > 1 && (
          <div className="mt-2.5">
            <label className="text-[10px] text-seoulea-cocoa/60 font-semibold block uppercase mb-1">
              Select Size / Option:
            </label>
            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              className="w-full bg-seoulea-ivory border border-seoulea-blush-soft text-xs text-seoulea-cocoa rounded-lg px-2 py-1.5 focus:outline-none focus:border-seoulea-gold font-medium"
            >
              {product.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title} — {formatBDT(v.sale_price ?? v.regular_price)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price Row */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base sm:text-lg font-bold text-seoulea-berry">
            {formatBDT(unitPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-seoulea-cocoa/40 line-through">
              {formatBDT(activeVariant.regular_price)}
            </span>
          )}
        </div>

        {/* Stock info */}
        <div className="text-[10px] mt-1">
          {isOutOfStock ? (
            <span className="text-rose-600 font-semibold">Currently Out of Stock</span>
          ) : activeVariant && activeVariant.stock_quantity <= 5 ? (
            <span className="text-amber-700 font-medium">
              Only {activeVariant.stock_quantity} left in stock!
            </span>
          ) : (
            <span className="text-emerald-700 font-medium">In Stock</span>
          )}
        </div>
      </div>

      {/* Action Buttons: Add to Cart & Buy Now (as seen in the mockup!) */}
      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-seoulea-blush-soft/50">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2 px-2 rounded-xl text-xs font-bold border border-seoulea-blush text-seoulea-cocoa hover:bg-seoulea-blush-light transition-colors flex items-center justify-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed ${
            isAddedFeedback ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : ''
          }`}
        >
          {isAddedFeedback ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 text-seoulea-berry" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="w-full py-2 px-2 rounded-xl text-xs font-bold bg-seoulea-berry hover:bg-seoulea-berry-dark text-white transition-colors flex items-center justify-center gap-1 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Zap className="w-3.5 h-3.5 text-seoulea-gold fill-current" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}
