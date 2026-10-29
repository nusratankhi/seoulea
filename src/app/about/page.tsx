import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Heart, ShieldCheck, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-seoulea-ivory min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-seoulea-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Seouléa Heritage</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-seoulea-cocoa">
            Your Seoul-Inspired Beauty Destination
          </h1>
          <p className="text-sm text-seoulea-cocoa/70 leading-relaxed">
            Bridging the timeless wisdom of traditional Korean Hanbang herbs with modern Seoul dermatology for skin lovers in Bangladesh.
          </p>
        </div>

        {/* Story Content Card */}
        <div className="bg-white rounded-3xl border border-seoulea-blush-soft p-8 sm:p-12 shadow-boutique space-y-8 leading-relaxed text-sm text-seoulea-cocoa/80">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-seoulea-gold flex-shrink-0">
              <Image
                src="/images/seoulea-logo.jpg"
                alt="Seouléa"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-3">
              <h2 className="font-editorial text-2xl font-bold text-seoulea-cocoa">
                Glow Your True Beauty
              </h2>
              <p>
                Founded with a singular passion, Seouléa was born to bring 100% authentic, scientifically-tested Korean skincare products to Bangladesh. We believe that radiant &ldquo;glass skin&rdquo; is not about covering flaws with heavy makeup, but nourishing the skin barrier with gentle, hydrating, and skin-repairing botanicals.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-seoulea-blush-soft">
            <h3 className="font-editorial text-xl font-bold text-seoulea-cocoa">
              Our Authentic Sourcing Commitment
            </h3>
            <p>
              In an e-commerce market cluttered with counterfeit beauty products, Seouléa stands on absolute authenticity. Every ampoule, toner, and sunscreen is sourced directly through certified Seoul distributors and licensed export channels.
            </p>
            <p>
              We formulate our collections carefully for the hot, humid weather and unique skin concerns of Bangladesh: non-comedogenic cleansers, low-pH toners, soothing Centella, and invisible SPF formulas that leave zero white cast.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-seoulea-blush-soft text-center">
            <div className="p-4 rounded-2xl bg-seoulea-ivory">
              <ShieldCheck className="w-6 h-6 text-seoulea-berry mx-auto mb-2" />
              <h4 className="font-bold text-seoulea-cocoa">100% Guaranteed</h4>
              <p className="text-xs text-seoulea-cocoa/60 mt-1">Direct Korean lab verification</p>
            </div>
            <div className="p-4 rounded-2xl bg-seoulea-ivory">
              <Truck className="w-6 h-6 text-seoulea-berry mx-auto mb-2" />
              <h4 className="font-bold text-seoulea-cocoa">Nationwide Dispatch</h4>
              <p className="text-xs text-seoulea-cocoa/60 mt-1">Express delivery to 64 districts</p>
            </div>
            <div className="p-4 rounded-2xl bg-seoulea-ivory">
              <Heart className="w-6 h-6 text-seoulea-berry mx-auto mb-2" />
              <h4 className="font-bold text-seoulea-cocoa">Personalized Care</h4>
              <p className="text-xs text-seoulea-cocoa/60 mt-1">Free skincare advice on WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
