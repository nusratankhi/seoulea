import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-seoulea-ivory min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="font-editorial text-3xl font-bold text-seoulea-cocoa text-center">
          Privacy Policy
        </h1>
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-8 sm:p-10 shadow-boutique space-y-4 text-xs text-seoulea-cocoa/80 leading-relaxed">
          <p>
            At Seouléa, we deeply value the privacy of our Bangladeshi customers. This privacy notice explains how your personal data is handled when you browse, create an account, or order products from our online boutique.
          </p>
          <h2 className="font-bold text-sm text-seoulea-cocoa pt-2">1. Information We Collect</h2>
          <p>
            We collect information necessary to fulfill your orders: your full name, Bangladesh contact phone number, delivery address (district, area, street), order item details, and payment transaction IDs (for manual mobile transfers).
          </p>
          <h2 className="font-bold text-sm text-seoulea-cocoa pt-2">2. How We Protect Your Data</h2>
          <p>
            We implement strict Row Level Security (RLS) in our database. Customers can only view their own accounts and orders. We never sell, rent, or trade your personal information to third parties.
          </p>
          <h2 className="font-bold text-sm text-seoulea-cocoa pt-2">3. Payment Security</h2>
          <p>
            We do not store credit card numbers. Manual transfers via bKash, Nagad, and Rocket are authenticated using official transaction IDs verified by authorized administrative staff.
          </p>
        </div>
      </div>
    </div>
  );
}
