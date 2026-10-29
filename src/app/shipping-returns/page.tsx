import React from 'react';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { DEFAULT_STORE_SETTINGS } from '@/lib/data/sampleData';

export default function ShippingReturnsPage() {
  return (
    <div className="bg-seoulea-ivory min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-seoulea-cocoa">
            Shipping & Return Policies
          </h1>
          <p className="text-xs sm:text-sm text-seoulea-cocoa/70">
            Clear, transparent fulfillment and customer satisfaction terms across Bangladesh.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-8 sm:p-10 shadow-boutique space-y-6 text-xs text-seoulea-cocoa/80 leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa flex items-center gap-2">
              <Truck className="w-5 h-5 text-seoulea-gold" />
              <span>Nationwide Bangladesh Delivery</span>
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Inside Dhaka Metro:</strong> ৳{DEFAULT_STORE_SETTINGS.delivery_inside_dhaka} (Delivery within 24–48 hours).</li>
              <li><strong>Outside Dhaka (All 63 Districts):</strong> ৳{DEFAULT_STORE_SETTINGS.delivery_outside_dhaka} (Delivery within 3–4 working days).</li>
              <li><strong>Free Delivery Offer:</strong> All orders with subtotal ৳{DEFAULT_STORE_SETTINGS.free_delivery_threshold} or above receive FREE delivery!</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t border-seoulea-blush-soft">
            <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-seoulea-gold" />
              <span>Inspection & Return Terms</span>
            </h2>
            <p>
              Due to hygiene and skincare preservation standards, opened or used skincare cosmetics cannot be returned unless verified to be defective upon arrival.
            </p>
            <p>
              <strong>Parcel Inspection:</strong> We strongly encourage inspecting the package exterior and seal upon arrival with the courier rider. If the seal is compromised or wrong items are sent, please notify us immediately at {DEFAULT_STORE_SETTINGS.contact_phone}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
