'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  XCircle,
  Truck,
  Printer,
  Download,
  Eye,
  Filter,
  Check,
  AlertCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { Order, OrderStatus, PaymentStatus } from '@/lib/types';
import { formatBDT, getOrderStatusBadge, getPaymentStatusBadge } from '@/lib/utils/formatters';

const INITIAL_ADMIN_ORDERS: Order[] = [
  {
    id: 'ord_1',
    order_number: 'SEO-261029-4821',
    customer_name: 'Nusrat Jahan',
    customer_email: 'nusrat@example.com',
    customer_phone: '01712345678',
    shipping_address: {
      fullName: 'Nusrat Jahan',
      phone: '01712345678',
      district: 'Dhaka',
      area: 'Banani',
      streetAddress: 'House 14, Road 7, Banani, Dhaka 1213',
    },
    payment_method: 'bkash',
    payment_status: 'Pending Verification',
    payment_sender_phone: '01712345678',
    payment_transaction_id: '9B7K2P1L8M',
    order_status: 'Pending',
    subtotal: 2970,
    delivery_charge: 70,
    discount: 0,
    total: 3040,
    created_at: '2026-10-29T08:30:00Z',
    items: [
      {
        id: 'oi_1',
        order_id: 'ord_1',
        product_id: 'p1',
        variant_id: 'v1_1',
        product_title: 'Glow Deep Rice + Arbutin Brightening Serum',
        variant_title: '30 ml',
        sku: 'BOJ-RICE-30ML',
        quantity: 1,
        unit_price: 1390,
        total_price: 1390,
      },
      {
        id: 'oi_2',
        order_id: 'ord_1',
        product_id: 'p4',
        variant_id: 'v4_1',
        product_title: 'Madagascar Centella Hyalu-Cica Sun Serum SPF50+',
        variant_title: '50 ml',
        sku: 'SKIN-SUN-50ML',
        quantity: 1,
        unit_price: 1580,
        total_price: 1580,
      },
    ],
  },
  {
    id: 'ord_2',
    order_number: 'SEO-261028-9124',
    customer_name: 'Tanvir Ahmed',
    customer_phone: '01819876543',
    shipping_address: {
      fullName: 'Tanvir Ahmed',
      phone: '01819876543',
      district: 'Chattogram',
      area: 'GEC Circle',
      streetAddress: 'Tower 4, Nasirabad, Chattogram',
    },
    payment_method: 'cod',
    payment_status: 'Unpaid',
    order_status: 'Confirmed',
    subtotal: 2320,
    delivery_charge: 130,
    discount: 0,
    total: 2450,
    tracking_number: 'STEAD-CTG-44910',
    courier_name: 'Steadfast Courier',
    created_at: '2026-10-28T14:15:00Z',
    items: [
      {
        id: 'oi_3',
        order_id: 'ord_2',
        product_id: 'p2',
        variant_id: 'v2_1',
        product_title: 'Advanced Snail 96 Mucin Power Essence',
        variant_title: '100 ml',
        sku: 'COSRX-SNAIL-100ML',
        quantity: 1,
        unit_price: 1650,
        total_price: 1650,
      },
    ],
  },
  {
    id: 'ord_3',
    order_number: 'SEO-261028-7612',
    customer_name: 'Fabiha Rahman',
    customer_phone: '01911223344',
    shipping_address: {
      fullName: 'Fabiha Rahman',
      phone: '01911223344',
      district: 'Sylhet',
      area: 'Zindabazar',
      streetAddress: 'Lane 2, Amberkhana Road, Sylhet',
    },
    payment_method: 'nagad',
    payment_status: 'Paid',
    payment_sender_phone: '01911223344',
    payment_transaction_id: '7L8M9N0P2Q',
    payment_verified_at: '2026-10-28T16:00:00Z',
    order_status: 'Shipped',
    subtotal: 4890,
    delivery_charge: 0, // Free delivery
    discount: 0,
    total: 4890,
    tracking_number: 'PATHAO-SYL-12093',
    courier_name: 'Pathao Courier',
    created_at: '2026-10-28T11:00:00Z',
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ADMIN_ORDERS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPayment, setFilterPayment] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search) ||
      (o.payment_transaction_id && o.payment_transaction_id.toLowerCase().includes(search.toLowerCase()));

    const matchStatus = filterStatus === 'all' || o.order_status === filterStatus;
    const matchPayment = filterPayment === 'all' || o.payment_status === filterPayment;

    return matchSearch && matchStatus && matchPayment;
  });

  const handleVerifyPayment = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            payment_status: 'Paid',
            order_status: ord.order_status === 'Pending' ? 'Confirmed' : ord.order_status,
            payment_verified_at: new Date().toISOString(),
          };
        }
        return ord;
      })
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, payment_status: 'Paid', order_status: 'Confirmed' } : null));
    }
    setNotification('Payment verified successfully. Order transitioned to Confirmed.');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, order_status: newStatus } : ord))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, order_status: newStatus } : null));
    }
    setNotification(`Order status updated to ${newStatus}.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExportCSV = () => {
    const header = 'OrderNumber,Customer,Phone,District,PaymentMethod,PaymentStatus,OrderStatus,Total,Date\n';
    const rows = orders.map((o) =>
      `"${o.order_number}","${o.customer_name}","${o.customer_phone}","${o.shipping_address.district}","${o.payment_method}","${o.payment_status}","${o.order_status}","${o.total}","${o.created_at}"`
    ).join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seoulea_orders_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-seoulea-cocoa">
            Orders & Payment Verification
          </h1>
          <p className="text-xs text-seoulea-cocoa/60 mt-1">
            Reconcile bKash/Nagad transfers, process couriers, and manage customer shipments.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-seoulea-ivory border border-seoulea-blush text-seoulea-cocoa shadow-sm transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-seoulea-berry" />
          <span>Export Orders CSV</span>
        </button>
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-2xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-seoulea-blush-soft shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search by Order #, phone, TrxID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl py-2 pl-3.5 pr-9 text-xs text-seoulea-cocoa focus:outline-none focus:border-seoulea-gold"
            />
            <Search className="w-4 h-4 text-seoulea-cocoa/40 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl py-2 px-3 text-xs text-seoulea-cocoa font-medium focus:outline-none focus:border-seoulea-gold"
          >
            <option value="all">All Order Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="bg-seoulea-ivory border border-seoulea-blush-soft rounded-xl py-2 px-3 text-xs text-seoulea-cocoa font-medium focus:outline-none focus:border-seoulea-gold"
          >
            <option value="all">All Payment Statuses</option>
            <option value="Pending Verification">Pending Verification</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid (COD)</option>
            <option value="Failed">Failed / Rejected</option>
          </select>
        </div>

        <span className="text-xs text-seoulea-cocoa/60 font-semibold">
          {filteredOrders.length} Orders
        </span>
      </div>

      {/* Orders Master Table */}
      <div className="bg-white rounded-3xl border border-seoulea-blush-soft shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-seoulea-ivory text-seoulea-cocoa font-bold border-b border-seoulea-blush-soft">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Payment & TrxID</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-seoulea-blush-soft/60">
              {filteredOrders.map((ord) => {
                const orderBadge = getOrderStatusBadge(ord.order_status);
                const payBadge = getPaymentStatusBadge(ord.payment_status);

                return (
                  <tr key={ord.id} className="hover:bg-seoulea-ivory/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-seoulea-cocoa">
                      {ord.order_number}
                    </td>
                    <td className="py-3.5 px-4">
                      <strong className="text-seoulea-cocoa block">{ord.customer_name}</strong>
                      <span className="text-[11px] text-seoulea-cocoa/60">{ord.customer_phone}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-seoulea-cocoa">
                      {ord.shipping_address.district}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="uppercase font-bold block">{ord.payment_method}</span>
                      {ord.payment_transaction_id && (
                        <span className="font-mono text-[10px] text-seoulea-berry block">
                          TrxID: {ord.payment_transaction_id}
                        </span>
                      )}
                      {ord.payment_sender_phone && (
                        <span className="text-[10px] text-seoulea-cocoa/60 block">
                          Sender: {ord.payment_sender_phone}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${payBadge.bg} ${payBadge.text}`}>
                        {payBadge.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${orderBadge.bg} ${orderBadge.text}`}>
                        {orderBadge.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-seoulea-berry">
                      {formatBDT(ord.total)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-3 py-1.5 bg-seoulea-ivory hover:bg-seoulea-blush-light border border-seoulea-blush text-seoulea-berry font-bold rounded-lg transition-colors text-[11px] inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect & Action Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-seoulea-cocoa/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-seoulea-blush-soft space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-seoulea-blush-soft pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-seoulea-gold">
                  Order Management
                </span>
                <h2 className="font-mono text-xl font-bold text-seoulea-cocoa">
                  {selectedOrder.order_number}
                </h2>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-seoulea-cocoa/60 hover:text-seoulea-berry text-sm font-bold"
              >
                ✕ Close
              </button>
            </div>

            {/* Verification Alert Banner if Pending Verification */}
            {selectedOrder.payment_status === 'Pending Verification' && (
              <div className="bg-amber-50 border border-amber-300 p-4 rounded-2xl text-xs text-amber-900 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-700" />
                    Manual {selectedOrder.payment_method.toUpperCase()} Payment Needs Verification
                  </span>
                  <button
                    onClick={() => handleVerifyPayment(selectedOrder.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Verify</span>
                  </button>
                </div>
                <p>
                  Claimed TrxID: <strong>{selectedOrder.payment_transaction_id}</strong> • Sender Mobile: <strong>{selectedOrder.payment_sender_phone}</strong>. Reconcile with bKash/Nagad statement before clicking Approve.
                </p>
              </div>
            )}

            {/* Address & Customer Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-seoulea-ivory p-4 rounded-2xl border border-seoulea-blush-soft">
              <div>
                <strong className="text-seoulea-gold uppercase tracking-wider block mb-1">
                  Recipient Information
                </strong>
                <p className="font-bold text-seoulea-cocoa">{selectedOrder.customer_name}</p>
                <p className="text-seoulea-cocoa/70">{selectedOrder.customer_phone}</p>
                <p className="text-seoulea-cocoa/70 mt-1">{selectedOrder.shipping_address.streetAddress}</p>
                <p className="text-seoulea-cocoa/70">{selectedOrder.shipping_address.area}, {selectedOrder.shipping_address.district}</p>
              </div>

              <div>
                <strong className="text-seoulea-gold uppercase tracking-wider block mb-1">
                  Order Status Controls
                </strong>
                <label className="text-seoulea-cocoa/60 block mb-1">Change Order Status:</label>
                <select
                  value={selectedOrder.order_status}
                  onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value as OrderStatus)}
                  className="w-full bg-white border border-seoulea-blush-soft rounded-xl px-3 py-2 text-xs font-bold text-seoulea-cocoa"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[11px] text-seoulea-cocoa/70">Payment:</span>
                  <span className="font-bold text-seoulea-cocoa uppercase">{selectedOrder.payment_status}</span>
                </div>
              </div>
            </div>

            {/* Purchased Items List */}
            <div>
              <h3 className="font-editorial text-sm font-bold text-seoulea-cocoa mb-2">
                Order Items
              </h3>
              <div className="border border-seoulea-blush-soft rounded-2xl divide-y divide-seoulea-blush-soft/60 overflow-hidden text-xs">
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item) => (
                    <div key={item.id} className="p-3 flex justify-between items-center">
                      <div>
                        <strong className="text-seoulea-cocoa">{item.product_title}</strong>
                        <p className="text-[11px] text-seoulea-cocoa/60">
                          Variant: {item.variant_title} (SKU: {item.sku}) • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-seoulea-cocoa">{formatBDT(item.total_price)}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-seoulea-cocoa/60">No item details available.</div>
                )}
              </div>
            </div>

            {/* Footer Summary & Print Slip */}
            <div className="flex items-center justify-between pt-4 border-t border-seoulea-blush-soft text-xs">
              <div>
                <span className="text-seoulea-cocoa/60 block">Total Amount:</span>
                <span className="text-lg font-bold text-seoulea-berry">
                  {formatBDT(selectedOrder.total)}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-seoulea-ivory border border-seoulea-blush text-seoulea-cocoa font-bold rounded-xl flex items-center gap-1.5 hover:bg-seoulea-blush-light"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
