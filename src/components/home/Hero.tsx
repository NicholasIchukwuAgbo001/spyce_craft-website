import React from 'react';
import { useCartStore } from '../../store/useCartStore';
import { Sparkles, MessageSquare, ShieldCheck, Star } from 'lucide-react';

export default function Hero() {
 const { navigateTo } = useCartStore();

 return (
 <section id="hero-section" className="relative bg-linear-to-b from-brand-secondary via-brand-muted to-brand-secondary py-16 lg:py-24 overflow-hidden border-b border-white/5">

 <div className="absolute inset-0 z-0">
 <img
 src="/assets/hero_background_1781342822203.jpg"
 alt="Luxury Artisan Resin Wallpaper Background"
 className="w-full h-full object-cover opacity-20 pointer-events-none select-none filter brightness-[0.8]"
 referrerPolicy="no-referrer"
 />
 <div className="absolute inset-0 bg-linear-to-b from-brand-secondary/90 via-transparent to-brand-secondary/95" />
 </div>


 <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-brand-primary/20 blur-3xl -z-10" />
 <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-brand-accent/15 blur-3xl -z-10" />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

 {/* Left Hero Details */}
 <div id="hero-text-block" className="lg:col-span-6 space-y-8 text-center lg:text-left">

 {/* Live TikTok Indicator & Badge */}
 <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 text-stone-200 text-[11px] font-semibold tracking-wider uppercase font-sans border border-white/10 hover:-translate-y-0.5 transition-transform ">
 <Sparkles className="w-4 h-4 text-brand-primary fill-brand-primary animate-pulse" />
 <span>Aesthetic Pinterest Frame Atelier</span>
 </div>

 {/* Core Titles */}
 <div className="space-y-4">
 <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
 Handcrafted <span className="text-brand-primary font-normal italic">Resin Art</span> &amp; <span className="underline decoration-brand-accent decoration-wavy decoration-2 underline-offset-4">Custom Frames</span> That Transform Spaces
 </h1>
 <p className="font-sans text-stone-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
 Preserve your beautiful wedding bouquets, cherish custom hand-sketched lineart, and elevate office and home interiors with premium resin trays and personalized gifts by <span className="font-semibold text-brand-primary">Spyce Crafts</span>.
 </p>
 </div>

 {/* Micro Rating Row */}
 <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-stone-400 font-sans">
 <div className="flex items-center gap-1.5">
 {[1, 2, 3, 4, 5].map((s) => (
 <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
 ))}
 <span className="font-bold text-white">4.9/5</span>
 <span>(340+ verified client orders)</span>
 </div>
 <span className="hidden sm:inline text-stone-700">|</span>
 <div className="flex items-center gap-1 text-emerald-400">
 <ShieldCheck className="w-4 h-4 text-emerald-400" />
 <span>Order via WhatsApp, Pay on Invoice</span>
 </div>
 </div>

 {/* Action Buttons Panel */}
 <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
 <button
 id="hero-cta-shop"
 onClick={() => navigateTo('shop')}
 className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-primary hover:bg-white text-stone-950 font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-brand-primary/20 cursor-pointer transform active:scale-95 flex items-center justify-center gap-2 border border-brand-primary"
 >
 <span>Shop Catalog</span>
 </button>
 <a
 id="hero-cta-whatsapp"
 href="https://wa.me/2349069996290?text=Hello%20Spyce%20Crafts,%20I%20am%20visiting%20your%20website%20and%20want%20to%20discuss%20a%20personalized%20gift%20item!"
 target="_blank"
 rel="noreferrer"
 className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 font-semibold text-xs tracking-wide uppercase transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 "
 >
 <MessageSquare className="w-4 h-4 text-emerald-400" />
 <span>Chat on WhatsApp</span>
 </a>
 </div>
 </div>

 {/* Right Hero Video/Image Showcase collage styling */}
 <div id="hero-media-showcase" className="lg:col-span-6 relative">

 {/* Pinterest-style visual grid mockups */}
 <div className="grid grid-cols-2 gap-4 relative">
 <div className="space-y-4">

 {/* Image 1 - Large Resin Waves */}
 <div className="rounded-2xl overflow-hidden shadow-xl aspect-3/4 relative group">
 <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/40 transition-colors duration-300 z-10" />
 <img
 src="/assets/150642.jpg"
 alt="Hand poured ocean waves resin artwork tray"
 className="w-full h-full object-cover transition-transform duration-700"
 referrerPolicy="no-referrer"
 />
 <div className="absolute bottom-4 left-4 z-20 text-white">
 <span className="text-[10px] uppercase tracking-wider bg-brand-primary/90 px-2 py-0.5 rounded">Resin Wave Trays</span>
 </div>
 </div>

 {/* Image 2 - Minimal Lineart frame */}
 <div className="rounded-2xl overflow-hidden shadow-xl aspect-square relative group">
 <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/40 transition-colors duration-300 z-10" />
 <img
 src="/assets/150643.jpg"
 alt="Minimal custom couples line sketch mockup frame"
 className="w-full h-full object-cover transition-transform duration-700"
 referrerPolicy="no-referrer"
 />
 <div className="absolute bottom-4 left-4 z-20 text-white">
 <span className="text-[10px] uppercase tracking-wider bg-brand-dark/80 px-2 py-0.5 rounded">Bespoke Couple Sketches</span>
 </div>
 </div>
 </div>

 <div className="space-y-4 pt-8">

 {/* Image 3 - Pinterest typography Quote block */}
 <div className="rounded-2xl overflow-hidden shadow-xl aspect-square relative group">
 <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/40 transition-colors duration-300 z-10" />
 <img
 src="/assets/150644.jpg"
 alt="Premium motivation framed posters desktop setup"
 className="w-full h-full object-cover transition-transform duration-700"
 referrerPolicy="no-referrer"
 />
 <div className="absolute bottom-4 left-4 z-20 text-white">
 <span className="text-[10px] uppercase tracking-wider bg-black/80 px-2 py-0.5 rounded">Motivation Decor Series</span>
 </div>
 </div>

 {/* Image 4 - Bridal blossom preservation column */}
 <div className="rounded-2xl overflow-hidden shadow-xl aspect-3/4 relative group">
 <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/40 transition-colors duration-300 z-10" />
 <img
 src="/assets/150645.jpg"
 alt="Wedding bridal bouquet flower resin preservation columns"
 className="w-full h-full object-cover transition-transform duration-700"
 referrerPolicy="no-referrer"
 />
 <div className="absolute bottom-4 left-4 z-20 text-white">
 <span className="text-[10px] uppercase tracking-wider bg-emerald-700/90 px-2 py-0.5 rounded">Bouquet Preservations</span>
 </div>
 </div>
 </div>

 {/* Float aesthetic text box */}
 <div id="hero-floating-bubble" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 border border-brand-secondary/80 p-4 rounded-2xl shadow-2xl flex items-center gap-3 z-30 max-w-xs ">
 <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
 <span className="font-serif font-bold text-sm">#1</span>
 </div>
 <div>
 <h4 className="font-serif text-xs font-bold text-stone-900">Pinterest Frame Trend</h4>
 <p className="text-[10px] text-stone-500 font-sans">Aesthetic, high-lustre, fully customizable</p>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Brand Story Highlights Ribbon card set */}
 <div id="brand-highlights-bar" className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-8 border-t border-brand-secondary">
 <div className="text-center md:text-left space-y-1">
 <h3 className="font-serif text-lg font-bold text-brand-dark">100% Handcrafted</h3>
 <p className="text-xs text-stone-300 font-sans">Never mass-produced; customized with care &amp; time</p>
 </div>
 <div className="text-center md:text-left space-y-1">
 <h3 className="font-serif text-lg font-bold text-brand-dark">Museum Grade Material</h3>
 <p className="text-xs text-stone-300 font-sans">Bubble-free resin coatings &amp; high-impact glass</p>
 </div>
 <div className="text-center md:text-left space-y-1">
 <h3 className="font-serif text-lg font-bold text-brand-dark">Bespoke Customization</h3>
 <p className="text-xs text-stone-300 font-sans">You sketch, draft quotes, select frame colors</p>
 </div>
 <div className="text-center md:text-left space-y-1">
 <h3 className="font-serif text-lg font-bold text-brand-dark">Safe Nationwide Delivery</h3>
 <p className="text-xs text-stone-300 font-sans">Double-packaged padding prevents cracks</p>
 </div>
 </div>
 </div>
 </section>
 );
}
