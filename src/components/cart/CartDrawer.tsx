import React from 'react';
import { useCartStore } from '../../store/useCartStore';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function CartDrawer() {
 const {
 items,
 isCartOpen,
 setCartOpen,
 removeItem,
 updateQuantity,
 navigateTo,
 getCartSubtotal,
 getDeliveryFee,
 getCartTotal
 } = useCartStore();

 if (!isCartOpen) return null;

 const subtotal = getCartSubtotal();
 const deliveryFee = getDeliveryFee();
 const total = getCartTotal();

 const formatNaira = (val: number) => {
 return 'NGN ' + val.toLocaleString('en-NG');
 };

 return (
 <div id="cart-drawer-overlay" className="fixed inset-0 z-50 bg-stone-900/40 flex justify-end">
 {/* Background click to close */}
 <div className="absolute inset-0 cursor-pointer" onClick={() => setCartOpen(false)} />

 {/* Drawer Body container */}
 <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slideLeft border-l border-stone-100 text-stone-100">

 {/* Drawer Header info */}
 <div className="p-6 border-b border-stone-100 flex items-center justify-between">
 <div className="flex items-center gap-2">
 <ShoppingBag className="w-5 h-5 text-brand-primary" />
 <h2 className="font-serif text-lg font-bold text-brand-dark">Your Custom Cart</h2>
 <span className="w-5.5 h-5.5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
 {items.reduce((acc, item) => acc + item.quantity, 0)}
 </span>
 </div>
 <button
 id="close-cart-btn"
 onClick={() => setCartOpen(false)}
 className="p-1.5 rounded-full hover:bg-stone-50 text-stone-400 hover:text-brand-dark transition-colors"
 aria-label="Close Cart Drawer"
 >
 <X className="w-5.5 h-5.5" />
 </button>
 </div>

 {/* Selected Items scrollable list */}
 <div className="flex-1 overflow-y-auto p-6 space-y-6">
 {items.length > 0 ? (
 items.map((item) => {
 const unitPrice = item.product.salePrice ?? item.product.price;
 const totalCost = unitPrice * item.quantity;
 return (
 <div id={`cart-item-${item.id}`} key={item.id} className="flex gap-4 pb-6 border-b border-stone-100">

 {/* Photo area */}
 <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-50 shrink-0 border border-stone-100">
 <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
 </div>

 {/* Descriptions specifications detail */}
 <div className="flex-1 space-y-1">
 <h4 className="text-sm font-serif font-bold text-brand-dark leading-tight line-clamp-1">
 {item.product.name}
 </h4>
 <div className="text-[11px] text-stone-400 space-y-0.5">
 <p>Sizing preset: <span className="font-semibold text-stone-700">{item.selectedSize}</span></p>
 <p>Frame polish: <span className="font-semibold text-stone-700">{item.selectedColor}</span></p>
 {item.customization && (
 <div className="bg-stone-50 p-1.5 rounded mt-1.5 font-sans border border-stone-100">
 {item.customization.customText && (
 <p className="truncate italic">Text: "{item.customization.customText}"</p>
 )}
 {item.customization.referenceImage && (
 <p className="text-[9px] text-brand-primary">Ref: {item.customization.referenceImage}</p>
 )}
 </div>
 )}
 </div>

 {/* Steppers & Removers row */}
 <div className="flex items-center justify-between pt-2">
 <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50 text-xs">
 <button
 id={`dec-qty-${item.id}`}
 onClick={() => updateQuantity(item.id, item.quantity - 1)}
 className="px-2 py-1 hover:bg-stone-200 text-stone-500"
 >
 <Minus className="w-3 h-3" />
 </button>
 <span className="px-3 font-semibold font-mono text-stone-100">{item.quantity}</span>
 <button
 id={`inc-qty-${item.id}`}
 onClick={() => updateQuantity(item.id, item.quantity + 1)}
 className="px-2 py-1 hover:bg-stone-200 text-stone-500"
 >
 <Plus className="w-3 h-3" />
 </button>
 </div>

 <div className="flex items-center gap-3">
 <span className="text-sm font-mono font-bold text-stone-100">{formatNaira(totalCost)}</span>
 <button
 id={`remove-item-${item.id}`}
 onClick={() => removeItem(item.id)}
 className="text-stone-300 hover:text-red-500 transition-colors p-1"
 aria-label="Remove item"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </div>

 </div>
 </div>
 );
 })
 ) : (
 // Empty view
 <div id="cart-drawer-empty" className="text-center py-20 space-y-4">
 <div className="w-16 h-16 rounded-full bg-brand-secondary/40 flex items-center justify-center text-brand-primary mx-auto">
 <ShoppingBag className="w-6 h-6" />
 </div>
 <p className="text-stone-400 text-sm font-sans">Your shopping bag is completely empty.</p>
 <button
 id="cart-drawer-resume"
 onClick={() => {
 navigateTo('shop');
 setCartOpen(false);
 }}
 className="px-6 py-2 bg-brand-dark hover:bg-brand-primary text-white text-xs font-semibold uppercase rounded-lg transition-colors cursor-pointer"
 >
 Browse Artisan Catalog
 </button>
 </div>
 )}
 </div>

 {/* Dynamic Pricing Totals & Checkouts */}
 {items.length > 0 && (
 <div id="cart-drawer-totals" className="p-6 bg-brand-muted border-t border-brand-secondary/60 space-y-4 text-xs font-sans">
 <div className="space-y-2">
 <div className="flex justify-between text-stone-300">
 <span>Cart Subtotal</span>
 <span className="font-mono text-stone-100">{formatNaira(subtotal)}</span>
 </div>
 <div className="flex justify-between text-stone-300">
 <span>Shipping Location Fee</span>
 <span className="font-mono text-stone-100">{deliveryFee === 0 ? 'FREE (above NGN 100k)' : formatNaira(deliveryFee)}</span>
 </div>
 <div className="border-t border-dashed border-stone-200 pt-2 flex justify-between text-sm font-bold">
 <span className="font-serif text-brand-dark">Total Order Bill</span>
 <span className="font-mono text-brand-primary text-base">{formatNaira(total)}</span>
 </div>
 </div>

 {/* Terms reminder */}
 <div className="flex items-start gap-1.5 text-[10px] text-stone-400">
 <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
 <span>Orders are handcraft processed upon invoice authorization over WhatsApp chat. Clean records!</span>
 </div>

 {/* Check to Proceed buttons */}
 <button
 id="cart-drawer-checkout-btn"
 onClick={() => {
 navigateTo('checkout');
 setCartOpen(false);
 }}
 className="w-full py-3.5 rounded-xl bg-brand-dark hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
 >
 <span>Proceed to WhatsApp Details</span>
 <ArrowRight className="w-4 h-4" />
 </button>
 </div>
 )}

 </div>
 </div>
 );
}
