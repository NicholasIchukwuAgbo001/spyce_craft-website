import React, { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck, Ticket, RotateCcw, AlertCircle } from 'lucide-react';

export default function CartPage() {
 const {
 items,
 updateQuantity,
 removeItem,
 getCartSubtotal,
 getDeliveryFee,
 getCartTotal,
 navigateTo
 } = useCartStore();

 const [couponCode, setCouponCode] = useState('');
 const [discountAmount, setDiscountAmount] = useState(0);
 const [couponError, setCouponError] = useState('');
 const [couponSuccess, setCouponSuccess] = useState('');

 const formatNaira = (val: number) => {
 return 'NGN ' + val.toLocaleString('en-NG');
 };

 const applyCoupon = (e: React.FormEvent) => {
 e.preventDefault();
 setCouponError('');
 setCouponSuccess('');
 const code = couponCode.trim().toUpperCase();

 if (!code) return;

 if (code === 'SPYCE10') {
 const discount = Math.round(getCartSubtotal() * 0.1);
 setDiscountAmount(discount);
 setCouponSuccess('Success! 10% discount applied to your custom order.');
 } else if (code === 'WELCOME5') {
 const discount = Math.round(getCartSubtotal() * 0.05);
 setDiscountAmount(discount);
 setCouponSuccess('Success! 5% introductory discount applied.');
 } else if (code === 'ARTISANFREE') {
 setCouponSuccess('Valid coupon! Free shipping will be guaranteed on this invoice.');
 } else {
 setCouponError('Invalid voucher code. Try "SPYCE10" or "WELCOME5"!');
 }
 };

 const subtotal = getCartSubtotal();
 const delivery = getDeliveryFee();
 const total = getCartTotal() - discountAmount;

 // Calculate free shipping progress bar up to NGN 100,000 Naira
 const freeShippingThreshold = 100000;
 const shippingPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);
 const toFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

 return (
 <main id="cart-page-layout-container" className="py-16 bg-white min-h-screen">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 {/* Back navigation */}
 <div className="flex items-center justify-between mb-8">
 <button
 id="cart-page-back-btn"
 onClick={() => navigateTo('shop')}
 className="inline-flex items-center gap-1.5 text-stone-500 hover:text-brand-primary text-xs font-semibold uppercase tracking-wider transition-colors font-sans"
 >
 <ArrowLeft className="w-4 h-4" />
 <span>Continue Shopping</span>
 </button>
 <span className="text-xs text-stone-400 font-sans tracking-tight">Atelier Home &gt; Shopping Cart</span>
 </div>

 <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark mb-12 text-center">
 Shopping <span className="font-normal italic text-brand-primary">Cart</span>
 </h1>

 {items.length > 0 ? (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

 {/* Left Items Column */}
 <div className="lg:col-span-8 space-y-6">

 {/* Free shipping banner */}
 <div className="p-5 rounded-2xl bg-brand-secondary/20 border border-brand-secondary/40 space-y-3">
 <div className="flex items-center justify-between text-xs sm:text-sm">
 {toFreeShipping > 0 ? (
 <p className="font-sans text-stone-700">
 Add <strong className="font-mono text-brand-primary">{formatNaira(toFreeShipping)}</strong> more to unlock <span className="font-semibold text-emerald-600">FREE Dispatch Delivery</span> across Nigeria!
 </p>
 ) : (
 <p className="font-semibold text-emerald-600 flex items-center gap-1.5 font-sans">
 🎉 Amazing! Your order qualifies for free secure nationwide dispatch delivery.
 </p>
 )}
 <span className="font-mono font-bold text-stone-500 text-xs">{Math.round(shippingPercent)}%</span>
 </div>
 <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
 <div className="bg-brand-primary h-full transition-all duration-300" style={{ width: `${shippingPercent}%` }} />
 </div>
 </div>

 {/* Items List */}
 <div id="cart-list" className="space-y-4">
 {items.map((item) => {
 const currentPrice = item.product.salePrice ?? item.product.price;
 return (
 <div
 id={`cart-row-item-${item.id}`}
 key={item.id}
 className="p-5 bg-white rounded-2xl border border-stone-100 shadow-sm flex flex-col sm:flex-row gap-5 items-center justify-between hover:shadow-md transition-shadow"
 >
 {/* Image Thumbnail */}
 <div className="flex items-center gap-4 w-full sm:w-auto">
 <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-50 border border-stone-200/50 shrink-0">
 <img
 src={item.product.images[0]}
 alt={item.product.name}
 className="w-full h-full object-cover"
 referrerPolicy="no-referrer"
 />
 </div>
 <div className="space-y-1">
 <span className="text-[9px] uppercase tracking-wider text-stone-400 font-sans block">
 {item.product.category}
 </span>
 <h3 className="font-serif text-sm font-bold text-brand-dark leading-tight line-clamp-1">
 {item.product.name}
 </h3>
 <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-stone-500 font-sans">
 <span>Size: <strong>{item.selectedSize}</strong></span>
 <span>•</span>
 <span>Finish: <strong>{item.selectedColor}</strong></span>
 </div>

 {item.customization && (
 <div className="mt-1 px-2.5 py-1 rounded bg-brand-secondary/30 text-[9px] text-brand-dark/95 border border-brand-secondary/50 font-sans max-w-sm">
 {item.customization.customText && (
 <p className="truncate">Text: <strong className="italic">"{item.customization.customText}"</strong></p>
 )}
 {item.customization.artworkStyle && (
 <p>Style: {item.customization.artworkStyle}</p>
 )}
 </div>
 )}
 </div>
 </div>

 {/* Right Hand Actions */}
 <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100">
 {/* Quantity adjust */}
 <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50 font-sans">
 <button
 id={`qty-decrease-btn-${item.id}`}
 onClick={() => updateQuantity(item.id, item.quantity - 1)}
 className="px-3 py-1.5 text-stone-400 hover:bg-stone-100 font-semibold text-sm"
 >
 -
 </button>
 <span className="px-3 py-1 font-semibold text-xs font-mono text-brand-dark">
 {item.quantity}
 </span>
 <button
 id={`qty-increase-btn-${item.id}`}
 onClick={() => updateQuantity(item.id, item.quantity + 1)}
 className="px-3 py-1.5 text-stone-400 hover:bg-stone-100 font-semibold text-sm"
 >
 +
 </button>
 </div>

 {/* Price Display */}
 <div className="text-right">
 <span className="block font-mono text-xs text-stone-400">Total Price</span>
 <span className="font-mono text-sm font-bold text-brand-dark">
 {formatNaira(currentPrice * item.quantity)}
 </span>
 </div>

 {/* Trash */}
 <button
 id={`cart-item-delete-btn-${item.id}`}
 onClick={() => removeItem(item.id)}
 className="p-2 text-stone-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>

 </div>
 );
 })}
 </div>
 </div>

 {/* Right Summary Column */}
 <div className="lg:col-span-4">
 <div className="bg-brand-muted p-6 sm:p-8 rounded-3xl border border-brand-secondary/40 space-y-6 lg:sticky lg:top-24">
 <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-dark border-b border-brand-secondary/60 pb-3">
 Summary Invoice
 </h3>

 {/* Voucher input form */}
 <form onSubmit={applyCoupon} className="space-y-2">
 <label className="text-[10px] uppercase text-stone-200 font-sans font-bold tracking-wider block">Promo Voucher Code</label>
 <div className="flex gap-2">
 <div className="relative grow">
 <input
 id="coupon-input"
 type="text"
 placeholder="e.g. SPYCE10"
 value={couponCode}
 onChange={(e) => setCouponCode(e.target.value)}
 className="w-full px-4 py-2 pl-9 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary placeholder:text-stone-400 text-xs font-sans text-stone-100"
 />
 <Ticket className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
 </div>
 <button
 id="apply-coupon-btn"
 type="submit"
 className="px-4 py-2 bg-brand-dark hover:bg-brand-primary text-white font-sans text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
 >
 Apply
 </button>
 </div>
 {couponError && <p className="text-[10px] text-red-500 font-sans flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {couponError}</p>}
 {couponSuccess && <p className="text-[10px] text-emerald-600 font-sans font-medium flex items-center gap-1">✨ {couponSuccess}</p>}
 </form>

 {/* Price Breakdowns */}
 <div className="space-y-3 font-sans text-xs border-t border-brand-secondary/60 pt-4">
 <div className="flex justify-between text-stone-700"><span>Atelier Subtotal</span>
 <span className="font-mono text-stone-700">{formatNaira(subtotal)}</span>
 </div>
 {discountAmount > 0 && (
 <div className="flex justify-between text-emerald-600 font-medium">
 <span>Voucher Discount</span>
 <span className="font-mono">-{formatNaira(discountAmount)}</span>
 </div>
 )}
 <div className="flex justify-between text-stone-700"><span>Nationwide Shipping</span>
 <span className="font-mono text-stone-700">{delivery === 0 ? 'FREE' : formatNaira(delivery)}</span>
 </div>
 <div className="flex justify-between text-base font-bold text-brand-dark border-t border-brand-secondary/40 pt-3">
 <span className="font-serif">Invoice Estimate</span>
 <span className="font-mono text-brand-primary">{formatNaira(total)}</span>
 </div>
 </div>

 {/* Checkout redirections */}
 <div className="space-y-3 pt-4">
 <button
 id="cart-page-checkout-btn"
 onClick={() => navigateTo('checkout')}
 className="w-full py-3.5 bg-brand-dark hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
 >
 <span>Secure Checkout Order</span>
 <ArrowRight className="w-4 h-4 text-brand-secondary" />
 </button>

 <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 font-sans text-center">
 <ShieldCheck className="w-4 h-4 text-stone-400" />
 <span>WhatsApp Order Integration Active</span>
 </div>
 </div>

 </div>
 </div>

 </div>
 ) : (
 <div id="cart-page-empty" className="text-center py-20 px-4 bg-brand-muted rounded-2xl border border-brand-secondary/40 space-y-6 max-w-xl mx-auto">
 <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-stone-300 mx-auto shadow-sm">
 <ShoppingBag className="w-8 h-8" />
 </div>
 <div className="space-y-2">
 <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">Your Cart is Empty</h2>
 <p className="text-xs sm:text-sm text-stone-500 max-w-xs mx-auto text-center leading-normal font-sans">
 Browse our collections of beautiful quote frames, custom-sketched stencils or hand-poured resins.
 </p>
 </div>
 <button
 id="cart-empty-explore"
 onClick={() => navigateTo('shop')}
 className="px-8 py-3 bg-brand-dark hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
 >
 Start Custom Shopping
 </button>
 </div>
 )}

 </div>
 </main>
 );
}
