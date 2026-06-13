import { CartItem, CheckoutDetails } from '../types';

export const WHATSAPP_PHONE_NUMBER = '2349069996290'; 

const formatNaira = (value: number) => {
  return 'NGN ' + value.toLocaleString('en-NG');
};

export function generateOrderMessage(
  items: CartItem[],
  checkout: CheckoutDetails,
  subtotal: number,
  deliveryFee: number,
  total: number
): string {
  let message = `Hello Spyce Crafts ✨,\n\nI would like to place an order from your premium website:\n\n`;

  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `👤 CUSTOMER INFORMATION\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `• Name: ${checkout.fullName}\n`;
  message += `• Phone: ${checkout.phone}\n`;
  message += `• Email: ${checkout.email}\n`;
  message += `• Address: ${checkout.address}, ${checkout.city}, ${checkout.state}, ${checkout.country}\n\n`;

  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🛍️ ITEMS ORDERED\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

  items.forEach((item, index) => {
    const unitPrice = item.product.salePrice ?? item.product.price;
    const itemTotal = unitPrice * item.quantity;
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   • Qty: ${item.quantity}\n`;
    message += `   • Size: ${item.selectedSize}\n`;
    message += `   • Color/Finish: ${item.selectedColor}\n`;

    if (item.customization) {
      message += `   • [Customization Applied]:\n`;
      if (item.customization.artworkStyle) {
        message += `     - Style: ${item.customization.artworkStyle}\n`;
      }
      if (item.customization.customText) {
        message += `     - Text: "${item.customization.customText}"\n`;
      }
      if (item.customization.notes) {
        message += `     - Notes: ${item.customization.notes}\n`;
      }
      if (item.customization.referenceImage) {
        message += `     - Ref: [Custom attachment uploaded]\n`;
      }
    }
    message += `   • Price: ${formatNaira(unitPrice)} (Total: ${formatNaira(itemTotal)})\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💳 ORDER SUMMARY\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Subtotal: ${formatNaira(subtotal)}\n`;
  message += `Delivery Fee: ${deliveryFee === 0 ? 'FREE' : formatNaira(deliveryFee)}\n`;
  message += `*Grand Total: ${formatNaira(total)}*\n\n`;

  if (checkout.notes) {
    message += `📝 ADDITIONAL NOTES:\n`;
    message += `"${checkout.notes}"\n\n`;
  }

  message += `Thank you! I will await your manual invoice confirmation. 🙏✨`;
  return message;
}

export function encodeWhatsAppMessage(text: string): string {
  return encodeURIComponent(text);
}

export function openWhatsAppCheckout(
  items: CartItem[],
  checkout: CheckoutDetails,
  subtotal: number,
  deliveryFee: number,
  total: number
): void {
  const textMessage = generateOrderMessage(items, checkout, subtotal, deliveryFee, total);
  const encodedText = encodeWhatsAppMessage(textMessage);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`;
  window.open(whatsappUrl, '_blank');
}
