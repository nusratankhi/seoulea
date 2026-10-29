'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Layers, Plus, Edit2, Check, Sparkles } from 'lucide-react';
import { SAMPLE_CATEGORIES } from '@/lib/data/sampleData';
import { Category } from '@/lib/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(SAMPLE_CATEGORIES);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleToggleActive = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_active: !c.is_active } : c))
    );
    setFeedback('Category status updated.');
    setTimeout(() => setFeedback(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa">
            Category Management
          </h1>
          <p className="text-xs text-seoulea-cocoa/60 mt-1">
            Organize Korean beauty routines, circular homepage categories, and taxonomy.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-2xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-seoulea-blush-soft shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-seoulea-ivory text-seoulea-cocoa font-bold border-b border-seoulea-blush-soft">
              <tr>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Sort Order</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-seoulea-blush-soft/60">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-seoulea-ivory/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-seoulea-gold/60 flex-shrink-0">
                        <Image src={cat.image_url} alt="" fill className="object-cover" />
                      </div>
                      <span className="font-bold text-seoulea-cocoa text-sm">{cat.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-seoulea-gold font-bold">
                    /{cat.slug}
                  </td>
                  <td className="py-3.5 px-4 text-seoulea-cocoa/70 max-w-xs truncate">
                    {cat.description}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-seoulea-cocoa">
                    {cat.sort_order}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleActive(cat.id)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        cat.is_active
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {cat.is_active ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setFeedback(`Editing ${cat.name}`);
                        setTimeout(() => setFeedback(null), 1500);
                      }}
                      className="p-1.5 text-seoulea-cocoa/60 hover:text-seoulea-berry"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
