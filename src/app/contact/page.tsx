'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { DEFAULT_STORE_SETTINGS } from '@/lib/data/sampleData';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-seoulea-ivory min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-seoulea-gold">
            Get in Touch
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-seoulea-cocoa mt-1">
            Contact Beauty Advisory
          </h1>
          <p className="text-xs sm:text-sm text-seoulea-cocoa/70 mt-2">
            Have questions about an order or need personalized K-Beauty routine guidance? Our team in Banani, Dhaka is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-seoulea-blush-soft p-8 shadow-boutique space-y-6">
            <h2 className="font-editorial text-xl font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3">
              Store & Customer Care
            </h2>

            <div className="space-y-4 text-xs text-seoulea-cocoa/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-seoulea-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-seoulea-cocoa">Boutique Address:</strong>
                  <span>{DEFAULT_STORE_SETTINGS.contact_address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-seoulea-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-seoulea-cocoa">Hotline & WhatsApp:</strong>
                  <span>{DEFAULT_STORE_SETTINGS.contact_phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-seoulea-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-seoulea-cocoa">Support Email:</strong>
                  <span>{DEFAULT_STORE_SETTINGS.contact_email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-seoulea-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-seoulea-cocoa">Support Hours:</strong>
                  <span>{DEFAULT_STORE_SETTINGS.business_hours}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-seoulea-blush-soft">
              <span className="text-[11px] font-bold uppercase tracking-wider text-seoulea-gold block mb-2">
                Fast WhatsApp Consultation
              </span>
              <a
                href={`https://wa.me/${DEFAULT_STORE_SETTINGS.whatsapp_number.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block text-center py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Chat on WhatsApp Now
              </a>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-seoulea-blush-soft p-8 shadow-boutique">
            <h2 className="font-editorial text-xl font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3 mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-editorial text-lg font-bold text-seoulea-cocoa">
                  Message Received!
                </h3>
                <p className="text-xs text-seoulea-cocoa/70 max-w-sm mx-auto">
                  Thank you for reaching out. Our skincare advisory team will respond to your inquiry via phone or email within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 bg-seoulea-berry text-white text-xs font-semibold rounded-full"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-seoulea-cocoa block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayesha Siddiqua"
                      className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2.5 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-seoulea-cocoa block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2.5 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-seoulea-cocoa block mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Product recommendation / Order inquiry"
                    className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2.5 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                  />
                </div>

                <div>
                  <label className="font-bold text-seoulea-cocoa block mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your skin concerns or questions..."
                    className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3.5 py-2.5 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 rounded-2xl bg-seoulea-berry hover:bg-seoulea-berry-dark text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
