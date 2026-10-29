import React from 'react';
import Link from 'next/link';
import { HelpCircle, Sparkles } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'Are all your products 100% authentic Korean skincare?',
      a: 'Yes, absolutely. We source exclusively from certified Korean brand partners and authorized export houses in Seoul. Every product carries its genuine batch numbers and tamper seals.',
    },
    {
      q: 'How long does delivery take across Bangladesh?',
      a: 'Inside Dhaka delivery typically takes 24–48 hours. For all other districts (Chattogram, Sylhet, Rajshahi, Khulna, etc.), parcels are delivered within 3–4 working days via trusted domestic couriers (Steadfast / Pathao / RedX).',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Cash on Delivery (COD) nationwide, as well as manual Send Money transfers via bKash, Nagad, and Rocket.',
    },
    {
      q: 'How does manual bKash / Nagad payment work?',
      a: 'During checkout, choose bKash or Nagad, follow the displayed instructions to Send Money to our official number, and enter your 10-character Transaction ID (TrxID) and sender mobile number. Our team verifies the transaction with our accounts within a few hours.',
    },
    {
      q: 'Can I return an item if it arrives damaged?',
      a: 'Yes! Please inspect your parcel in the presence of the courier delivery rider. If an item is damaged or incorrect, contact our WhatsApp hotline immediately with parcel photos for an instant replacement or refund.',
    },
    {
      q: 'Which Korean skincare routine is best for humid Bangladesh weather?',
      a: 'We recommend gentle low-pH cleansing, a soothing essence like Heartleaf or Snail Mucin, a light hydrating serum, and an invisible water-fit chemical sunscreen that leaves no greasiness or white cast.',
    },
  ];

  return (
    <div className="bg-seoulea-ivory min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-seoulea-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-seoulea-cocoa">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-seoulea-cocoa/70">
            Everything you need to know about ordering authentic K-Beauty in Bangladesh.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-seoulea-blush-soft p-6 shadow-boutique space-y-2"
            >
              <h3 className="font-editorial text-base font-bold text-seoulea-cocoa flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-seoulea-gold flex-shrink-0 mt-1" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-seoulea-cocoa/80 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
