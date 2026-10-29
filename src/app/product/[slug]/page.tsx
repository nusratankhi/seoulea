'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/lib/data/sampleData';
import { formatBDT } from '@/lib/utils/formatters';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { ProductCard } from '@/components/catalog/ProductCard';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = SAMPLE_PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Variant state
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'directions'>('desc');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = !activeVariant || activeVariant.stock_quantity <= 0;
  const maxStock = activeVariant?.stock_quantity || 1;
  const unitPrice = activeVariant?.sale_price ?? activeVariant?.regular_price ?? 0;
  const hasDiscount =
    activeVariant?.sale_price && activeVariant.sale_price < activeVariant.regular_price;

  // Selected image
  const displayImages = product.images.length > 0 ? product.images : [
    {
      id: 'default',
      product_id: product.id,
      image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      sort_order: 1,
      is_primary: true,
    },
  ];

  const currentImageUrl = activeVariant?.image_url || displayImages[activeImageIndex]?.image_url;

  const handleAddToCart = () => {
    if (isOutOfStock || !activeVariant) return;
    addItem(product, activeVariant.id, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock || !activeVariant) return;
    addItem(product, activeVariant.id, quantity);
    router.push('/checkout');
  };

  // Related products
  const relatedProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category_id === product.category_id || p.brand_id === product.brand_id)
  ).slice(0, 4);

  return (
    <div className="bg-seoulea-ivory min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-seoulea-cocoa/60">
          <Link href="/shop" className="hover:text-seoulea-berry flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            Shop All
          </Link>
          <span>/</span>
          <Link href={`/category/${product.category?.slug}`} className="hover:text-seoulea-berry font-medium">
            {product.category?.name}
          </Link>
          <span>/</span>
          <span className="text-seoulea-cocoa font-bold truncate max-w-xs">{product.title}</span>
        </div>

        {/* Main Product Layout */}
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 sm:p-10 shadow-boutique grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-seoulea-ivory border border-seoulea-blush-soft">
              <Image
                src={currentImageUrl}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />
              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-seoulea-berry text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Special Offer
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {displayImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {displayImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx ? 'border-seoulea-berry' : 'border-seoulea-blush-soft/60'
                    }`}
                  >
                    <Image src={img.image_url} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Variant Selection */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <Link
                  href={`/shop?brand=${product.brand?.slug}`}
                  className="text-xs font-bold uppercase tracking-widest text-seoulea-gold hover:underline"
                >
                  {product.brand?.name} • South Korea
                </Link>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-full border transition-all ${
                    inWishlist
                      ? 'bg-seoulea-berry text-white border-seoulea-berry'
                      : 'border-seoulea-blush-soft text-seoulea-cocoa hover:text-seoulea-berry'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>

              <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa mt-2">
                {product.title}
              </h1>
              {product.bengali_title && (
                <p className="text-sm text-seoulea-cocoa/70 mt-1 font-medium">
                  {product.bengali_title}
                </p>
              )}

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-3 text-xs">
                <div className="flex items-center text-amber-500 font-bold gap-1">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-seoulea-cocoa/40">•</span>
                <span className="text-seoulea-cocoa/70">{product.reviews_count} verified beauty reviews</span>
                <span className="text-seoulea-cocoa/40">•</span>
                <span className="text-seoulea-gold font-semibold">SKU: {activeVariant?.sku}</span>
              </div>

              {/* Price Banner */}
              <div className="mt-5 p-4 rounded-2xl bg-seoulea-ivory border border-seoulea-blush-soft flex items-baseline gap-3">
                <span className="text-3xl font-bold text-seoulea-berry">
                  {formatBDT(unitPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-base text-seoulea-cocoa/40 line-through">
                    {formatBDT(activeVariant.regular_price)}
                  </span>
                )}
                {hasDiscount && (
                  <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    Save {formatBDT(activeVariant.regular_price - activeVariant.sale_price!)}
                  </span>
                )}
              </div>

              {/* Variant Picker */}
              <div className="mt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-seoulea-cocoa block mb-2">
                  Select {activeVariant.attribute_name}: <span className="text-seoulea-berry font-bold">{activeVariant.title}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVariantId(v.id);
                        setQuantity(1);
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedVariantId === v.id
                          ? 'bg-seoulea-berry text-white border-seoulea-berry shadow-sm'
                          : 'bg-seoulea-ivory border-seoulea-blush-soft text-seoulea-cocoa hover:border-seoulea-gold'
                      }`}
                    >
                      <span>{v.title}</span>
                      <span className="ml-2 opacity-80 font-normal">
                        ({formatBDT(v.sale_price ?? v.regular_price)})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Stock status */}
              <div className="mt-6 flex items-center gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-seoulea-cocoa block mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center border border-seoulea-blush-soft rounded-xl bg-seoulea-ivory overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="p-2.5 hover:bg-white text-seoulea-cocoa/80 disabled:opacity-40"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-bold text-seoulea-cocoa">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                      disabled={quantity >= maxStock || isOutOfStock}
                      className="p-2.5 hover:bg-white text-seoulea-cocoa/80 disabled:opacity-40"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-5">
                  {isOutOfStock ? (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                      Sold Out
                    </span>
                  ) : activeVariant && activeVariant.stock_quantity <= 5 ? (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                      Low Stock: Only {activeVariant.stock_quantity} left
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      In Stock & Ready to Ship
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`py-3.5 px-6 rounded-2xl text-xs font-bold border border-seoulea-blush text-seoulea-cocoa hover:bg-seoulea-blush-light transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed ${
                    addedSuccess ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : ''
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-seoulea-berry" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="py-3.5 px-6 rounded-2xl text-xs font-bold bg-seoulea-berry hover:bg-seoulea-berry-dark text-white transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  <Zap className="w-4 h-4 text-seoulea-gold fill-current" />
                  <span>Buy Now (Instant Checkout)</span>
                </button>
              </div>

              {/* Delivery Assurance Cards */}
              <div className="mt-8 pt-6 border-t border-seoulea-blush-soft grid grid-cols-2 gap-3 text-xs text-seoulea-cocoa/80">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-seoulea-ivory border border-seoulea-blush-soft/60">
                  <Truck className="w-4 h-4 text-seoulea-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-seoulea-cocoa block">Dhaka: 24–48h</span>
                    <span className="text-[11px] text-seoulea-cocoa/60">Nationwide: 3–4 days</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-seoulea-ivory border border-seoulea-blush-soft/60">
                  <ShieldCheck className="w-4 h-4 text-seoulea-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-seoulea-cocoa block">COD & bKash</span>
                    <span className="text-[11px] text-seoulea-cocoa/60">Inspect parcel on delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info: Description, Ingredients, Directions */}
        <div className="mt-10 bg-white rounded-3xl border border-seoulea-blush-soft p-6 sm:p-10 shadow-boutique">
          <div className="flex border-b border-seoulea-blush-soft gap-6">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'desc'
                  ? 'text-seoulea-berry border-b-2 border-seoulea-berry'
                  : 'text-seoulea-cocoa/60 hover:text-seoulea-cocoa'
              }`}
            >
              Description & Benefits
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'ingredients'
                  ? 'text-seoulea-berry border-b-2 border-seoulea-berry'
                  : 'text-seoulea-cocoa/60 hover:text-seoulea-cocoa'
              }`}
            >
              Ingredients (INCI)
            </button>
            <button
              onClick={() => setActiveTab('directions')}
              className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'directions'
                  ? 'text-seoulea-berry border-b-2 border-seoulea-berry'
                  : 'text-seoulea-cocoa/60 hover:text-seoulea-cocoa'
              }`}
            >
              How to Use
            </button>
          </div>

          <div className="py-6 text-sm text-seoulea-cocoa/80 leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p>{product.description}</p>
                {product.skin_types && product.skin_types.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-seoulea-gold uppercase tracking-wider block mb-1.5">
                      Ideal For Skin Types:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.skin_types.map((st) => (
                        <span key={st} className="px-3 py-1 rounded-full bg-seoulea-blush-light text-seoulea-berry text-xs font-semibold">
                          {st.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <p className="text-xs text-seoulea-cocoa/60 mb-2">
                  * Full Korean dermatological formulation:
                </p>
                <p className="font-mono text-xs leading-loose bg-seoulea-ivory p-4 rounded-xl border border-seoulea-blush-soft">
                  {product.ingredients || 'Ingredients verified on distributor packaging.'}
                </p>
              </div>
            )}

            {activeTab === 'directions' && (
              <div>
                <p className="text-xs text-seoulea-cocoa/60 mb-2">
                  * Recommended Seoul skincare ritual:
                </p>
                <p className="bg-seoulea-ivory p-4 rounded-xl border border-seoulea-blush-soft">
                  {product.directions || 'Apply to clean skin after toning.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h2 className="font-editorial text-2xl font-bold text-seoulea-cocoa mb-6">
              You May Also Love
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
