'use client';

import React, { useState } from 'react';
import { CreditCard, Save, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { DEFAULT_PAYMENT_SETTINGS } from '@/lib/data/sampleData';
import { PaymentSetting } from '@/lib/types';

export default function AdminPaymentsPage() {
  const [settings, setSettings] = useState<PaymentSetting[]>(DEFAULT_PAYMENT_SETTINGS);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleUpdateSetting = (index: number, field: keyof PaymentSetting, value: any) => {
    const updated = [...settings];
    updated[index] = { ...updated[index], [field]: value };
    setSettings(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback('Payment method settings updated and active across checkout.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa">
          Payment Method Settings
        </h1>
        <p className="text-xs text-seoulea-cocoa/60 mt-1">
          Configure Cash on Delivery, manual bKash, Nagad, and Rocket mobile numbers, and checkout guidance.
        </p>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-2xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settings.map((pm, idx) => (
            <div
              key={pm.method}
              className="bg-white rounded-3xl border border-seoulea-blush-soft p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-seoulea-blush-soft pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-seoulea-berry" />
                  <h3 className="font-editorial text-base font-bold text-seoulea-cocoa">
                    {pm.title}
                  </h3>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pm.is_enabled}
                    onChange={(e) => handleUpdateSetting(idx, 'is_enabled', e.target.checked)}
                    className="w-4 h-4 accent-seoulea-berry rounded"
                  />
                  <span className="text-xs font-bold text-seoulea-cocoa">
                    {pm.is_enabled ? 'Active' : 'Disabled'}
                  </span>
                </label>
              </div>

              {pm.method !== 'cod' && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-seoulea-cocoa block mb-1">
                      Recipient / Wallet Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={pm.account_number}
                      onChange={(e) => handleUpdateSetting(idx, 'account_number', e.target.value)}
                      className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs font-mono font-bold text-seoulea-cocoa"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-seoulea-cocoa block mb-1">
                      Account Type
                    </label>
                    <select
                      value={pm.account_type}
                      onChange={(e) => handleUpdateSetting(idx, 'account_type', e.target.value as any)}
                      className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs text-seoulea-cocoa font-medium"
                    >
                      <option value="Personal">Personal (Send Money)</option>
                      <option value="Merchant">Merchant (Payment)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="text-xs">
                <label className="font-bold text-seoulea-cocoa block mb-1">
                  Customer Instructions
                </label>
                <textarea
                  rows={3}
                  value={pm.instructions}
                  onChange={(e) => handleUpdateSetting(idx, 'instructions', e.target.value)}
                  className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs text-seoulea-cocoa leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-seoulea-berry hover:bg-seoulea-berry-dark text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            <Save className="w-4 h-4 text-seoulea-gold" />
            <span>Save All Payment Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
