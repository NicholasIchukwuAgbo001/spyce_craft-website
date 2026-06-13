import React from 'react';
import { useCartStore } from '../../store/useCartStore';
import { Sparkles, Heart, Award, ShieldCheck, MapPin, Feather, Compass, Check } from 'lucide-react';

export default function AboutPage() {
 const { navigateTo } = useCartStore();

 const STEPS = [
 {
 num: '01',
 title: 'Botanical Dehydration',
 desc: 'Wedding and anniversary bouquets are delicately suspended and completely dehydrated over 2-3 weeks using clinical-grade crystals to retain their original romantic shape and color hues.',
 },
 {
 num: '02',
 title: 'Multi-Layer Resin Pouring',
 desc: 'We pour premium optical-grade epoxy resin in multiple slow, calculated, ultra-thin layers (less than 8mm per pour) over 72 hours. This prevents high overheating and eliminates micro-bubbling completely.',
 },
 {
 num: '03',
 title: 'Gold-Leaf Embelling',
 desc: 'Our artisans hand-lay micro-thin 24k gold leaf foil, or silver dust speckles, according to custom client sketches to catch room spotlights beautifully.',
 },
 {
 num: '04',
 title: 'Precision Board Mounting',
 desc: 'For quote frames and portraits, high-definition prints are laminated on high-gloss backings and placed inside our signature custom-cut obsidian satin blocks or standoffs.',
 }
 ];

 const TEAM = [
 {
 name: 'Ugochi Spyce',
 role: 'Founder & Lead Resin Artist',
 bio: 'Pioneered custom wedding bouquet resin preservation techniques in Lagos. Obsessed with high-gloss finishes and deep sea aesthetics.',
 image: '/assets/150646.jpg'
 },
 {
 name: 'Dayo Adesina',
 role: 'Master Framer & Woodsmith',
 bio: 'Crafts all satin black frame blocks and frosted acrylic mounts. Over 8 years of custom furniture framing and precision box sizing.',
 image: '/assets/150647.jpg'
 },
 {
 name: 'Grace Okafor',
 role: 'Portraits & Core Designer',
 bio: 'The hand behind all custom faceless outline stencils and gold-leaf overlay sketches. Inspired by Scandinavian minimalist art.',
 image: '/assets/150648.jpg'
 }
 ];

 return (
 <main id="about-us-page-container" className="py-16 bg-white min-h-screen">

 {/* 1. Brand Intro Spotlight */}
 <div id="about-hero-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

 <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
 <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-primary block">Our Sacred Story</span>
 <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-brand-dark">
 We Breathe Art Into <span className="font-normal italic text-brand-primary">Memories</span>
 </h1>
 <p className="font-sans text-stone-500 text-sm sm:text-base leading-relaxed">
 Founded under the creative handle <strong className="text-brand-dark">@spyce_crafts</strong>, Spyce Crafts is Nigeria’s premiere design atelier specializing in preserving life’s most beautiful wedding flowers, hand-sketching faceless family line art portraits, and crafting luxurious high-gloss epoxy catchall wave trays.
 </p>
 <p className="font-sans text-stone-500 text-xs sm:text-sm leading-relaxed">
 What started as a tiny slow-craft experiment in Enugu is now a premium international handcrafted decor house shipping stacks of gorgeous custom frames and wedding floral columns nationwide to thousands of discerning collectors.
 </p>

 <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
 <button
 id="about-action-shop"
 onClick={() => navigateTo('shop')}
 className="px-6 py-3 bg-brand-dark hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
 >
 Browse Collections
 </button>
 <button
 id="about-action-custom"
 onClick={() => navigateTo('shop')}
 className="px-6 py-3 border border-stone-200 hover:border-brand-primary hover:text-brand-primary text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer font-sans"
 >
 Explore Collection
 </button>
 </div>
 </div>

 <div className="lg:col-span-6 relative aspect-video lg:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-stone-100 bg-stone-50">
 <img
 src="/assets/150649.jpg"
 alt="Atelier workspace craft"
 className="w-full h-full object-cover"
 referrerPolicy="no-referrer"
 />
 <div className="absolute top-4 right-4 bg-brand-primary text-white text-[9px] font-bold p-2 px-3 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
 <Sparkles className="w-3.5 h-3.5 animate-spin" />
 <span>Epicenter of Slow Crafts</span>
 </div>
 </div>

 </div>
 </div>

 {/* 2. Core Mission & Vision */}
 <section id="mission-vision-section" className="py-20 bg-brand-muted border-y border-stone-100 my-16">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">

 {/* Mission */}
 <div className="bg-white p-8 sm:p-10 rounded-2xl border border-brand-secondary/40 space-y-4 shadow-sm">
 <div className="w-10 h-10 rounded-xl bg-brand-secondary/50 flex items-center justify-center text-brand-primary">
 <Compass className="w-5 h-5" />
 </div>
 <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Our Studio Mission</h3>
 <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
 To elevate Nigerian handcrafted manufacturing by blending modern Scandinavian minimalism with functional organic elements. We reject mass production in favor of meticulous, slow-poured microbatches that can last families a lifetime.
 </p>
 </div>

 {/* Vision */}
 <div className="bg-white p-8 sm:p-10 rounded-2xl border border-brand-secondary/40 space-y-4 shadow-sm">
 <div className="w-10 h-10 rounded-xl bg-brand-secondary/50 flex items-center justify-center text-brand-primary">
 <Feather className="w-5 h-5" />
 </div>
 <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Our Design Vision</h3>
 <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
 To build an interactive, digital co-design ecosystem where anyone can bring Pinterest ideas to life. We strive to be the international symbol of African creative craftsmanship—preserving real memories, one floral block at a time.
 </p>
 </div>

 </div>
 </div>
 </section>

 {/* 3. The Slow Curing Atelier Craft Process */}
 <section id="craft-process-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-16">
 <div className="text-center space-y-3">
 <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-primary">Rigorous Standards</span>
 <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
 Inside the Spyce Crafts Atelier
 </h2>
 <p className="text-stone-600 max-w-xl mx-auto text-xs sm:text-sm">
 Learn how we prevent epoxy resin discoloration, dry wedding blooms perfectly, and frame stencils with zero air pockets.
 </p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
 {STEPS.map((step) => (
 <div
 id={`process-block-${step.num}`}
 key={step.num}
 className="p-6 rounded-2xl border border-stone-100 flex flex-col justify-between space-y-6 hover:border-brand-primary transition-colors"
 >
 <div className="space-y-4">
 <span className="font-mono text-4xl font-bold text-brand-primary/20 leading-none block">
 {step.num}
 </span>
 <h4 className="font-serif text-base font-bold text-white">
 {step.title}
 </h4>
 <p className="text-xs text-stone-600 font-sans leading-relaxed">
 {step.desc}
 </p>
 </div>
 <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-emerald-600 font-sans font-semibold">
 <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
 <span>Verified Studio Step</span>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* 4. Meet our Master Craftsmen */}
 <section id="team-section" className="py-20 bg-stone-50 border-t border-stone-100 mt-16">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
 <div className="text-center space-y-3">
 <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-primary">The Human Hands</span>
 <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
 Meet Our Artisan Collective
 </h2>
 <p className="text-stone-600 max-w-xl mx-auto text-xs sm:text-sm">
 We are a collective of Lagos-based artists, wood smiths, and illustrators dedicated to slow, boutique luxury decor.
 </p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
 {TEAM.map((member) => (
 <div
 id={`team-card-${member.name.replace(/\s/g, '').toLowerCase()}`}
 key={member.name}
 className="bg-white rounded-2xl border border-stone-200/50 overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
 >
 <div className="aspect-square bg-stone-100 overflow-hidden relative">
 <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
 <div className="absolute top-4 left-4 bg-brand-dark/8xl bg-black/60 text-[9px] text-white font-mono uppercase px-2 py-0.5 rounded">
 HQ member
 </div>
 </div>
 <div className="p-6 space-y-2">
 <h4 className="font-serif text-lg font-bold text-white">{member.name}</h4>
 <span className="text-[10px] tracking-wider uppercase text-brand-primary font-sans font-bold block">{member.role}</span>
 <p className="text-xs text-stone-500 font-sans leading-normal pt-2 border-t border-stone-50">
 {member.bio}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* 5. Metrics Achievements */}
 <section id="achievements-section" className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
 <div className="space-y-1">
 <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark block">15,000+</span>
 <span className="text-[10px] uppercase text-stone-200 font-sans font-bold block tracking-wider">Happy Collectors</span>
 </div>
 <div className="space-y-1">
 <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark block">36 States</span>
 <span className="text-[10px] uppercase text-stone-200 font-sans font-bold block tracking-wider">Nationwide Delivery</span>
 </div>
 <div className="space-y-1">
 <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark block">100% CURED</span>
 <span className="text-[10px] uppercase text-stone-200 font-sans font-bold block tracking-wider">Anti-Yellow Resin</span>
 </div>
 <div className="space-y-1">
 <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark block">380+ Litres</span>
 <span className="text-[10px] uppercase text-stone-200 font-sans font-bold block tracking-wider">Epoxy Hand-Poured</span>
 </div>
 </div>
 </section>

 </main>
 );
}
