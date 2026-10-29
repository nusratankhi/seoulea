'use client';

import React from 'react';
import { ShieldCheck, Truck, Headphones, RefreshCw } from 'lucide-react';

export function TrustFeatures() {
  const features = [
    {
      icon: ShieldCheck,
      title: '100% Authentic Korean Formulations',
      desc: 'All products are authentic K-Beauty items imported directly from certified South Korean manufacturers.',
    },
    {
      icon: Truck,
      title: 'Fast Nationwide Delivery',
      desc: 'Inside Dhaka delivery within 24–48 hours; all 64 districts of Bangladesh within 3–4 days via trusted couriers.',
    },
    {
      icon: RefreshCw,
      title: 'Safe Cash on Delivery & bKash',
      desc: 'Inspect parcel upon arrival with COD or transfer via verified bKash, Nagad, and Rocket mobile banking.',
    },
    {
      icon: Headphones,
      title: 'Complimentary Skincare Advisory',
      desc: 'Not sure which toner or serum suits your skin barrier? WhatsApp our certified beauty advisors anytime.',
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-seoulea-ivory border border-seoulea-blush-soft/80 shadow-boutique hover:shadow-boutique-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-seoulea-blush-light border border-seoulea-gold/40 flex items-center justify-center text-seoulea-berry mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-base font-bold text-seoulea-cocoa mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-seoulea-cocoa/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
