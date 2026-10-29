'use client';

import React, { useState } from 'react';
import { Settings, Save, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { DEFAULT_STORE_SETTINGS, SAMPLE_HOMEPAGE_SLIDES } from '@/lib/data/sampleData';

export default function AdminSettingsPage() {
  const [storeSettings, setStoreSettings] = useState(DEFAULT_STORE_SETTINGS);
  const [slides, setSlides] = useState(SAMPLE_HOMEPAGE_SLIDES);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback('Store settings and homepage banners updated successfully.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa">
          Store & Homepage Settings
        </h1>
        <p className="text-xs text-seoulea-cocoa/60 mt-1">
          Update announcement bar, Bangladesh contact details, social links, delivery rules, and hero slides.
        </p>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-2xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* 1. Announcement Bar */}
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 shadow-sm space-y-4">
          <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-seoulea-gold" />
            <span>Top Announcement Bar</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="font-bold text-seoulea-cocoa block mb-1">
                Announcement Ticker Message
              </label>
              <input
                type="text"
                value={storeSettings.announcement_bar_text}
                onChange={(e) => setStoreSettings({ ...storeSettings, announcement_bar_text: e.target.value })}
                className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2 text-xs text-seoulea-cocoa font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-seoulea-cocoa block mb-1">Visibility</label>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={storeSettings.announcement_bar_enabled}
                  onChange={(e) => setStoreSettings({ ...storeSettings, announcement_bar_enabled: e.target.checked })}
                  className="w-4 h-4 accent-seoulea-berry rounded"
                />
                <span className="text-xs font-bold text-seoulea-cocoa">Display on Storefront</span>
              </label>
            </div>
          </div>
        </div>

        {/* 2. Bangladesh Shipping Rules */}
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 shadow-sm space-y-4">
          <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3">
            Domestic Delivery Charges
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-seoulea-cocoa block mb-1">
                Inside Dhaka Charge (BDT ৳)
              </label>
              <input
                type="number"
                value={storeSettings.delivery_inside_dhaka}
                onChange={(e) => setStoreSettings({ ...storeSettings, delivery_inside_dhaka: parseInt(e.target.value) || 0 })}
                className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2 text-xs text-seoulea-cocoa font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-seoulea-cocoa block mb-1">
                Outside Dhaka Charge (BDT ৳)
              </label>
              <input
                type="number"
                value={storeSettings.delivery_outside_dhaka}
                onChange={(e) => setStoreSettings({ ...storeSettings, delivery_outside_dhaka: parseInt(e.target.value) || 0 })}
                className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2 text-xs text-seoulea-cocoa font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-seoulea-cocoa block mb-1">
                Free Delivery Threshold (BDT ৳)
              </label>
              <input
                type="number"
                value={storeSettings.free_delivery_threshold}
                onChange={(e) => setStoreSettings({ ...storeSettings, free_delivery_threshold: parseInt(e.target.value) || 0 })}
                className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2 text-xs text-seoulea-cocoa font-bold"
              />
            </div>
          </div>
        </div>

        {/* 3. Contact & Social Channels */}
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 shadow-sm space-y-4">
          <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3">
            Contact & Social Profiles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-seoulea-cocoa block mb-1">Customer Support Phone</label>
              <input
                type="text"
                value={storeSettings.contact_phone}
                onChange={(e) => setStoreSettings({ ...storeSettings, contact_phone: e.target.value })}
                className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-seoulea-cocoa block mb-1">Support Email</label>
              <input
                type="email"
                value={storeSettings.contact_email}
                onChange={(e) => setStoreSettings({ ...storeSettings, contact_email: e.target.value })}
                className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-seoulea-cocoa block mb-1">Facebook URL</label>
              <input
                type="text"
                value={storeSettings.facebook_url}
                onChange={(e) => setStoreSettings({ ...storeSettings, facebook_url: e.target.value })}
                className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-seoulea-cocoa block mb-1">Instagram URL</label>
              <input
                type="text"
                value={storeSettings.instagram_url}
                onChange={(e) => setStoreSettings({ ...storeSettings, instagram_url: e.target.value })}
                className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-seoulea-cocoa block mb-1">Boutique Physical Address</label>
              <input
                type="text"
                value={storeSettings.contact_address}
                onChange={(e) => setStoreSettings({ ...storeSettings, contact_address: e.target.value })}
                className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>
        </div>

        {/* 4. Homepage Hero Slides */}
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 shadow-sm space-y-4">
          <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-seoulea-gold" />
            <span>Homepage Hero Carousel Slides</span>
          </h2>

          <div className="space-y-4">
            {slides.map((slide, sIdx) => (
              <div key={slide.id} className="p-4 bg-seoulea-ivory rounded-2xl border border-seoulea-blush-soft space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-seoulea-cocoa">Slide #{sIdx + 1}: {slide.title}</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={slide.is_active}
                      onChange={(e) => {
                        const updated = [...slides];
                        updated[sIdx].is_active = e.target.checked;
                        setSlides(updated);
                      }}
                      className="accent-seoulea-berry rounded"
                    />
                    <span className="text-[11px] font-bold">Active</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-seoulea-cocoa mb-1">Headline</label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => {
                        const updated = [...slides];
                        updated[sIdx].title = e.target.value;
                        setSlides(updated);
                      }}
                      className="w-full bg-white border border-seoulea-blush-soft rounded-xl px-3 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-seoulea-cocoa mb-1">Tagline</label>
                    <input
                      type="text"
                      value={slide.tagline || ''}
                      onChange={(e) => {
                        const updated = [...slides];
                        updated[sIdx].tagline = e.target.value;
                        setSlides(updated);
                      }}
                      className="w-full bg-white border border-seoulea-blush-soft rounded-xl px-3 py-1.5"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-seoulea-berry hover:bg-seoulea-berry-dark text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            <Save className="w-4 h-4 text-seoulea-gold" />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
