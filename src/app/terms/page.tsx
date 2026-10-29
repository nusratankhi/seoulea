import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-seoulea-ivory min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="font-editorial text-3xl font-bold text-seoulea-cocoa text-center">
          Terms & Conditions
        </h1>
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-8 sm:p-10 shadow-boutique space-y-4 text-xs text-seoulea-cocoa/80 leading-relaxed">
          <p>
            Welcome to Seouléa. By accessing this website or placing orders for Korean skincare products, you agree to comply with and be bound by the following terms.
          </p>
          <h2 className="font-bold text-sm text-seoulea-cocoa pt-2">1. Authenticity & Catalog Descriptions</h2>
          <p>
            All products offered are genuine Korean cosmetics. Product descriptions, ingredients, and instructions are based on official distributor formulations. Sample demo catalog data is displayed for testing and demonstration prior to verified distributor data loading.
          </p>
          <h2 className="font-bold text-sm text-seoulea-cocoa pt-2">2. Pricing & Bangladeshi Taka (BDT)</h2>
          <p>
            All prices are listed in Bangladeshi Taka (BDT ৳) and include applicable import taxes. Orders are finalized based on server-verified stock and pricing at checkout.
          </p>
          <h2 className="font-bold text-sm text-seoulea-cocoa pt-2">3. Orders & Cancellation</h2>
          <p>
            Seouléa reserves the right to review orders for suspicious duplicate submissions, invalid contact numbers, or unverified manual payment claims.
          </p>
        </div>
      </div>
    </div>
  );
}
