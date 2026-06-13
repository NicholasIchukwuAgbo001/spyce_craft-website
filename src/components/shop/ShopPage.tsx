import React, { useState, useMemo } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { PRODUCTS } from '../../data/products';
import { Search, SlidersHorizontal, Heart, ShieldCheck, Sparkles, Star, CheckCircle, Eye, ShoppingBag, X, HelpCircle } from 'lucide-react';
import { Product } from '../../types';

export default function ShopPage() {
 const { navigateTo, addItem, wishlist, toggleWishlist, setCartOpen } = useCartStore();

 const [searchTerm, setSearchTerm] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('All');
 const [sortOption, setSortOption] = useState('featured');

 const [minPrice, setMinPrice] = useState(0);
 const [maxPrice, setMaxPrice] = useState(100000);
 const [selectedColor, setSelectedColor] = useState('All');
 const [selectedMaterial, setSelectedMaterial] = useState('All');
 const [selectedSize, setSelectedSize] = useState('All');
 const [minRating, setMinRating] = useState(0);
 const [inStockOnly, setInStockOnly] = useState(false);
 const [customizableOnly, setCustomizableOnly] = useState(false);

 const [visibleCount, setVisibleCount] = useState(12);

 const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
 const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
 const [quickAddSize, setQuickAddSize] = useState('');
 const [quickAddColor, setQuickAddColor] = useState('');
 const [cartToastProduct, setCartToastProduct] = useState<Product | null>(null);

 // Dropdown list arrays
 const categories = useMemo(() => {
 const list = new Set(PRODUCTS.map((p) => p.category));
 return ['All', ...Array.from(list)];
 }, []);

 const colors = ['All', 'Classic Obsidian Black', 'Sleek Pure White', 'Natural Pine Wood', 'Champagne Luxury Gold', 'Ocean Blue', 'Frosted Clear', 'Emerald Wave'];
 const materials = ['All', 'Epoxy Resin', 'Acrylic Glass', 'Pine Wood', 'Brass fittings', 'Gold Leaf Foil'];
 const sizes = ['All', 'A5 (Compact)', 'A4 (Standard)', 'A3 (Premium Display)', 'A2 (Statement Art)', 'Hexagonal 6x6"'];

 // Filter and sort computation
 const filteredProducts = useMemo(() => {
 let result = [...PRODUCTS];

 // 1. Search term
 if (searchTerm.trim() !== '') {
 const term = searchTerm.toLowerCase();
 result = result.filter(
 (p) =>
 p.name.toLowerCase().includes(term) ||
 p.description.toLowerCase().includes(term) ||
 p.tags.some((t) => t.toLowerCase().includes(term))
 );
 }

 if (selectedCategory !== 'All') {
 result = result.filter((p) => p.category === selectedCategory);
 }

 result = result.filter((p) => {
 const actualPrice = p.salePrice ?? p.price;
 return actualPrice >= minPrice && actualPrice <= maxPrice;
 });

 if (selectedColor !== 'All') {
 result = result.filter((p) => p.colors.some((c) => c.toLowerCase().includes(selectedColor.toLowerCase())));
 }

 if (selectedMaterial !== 'All') {
 const mat = selectedMaterial.toLowerCase();
 result = result.filter(
 (p) =>
 p.description.toLowerCase().includes(mat) ||
 p.tags.some((t) => t.toLowerCase().includes(mat))
 );
 }

 // 6. Size options
 if (selectedSize !== 'All') {
 result = result.filter((p) => p.sizes.some((s) => s.toLowerCase().includes(selectedSize.toLowerCase())));
 }

 // 7. Ratings bracket
 if (minRating > 0) {
 result = result.filter((p) => p.rating >= minRating);
 }

 if (inStockOnly) {
 result = result.filter((p) => p.stock > 0);
 }
 if (customizableOnly) {
 result = result.filter((p) => p.customizable);
 }

 if (sortOption === 'price-low') {
 result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
 } else if (sortOption === 'price-high') {
 result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
 } else if (sortOption === 'rating') {
 result.sort((a, b) => b.rating - a.rating);
 } else if (sortOption === 'newest') {

 result.sort((a, b) => {
 const aNew = a.tags.includes('new') ? 1 : 0;
 const bNew = b.tags.includes('new') ? 1 : 0;
 return bNew - aNew;
 });
 } else if (sortOption === 'best-selling') {
 result.sort((a, b) => b.reviewCount - a.reviewCount);
 } else if (sortOption === 'popular') {
 result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
 }

 return result;
 }, [
 searchTerm,
 selectedCategory,
 sortOption,
 minPrice,
 maxPrice,
 selectedColor,
 selectedMaterial,
 selectedSize,
 minRating,
 inStockOnly,
 customizableOnly
 ]);

 const paginatedProducts = useMemo(() => {
 return filteredProducts.slice(0, visibleCount);
 }, [filteredProducts, visibleCount]);

 const handleLoadMore = () => {
 setVisibleCount((prev) => Math.min(prev + 12, filteredProducts.length));
 };

 const formatNaira = (val: number) => {
 return 'NGN ' + val.toLocaleString('en-NG');
 };

 // Determine dynamic visual badges based on tags
 const getBadgeType = (p: Product) => {
 if (p.tags.includes('limited-edition') || p.tags.includes('limited edition')) {
 return { text: 'Limited Edition', style: 'bg-indigo-600 text-white' };
 }
 if (p.salePrice) {
 return { text: 'Promo Offer', style: 'bg-red-500 text-white' };
 }
 if (p.tags.includes('new')) {
 return { text: 'New Design', style: 'bg-emerald-600 text-white' };
 }
 if (p.tags.includes('trending')) {
 return { text: 'Trending', style: 'bg-amber-500 text-brand-dark font-semibold' };
 }
 if (p.featured || p.tags.includes('best seller') || p.tags.includes('best-seller')) {
 return { text: 'Bestseller', style: 'bg-brand-primary text-white' };
 }
 return null;
 };

 const handleQuickViewOpen = (p: Product, e: React.MouseEvent) => {
 e.stopPropagation();
 setQuickViewProduct(p);
 setQuickAddSize(p.sizes[0] || 'Standard');
 setQuickAddColor(p.colors[0] || 'Original');
 };

 const handleQuickAddSubmit = () => {
 if (!quickViewProduct) return;
 addItem(quickViewProduct, 1, quickAddSize, quickAddColor);
 setQuickViewProduct(null);
 setCartToastProduct(quickViewProduct);
 setTimeout(() => setCartToastProduct(null), 3500);
 };

 const handleWhiskeyToggle = (p: Product, e: React.MouseEvent) => {
 e.stopPropagation();
 toggleWishlist(p);
 };

 const handleWhatsAppBuyNow = (p: Product, e: React.MouseEvent) => {
 e.stopPropagation();
 const currentPrice = p.salePrice ?? p.price;
 const body = `Hello Spyce Crafts âœ¨,\n\nI want to buy immediately:\nâ€¢ *${p.name}*\n Price: ${formatNaira(currentPrice)}\n Category: ${p.category}\n\nPlease help confirm customization options so we can proceed with transport dispatch across Nigeria!`;
 const url = `https://wa.me/2349069996290?text=${encodeURIComponent(body)}`;
 window.open(url, '_blank');
 };

 return (
 <main id="shop-catalog-page" className="py-12 bg-white min-h-screen">

 {/* â”€â”€ Cart Added Flash Toast â”€â”€ */}
 <div
 className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${cartToastProduct ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
 }`}
 >
 {cartToastProduct && (
 <div className="flex items-center gap-3 bg-stone-900 border border-brand-primary/30 text-white px-5 py-3.5 rounded-2xl shadow-2xl min-w-[280px] max-w-sm">
 <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-brand-primary/20">
 <img src={cartToastProduct.images[0]} alt={cartToastProduct.name} className="w-full h-full object-cover" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-[11px] font-bold text-brand-primary uppercase tracking-wider">Added to Cart âœ“</p>
 <p className="text-xs text-stone-300 truncate font-sans">{cartToastProduct.name}</p>
 </div>
 <button
 onClick={() => { navigateTo('cart'); setCartToastProduct(null); }}
 className="shrink-0 px-3 py-1.5 bg-brand-primary hover:bg-white hover:text-stone-900 text-stone-950 text-[10px] font-bold uppercase rounded-lg transition-colors cursor-pointer"
 >
 View
 </button>
 </div>
 )}
 </div>

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 {/* Page Title Header */}
 <div id="shop-header" className="text-center space-y-3 mb-12">
 <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-dark">
 Our Handcrafted <span className="text-brand-primary font-normal italic">Collections</span>
 </h1>
 <p className="font-sans text-stone-300 max-w-xl mx-auto text-xs sm:text-sm">
 Explore 100+ Pinterest-inspired quote blocks, bespoke family silhouettes, and anti-yellowing high-gloss coasters made with slow-run excellence.
 </p>
 </div>

 {/* Toolbar & Filter Controls Panel */}
 <div id="shop-toolbar" className="grid grid-cols-1 lg:grid-cols-4 gap-8">

 {/* Left Side Filters Sidebar Column */}
 <div id="shop-filters-sidebar" className="space-y-6 lg:col-span-1 bg-brand-muted p-5 sm:p-6 rounded-2xl border border-brand-secondary/40 lg:sticky lg:top-24 max-h-[85vh] overflow-y-auto">

 <div className="flex items-center justify-between border-b border-brand-secondary/60 pb-3">
 <span className="font-serif text-base font-bold text-brand-dark flex items-center gap-2">
 <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
 Refine Art
 </span>
 {(searchTerm || selectedCategory !== 'All' || selectedColor !== 'All' || selectedMaterial !== 'All' || selectedSize !== 'All' || minRating > 0 || inStockOnly || customizableOnly || minPrice > 0 || maxPrice < 100000) && (
 <button
 id="reset-filters-btn"
 onClick={() => {
 setSearchTerm('');
 setSelectedCategory('All');
 setMinPrice(0);
 setMaxPrice(100000);
 setSelectedColor('All');
 setSelectedMaterial('All');
 setSelectedSize('All');
 setMinRating(0);
 setInStockOnly(false);
 setCustomizableOnly(false);
 setSortOption('featured');
 }}
 className="text-[10px] text-brand-primary hover:underline font-semibold font-sans uppercase tracking-wider"
 >
 Clear All
 </button>
 )}
 </div>

 {/* Keyword Search */}
 <div className="space-y-1.5">
 <label className="text-[10px] uppercase text-stone-400 font-sans tracking-wide block font-bold">Search Catalog</label>
 <div className="relative">
 <input
 id="keyword-search-input"
 type="text"
 placeholder="Keep Going, tray, floral..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full px-3.5 py-2 pl-9 text-stone-800 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-xs font-sans"
 />
 <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
 </div>
 </div>

 {/* Category Filter */}
 <div className="space-y-1.5">
 <label className="text-[10px] uppercase text-stone-400 font-sans tracking-wide block font-bold">Medium Category</label>
 <select
 id="filter-category-select"
 value={selectedCategory}
 onChange={(e) => setSelectedCategory(e.target.value)}
 className="w-full bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs font-sans text-stone-700 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
 >
 {categories.map((cat) => (
 <option key={cat} value={cat}>{cat}</option>
 ))}
 </select>
 </div>

 {/* Price Filter range */}
 <div className="space-y-2 pt-2 border-t border-brand-secondary/40">
 <div className="flex items-center justify-between">
 <label className="text-[10px] uppercase text-stone-400 font-sans tracking-wide block font-bold">Max Budget</label>
 <span className="text-xs font-bold font-mono text-brand-primary">{formatNaira(maxPrice)}</span>
 </div>
 <input
 id="price-range-slider"
 type="range"
 min="10000"
 max="100000"
 step="5000"
 value={maxPrice}
 onChange={(e) => setMaxPrice(parseInt(e.target.value))}
 className="w-full accent-brand-primary cursor-pointer"
 />
 <div className="flex justify-between text-[10px] text-stone-400 font-mono">
 <span>NGN 10,000</span>
 <span>NGN 100,000</span>
 </div>
 </div>

 {/* Color Filter */}
 <div className="space-y-1.5 pt-2 border-t border-brand-secondary/40">
 <label className="text-[10px] uppercase text-stone-400 font-sans tracking-wide block font-bold">Frame/Resin Colors</label>
 <select
 id="filter-color-select"
 value={selectedColor}
 onChange={(e) => setSelectedColor(e.target.value)}
 className="w-full bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs font-sans text-stone-700 focus:outline-none focus:border-brand-primary text-stone-100">
 {colors.map((c) => (
 <option key={c} value={c}>{c}</option>
 ))}
 </select>
 </div>

 {/* Material Filter */}
 <div className="space-y-1.5 pt-2 border-t border-brand-secondary/40">
 <label className="text-[10px] uppercase text-stone-400 font-sans tracking-wide block font-bold">Atelier Core Material</label>
 <select
 id="filter-material-select"
 value={selectedMaterial}
 onChange={(e) => setSelectedMaterial(e.target.value)}
 className="w-full bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs font-sans text-stone-700 focus:outline-none focus:border-brand-primary text-stone-100">
 {materials.map((m) => (
 <option key={m} value={m}>{m}</option>
 ))}
 </select>
 </div>

 {/* Size Filter */}
 <div className="space-y-1.5 pt-2 border-t border-brand-secondary/40">
 <label className="text-[10px] uppercase text-stone-400 font-sans tracking-wide block font-bold">Desired Dimensions</label>
 <select
 id="filter-size-select"
 value={selectedSize}
 onChange={(e) => setSelectedSize(e.target.value)}
 className="w-full bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs font-sans text-stone-700 focus:outline-none focus:border-brand-primary text-stone-100">
 {sizes.map((s) => (
 <option key={s} value={s}>{s}</option>
 ))}
 </select>
 </div>

 {/* Minimum Rating */}
 <div className="space-y-1.5 pt-2 border-t border-brand-secondary/40">
 <label className="text-[10px] uppercase text-stone-400 font-sans tracking-wide block font-bold">Minimum Rating</label>
 <div className="flex items-center gap-1.5 font-sans">
 {[0, 4.0, 4.5, 4.8].map((score) => (
 <button
 key={score}
 type="button"
 onClick={() => setMinRating(score)}
 className={`px-2 py-1 rounded text-[10px] font-semibold border transition-all ${minRating === score
 ? 'bg-brand-primary text-white border-brand-primary'
 : 'bg-white text-stone-500 border-stone-200 hover:border-brand-primary'
 }`}
 >
 {score === 0 ? 'All' : `${score}â­`}
 </button>
 ))}
 </div>
 </div>

 {/* Toggles (Stock & Customization) */}
 <div className="space-y-2 pt-2 border-t border-brand-secondary/40 font-sans text-xs">
 <label className="flex items-center gap-2 cursor-pointer select-none text-stone-700 font-medium">
 <input
 type="checkbox"
 checked={inStockOnly}
 onChange={(e) => setInStockOnly(e.target.checked)}
 className="w-4 h-4 accent-brand-primary rounded"
 />
 <span>In Stock Only</span>
 </label>

 <label className="flex items-center gap-2 cursor-pointer select-none text-stone-700 font-medium">
 <input
 type="checkbox"
 checked={customizableOnly}
 onChange={(e) => setCustomizableOnly(e.target.checked)}
 className="w-4 h-4 accent-brand-primary rounded"
 />
 <span>Customizable Designs Only</span>
 </label>
 </div>

 {/* Quick Atelier Flyer */}
 <div className="p-4 rounded-xl bg-brand-secondary/35 relative overflow-hidden text-stone-100">
 <h4 className="font-serif text-xs font-bold text-brand-dark mb-1 flex items-center gap-1">
 <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
 Want bespoke sizing?
 </h4>
 <p className="text-[10px] leading-relaxed text-stone-500 font-sans mb-3">
 Send your measurements and custom notes straight to our slow-curing studio.
 </p>
 <button
 id="sidebar-custom-redirect"
 onClick={() => navigateTo('contact')}
 className="w-full py-2 bg-brand-dark hover:bg-stone-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
 >
 Contact Us
 </button>
 </div>
 </div>

 {/* Right Side Products list Column */}
 <div id="shop-catalog-section" className="lg:col-span-3 space-y-6">

 {/* Catalog Sorting Options Header */}
 <div className="flex flex-col sm:flex-row items-center justify-between bg-stone-50 p-4 rounded-xl border border-stone-100 gap-4">
 <p className="text-xs text-stone-300 font-sans">
 Found <span className="font-bold text-brand-dark font-mono">{filteredProducts.length}</span> luxury pieces matching filters
 </p>
 <div className="flex items-center gap-2.5 w-full sm:w-auto">
 <label className="text-xs text-stone-500 uppercase tracking-wider font-sans shrink-0 font-medium">Sort:</label>
 <select
 id="catalog-sort-select"
 value={sortOption}
 onChange={(e) => {
 setSortOption(e.target.value);
 setVisibleCount(12); // Reset count
 }}
 className="w-full sm:w-auto bg-white border border-stone-200 px-3 py-1.5 rounded-lg text-xs font-sans text-stone-700 focus:outline-none focus:border-brand-primary text-stone-100">
 <option value="featured">Artisan Highlights</option>
 <option value="best-selling">Best Selling</option>
 <option value="newest">New Releases</option>
 <option value="price-low">Price: Low to High</option>
 <option value="price-high">Price: High to Low</option>
 <option value="rating">Top Rated (Stars)</option>
 <option value="popular">Most Popular</option>
 </select>
 </div>
 </div>

 {/* Products grid - Mobile 2 Column, Tablet 3 Column, Desktop 4 Column */}
 {paginatedProducts.length > 0 ? (
 <div id="catalog-products-grid" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
 {paginatedProducts.map((product) => {
 const actualPrice = product.salePrice ?? product.price;
 const isSaved = wishlist.some((w) => w.id === product.id);
 const badge = getBadgeType(product);
 const isHovered = hoveredCardId === product.id;

 return (
 <div
 id={`product-card-${product.id}`}
 key={product.id}
 onClick={() => navigateTo('product-detail', product.slug)}
 onMouseEnter={() => setHoveredCardId(product.id)}
 onMouseLeave={() => setHoveredCardId(null)}
 className="group bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col justify-between"
 >
 {/* Visual area */}
 <div className="relative aspect-square overflow-hidden bg-stone-50">
 <img
 src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
 alt={product.name}
 className="w-full h-full object-cover"
 referrerPolicy="no-referrer"
 />

 {/* Custom label badges */}
 {badge && (
 <span className={`absolute top-2.5 left-2.5 text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full z-10 ${badge.style}`}>
 {badge.text}
 </span>
 )}

 {/* Fast Wishlist button over image */}
 <button
 id={`card-wishlist-${product.id}`}
 onClick={(e) => handleWhiskeyToggle(product, e)}
 className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center text-stone-500 hover:text-red-500 z-10"
 title="Save to Wishlist"
 >
 <Heart className={`w-4 h-4 ${isSaved ? 'text-red-500 fill-red-500' : ''}`} />
 </button>

 {/* Hover Quick view - hidden on mobile, visible on desktop hover */}
 <div className="absolute inset-0 bg-black/10 hidden group-hover:flex items-end justify-center pb-3">
 <button
 id={`quick-add-btn-${product.id}`}
 onClick={(e) => handleQuickViewOpen(product, e)}
 className="bg-white text-brand-dark px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider uppercase shadow-md hover:bg-brand-primary hover:text-white"
 >
 Quick Select
 </button>
 </div>
 </div>

 {/* Info details */}
 <div className="p-4 sm:p-5 space-y-2.5 flex-1 flex flex-col justify-between font-sans">
 <div className="space-y-1">
 <span className="text-[9px] tracking-wider uppercase text-stone-400 block font-bold">
 {product.category}
 </span>
 <h3 className="font-serif text-sm font-bold text-brand-dark line-clamp-1 group-hover:text-brand-primary transition-colors">
 {product.name}
 </h3>
 {/* Stars display */}
 <div className="flex items-center gap-1">
 <div className="flex text-amber-400">
 {[...Array(5)].map((_, i) => (
 <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-200'}`} />
 ))}
 </div>
 <span className="text-[10px] text-stone-400 font-mono font-bold">({product.reviewCount})</span>
 </div>
 </div>

 <div className="space-y-2 border-t border-stone-50 pt-2.5">
 {/* Price Display */}
 <div className="flex items-baseline justify-between">
 {product.salePrice ? (
 <div className="flex items-baseline gap-1">
 <span className="font-mono text-xs sm:text-sm font-bold text-white">
 {formatNaira(product.salePrice)}
 </span>
 <span className="font-mono text-[10px] text-stone-300 line-through">
 {formatNaira(product.price)}
 </span>
 </div>
 ) : (
 <span className="font-mono text-xs sm:text-sm font-bold text-stone-700">
 {formatNaira(product.price)}
 </span>
 )}

 {/* Stock warning */}
 {product.stock <= 4 && product.stock > 0 && (
 <span className="text-[9px] text-red-500 font-bold uppercase">Low Stock</span>
 )}
 </div>

 {/* Quick Checkout links */}
 <div className="flex items-center justify-between gap-1 mt-1">
 <button
 id={`quick-whatsapp-${product.id}`}
 type="button"
 onClick={(e) => handleWhatsAppBuyNow(product, e)}
 className="px-2 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors flex-1"
 >
 <span>WhatsApp</span>
 </button>

 <button
 id={`quick-cart-add-direct-${product.id}`}
 type="button"
 onClick={(e) => {
 e.stopPropagation();
 addItem(product, 1, product.sizes[0] || 'Standard', product.colors[0] || 'Original');
 setCartToastProduct(product);
 setTimeout(() => setCartToastProduct(null), 3500);
 }}
 className="px-2 py-1.5 rounded-lg bg-brand-primary hover:bg-brand-dark text-white text-[10px] font-bold transition-all duration-200 flex-1 flex items-center justify-center gap-1 active:scale-95"
 >
 <ShoppingBag className="w-3 h-3" />
 <span>Add to Cart</span>
 </button>
 </div>

 </div>
 </div>
 </div>
 );
 })}
 </div>
 ) : (
 // Empty search result
 <div id="shop-empty-results" className="text-center py-20 px-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-4">
 <p className="text-stone-400 text-lg font-sans">We couldn't find any art matching your custom filters.</p>
 <button
 id="reset-empty-filters"
 onClick={() => {
 setSearchTerm('');
 setSelectedCategory('All');
 setMinPrice(0);
 setMaxPrice(100000);
 setSelectedColor('All');
 setSelectedMaterial('All');
 setSelectedSize('All');
 setMinRating(0);
 setInStockOnly(false);
 setCustomizableOnly(false);
 }}
 className="px-6 py-2 bg-brand-dark text-white rounded-xl text-xs uppercase font-semibold hover:bg-brand-primary transition-colors cursor-pointer"
 >
 Reset all filters
 </button>
 </div>
 )}

 {/* Load More Button pagination */}
 {filteredProducts.length > visibleCount && (
 <div id="shop-pagination-block" className="text-center pt-8 border-t border-stone-100">
 <button
 id="shop-load-more-btn"
 onClick={handleLoadMore}
 className="px-8 py-3 bg-brand-dark hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
 >
 <span>Load More Products ({filteredProducts.length - visibleCount} remaining)</span>
 </button>
 </div>
 )}

 </div>
 </div>
 </div>

 {/* QUICK VIEW SELECT OPTION MODAL */}
 {quickViewProduct && (
 <div
 id="product-quickview-modal"
 className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
 onClick={() => setQuickViewProduct(null)}
 >
 <div
 className="bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl p-6 relative space-y-5 border border-stone-100"
 onClick={(e) => e.stopPropagation()}
 >
 <button
 id="quickview-close-btn"
 onClick={() => setQuickViewProduct(null)}
 className="absolute top-4 right-4 text-stone-400 hover:text-brand-dark "
 >
 <X className="w-5 h-5" />
 </button>

 <div className="flex gap-4 border-b border-stone-100 pb-4">
 <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-50 shrink-0 border border-stone-200/50">
 <img src={quickViewProduct.images[0]} alt={quickViewProduct.name} className="w-full h-full object-cover" />
 </div>
 <div className="space-y-1">
 <span className="text-[10px] uppercase text-stone-400 font-bold font-sans">{quickViewProduct.category}</span>
 <h3 className="font-serif text-base font-bold text-brand-dark line-clamp-1">{quickViewProduct.name}</h3>
 <span className="font-mono text-sm font-bold text-brand-primary block">{formatNaira(quickViewProduct.salePrice ?? quickViewProduct.price)}</span>
 </div>
 </div>

 {/* Sizes selector */}
 <div className="space-y-2 text-xs font-sans">
 <label className="text-stone-400 font-bold uppercase block tracking-wider text-[10px]">Select Dimensions</label>
 <div className="flex flex-wrap gap-2">
 {quickViewProduct.sizes.map((sz) => (
 <button
 key={sz}
 type="button"
 onClick={() => setQuickAddSize(sz)}
 className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${quickAddSize === sz
 ? 'bg-brand-primary text-white border-brand-primary'
 : 'bg-white text-stone-600 border-stone-200 hover:border-brand-primary'
 }`}
 >
 {sz}
 </button>
 ))}
 </div>
 </div>

 {/* Colors selector */}
 <div className="space-y-2 text-xs font-sans">
 <label className="text-stone-400 font-bold uppercase block tracking-wider text-[10px]">Select Finish</label>
 <div className="flex flex-wrap gap-2">
 {quickViewProduct.colors.map((cl) => (
 <button
 key={cl}
 type="button"
 onClick={() => setQuickAddColor(cl)}
 className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${quickAddColor === cl
 ? 'bg-brand-dark text-white border-brand-dark'
 : 'bg-white text-stone-600 border-stone-200 hover:border-brand-primary'
 }`}
 >
 {cl}
 </button>
 ))}
 </div>
 </div>

 <button
 id="confirm-quick-add-btn"
 onClick={handleQuickAddSubmit}
 className="w-full py-3 bg-brand-dark hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
 >
 <ShoppingBag className="w-4 h-4 text-white" />
 <span>Confirm and Add to Cart</span>
 </button>
 </div>
 </div>
 )}

 </main>
 );
}
