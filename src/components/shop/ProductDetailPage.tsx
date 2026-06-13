import React, { useState, useMemo } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { PRODUCTS } from '../../data/products';
import { ShoppingBag, ArrowLeft, Star, Heart, Check, Plus, Minus, MessageSquare, ShieldAlert, Truck, Sparkles } from 'lucide-react';

export default function ProductDetailPage() {
 const { selectedProductSlug, navigateTo, addItem, setCartOpen } = useCartStore();

 // Find the active product
 const product = useMemo(() => {
 return PRODUCTS.find((p) => p.slug === selectedProductSlug) || PRODUCTS[0];
 }, [selectedProductSlug]);

 const [activeImageIdx, setActiveImageIdx] = useState(0);
 const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
 const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Original');
 const [quantity, setQuantity] = useState(1);
 const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');
 const [showToast, setShowToast] = useState(false);

 // Dynamic reviews data based on product rating
 const reviews = useMemo(() => {
 return [
 {
 id: 'r1',
 name: 'Chioma A.',
 rating: 5,
 date: '3 weeks ago',
 comment: `Absolutely obsessed with my purchase! The finishing is extremely pristine, and Spyce Crafts packaged it beautifully. It was also delivered safely without a single scratch to Enugu. Will definitely buy again!`,
 },
 {
 id: 'r2',
 name: 'Tunde O.',
 rating: 5,
 date: '1 month ago',
 comment: `We requested custom gold flakes in our resin coastal tray. The team was exceedingly helpful over WhatsApp and gave us photo drafts of our item before boxing and shipping. Incredible standard of customer service!`,
 },
 {
 id: 'r3',
 name: 'Amina I.',
 rating: 4.8,
 date: '2 months ago',
 comment: `Excellent frame size and stunning print saturation! Looks exactly like the aesthetic home inspiration ideas on my Pinterest wall. Delivery took 4 days. Highly recommended.`,
 },
 ];
 }, []);

 const relatedProducts = useMemo(() => {
 return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
 }, [product]);

 const formatNaira = (val: number) => {
 return 'NGN ' + val.toLocaleString('en-NG');
 };

 const handleAddToCart = () => {
 addItem(product, quantity, selectedSize, selectedColor);
 setShowToast(true);
 setTimeout(() => {
 setShowToast(false);
 }, 4000);
 };

 const handleBuyNowWhatsApp = () => {
 const itemTotal = (product.salePrice ?? product.price) * quantity;
 const itemsMessage = `Hello Spyce Crafts ✨,\n\nI want to place an order immediately for:\n1. *${product.name}*\n • Qty: ${quantity}\n • Size: ${selectedSize}\n • Color/Finish: ${selectedColor}\n • Total: ${formatNaira(itemTotal)}\n\nPlease provide invoice details so we can proceed with handcrafting!`;
 const whatsappUrl = `https://wa.me/2349069996290?text=${encodeURIComponent(itemsMessage)}`;
 window.open(whatsappUrl, '_blank');
 };

 return (
 <main id="product-detail-layout" className="py-12 bg-white min-h-screen">

 {/* Cart Added Flash Toast */}
 <div
 className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${showToast ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
 }`}
 >
 <div className="flex items-center gap-3 bg-stone-900 border border-brand-primary/30 text-white px-5 py-3.5 rounded-2xl shadow-2xl min-w-[300px] max-w-sm">
 <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-brand-primary/20">
 <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-[11px] font-bold text-brand-primary uppercase tracking-wider">Added to Cart ✓</p>
 <p className="text-xs text-stone-300 truncate font-sans">{product.name}</p>
 <p className="text-[10px] text-stone-500 font-sans">{selectedSize} · {selectedColor}</p>
 </div>
 <button
 id="view-cart-toast-btn"
 onClick={() => { navigateTo('cart'); setShowToast(false); }}
 className="shrink-0 px-3 py-1.5 bg-brand-primary hover:bg-white hover:text-stone-900 text-stone-950 text-[10px] font-bold uppercase rounded-lg transition-colors cursor-pointer"
 >
 View
 </button>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 {/* Back Link Row */}
 <div id="product-detail-backbar" className="flex items-center justify-between mb-8">
 <button
 id="back-to-shop-btn"
 onClick={() => navigateTo('shop')}
 className="inline-flex items-center gap-1.5 text-stone-500 hover:text-brand-primary text-sm font-semibold font-sans uppercase transition-colors"
 >
 <ArrowLeft className="w-4 h-4" />
 <span>Back to Collection</span>
 </button>
 <span className="text-xs text-stone-400 font-sans">Brand Home &gt; Shop &gt; {product.category}</span>
 </div>

 {/* Content Split Header */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

 {/* Left Column Image Slider with high-concept thumbnails */}
 <div id="product-detail-images" className="lg:col-span-6 space-y-4">
 <div className="aspect-square bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 relative group">
 <img
 src={product.images[activeImageIdx] || product.images[0]}
 alt={product.name}
 className="w-full h-full object-cover"
 referrerPolicy="no-referrer"
 />
 <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full cursor-pointer text-stone-600 hover:text-red-500 transition-transform">
 <Heart className="w-5 h-5" />
 </div>
 </div>

 {/* Thumbnails Row */}
 {product.images.length > 1 && (
 <div id="product-detail-thumbnails" className="flex items-center gap-3">
 {product.images.map((image, idx) => (
 <button
 id={`thumb-image-btn-${idx}`}
 key={idx}
 onClick={() => setActiveImageIdx(idx)}
 className={`w-20 h-20 rounded-xl overflow-hidden bg-stone-50 border transition-all ${activeImageIdx === idx ? 'border-brand-primary ring-2 ring-brand-primary/10' : 'border-stone-200 opacity-70 hover:opacity-100'
 }`}
 >
 <img src={image} alt={`thumbnail-${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
 </button>
 ))}
 </div>
 )}
 </div>

 {/* Right Column Product specs, customize, checkout anchors */}
 <div id="product-detail-specs" className="lg:col-span-6 space-y-6">

 {/* Metadata Title Panel */}
 <div className="space-y-2">
 <span className="text-xs tracking-widest uppercase text-brand-primary font-bold font-sans">
 {product.category}
 </span>
 <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
 {product.name}
 </h1>

 {/* Dynamic Rating feedback */}
 <div className="flex items-center gap-2 text-stone-500 text-xs font-sans">
 <div className="flex items-center gap-0.5 text-amber-500">
 {[1, 2, 3, 4, 5].map((s) => (
 <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />
 ))}
 </div>
 <span className="font-bold text-white">{product.rating}</span>
 <span>({product.reviewCount} client reviews)</span>
 </div>
 </div>

 {/* Price section */}
 <div className="p-4 bg-brand-muted rounded-xl border border-brand-secondary/40">
 {product.salePrice ? (
 <div className="space-y-1">
 <div className="flex items-baseline gap-2">
 <span className="font-mono text-2xl font-bold text-white">
 {formatNaira(product.salePrice)}
 </span>
 <span className="font-mono text-sm text-stone-400 line-through">
 {formatNaira(product.price)}
 </span>
 </div>
 <span className="text-[10px] uppercase text-red-500 font-bold block tracking-wider">
 Exclusive active promotion discount saved {formatNaira(product.price - product.salePrice)}!
 </span>
 </div>
 ) : (
 <span className="font-mono text-2xl font-bold text-stone-100">
 {formatNaira(product.price)}
 </span>
 )}
 </div>

 {/* General Short Description */}
 <p className="text-stone-300 text-sm leading-relaxed font-sans">
 {product.description}
 </p>

 {/* Config: SIZES Options selection */}
 {product.sizes.length > 0 && (
 <div className="space-y-2">
 <label className="text-xs uppercase text-stone-200 font-sans font-bold tracking-wider block">
 Select Dimension Sizing
 </label>
 <div className="flex flex-wrap gap-2">
 {product.sizes.map((sz) => (
 <button
 id={`size-btn-${sz.replace(/\s/g, '').toLowerCase()}`}
 key={sz}
 onClick={() => setSelectedSize(sz)}
 className={`px-4 py-2 border rounded-xl text-xs font-medium uppercase font-sans tracking-wide transition-colors ${selectedSize === sz
 ? 'bg-brand-dark border-brand-dark text-white shadow-sm'
 : 'bg-white border-stone-200 text-stone-700 hover:border-brand-primary'
 }`}
 >
 {sz}
 </button>
 ))}
 </div>
 </div>
 )}

 {/* Config: COLORS Options selection */}
 {product.colors.length > 0 && (
 <div className="space-y-2">
 <label className="text-xs uppercase text-stone-200 font-sans font-bold tracking-wider block">
 Select Frame Border / Finish
 </label>
 <div className="flex flex-wrap gap-2">
 {product.colors.map((cl) => (
 <button
 id={`color-btn-${cl.replace(/\s/g, '').toLowerCase()}`}
 key={cl}
 onClick={() => setSelectedColor(cl)}
 className={`px-4 py-2 border rounded-xl text-xs font-medium font-sans transition-colors flex items-center gap-1.5 ${selectedColor === cl
 ? 'bg-brand-secondary border-brand-primary text-brand-dark font-semibold'
 : 'bg-white border-stone-200 text-stone-700 hover:border-brand-primary'
 }`}
 >
 {selectedColor === cl && <Check className="w-3.5 h-3.5 text-brand-primary" />}
 <span>{cl}</span>
 </button>
 ))}
 </div>
 </div>
 )}

 {/* Quantity Selector + Add commands */}
 <div className="space-y-4 pt-4 border-t border-stone-100">
 <label className="text-xs uppercase text-stone-200 font-sans font-bold tracking-wider block">
 Order Quantity
 </label>

 <div className="flex flex-col sm:flex-row items-center gap-4">
 {/* Plus-Minus Grid widget */}
 <div id="quantity-stepper" className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden w-full sm:w-auto">
 <button
 id="qty-decrement-btn"
 onClick={() => setQuantity((q) => Math.max(1, q - 1))}
 className="p-3 hover:bg-stone-200 text-stone-600 transition-colors"
 >
 <Minus className="w-4 h-4" />
 </button>
 <span className="px-6 text-sm font-bold text-stone-900 font-mono">{quantity}</span>
 <button
 id="qty-increment-btn"
 onClick={() => setQuantity((q) => q + 1)}
 className="p-3 hover:bg-stone-200 text-stone-600 transition-colors"
 >
 <Plus className="w-4 h-4" />
 </button>
 </div>

 {/* Add to Cart Actions */}
 <button
 id="detail-add-to-cart-btn"
 onClick={handleAddToCart}
 className="w-full py-4 rounded-xl bg-brand-primary hover:bg-brand-dark text-stone-950 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 cursor-pointer active:scale-95 border border-brand-primary"
 >
 <ShoppingBag className="w-4 h-4" />
 <span>Add to Cart</span>
 </button>
 </div>

 {/* Direct Instant buy flow */}
 <button
 id="detail-whatsapp-buy-btn"
 onClick={handleBuyNowWhatsApp}
 className="w-full py-4 rounded-xl border border-emerald-300/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
 >
 <MessageSquare className="w-4 h-4 text-emerald-600" />
 <span>Buy Direct via WhatsApp Inquiry</span>
 </button>
 </div>

 {/* Quality & Security highlight notes */}
 <div id="security-notices" className="grid grid-cols-2 gap-4 text-[11px] text-stone-500 font-sans pt-4 border-t border-stone-100">
 <div className="flex items-start gap-2">
 <Truck className="w-4 h-4 text-brand-primary shrink-0" />
 <span>Double bubble wrapped shipping. Free on orders above NGN 100,000.</span>
 </div>
 <div className="flex items-start gap-2">
 <ShieldAlert className="w-4 h-4 text-brand-primary shrink-0" />
 <span>Handcrafted on order. Standard design curing &amp; framing takes 3-7 production days.</span>
 </div>
 </div>

 {/* Specifications Tab list */}
 <div id="specs-accordion" className="border border-stone-200 rounded-xl overflow-hidden mt-6">
 <div className="flex border-b border-stone-200 bg-stone-50 text-xs font-sans font-semibold uppercase">
 <button
 id="tab-details-btn"
 onClick={() => setActiveTab('details')}
 className={`flex-1 py-3 px-4 text-center transition-all ${activeTab === 'details' ? 'bg-white text-brand-primary border-b-2 border-brand-primary' : 'text-stone-500'}`}
 >
 Atelier Specs
 </button>
 <button
 id="tab-materials-btn"
 onClick={() => setActiveTab('materials')}
 className={`flex-1 py-3 px-4 text-center transition-all ${activeTab === 'materials' ? 'bg-white text-brand-primary border-b-2 border-brand-primary' : 'text-stone-500'}`}
 >
 Materials used
 </button>
 <button
 id="tab-shipping-btn"
 onClick={() => setActiveTab('shipping')}
 className={`flex-1 py-3 px-4 text-center transition-all ${activeTab === 'shipping' ? 'bg-white text-brand-primary border-b-2 border-brand-primary' : 'text-stone-500'}`}
 >
 Shipping &amp; Pay
 </button>
 </div>

 {/* Specs explanation sheets */}
 <div className="p-5 font-sans text-xs text-stone-600 leading-relaxed bg-white">
 {activeTab === 'details' && (
 <ul className="space-y-1.5 list-disc pl-4 text-stone-500">
 <li><strong className="text-stone-700">Artisan Brand:</strong> Spyce Crafts</li>
 <li><strong className="text-stone-700">Origin:</strong> Meticulously hand-pounded in Nigeria</li>
 <li><strong className="text-stone-700">Available styles:</strong> Pre-set designs, custom text engravings</li>
 <li><strong className="text-stone-700">Visual trend:</strong> Neutral warm Pinterest bedroom/office layouts</li>
 </ul>
 )}
 {activeTab === 'materials' && (
 <p>
 We never substitute with cheap industrial plastics. Our custom frames feature solid satin finish pine-wood borders or borderless crystal back-acrylic panels. For resin art, we utilize high-index non-toxic epoxy imports that are guaranteed not to yellow, bubble, or warp for decades under normal lighting setup.
 </p>
 )}
 {activeTab === 'shipping' && (
 <p>
 Since all masterpieces are hand-made on invoice, production takes 3-7 business days for optimal epoxy curing. Payment is verified upon secure delivery invoice or direct bank deposit. No credit card is required; everything is processed safely via secure WhatsApp chat consultations.
 </p>
 )}
 </div>
 </div>

 </div>
 </div>

 {/* Reviews Showcase section */}
 <div id="reviews-section" className="mt-16 pt-16 border-t border-stone-100">
 <div className="space-y-6 max-w-3xl">
 <h3 className="font-serif text-2xl font-bold text-white">
 Recent Client Reviews
 </h3>

 <div className="space-y-6">
 {reviews.map((rev) => (
 <div id={`review-card-${rev.id}`} key={rev.id} className="space-y-2 pb-6 border-b border-stone-100">
 <div className="flex items-center justify-between">
 <div>
 <span className="font-bold text-stone-800 font-sans block">{rev.name}</span>
 <div className="flex items-center gap-0.5 text-amber-500 mt-1">
 {[1, 2, 3, 4, 5].map((s) => (
 <Star key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
 ))}
 </div>
 </div>
 <span className="text-xs text-stone-400 font-sans">{rev.date}</span>
 </div>
 <p className="text-xs text-stone-300 leading-relaxed font-sans">{rev.comment}</p>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Related Products sections */}
 {relatedProducts.length > 0 && (
 <div id="related-products-section" className="mt-16 pt-16 border-t border-stone-100">
 <h2 className="font-serif text-2xl font-bold text-brand-dark mb-8">
 Other Related Masterpieces
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
 {relatedProducts.map((p) => {
 const price = p.salePrice ?? p.price;
 return (
 <div
 id={`related-card-${p.id}`}
 key={p.id}
 onClick={() => {
 navigateTo('product-detail', p.slug);
 setActiveImageIdx(0);
 }}
 className="group bg-white rounded-xl border border-stone-100 p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer space-y-3"
 >
 <div className="aspect-square rounded-lg overflow-hidden bg-stone-100">
 <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-300" referrerPolicy="no-referrer" />
 </div>
 <div className="space-y-1">
 <h4 className="font-serif text-sm font-bold text-stone-800 line-clamp-1 group-hover:text-brand-primary transition-colors">{p.name}</h4>
 <p className="font-mono text-xs text-brand-primary font-bold">{formatNaira(price)}</p>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 )}

 </div>
 </main>
 );
}
