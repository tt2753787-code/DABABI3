/**
 * WhatsApp utilities for DABABI3 Moroccan marketplace
 */

export function cleanMoroccanPhone(phone: string): string {
  // Remove non-digit characters
  let digits = phone.replace(/\D/g, '');

  // If starts with 00212
  if (digits.startsWith('00212')) {
    digits = digits.substring(2);
  }

  // If starts with 212
  if (digits.startsWith('212')) {
    return digits;
  }

  // If starts with 0 (e.g. 0661234567 or 07...)
  if (digits.startsWith('0') && digits.length === 10) {
    return '212' + digits.substring(1);
  }

  // If 9 digits starting with 6 or 7
  if ((digits.startsWith('6') || digits.startsWith('7')) && digits.length === 9) {
    return '212' + digits;
  }

  // Fallback
  return digits.length > 0 ? (digits.startsWith('212') ? digits : '212' + digits) : '212600000000';
}

export function formatDisplayPhone(phone: string): string {
  const clean = phone.replace(/[^\d+]/g, '');
  if (clean.startsWith('+212')) {
    const rest = clean.substring(4);
    if (rest.length >= 9) {
      return `+212 ${rest.substring(0, 3)}-${rest.substring(3)}`;
    }
    return clean;
  }
  if (clean.startsWith('0')) {
    return `+212 ${clean.substring(1, 4)}-${clean.substring(4)}`;
  }
  if (clean.length === 9 && (clean.startsWith('6') || clean.startsWith('7'))) {
    return `+212 ${clean.substring(0, 3)}-${clean.substring(3)}`;
  }
  return phone;
}

export function buildWhatsAppLink(phone: string, productName: string, price: number, supplierName?: string): string {
  const cleanPhone = cleanMoroccanPhone(phone);
  const message = `مرحباً، أرغب في طلب "${productName}" (الثمن: ${price} درهم)${supplierName ? ` من متجر ${supplierName}` : ''} عبر منصة DABABI3. هل المنتج متوفر وما هي طريقة التوصيل؟`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
