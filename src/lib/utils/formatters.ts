/**
 * Formats a number to Bangladeshi Taka (BDT ৳) with commas.
 */
export function formatBDT(amount: number): string {
  if (isNaN(amount)) return '৳0';
  return `৳${Math.round(amount).toLocaleString('en-IN')}`;
}

/**
 * Validates a Bangladeshi mobile phone number (11 digits starting with 013-019).
 */
export function isValidBDPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\+]/g, '');
  // Matches 01XXXXXXXXX or 8801XXXXXXXXX
  const regex = /^(?:8801|01)[3-9]\d{8}$/;
  return regex.test(cleaned);
}

/**
 * Normalizes BD phone to standard 11-digit 01XXXXXXXXX format.
 */
export function normalizeBDPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-\+]/g, '');
  if (cleaned.startsWith('8801')) {
    return cleaned.slice(2);
  }
  return cleaned;
}

/**
 * Returns color classes for order status badges.
 */
export function getOrderStatusBadge(status: string): { label: string; bg: string; text: string } {
  switch (status) {
    case 'Pending':
      return { label: 'Pending', bg: 'bg-amber-100', text: 'text-amber-800' };
    case 'Confirmed':
      return { label: 'Confirmed', bg: 'bg-blue-100', text: 'text-blue-800' };
    case 'Processing':
      return { label: 'Processing', bg: 'bg-purple-100', text: 'text-purple-800' };
    case 'Packed':
      return { label: 'Packed', bg: 'bg-indigo-100', text: 'text-indigo-800' };
    case 'Shipped':
      return { label: 'Shipped', bg: 'bg-cyan-100', text: 'text-cyan-800' };
    case 'Delivered':
      return { label: 'Delivered', bg: 'bg-emerald-100', text: 'text-emerald-800' };
    case 'Cancelled':
      return { label: 'Cancelled', bg: 'bg-rose-100', text: 'text-rose-800' };
    case 'Return Requested':
      return { label: 'Return Requested', bg: 'bg-orange-100', text: 'text-orange-800' };
    case 'Returned':
      return { label: 'Returned', bg: 'bg-gray-100', text: 'text-gray-800' };
    default:
      return { label: status, bg: 'bg-gray-100', text: 'text-gray-800' };
  }
}

/**
 * Returns color classes for payment status badges.
 */
export function getPaymentStatusBadge(status: string): { label: string; bg: string; text: string } {
  switch (status) {
    case 'Paid':
      return { label: 'Paid', bg: 'bg-emerald-100', text: 'text-emerald-800' };
    case 'Pending Verification':
      return { label: 'Pending Verification', bg: 'bg-amber-100', text: 'text-amber-800' };
    case 'Unpaid':
      return { label: 'Unpaid', bg: 'bg-rose-100', text: 'text-rose-800' };
    case 'Failed':
      return { label: 'Failed', bg: 'bg-red-100', text: 'text-red-800' };
    case 'Refunded':
      return { label: 'Refunded', bg: 'bg-zinc-100', text: 'text-zinc-800' };
    default:
      return { label: status, bg: 'bg-gray-100', text: 'text-gray-800' };
  }
}
