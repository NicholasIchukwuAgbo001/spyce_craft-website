import React, { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { Eye, ArrowRight, X, Heart, Sparkles, MessageSquare } from 'lucide-react';

interface GalleryItem {
 id: string;
 title: string;
 category: string;
 image: string;
 likes: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
 {
 id: 'g1',
 title: 'Eternal Marbled Blue Coasters',
 category: 'Resin Art',
 image: '/assets/150609.jpg',
 likes: 124
 },
 {
 id: 'g2',
 title: '�WORK HARD� Minimalist Satin Frame',
 category: 'Custom Frames',
 image: '/assets/150610.jpg',
 likes: 310
 },
 {
 id: 'g3',
 title: 'Custom Lovers Silhouette Sketch (Gold Foil Finished)',
 category: 'Portrait Frames',
 image: '/assets/150611.jpg',
 likes: 450
 },
 {
 id: 'g4',
 title: 'Gold Flake Epoxy Hexagonal Paperweights',
 category: 'Resin Art',
 image: '/assets/150612.jpg',
 likes: 89
 },
 {
 id: 'g5',
 title: '�TAKE RISKS� High-Contrast Typographical Canvas',
 category: 'Custom Frames',
 image: '/assets/150613.jpg',
 likes: 198
 },
 {
 id: 'g6',
 title: 'Executive Frosted Office Plaque',
 category: 'Name Plaques',
 image: '/assets/150614.jpg',
 likes: 142
 },
 {
 id: 'g7',
 title: 'Butterfly Preservation Romance Box',
 category: 'Portrait Frames',
 image: '/assets/150615.jpg',
 likes: 521
 },
 {
 id: 'g8',
 title: 'Custom Initial & Preserved Daisy Resin Keychain Set',
 category: 'Resin Art',
 image: '/assets/150616.jpg',
 likes: 277
 },
 {
 id: 'g9',
 title: 'Aesthetic 9-Grid Polaroid Couples Layout',
 category: 'Portrait Frames',
 image: '/assets/150617.jpg',
 likes: 680
 }
];

export default function PortfolioGallery() {
 const { navigateTo } = useCartStore();
 const [filter, setFilter] = useState('All');
 const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
 const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

 const filteredItems = filter === 'All'
 ? GALLERY_ITEMS
 : GALLERY_ITEMS.filter(item => item.category === filter);

 const toggleLike = (id: string, e: React.MouseEvent) => {
 e.stopPropagation();
 setLikedItems(prev => ({
 ...prev,
 [id]: !prev[id]
 }));
 };

 return (
 <section id="portfolio-gallery-section" className="py-20 bg-stone-50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 {/* Caption Header */}
 <div id="gallery-header" className="text-center space-y-3 mb-12">
 <span className="text-[10px] tracking-widest uppercase font-sans font-semibold text-brand-primary">Curated Workpiece Feed</span>
 <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
 Our Pinterest-Style Creations
 </h2>
 <p className="text-stone-500 font-sans max-w-xl mx-auto text-sm">
 High-contrast visual stories made valid. Filter by your preferred handcrafted medium below. All products can be customized to any frame style or coloring.
 </p>

 {/* Filtering Tabs */}
 <div id="gallery-filters" className="flex flex-wrap items-center justify-center gap-2 pt-6">
 {['All', 'Resin Art', 'Custom Frames', 'Portrait Frames', 'Name Plaques'].map((category) => (
 <button
 id={`filter-tab-${category.replace(/\s/g, '').toLowerCase()}`}
 key={category}
 onClick={() => setFilter(category)}
 className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${filter === category
 ? 'bg-brand-dark text-white shadow-md'
 : 'bg-white text-stone-600 border border-stone-200 hover:border-brand-primary hover:text-brand-primary'
 }`}
 >
 {category}
 </button>
 ))}
 </div>
 </div>

 {/* Masonry-Style Clean Responsive Grid */}
 <div id="gallery-masonry-grid" className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
 {filteredItems.map((item) => {
 const isLiked = !!likedItems[item.id];
 return (
 <div
 id={`gallery-card-${item.id}`}
 key={item.id}
 onClick={() => setLightboxItem(item)}
 className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative"
 >
 <div className="relative overflow-hidden">
 <img
 src={item.image}
 alt={item.title}
 className="w-full object-cover rounded-2xl transition-transform duration-500"
 referrerPolicy="no-referrer"
 />
 {/* Subtle Shading Gradient */}
 <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

 {/* Floating Action Elements (Interactive on hover) */}
 <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
 <button
 id={`gallery-like-${item.id}`}
 onClick={(e) => toggleLike(item.id, e)}
 className={`p-2.5 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-white/80 hover:bg-white text-stone-800'} transition-all`}
 >
 <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
 </button>
 <button
 id={`gallery-view-${item.id}`}
 className="p-2.5 rounded-full bg-white/80 hover:bg-white text-brand-dark transition-all"
 >
 <Eye className="w-4 h-4" />
 </button>
 </div>

 {/* Bottom Text Panel shown on Hover */}
 <div className="absolute bottom-0 left-0 w-full p-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white">
 <span className="text-[10px] tracking-wider uppercase text-brand-secondary font-sans font-semibold">
 {item.category}
 </span>
 <h3 className="font-serif text-lg font-bold leading-tight mt-1 mb-2">
 {item.title}
 </h3>
 <div className="flex items-center justify-between">
 <span className="text-xs text-stone-600 font-sans">{item.likes + (isLiked ? 1 : 0)} admirers</span>
 <span className="text-xs flex items-center gap-1 text-brand-primary font-semibold">
 Custom order this <ArrowRight className="w-3 h-3" />
 </span>
 </div>
 </div>
 </div>
 </div>
 );
 })}
 </div>

 {/* Under Gallery CTA */}
 <div id="gallery-footer-cta" className="text-center pt-12 mt-6">
 <p className="text-sm text-stone-500 font-sans mb-4">
 Do you have an aesthetic Pinterest idea you want us to sketch or pour from scratch?
 </p>
 <button
 id="gallery-cta-customizar"
 onClick={() => navigateTo('shop')}
 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-sm font-semibold uppercase tracking-wider transition-colors duration-300 shadow-md cursor-pointer"
 >
 <Sparkles className="w-4 h-4" />
 <span>Browse Full Collection</span>
 </button>
 </div>

 {/* Fullscreen Interactive Lightbox Modal */}
 {lightboxItem && (
 <div
 id="gallery-lightbox"
 className="fixed inset-0 z-50 bg-brand-dark/95 flex items-center justify-center p-4 sm:p-6"
 onClick={() => setLightboxItem(null)}
 >
 <button
 id="close-lightbox-btn"
 onClick={() => setLightboxItem(null)}
 className="absolute top-6 right-6 p-2 rounded-full bg-stone-900 text-white hover:text-brand-primary"
 aria-label="Close Lightbox"
 >
 <X className="w-6 h-6" />
 </button>

 <div
 className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl scale-95 duration-500 inline-grid grid-cols-1 md:grid-cols-2 text-stone-100"
 onClick={(e) => e.stopPropagation()}
 >
 {/* Product Gallery Image inside Lightbox */}
 <div className="bg-stone-100 flex items-center justify-center relative aspect-square md:aspect-auto">
 <img
 src={lightboxItem.image}
 alt={lightboxItem.title}
 className="w-full h-full object-cover max-h-[500px]"
 referrerPolicy="no-referrer"
 />
 </div>

 {/* Product Info inside Lightbox */}
 <div className="p-6 sm:p-10 flex flex-col justify-between space-y-6">
 <div className="space-y-4">
 <div className="inline-block px-3 py-1 bg-brand-secondary/40 text-brand-primary text-xs font-semibold rounded-full uppercase tracking-wider">
 {lightboxItem.category}
 </div>
 <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-dark">
 {lightboxItem.title}
 </h3>
 <p className="text-sm text-stone-600 leading-relaxed font-sans">
 This exquisite item represents true, slow-crafted artistry. Hand-built using organic crystals, highly detailed digital sketching, and high-gloss multi-layer UV protected polymers to assure a brilliant look for generations.
 </p>

 <div className="border-t border-stone-100 pt-4 space-y-2">
 <span className="block text-xs uppercase text-stone-600 font-sans tracking-widest">Pricing Estimate</span>
 <p className="font-serif text-xl font-bold text-brand-primary">From NGN 18,500 - NGN 45,000</p>
 <span className="text-[11px] text-stone-600 font-sans italic">Definitive pricing is contingent on frame dimensions selected.</span>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-100">
 <button
 id="lightbox-custom-btn"
 onClick={() => {
 navigateTo('shop');
 setLightboxItem(null);
 }}
 className="w-full py-3.5 rounded-xl bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1 hover:bg-brand-primary transition-all duration-300"
 >
 <Sparkles className="w-4 h-4" />
 <span>View in Shop</span>
 </button>
 <a
 id="lightbox-whatsapp-btn"
 href={`https://wa.me/2349069996290?text=Hello%20Spyce%20Crafts,%20I%20am%20interested%20in%20creating%20a%20workpiece%20similar%20to%20"${encodeURIComponent(lightboxItem.title)}"%20listed%20in%20your%20website%20gallery!`}
 target="_blank"
 rel="noreferrer"
 className="w-full py-3.5 rounded-xl border border-emerald-500/20 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all duration-300"
 >
 <MessageSquare className="w-4 h-4 text-emerald-600" />
 <span>WhatsApp</span>
 </a>
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 </section>
 );
}
