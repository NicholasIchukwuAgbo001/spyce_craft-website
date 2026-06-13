import React from 'react';
import { Heart, Sparkles, Trophy, ShieldCheck, Truck, ThumbsUp } from 'lucide-react';

export default function WhyChooseUs() {
 const USP_CARDS = [
 {
 icon: <Heart className="w-6 h-6 text-brand-primary" />,
 title: 'Handmade Excellence',
 description: 'Each piece is hand-poured, polished, and assembled with slow-crafted precision by real artisan hands.'
 },
 {
 icon: <Sparkles className="w-6 h-6 text-brand-primary" />,
 title: 'Fully Customized',
 description: 'You dictate everything�the text characters, frame styles, dimensions, color palettes, and reference visuals.'
 },
 {
 icon: <Trophy className="w-6 h-6 text-brand-primary" />,
 title: 'Premium Materials',
 description: 'We use high-index non-yellowing epoxy polymers, tempered shatterproof glass, and solid sustainable wood.'
 },
 {
 icon: <Truck className="w-6 h-6 text-brand-primary" />,
 title: 'Fast Delivery',
 description: 'Carefully packaged, bubble-wrapped, and delivered directly to your doorstep in pristine condition.'
 },
 {
 icon: <ShieldCheck className="w-6 h-6 text-brand-primary" />,
 title: 'Secure Ordering',
 description: 'Zero upfront financial risk. Speak directly with us on WhatsApp to verify order drafts.'
 },
 {
 icon: <ThumbsUp className="w-6 h-6 text-brand-primary" />,
 title: 'Customer Satisfaction',
 description: 'Loved by hundreds of repeat customers across Nigeria for our impeccable customer care and attention.'
 }
 ];

 return (
 <section id="why-choose-us-section" className="py-20 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
 {/* Section Header */}
 <div id="usp-header" className="text-center space-y-3 mb-16">
 <span className="text-[10px] tracking-widest uppercase font-sans font-semibold text-brand-primary">The Spyce Standard</span>
 <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
 Why Discerning Clients Love Spyce Crafts
 </h2>
 <p className="text-stone-500 font-sans max-w-xl mx-auto text-sm">
 We bridge the gap between Pinterest aesthetic inspiration and physical craftsmanship with uncompromised quality.
 </p>
 </div>

 {/* Unified Cards Grid */}
 <div id="usp-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
 {USP_CARDS.map((card, idx) => (
 <div
 id={`usp-card-${idx}`}
 key={idx}
 className="p-8 rounded-2xl bg-white/5 hover:bg-brand-secondary/30 border border-brand-secondary/40 transition-all duration-300 relative group"
 >
 <div className="w-12 h-12 rounded-xl bg-[#121216] border border-white/5 flex items-center justify-center shadow-md transition-transform">
 {card.icon}
 </div>
 <h3 className="font-serif text-lg font-bold text-brand-dark mt-6 mb-2">
 {card.title}
 </h3>
 <p className="text-sm text-stone-600 leading-relaxed font-sans">
 {card.description}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
