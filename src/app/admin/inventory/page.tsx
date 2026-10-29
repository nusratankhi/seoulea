'use client';

import React, { useState } from 'react';
import { Boxes, AlertTriangle, Plus, Minus, Check, ArrowUpDown, History } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/lib/data/sampleData';
import { formatBDT } from '@/lib/utils/formatters';

interface InventoryItem {
  variantId: string;
  productTitle: string;
  variantTitle: string;
  sku: string;
  stockQuantity: number;
  price: number;
}

export default function AdminInventoryPage() {
  const initialItems: InventoryItem[] = SAMPLE_PRODUCTS.flatMap((p) =>
    p.variants.map((v) => ({
      variantId: v.id,
      productTitle: p.title,
      variantTitle: v.title,
      sku: v.sku,
      stockQuantity: v.stock_quantity,
      price: v.sale_price ?? v.regular_price,
    }))
  );

  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<number>(10);
  const [adjustReason, setAdjustReason] = useState<string>('Air cargo shipment arrival from Seoul');
  const [notification, setNotification] = useState<string | null>(null);

  const [movementLogs, setMovementLogs] = useState<Array<{
    sku: string;
    change: number;
    reason: string;
    date: string;
  }>>([
    {
      sku: 'BOJ-RICE-30ML',
      change: 25,
      reason: 'Batch import from Seoul distributor',
      date: '2026-10-25',
    },
    {
      sku: 'COSRX-SNAIL-100ML',
      change: -1,
      reason: 'Order placed SEO-261028-9124',
      date: '2026-10-28',
    },
  ]);

  const handleAdjustStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    setItems((prev) =>
      prev.map((item) =>
        item.variantId === selectedItem.variantId
          ? { ...item, stockQuantity: Math.max(0, item.stockQuantity + adjustAmount) }
          : item
      )
    );

    setMovementLogs([
      {
        sku: selectedItem.sku,
        change: adjustAmount,
        reason: adjustReason,
        date: new Date().toISOString().slice(0, 10),
      },
      ...movementLogs,
    ]);

    setNotification(`Stock for ${selectedItem.sku} adjusted by ${adjustAmount > 0 ? `+${adjustAmount}` : adjustAmount}.`);
    setSelectedItem(null);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa">
          Inventory & Stock Management
        </h1>
        <p className="text-xs text-seoulea-cocoa/60 mt-1">
          Maintain stock quantities at the individual variant level, log shipments, and prevent overselling.
        </p>
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-2xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Grid of Variants */}
      <div className="bg-white rounded-3xl border border-seoulea-blush-soft shadow-sm overflow-hidden">
        <div className="p-4 border-b border-seoulea-blush-soft flex justify-between items-center bg-seoulea-ivory">
          <span className="font-editorial text-sm font-bold text-seoulea-cocoa">
            Current Variant Stock Quotas
          </span>
          <span className="text-xs font-semibold text-seoulea-cocoa/60">
            {items.length} Tracked SKUs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-seoulea-ivory/60 text-seoulea-cocoa font-bold border-b border-seoulea-blush-soft">
              <tr>
                <th className="py-3 px-4">SKU Code</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Variant Option</th>
                <th className="py-3 px-4">BDT Price</th>
                <th className="py-3 px-4">Available Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-seoulea-blush-soft/60">
              {items.map((item) => {
                const isLow = item.stockQuantity <= 10;
                const isOut = item.stockQuantity === 0;

                return (
                  <tr key={item.variantId} className="hover:bg-seoulea-ivory/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-seoulea-gold">
                      {item.sku}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-seoulea-cocoa max-w-xs truncate">
                      {item.productTitle}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-seoulea-cocoa/80">
                      {item.variantTitle}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-seoulea-berry">
                      {formatBDT(item.price)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-sm">
                      {item.stockQuantity} units
                    </td>
                    <td className="py-3.5 px-4">
                      {isOut ? (
                        <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Optimal
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="px-3 py-1.5 bg-seoulea-ivory hover:bg-seoulea-blush-light border border-seoulea-blush text-seoulea-berry font-bold rounded-lg transition-colors text-[11px]"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Movement History Log */}
      <div className="bg-white rounded-3xl border border-seoulea-blush-soft shadow-sm p-6 space-y-4">
        <h2 className="font-editorial text-lg font-bold text-seoulea-cocoa flex items-center gap-2 border-b border-seoulea-blush-soft pb-3">
          <History className="w-5 h-5 text-seoulea-gold" />
          <span>Recent Inventory Movement Log</span>
        </h2>

        <div className="divide-y divide-seoulea-blush-soft/60 text-xs">
          {movementLogs.map((log, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <div>
                <strong className="font-mono text-seoulea-cocoa">{log.sku}</strong>
                <span className="text-seoulea-cocoa/60 ml-3">{log.reason}</span>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`font-bold font-mono ${
                    log.change > 0 ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {log.change > 0 ? `+${log.change}` : log.change} units
                </span>
                <span className="text-[11px] text-seoulea-cocoa/40">{log.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-seoulea-cocoa/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-seoulea-blush-soft space-y-4">
            <h2 className="font-editorial text-xl font-bold text-seoulea-cocoa border-b border-seoulea-blush-soft pb-3">
              Adjust Stock: {selectedItem.sku}
            </h2>

            <p className="text-xs text-seoulea-cocoa/70">
              {selectedItem.productTitle} — <strong>{selectedItem.variantTitle}</strong> (Current stock: {selectedItem.stockQuantity})
            </p>

            <form onSubmit={handleAdjustStock} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-seoulea-cocoa block mb-1">
                  Quantity Change (+ for restock, - for damage/write-off)
                </label>
                <input
                  type="number"
                  required
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(parseInt(e.target.value) || 0)}
                  className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs text-seoulea-cocoa font-bold text-base focus:outline-none focus:border-seoulea-gold"
                />
              </div>

              <div>
                <label className="font-bold text-seoulea-cocoa block mb-1">
                  Reason for Stock Movement (Audit Log) *
                </label>
                <input
                  type="text"
                  required
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-seoulea-blush-soft">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl border border-seoulea-blush text-seoulea-cocoa font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-seoulea-berry hover:bg-seoulea-berry-dark text-white font-bold"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
