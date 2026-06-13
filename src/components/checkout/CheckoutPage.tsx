import React, { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { openWhatsAppCheckout } from '../../lib/whatsapp';
import { ShoppingBag, ArrowLeft, Send, MessageSquare, CheckCircle, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
    const {
        items,
        navigateTo,
        getCartSubtotal,
        getDeliveryFee,
        getCartTotal,
        clearCart
    } = useCartStore();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('Lagos');
    const [country, setCountry] = useState('Nigeria');
    const [checkoutNotes, setCheckoutNotes] = useState('');

    const [isRedirected, setIsRedirected] = useState(false);

    const subtotal = getCartSubtotal();
    const deliveryFee = getDeliveryFee();
    const total = getCartTotal();

    const formatNaira = (val: number) => {
        return 'NGN ' + val.toLocaleString('en-NG');
    };

    const handleCheckoutSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullName || !phone || !address || !city) {
            alert('Please fill in the required fields to map your delivery info!');
            return;
        }

        const checkoutData = {
            fullName,
            phone,
            email: email || 'No email provided',
            address,
            city,
            state,
            country,
            notes: checkoutNotes,
        };

        // Trigger WhatsApp Redirection
        openWhatsAppCheckout(items, checkoutData, subtotal, deliveryFee, total);
        setIsRedirected(true);
    };

    const handleCompleteFreshStart = () => {
        clearCart();
        navigateTo('home');
    };

    if (items.length === 0 && !isRedirected) {
        return (
            <div id="checkout-empty-fallback" className="max-w-md mx-auto text-center py-20 px-4 text-stone-800 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-secondary/40 flex items-center justify-center text-brand-primary mx-auto">
                    <ShoppingBag className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-xl font-bold">Your Checkout Bag is empty</h2>
                <p className="text-stone-400 text-xs font-sans">You haven't added any customized masterpieces yet!</p>
                <button
                    id="checkout-fallback-shop-btn"
                    onClick={() => navigateTo('shop')}
                    className="px-6 py-2.5 bg-brand-dark hover:bg-brand-primary text-white text-xs font-semibold uppercase rounded-xl transition-colors cursor-pointer"
                >
                    Explore Collection
                </button>
            </div>
        );
    }

    return (
        <main id="checkout-layout-page" className="py-12 bg-white min-h-screen text-stone-100">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Navigation Head */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        id="checkout-back-to-shop-btn"
                        onClick={() => navigateTo('shop')}
                        className="inline-flex items-center gap-1.5 text-stone-500 hover:text-brand-primary text-sm font-semibold font-sans uppercase transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Continue Shopping</span>
                    </button>
                    <span className="text-xs text-stone-500 font-sans">Checkout Step &gt; Invoice Generation</span>
                </div>

                {isRedirected ? (
                    // Success Redirect Panel
                    <div id="checkout-success-panel" className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-emerald-50/50 border border-emerald-500/10 text-center space-y-6 animate-fadeIn shadow-2xl">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 mx-auto">
                            <CheckCircle className="w-8 h-8 text-emerald-600 " />
                        </div>

                        <div className="space-y-2">
                            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">Order Form Dispatched!</h1>
                            <p className="text-sm text-stone-600 font-sans leading-relaxed">
                                We have generated a fully encoded summary of your beautiful custom items and opened standard WhatsApp on your browser.
                            </p>
                        </div>

                        {/* In-app instructions block */}
                        <div className="p-6 rounded-2xl bg-white border border-emerald-100 text-left space-y-3 font-sans text-xs text-stone-600 leading-relaxed shadow-inner">
                            <h4 className="font-serif text-sm font-bold text-stone-900">What Happens Next?</h4>
                            <ol className="list-decimal pl-4 space-y-2 text-stone-500">
                                <li><strong className="text-stone-700">Send message:</strong> Simply click "Send" inside the WhatsApp chat that just opened on your device.</li>
                                <li><strong className="text-stone-700">Atelier Verification:</strong> Our lead designer will review your attached notes, file uploads, and frame sizes.</li>
                                <li><strong className="text-stone-700">Pro-Forma Invoice:</strong> We will reply to your chat with a pro-forma invoice and bank deposit accounts to finalize the slow-craft production.</li>
                            </ol>
                        </div>

                        <div className="pt-4 border-t border-emerald-500/10 space-y-3">
                            <button
                                id="checkout-retry-whatsapp-btn"
                                onClick={handleCheckoutSubmit}
                                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                            >
                                <MessageSquare className="w-4.5 h-4.5" />
                                <span>Re-Open WhatsApp Link</span>
                            </button>

                            <button
                                id="checkout-clear-fresh"
                                onClick={handleCompleteFreshStart}
                                className="text-xs text-stone-400 hover:text-stone-600 font-semibold uppercase underline"
                            >
                                Clear Cart and return Home
                            </button>
                        </div>
                    </div>
                ) : (
                    // Main Form Checkout Details & Summary splits
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Left Form: Delivery fields */}
                        <form id="delivery-info-form" onSubmit={handleCheckoutSubmit} className="lg:col-span-7 space-y-6">

                            <div>
                                <h2 className="font-serif text-2xl font-bold text-brand-dark mb-1">Shipping Details</h2>
                                <p className="text-xs text-stone-500 font-sans">Payment is processed securely upon production invoice. We deliver nationwide.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div className="space-y-1.5">
                                    <label className="text-xs uppercase text-stone-600 font-sans font-bold tracking-wider block">Full Name *</label>
                                    <input
                                        id="checkout-fullname-input"
                                        type="text"
                                        required
                                        placeholder="e.g. John Doe"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-sm font-sans text-stone-800"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs uppercase text-stone-600 font-sans font-bold tracking-wider block">WhatsApp Number *</label>
                                    <input
                                        id="checkout-phone-input"
                                        type="tel"
                                        required
                                        placeholder="e.g. +234 81 2345 6789"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-sm font-sans text-stone-800"
                                    />
                                </div>

                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-xs uppercase text-stone-600 font-sans font-bold tracking-wider block">Email Address (Optional)</label>
                                    <input
                                        id="checkout-email-input"
                                        type="email"
                                        placeholder="e.g. name@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-sm font-sans text-stone-800"
                                    />
                                </div>

                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-xs uppercase text-stone-600 font-sans font-bold tracking-wider block">Full Destination Address *</label>
                                    <input
                                        id="checkout-address-input"
                                        type="text"
                                        required
                                        placeholder="Street, Plot number, Estate area details..."
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-sm font-sans text-stone-800"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs uppercase text-stone-600 font-sans font-bold tracking-wider block">City *</label>
                                    <input
                                        id="checkout-city-input"
                                        type="text"
                                        required
                                        placeholder="e.g. Lagos Island, Ikeja, Garki, Wuse"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-sm font-sans text-stone-800"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs uppercase text-stone-600 font-sans font-bold tracking-wider block">State *</label>
                                    <input
                                        id="checkout-state-input"
                                        type="text"
                                        required
                                        placeholder="e.g. Lagos, Abuja, Enugu, Rivers"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-sm font-sans text-stone-800"
                                    />
                                </div>

                                <div className="space-y-1.5 sm:col-span-2">
                                    <label className="text-xs uppercase text-stone-600 font-sans font-bold tracking-wider block">Specific Delivery Instructions</label>
                                    <textarea
                                        id="checkout-notes-textarea"
                                        rows={3}
                                        placeholder="e.g. Deliver before Friday afternoon. Please keep background text alignment centered..."
                                        value={checkoutNotes}
                                        onChange={(e) => setCheckoutNotes(e.target.value)}
                                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-sm font-sans text-stone-800"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    id="checkout-submit-btn"
                                    type="submit"
                                    className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer active:scale-95"
                                >
                                    <MessageSquare className="w-4.5 h-4.5" />
                                    <span>Confirm Order &amp; Open WhatsApp</span>
                                </button>
                                <p className="text-center text-[10px] text-stone-500 font-sans mt-2">
                                    This will open <strong className="text-emerald-400">WhatsApp</strong> with your order pre-filled � just tap <strong>Send</strong>.
                                </p>
                            </div>

                        </form>

                        {/* Right Form: Checkout Order Summary cards */}
                        <div id="checkout-order-summary" className="lg:col-span-5 space-y-6">
                            <div className="bg-stone-50 border border-stone-100 rounded-3xl p-6 space-y-6">
                                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-3">
                                    <ShoppingBag className="w-5 h-5 text-brand-primary" />
                                    Detailed Cart Review
                                </h3>

                                {/* Small items rows */}
                                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                                    {items.map((item) => (
                                        <div id={`checkout-summary-row-${item.id}`} key={item.id} className="flex gap-3 text-xs">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-stone-200 shrink-0">
                                                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="font-bold text-stone-800 line-clamp-1">{item.product.name}</span>
                                                <p className="text-[10px] text-stone-400 truncate">Size: {item.selectedSize} | Polish: {item.selectedColor}</p>
                                                <p className="text-[11px] font-semibold text-brand-primary mt-0.5">Qty: {item.quantity} x {formatNaira(item.product.salePrice ?? item.product.price)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Subtotals & Delivery multipliers */}
                                <div className="border-t border-stone-200 pt-4 space-y-2 text-xs">
                                    <div className="flex justify-between text-stone-600">
                                        <span>Subtotal Sum</span>
                                        <span className="font-mono text-stone-700">{formatNaira(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-stone-600">
                                        <span>Regional Deliveries (Naira flat-rate)</span>
                                        <span className="font-mono text-stone-700">{deliveryFee === 0 ? 'FREE' : formatNaira(deliveryFee)}</span>
                                    </div>
                                    <div className="border-t border-dashed border-stone-200 pt-3 flex justify-between text-sm font-bold text-stone-900">
                                        <span className="font-serif text-brand-dark">Grand Invoice Total</span>
                                        <span className="font-mono text-brand-primary text-base">{formatNaira(total)}</span>
                                    </div>
                                </div>

                                {/* Double seal of secure checkouts */}
                                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-500/5 text-[10px] text-stone-500 leading-relaxed font-sans space-y-1.5">
                                    <p className="font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                        Double Check security guarantee
                                    </p>
                                    <p>All items undergo thorough curing inspections. We arrange direct bank deposits and cash on delivery routes inside Nigeria for maximum transparency and client peace of mind.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </main>
    );
}
