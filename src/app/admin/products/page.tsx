'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Package, Plus, Search, Edit2, Trash2, Check, AlertCircle, Sparkles } from 'lucide-react';
import { SAMPLE_PRODUCTS, SAMPLE_CATEGORIES, SAMPLE_BRANDS } from '@/lib/data/sampleData';
import { formatBDT } from '@/lib/utils/formatters';
import { Product } from '@/lib/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newBengaliTitle, setNewBengaliTitle] = useState('');
  const [newBrandId, setNewBrandId] = useState(SAMPLE_BRANDS[0].id);
  const [newCategoryId, setNewCategoryId] = useState(SAMPLE_CATEGORIES[0].id);
  const [newDescription, setNewDescription] = useState('');
  const [newVariantTitle, setNewVariantTitle] = useState('50 ml');
  const [newPrice, setNewPrice] = useState('1800');
  const [newStock, setNewStock] = useState('20');
  const [newSku, setNewSku] = useState('SEO-NEW-50ML');

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.variants.some((v) => v.sku.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = !selectedCategory || p.category?.slug === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const brand = SAMPLE_BRANDS.find((b) => b.id === newBrandId);
    const category = SAMPLE_CATEGORIES.find((c) => c.id === newCategoryId);

    const created: Product = {
      id: `p_custom_${Date.now()}`,
      title: newTitle,
      bengali_title: newBengaliTitle || undefined,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      brand_id: newBrandId,
      brand,
      category_id: newCategoryId,
      category,
      description: newDescription || 'Premium Korean skincare formula.',
      skin_types: ['all'],
      is_active: true,
      is_featured: false,
      is_new_arrival: true,
      is_best_seller: false,
      rating: 5.0,
      reviews_count: 0,
      created_at: new Date().toISOString(),
      images: [
        {
          id: `img_${Date.now()}`,
          product_id: `p_custom_${Date.now()}`,
          image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
          sort_order: 1,
          is_primary: true,
        },
      ],
      variants: [
        {
          id: `var_${Date.now()}`,
          product_id: `p_custom_${Date.now()}`,
          sku: newSku,
          title: newVariantTitle,
          attribute_name: 'Size',
          attribute_value: newVariantTitle,
          regular_price: parseFloat(newPrice) || 1500,
          sale_price: null,
          stock_quantity: parseInt(newStock) || 10,
          is_active: true,
        },
      ],
    };

    setProducts([created, ...products]);
    setShowAddModal(false);
    setFeedback(`Product "${created.title}" successfully created and saved.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleToggleActive = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, is_active: !p.is_active } : p))
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa">
            Products & Variants Management
          </h1>
          <p className="text-xs text-seoulea-cocoa/60 mt-1">
            Manage Korean skincare items, SKU combinations, BDT pricing, and stock quotas.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-seoulea-berry hover:bg-seoulea-berry-dark text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-2xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-seoulea-blush-soft shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search by title or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl py-2 pl-3.5 pr-9 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
            />
            <Search className="w-4 h-4 text-seoulea-cocoa/40 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl py-2 px-3 text-xs text-seoulea-cocoa font-medium focus:outline-none focus:border-seoulea-gold"
          >
            <option value="">All Categories</option>
            {SAMPLE_CATEGORIES.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs text-seoulea-cocoa/60 font-semibold">
          {filteredProducts.length} Products
        </span>
      </div>

      {/* Products Table with Expanded Variants */}
      <div className="bg-white rounded-3xl border border-seoulea-blush-soft shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-seoulea-ivory text-seoulea-cocoa font-bold border-b border-seoulea-blush-soft">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Brand & Category</th>
                <th className="py-3 px-4">Purchasable Variants</th>
                <th className="py-3 px-4">Total Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-seoulea-blush-soft/60">
              {filteredProducts.map((product) => {
                const totalStock = product.variants.reduce((sum, v) => sum + v.stock_quantity, 0);

                return (
                  <tr key={product.id} className="hover:bg-seoulea-ivory/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-seoulea-ivory border border-seoulea-blush-soft flex-shrink-0">
                          <Image
                            src={
                              product.images[0]?.image_url ||
                              'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80'
                            }
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-bold text-seoulea-cocoa block line-clamp-1">
                            {product.title}
                          </span>
                          {product.bengali_title && (
                            <span className="text-[10px] text-seoulea-cocoa/60 block">
                              {product.bengali_title}
                            </span>
                          )}
                          <span className="text-[10px] text-seoulea-gold font-mono">
                            /{product.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-seoulea-cocoa block">
                        {product.brand?.name}
                      </span>
                      <span className="text-[11px] text-seoulea-cocoa/60">
                        {product.category?.name}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        {product.variants.map((v) => (
                          <div
                            key={v.id}
                            className="inline-flex items-center gap-2 bg-seoulea-ivory px-2.5 py-1 rounded-lg border border-seoulea-blush-soft text-[11px] mr-1.5"
                          >
                            <span className="font-semibold">{v.title}</span>
                            <span className="font-mono text-seoulea-gold font-bold">
                              {v.sku}
                            </span>
                            <span className="font-bold text-seoulea-berry">
                              {formatBDT(v.sale_price ?? v.regular_price)}
                            </span>
                            <span className="text-[10px] text-seoulea-cocoa/60">
                              (Stock: {v.stock_quantity})
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4 font-bold">
                      {totalStock <= 10 ? (
                        <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full text-[10px]">
                          {totalStock} (Low Stock)
                        </span>
                      ) : (
                        <span className="text-emerald-700">{totalStock} units</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleActive(product.id)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors ${
                          product.is_active
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        {product.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => {
                          setFeedback(`Edit product ${product.title} opened.`);
                          setTimeout(() => setFeedback(null), 2000);
                        }}
                        className="p-1.5 text-seoulea-cocoa/60 hover:text-seoulea-berry transition-colors"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-seoulea-cocoa/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-seoulea-blush-soft space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="font-editorial text-xl font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3">
              Add New Korean Beauty Product
            </h2>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-seoulea-cocoa block mb-1">Product Title (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ginseng Essence Water"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                />
              </div>

              <div>
                <label className="font-bold text-seoulea-cocoa block mb-1">Bengali Title (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. জিনসেং এসেন্স ওয়াটার"
                  value={newBengaliTitle}
                  onChange={(e) => setNewBengaliTitle(e.target.value)}
                  className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-seoulea-cocoa block mb-1">Brand</label>
                  <select
                    value={newBrandId}
                    onChange={(e) => setNewBrandId(e.target.value)}
                    className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs text-seoulea-cocoa"
                  >
                    {SAMPLE_BRANDS.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-seoulea-cocoa block mb-1">Category</label>
                  <select
                    value={newCategoryId}
                    onChange={(e) => setNewCategoryId(e.target.value)}
                    className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs text-seoulea-cocoa"
                  >
                    {SAMPLE_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 bg-seoulea-ivory rounded-2xl border border-seoulea-blush-soft space-y-3">
                <span className="font-bold text-seoulea-gold uppercase text-[10px] block">
                  Initial Purchasable Variant Setup
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-seoulea-cocoa font-medium mb-1">Variant Size</label>
                    <input
                      type="text"
                      value={newVariantTitle}
                      onChange={(e) => setNewVariantTitle(e.target.value)}
                      className="w-full bg-white border border-seoulea-blush-soft rounded-xl px-3 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-seoulea-cocoa font-medium mb-1">SKU</label>
                    <input
                      type="text"
                      value={newSku}
                      onChange={(e) => setNewSku(e.target.value)}
                      className="w-full bg-white border border-seoulea-blush-soft rounded-xl px-3 py-1.5 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-seoulea-cocoa font-medium mb-1">Price (BDT ৳)</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full bg-white border border-seoulea-blush-soft rounded-xl px-3 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-seoulea-cocoa font-medium mb-1">Available Stock</label>
                    <input
                      type="number"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      className="w-full bg-white border border-seoulea-blush-soft rounded-xl px-3 py-1.5"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-seoulea-blush-soft">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-seoulea-blush text-seoulea-cocoa font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-seoulea-berry hover:bg-seoulea-berry-dark text-white font-bold"
                >
                  Save Product & Variant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
