/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useCartStore } from '../../store/useCartStore';
import { Heart, ShoppingBag, Trash2, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export default function WishlistPage() {
 const { wishlist, toggleWishlist, moveToCart, navigateTo, addItem } = useCartStore();

 const formatNaira = (val: number) => {
 return 'NGN ' + val.toLocaleString('en-NG');
 };

 const handleMoveAllToCart = () => {
 if (wishlist.length === 0) return;
 wishlist.forEach((product) => {
 addItem(product, 1, product.sizes[0] || 'Standard', product.colors[0] || 'Original');
 });
 // Clear wishlist or keep items? Let's navigate to cart directly and keep them or clear them.
 // Usually moving all to cart means we want to clear or let users decide. Let's move them all and notify.
 alert('All wishlist items have been securely added to your cart with standard configurations! ✨');
 };

 return (
 <main id="wishlist-page-container" className="py-16 bg-white min-h-screen">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
 {/* Back navigation header */}
 <div className="flex items-center justify-between mb-8">
 <button
 id="wishlist-back-btn"
 onClick={() => navigateTo('shop')}
 className="inline-flex items-center gap-1.5 text-stone-500 hover:text-brand-primary text-xs font-semibold uppercase tracking-wider transition-colors font-sans"
 >
 <ArrowLeft className="w-4 h-4" />
 <span>Continue Shopping</span>
 </button>
 <span className="text-xs text-stone-400 font-sans tracking-tight">Atelier Home &gt; Wishlist</span>
 </div>

 {/* Head description */}
 <div className="text-center space-y-3 mb-12">
 <div className="w-12 h-12 rounded-full bg-brand-secondary/40 flex items-center justify-center text-brand-primary mx-auto">
 <Heart className="w-6 h-6 fill-brand-primary" />
 </div>
 <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark">
 My Artisan <span className="font-normal italic text-brand-primary">Wishlist</span>
 </h1>
 <p className="text-stone-500 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
 Your personal treasury of custom resin plates, quotes, plaques, and floral preservation blocks.
 </p>
 </div>

 {wishlist.length > 0 ? (
 <div className="space-y-8">
 {/* Top Bulk Action Bar */}
 <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100 gap-4">
 <span className="text-xs sm:text-sm text-stone-600 font-sans">
 You have <span className="font-bold text-brand-dark font-mono">{wishlist.length}</span> luxury pieces saved
 </span>
 <button
 id="wishlist-move-all-btn"
 onClick={handleMoveAllToCart}
 className="w-full sm:w-auto px-6 py-2.5 bg-brand-dark hover:bg-brand-primary text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
 >
 <ShoppingBag className="w-4 h-4 text-brand-secondary" />
 <span>Move All to Cart</span>
 </button>
 </div>

 {/* List Grid */}
 <div id="wishlist-items-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
 {wishlist.map((product) => {
 const currentPrice = product.salePrice ?? product.price;
 return (
 <div
 id={`wishlist-card-${product.id}`}
 key={product.id}
 className="group bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-full"
 >
 {/* Image Area with delete trigger */}
 <div className="relative aspect-square bg-stone-50 overflow-hidden">
 <img
 src={product.images[0]}
 alt={product.name}
 className="w-full h-full object-cover transition-transform duration-500"
 referrerPolicy="no-referrer"
 />
 <button
 id={`wishlist-remove-btn-${product.id}`}
 onClick={() => toggleWishlist(product)}
 className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 shadow-md flex items-center justify-center text-stone-500 hover:text-red-500 transition-colors cursor-pointer"
 title="Remove from wishlist"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 
 {product.salePrice && (
 <span className="absolute top-3.5 left-3.5 bg-red-500 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full z-10">
 Sale
 </span>
 )}
 </div>

 {/* Meta info */}
 <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
 <div className="space-y-1">
 <span className="text-[10px] uppercase text-stone-400 font-semibold font-sans block tracking-wider">
 {product.category}
 </span>
 <h3 
 className="font-serif text-base font-bold text-brand-dark hover:text-brand-primary cursor-pointer line-clamp-1 truncate"
 onClick={() => navigateTo('product-detail', product.slug)}
 >
 {product.name}
 </h3>
 <p className="text-[11px] text-stone-400 line-clamp-2 font-sans leading-normal">
 {product.description}
 </p>
 </div>

 <div className="space-y-3">
 {/* Price rendering */}
 <div className="flex items-baseline justify-between pt-2 border-t border-stone-50">
 <span className="text-xs text-stone-400 font-sans">Artisan Pricing</span>
 {product.salePrice ? (
 <div className="flex items-center gap-1.5">
 <span className="font-mono text-sm font-bold text-brand-primary">
 {formatNaira(product.salePrice)}
 </span>
 <span className="font-mono text-xs text-stone-400 line-through">
 {formatNaira(product.price)}
 </span>
 </div>
 ) : (
 <span className="font-mono text-sm font-bold text-stone-700">
 {formatNaira(product.price)}
 </span>
 )}
 </div>

 {/* Direct Select Options */}
 <button
 id={`wishlist-move-cart-btn-${product.id}`}
 onClick={() => moveToCart(product.id)}
 className="w-full py-2.5 rounded-xl border border-brand-primary/40 hover:bg-brand-primary text-brand-primary hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-brand-secondary/15"
 >
 <ShoppingBag className="w-3.5 h-3.5" />
 <span>Move to Cart</span>
 </button>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 ) : (
 <div id="wishlist-empty-layout" className="text-center py-20 px-4 bg-brand-muted rounded-2xl border border-brand-secondary/40 space-y-6">
 <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-stone-300 mx-auto shadow-sm">
 <Heart className="w-8 h-8" />
 </div>
 <div className="space-y-2">
 <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">Your Wishlist is Empty</h2>
 <p className="text-xs sm:text-sm text-stone-500 max-w-xs mx-auto">
 Explore our collections of quote frames, botanical wedding preserves and beautiful custom resins to add items.
 </p>
 </div>
 <button
 id="wishlist-empty-explore-btn"
 onClick={() => navigateTo('shop')}
 className="px-8 py-3 bg-brand-dark hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
 >
 Explore Collection
 </button>
 </div>
 )}
 </div>
 </main>
 );
}
