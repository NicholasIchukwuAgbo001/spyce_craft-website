import React, { useState, useMemo } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { Eye, Heart, X, Sparkles, Share2, ZoomIn, ZoomOut, ChevronRight, Bookmark } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

interface DesignerItem {
 id: string;
 title: string;
 category: string;
 description: string;
 image: string;
 likes: number;
 featured?: boolean;
}

const DESIGN_GALLERY_DATABASE: DesignerItem[] = [
 {
 id: 'g-coastal-ocean-tray-1',
 title: 'Deep Sapphire Coastal Resin Tray',
 category: 'Resin Art',
 description: 'Bespoke triple-layered foodsafe epoxy resin tray with double brass hardware and metallic gold waves.',
 image: '/assets/150618.jpg',
 likes: 342,
 featured: true
 },
 {
 id: 'g-keep-going-black-wood',
 title: '“KEEP GOING” Satin Framed Typography Board',
 category: 'Custom Frames',
 description: 'Sleek black frame with pristine backing showcasing modern typographic arrow directions.',
 image: '/assets/150619.jpg',
 likes: 418,
 featured: true
 },
 {
 id: 'g-silhouette-wedding-foil',
 title: 'Infinite Love Gold Silhouette Board',
 category: 'Portrait Frames',
 description: 'Face-less high-precision couple stencil print with gold leaf hand-applied detail inside double acrylic glass.',
 image: '/assets/150620.jpg',
 likes: 672,
 featured: true
 },
 {
 id: 'g-wedding-bouquet-preservation-1',
 title: 'Bridal Bouquet Hexagonal Columns Set',
 category: 'Wedding Keepsakes',
 description: 'Full wedding preservation set including crystal-clear columns, ring cones and custom date gold letters.',
 image: '/assets/150621.jpg',
 likes: 589
 },
 {
 id: 'g-kaws-pop-hypebeast',
 title: 'Retrospective Hypebeast Sculptural Acrylic Block',
 category: 'Anniversary Art',
 description: 'Vibrant pop sculpture print laminated on premium high-contrast back-painted acrylic sheet.',
 image: '/assets/150622.jpg',
 likes: 215
 },
 {
 id: 'g-frosted-reception-plaque-1',
 title: 'Executive Frosted Workspace Signboard',
 category: 'Name Plaques',
 description: 'Custom sandblasted matte acrylic panel with brass wall standoffs for professional company boards.',
 image: '/assets/150623.jpg',
 likes: 187
 },
 {
 id: 'g-double-polaroid-collage',
 title: '9-Grid Memory Polaroid Hanger Frame',
 category: 'Portrait Frames',
 description: 'Minimalist canvas grid detailing story captions of romantic relationships over natural wood frames.',
 image: '/assets/150624.jpg',
 likes: 804,
 featured: true
 },
 {
 id: 'g-sunset-warm-abstract-2',
 title: 'Sunset Solitude Ochre Trio Set',
 category: 'Anniversary Art',
 description: 'Modern curves and terracotta sun shapes printed on double-glazed satin frames.',
 image: '/assets/150625.jpg',
 likes: 312
 },
 {
 id: 'g-marbled-coasters-wood-gold',
 title: 'Geode Forest Resin Coasters with Gold Lining',
 category: 'Resin Art',
 description: 'Deep forest green high-gloss cast set featuring raw gold electroplated outer edges.',
 image: '/assets/150626.jpg',
 likes: 429
 },
 {
 id: 'g-floral-tray-rose-petals',
 title: 'Dehydrated Carnations Epoxy Catchall Panel',
 category: 'Wedding Keepsakes',
 description: 'Clear tray preserving bridal anniversary bouquet with embedded champagne color flakes.',
 image: '/assets/150627.jpg',
 likes: 247
 },
 {
 id: 'g-study-quotes-risks-effort',
 title: '“TAKE RISKS” Bedroom Wall Set',
 category: 'Custom Frames',
 description: 'Bold inspirational lettering designed specifically for minimalist study spaces and reading bays.',
 image: '/assets/150628.jpg',
 likes: 318
 },
 {
 id: 'g-company-signage-wood',
 title: 'Engraved Cedar Wooden Gift Set with Coasters',
 category: 'Name Plaques',
 description: 'Premium corporate desk accessory combo custom finished with brand emblems in silver paint.',
 image: '/assets/150629.jpg',
 likes: 195
 }
];

const FILTER_CATEGORIES = ['All', 'Resin Art', 'Custom Frames', 'Portrait Frames', 'Name Plaques', 'Wedding Keepsakes', 'Anniversary Art'];

