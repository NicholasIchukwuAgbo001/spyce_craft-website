/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { Sparkles, ArrowUpRight, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
 const { navigateTo } = useCartStore();
 const [email, setEmail] = useState('');
 const [subscribed, setSubscribed] = useState(false);

 const handleSubscribe = (e: React.FormEvent) => {
 e.preventDefault();
 if (email.trim()) {
 setSubscribed(true);
 setTimeout(() => {
 setEmail('');
 setSubscribed(false);
 }, 5000);
 }
 };

 return (
 <footer id="app-footer" className="bg-brand-muted text-stone-300 pt-16 pb-8 border-t border-brand-primary/10">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 {/* Upper Grid */}
 <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/5">

 {/* Brand Info */}
 <div id="footer-col-brand" className="md:col-span-1 space-y-4">
 <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
 <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-stone-950">
 <Sparkles className="w-4.5 h-4.5" />
 </div>
 <span className="font-serif text-xl font-bold tracking-tight text-white">
 Spyce Crafts
 </span>
 </div>
 <p className="text-sm text-stone-400 font-sans leading-relaxed">
 Premium handcrafted resin art, luxury custom acrylic frames, and customized memory gifts. Transforming everyday spaces into curated art galleries.
 </p>
 <div className="flex items-center gap-4 pt-2">
 <a
 id="footer-insta-link"
 href="https://instagram.com/spyce_crafts"
 target="_blank"
 rel="noreferrer"
 className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-primary text-stone-300 hover:text-stone-950 flex items-center justify-center transition-all duration-300 border border-white/5"
 aria-label="Instagram Profile"
 >
 <Instagram className="w-4 h-4" />
 </a>
 <a
 id="footer-phone-direct"
 href="https://wa.me/2349069996290"
 target="_blank"
 rel="noreferrer"
 className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-primary text-stone-300 hover:text-stone-950 flex items-center justify-center transition-all duration-300 border border-white/5"
 aria-label="WhatsApp Contact"
 >
 <Phone className="w-4 h-4" />
 </a>
 </div>
 </div>

 {/* Quick Shop categories Links */}
 <div id="footer-col-shop" className="space-y-4">
 <h4 className="font-serif text-base font-semibold text-white tracking-wide">
 Shop Collections
 </h4>
 <ul className="space-y-2.5 text-sm">
 <li>
 <button
 id="footer-link-resin"
 onClick={() => navigateTo('shop')}
 className="hover:text-brand-primary transition-colors flex items-center gap-1 group text-stone-400"
 >
 Resin Wall Art &amp; Trays
 <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
 </button>
 </li>
 <li>
 <button
 id="footer-link-frames"
 onClick={() => navigateTo('shop')}
 className="hover:text-brand-primary transition-colors flex items-center gap-1 group text-stone-400"
 >
 Acrylic Custom Frames
 <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
 </button>
 </li>
 <li>
 <button
 id="footer-link-portraits"
 onClick={() => navigateTo('shop')}
 className="hover:text-brand-primary transition-colors flex items-center gap-1 group text-stone-400"
 >
 Bespoke Portrait Art
 <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
 </button>
 </li>
 <li>
 <button
 id="footer-link-gifts"
 onClick={() => navigateTo('shop')}
 className="hover:text-brand-primary transition-colors flex items-center gap-1 group text-stone-400"
 >
 Personalized Milestone Gifts
 <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
 </button>
 </li>
 </ul>
 </div>

 {/* Customer Care / Links */}
 <div id="footer-col-bespoke" className="space-y-4">
 <h4 className="font-serif text-base font-semibold text-white tracking-wide">
 Discover More
 </h4>
 <ul className="space-y-2.5 text-sm">
 <li>
 <button
 id="footer-link-customizer"
 onClick={() => navigateTo('shop')}
 className="hover:text-brand-primary transition-colors flex items-center gap-1 group text-stone-400"
 >
 Browse Collections
 <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
 </button>
 </li>
 <li>
 <button
 id="footer-link-blog"
 onClick={() => navigateTo('blog')}
 className="hover:text-brand-primary transition-colors flex items-center gap-1 group text-stone-400"
 >
 Artistry Blog &amp; Styling Guide
 <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
 </button>
 </li>
 <li>
 <a
 id="footer-link-wholesale"
 href="https://wa.me/2349069996290?text=Hello%20Spyce%20Crafts,%20I'm%20interested%20in%20Bulk/Corporate%20customized%20order%20pricing."
 target="_blank"
 rel="noreferrer"
 className="hover:text-brand-primary transition-colors flex items-center gap-1 group text-stone-400"
 >
 Corporate Gift Orders
 <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
 </a>
 </li>
 </ul>
 </div>

 {/* Newsletter Input */}
 <div id="footer-col-newsletter" className="space-y-4">
 <h4 className="font-serif text-base font-semibold text-white tracking-wide">
 The Artisan Circle
 </h4>
 <p className="text-sm text-stone-400 font-sans">
 Subscribe to obtain design launches, offline pop-up alerts, and frame styling secrets.
 </p>
 <form id="footer-newsletter-form" onSubmit={handleSubscribe} className="space-y-2">
 <div className="flex gap-2">
 <input
 id="newsletter-email-input"
 type="email"
 required
 placeholder="name@email.com"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="flex-1 px-4 py-2 text-stone-200 bg-brand-secondary border border-white/10 rounded-lg focus:outline-none focus:border-brand-primary text-sm font-sans"
 />
 <button
 id="newsletter-submit-btn"
 type="submit"
 className="px-4 py-2 rounded-lg bg-brand-primary text-stone-950 text-sm font-bold hover:bg-brand-accent transition-all duration-300 cursor-pointer"
 >
 Join
 </button>
 </div>
 {subscribed && (
 <p id="subscription-success-text" className="text-xs text-brand-primary font-medium animate-pulse">
 Welcome to the circle! Premium updates heading your way soon. ✨
 </p>
 )}
 </form>
 </div>
 </div>

 {/* Brand Meta Details / Contact Address Block */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 text-xs text-stone-400 font-sans border-b border-white/5">
 <div className="flex items-center gap-2">
 <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
 <span>HQ &amp; Atelier: Lagos/Enugu, Nigeria (Worldwide Luxury Delivery)</span>
 </div>
 <div className="flex items-center gap-2">
 <Phone className="w-4 h-4 text-brand-primary shrink-0" />
 <span>WhatsApp Consultation: +234 906 999 6290</span>
 </div>
 <div className="flex items-center gap-2">
 <Mail className="w-4 h-4 text-brand-primary shrink-0" />
 <span>Email Communications: contact@spycecrafts.com</span>
 </div>
 </div>

 {/* Lower copyright bar */}
 <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-stone-400 font-sans gap-4">
 <p>© 2026 Spyce Crafts. Crafted in Lagos. All rights reserved.</p>
 <div className="flex items-center gap-6">
 <a href="#" className="hover:text-brand-primary transition-colors">Privacy Charter</a>
 <a href="#" className="hover:text-brand-primary transition-colors">Terms of Handcrafting</a>
 <a href="#" className="hover:text-brand-primary transition-colors">Delivery Guide</a>
 </div>
 </div>
 </div>
 </footer>
 );
}
