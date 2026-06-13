import React from 'react';
import { Search, Compass, ShoppingBag, CheckCircle, Hammer, Truck } from 'lucide-react';

export default function HowItWorks() {
 const STEPS = [
 {
 num: '01',
 icon: <Search className="w-5 h-5 text-brand-primary" />,
 title: 'Browse Products',
 description: 'Explore our catalog of popular Pinterest-inspired quote blocks and resin ocean wares.'
 },
 {
 num: '02',
 icon: <Compass className="w-5 h-5 text-brand-primary" />,
 title: 'Customize Your Item',
 description: 'Choose your desired size, elegant frame colors, text titles, or upload personal photos.'
 },
 {
 num: '03',
 icon: <ShoppingBag className="w-5 h-5 text-brand-primary" />,
 title: 'Place Order',
 description: 'Checkout seamlessly through our cart. No card required; everything connects to your phone.'
 },
 {
 num: '04',
 icon: <CheckCircle className="w-5 h-5 text-brand-primary" />,
 title: 'WhatsApp Sync',
 description: 'Your cart is converted into a beautiful order log. Click to sync instantly with our lead designer.'
 },
 {
 num: '05',
 icon: <Hammer className="w-5 h-5 text-brand-primary" />,
 title: 'Production',
 description: 'Our studio begins hand-poured custom resin layers or meticulous line sketching for you.'
 },
 {
 num: '06',
 icon: <Truck className="w-5 h-5 text-brand-primary" />,
 title: 'Delivery',
 description: 'Your masterpiece is packed securely with multi-layer bubble wrap and shipped directly to you.'
 }
 ];

 return (
 <section id="how-it-works-section" className="py-20 bg-brand-secondary/15">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 {/* Section Header */}
 <div id="how-it-works-header" className="text-center space-y-3 mb-16">
 <span className="text-[10px] tracking-widest uppercase font-sans font-semibold text-brand-primary">Stress-Free Ordering</span>
 <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
 Our Handcrafting &amp; Shipping Pipeline
 </h2>
 <p className="text-stone-500 font-sans max-w-xl mx-auto text-sm">
 We’ve eliminated complicated checkout gates. All custom requests are finalized via direct line to assure 100% visual accuracy.
 </p>
 </div>

 {/* Steps Grid */}
 <div id="how-it-works-steps-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative">

 {STEPS.map((step, index) => (
 <div
 id={`step-block-${index}`}
 key={index}
 className="relative text-center sm:text-left lg:text-center space-y-4"
 >
 {/* Floating connector line for large screens */}
 {index < STEPS.length - 1 && (
 <div className="hidden lg:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px border-t border-dashed border-brand-primary/40 -z-10" />
 )}

 {/* Icon Container */}
 <div className="mx-auto sm:mx-0 lg:mx-auto w-14 h-14 rounded-full bg-[#121216] border border-brand-primary/20 flex items-center justify-center shadow-lg relative group hover:rotate-12 transition-transform duration-300">
 {step.icon}
 <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-brand-primary text-stone-950 text-[10px] font-bold flex items-center justify-center rounded-full">
 {step.num}
 </span>
 </div>

 {/* Details text */}
 <div className="space-y-1">
 <h3 className="font-serif text-base font-bold text-brand-dark">
 {step.title}
 </h3>
 <p className="text-xs text-stone-300 leading-relaxed font-sans max-w-xs mx-auto sm:mx-0 lg:mx-auto">
 {step.description}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