export default function GalleryPage() {
 const { wishlist, toggleWishlist, navigateTo } = useCartStore();
 const [selectedFilter, setSelectedFilter] = useState('All');
 const [lightboxItem, setLightboxItem] = useState<DesignerItem | null>(null);
 const [zoomLevel, setZoomLevel] = useState(1);
 const [visibleCount, setVisibleCount] = useState(8);
 const [copiedId, setCopiedId] = useState<string | null>(null);

 // Filters
 const filteredItems = useMemo(() => {
 if (selectedFilter === 'All') return DESIGN_GALLERY_DATABASE;
 return DESIGN_GALLERY_DATABASE.filter((item) => item.category === selectedFilter);
 }, [selectedFilter]);

 const displayedItems = useMemo(() => {
 return filteredItems.slice(0, visibleCount);
 }, [filteredItems, visibleCount]);

 const handleLoadMore = () => {
 setVisibleCount((prev) => Math.min(prev + 4, filteredItems.length));
 };

 const handleShare = (item: DesignerItem, e: React.MouseEvent) => {
 e.stopPropagation();
 const mockLink = `https://spycecrafts.com/gallery/${item.id}`;
 navigator.clipboard.writeText(mockLink);
 setCopiedId(item.id);
 setTimeout(() => setCopiedId(null), 3000);
 };

 // Check if saved as product
 const isItemLiked = (item: DesignerItem) => {
 return wishlist.some((p) => p.name.toLowerCase() === item.title.toLowerCase());
 };

 const handleLightboxLike = (item: DesignerItem) => {
 // Attempt to map to product or mock template
 const simulatedProduct = PRODUCTS.find((p) => p.name.toLowerCase() === item.title.toLowerCase()) || {
 id: item.id,
 slug: item.id,
 name: item.title,
 description: item.description,
 price: 25000,
 salePrice: null,
 category: item.category,
 images: [item.image],
 featured: false,
 stock: 10,
 customizable: true,
 sizes: ['Standard'],
 colors: ['Original'],
 rating: 5.0,
 reviewCount: 1,
 tags: ['gallery']
 };
 toggleWishlist(simulatedProduct);
 };

 return (
 <main id="curated-gallery-page" className="py-16 bg-white min-h-screen">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 {/* Caption */}
 <div className="text-center space-y-4 mb-16">
 <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-primary block">Inspiration &amp; Portfolios</span>
 <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-dark">
 Our Pinterest <span className="font-normal italic text-brand-primary">Masonry Atelier</span>
 </h1>
 <p className="text-stone-500 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
 A beautiful high-contrast collection of customized resin sets, frosted nameplates, and couple line art frames designed for style. Click any block to view options.
 </p>

 {/* Filters Bar */}
 <div id="gallery-scroller-filters" className="flex flex-wrap items-center justify-center gap-2 pt-8">
 {FILTER_CATEGORIES.map((cat) => (
 <button
 id={`gallery-filter-btn-${cat.replace(/\s/g, '').toLowerCase()}`}
 key={cat}
 onClick={() => {
 setSelectedFilter(cat);
 setVisibleCount(8); // Reset counter
 }}
 className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${selectedFilter === cat
 ? 'bg-brand-dark text-white shadow-md'
 : 'bg-stone-50 text-stone-600 border border-stone-100 hover:border-brand-primary hover:text-brand-primary'
 }`}
 >
 {cat}
 </button>
 ))}
 </div>
 </div>

 {/* Pinterest Masonry Layout Grid */}
 <div id="pinterest-columns-grid" className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-6 space-y-6">
 {displayedItems.map((item) => {
 const isLiked = isItemLiked(item);
 return (
 <div
 id={`grid-item-${item.id}`}
 key={item.id}
 onClick={() => {
 setLightboxItem(item);
 setZoomLevel(1);
 }}
 className="break-inside-avoid relative rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer"
 >
 {/* Visual Area */}
 <div className="relative overflow-hidden w-full h-auto">
 <img
 src={item.image}
 alt={item.title}
 className="w-full h-auto object-cover transition-transform duration-500"
 referrerPolicy="no-referrer"
 />

 {/* Hover Info Overlay */}
 <div className="absolute inset-0 bg-linear-to-t from-brand-dark/95 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
 <span className="text-[9px] uppercase tracking-wider text-brand-primary font-semibold">
 {item.category}
 </span>
 <h3 className="font-serif text-sm font-bold text-white line-clamp-1 mt-0.5 mb-1.5">
 {item.title}
 </h3>
 <p className="text-[10px] text-stone-300 font-sans leading-normal line-clamp-2 font-light">
 {item.description}
 </p>

 {/* Quick Control Overlays */}
 <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
 <button
 id={`grid-heart-btn-${item.id}`}
 onClick={(e) => {
 e.stopPropagation();
 handleLightboxLike(item);
 }}
 className={`p-1.5 rounded-full bg-white/10 text-white hover:bg-white hover:text-red-500 transition-colors ${isLiked ? 'text-red-500 fill-red-500' : ''
 }`}
 >
 <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
 </button>

 <div className="flex items-center gap-2">
 <button
 id={`grid-share-btn-${item.id}`}
 onClick={(e) => handleShare(item, e)}
 className="p-1.5 rounded-full bg-white/10 text-white hover:bg-brand-primary transition-colors text-xs flex items-center gap-1 font-sans"
 >
 <Share2 className="w-3.5 h-3.5" />
 <span>{copiedId === item.id ? 'Copied' : 'Share'}</span>
 </button>
 <span className="p-1.5 rounded-full bg-white/10 text-white text-[9px] font-mono leading-none">
 {item.likes + (isLiked ? 1 : 0)} LIKES
 </span>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
 })}
 </div>

 {/* Dynamic Infinite Load More Button */}
 {filteredItems.length > visibleCount && (
 <div id="gallery-loadmore-block" className="text-center pt-12">
 <button
 id="gallery-load-more-btn"
 onClick={handleLoadMore}
 className="px-8 py-3 bg-brand-dark hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center gap-2 mx-auto cursor-pointer"
 >
 <span>Explore More Creations</span>
 <ChevronRight className="w-4 h-4" />
 </button>
 </div>
 )}

 {/* Lightbox Modal with Zoom, Share and Wishlist Triggers */}
 {lightboxItem && (
 <div
 id="gallery-lightbox-modal"
 className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn"
 onClick={() => setLightboxItem(null)}
 >
 <div
 className="bg-stone-900 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row border border-stone-800"
 onClick={(e) => e.stopPropagation()}
 >
 {/* Image Frame Left with zoom options */}
 <div className="md:w-1/2 relative bg-black flex items-center justify-center overflow-hidden aspect-square md:aspect-auto md:h-[65vh]">
 <img
 src={lightboxItem.image}
 alt={lightboxItem.title}
 className="w-full h-full object-cover transition-transform duration-300"
 style={{ transform: `scale(${zoomLevel})` }}
 referrerPolicy="no-referrer"
 />

 {/* Close modal */}
 <button
 id="lightbox-close-btn"
 onClick={() => setLightboxItem(null)}
 className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors"
 >
 <X className="w-5 h-5" />
 </button>

 {/* ZOOM Utilities */}
 <div className="absolute bottom-4 left-4 flex items-center gap-2">
 <button
 id="zoom-out-btn"
 onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 1))}
 className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors"
 disabled={zoomLevel === 1}
 >
 <ZoomOut className="w-4 h-4" />
 </button>
 <span className="bg-black/50 text-white text-[10px] font-mono px-2 py-1 rounded">
 {zoomLevel * 100}%
 </span>
 <button
 id="zoom-in-btn"
 onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
 className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors"
 >
 <ZoomIn className="w-4 h-4" />
 </button>
 </div>
 </div>

 {/* Specifications Right Column */}
 <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-stone-300">
 <div className="space-y-6">
 <div className="flex items-center justify-between border-b border-stone-800 pb-4">
 <span className="text-xs uppercase tracking-wider text-brand-primary font-medium">
 Atelier Project Spec
 </span>
 <span className="text-xs text-stone-500 font-mono tracking-wide">
 ID: {lightboxItem.id}
 </span>
 </div>

 <div className="space-y-2">
 <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
 {lightboxItem.title}
 </h2>
 <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] tracking-wide text-stone-300 font-sans">
 {lightboxItem.category}
 </span>
 </div>

 <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed">
 {lightboxItem.description}
 </p>

 <div className="space-y-3 pt-4 border-t border-stone-800 font-sans text-xs">
 <div className="flex justify-between">
 <span className="text-stone-500">Handcraft Material</span>
 <span className="text-stone-300 font-semibold">Premium visual Epoxy / Stained backing</span>
 </div>
 <div className="flex justify-between">
 <span className="text-stone-500">Customizable Option</span>
 <span className="text-emerald-500 font-semibold">Yes, fully (Any Size/Theme Layout)</span>
 </div>
 <div className="flex justify-between">
 <span className="text-stone-500">Design Lead Time</span>
 <span className="text-stone-300 font-semibold">3 - 7 Business Days</span>
 </div>
 </div>
 </div>

 <div className="space-y-3 pt-6 md:pt-0">
 <div className="flex gap-4">
 {/* SAVE TO WISHLIST button in lightbox modal */}
 <button
 id="lightbox-wishlist-btn"
 onClick={() => handleLightboxLike(lightboxItem)}
 className="flex-1 py-3 bg-white/5 border border-white/15 hover:border-brand-primary rounded-xl text-xs font-semibold uppercase tracking-wider text-white transition-colors flex items-center justify-center gap-2 cursor-pointer cursor-pointers"
 >
 <Heart className={`w-4 h-4 ${isItemLiked(lightboxItem) ? 'text-red-500 fill-red-500' : ''}`} />
 <span>{isItemLiked(lightboxItem) ? 'In Wishlist' : 'Add to Wishlist'}</span>
 </button>

 {/* SHARE COPY link */}
 <button
 id="lightbox-share-btn"
 onClick={(e) => handleShare(lightboxItem, e)}
 className="px-4 py-3 bg-white/5 rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 border border-white/10 hover:bg-brand-primary"
 >
 <Share2 className="w-4 h-4" />
 <span>{copiedId === lightboxItem.id ? 'Copied' : 'Share'}</span>
 </button>
 </div>

 <button
 id="lightbox-orders-redirect-btn"
 onClick={() => {
 setLightboxItem(null);
 navigateTo('shop');
 }}
 className="w-full py-3.5 bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
 >
 <Sparkles className="w-4 h-4" />
 <span>Shop Similar Items</span>
 </button>
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 </main>
 );
}
