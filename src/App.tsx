import React, { useState } from 'react';
import { useCartStore } from './store/useCartStore';

// Layout Imports
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';

// Home Screen Modular Imports
import Hero from './components/home/Hero';
import PortfolioGallery from './components/home/PortfolioGallery';
import WhyChooseUs from './components/home/WhyChooseUs';
import HowItWorks from './components/home/HowItWorks';

// Router Core Screens
import ShopPage from './components/shop/ShopPage';
import ProductDetailPage from './components/shop/ProductDetailPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import BlogView from './components/blog/BlogView';
import GalleryPage from './components/gallery/GalleryPage';
import AboutPage from './components/about/AboutPage';
import ContactPage from './components/contact/ContactPage';
import WishlistPage from './components/wishlist/WishlistPage';
import CartPage from './components/cart/CartPage';
import DynamicSubView from './components/layout/DynamicSubView';

// Iconography
import {
  ChevronRight,
  MessageSquare,
  Instagram,
  Mail,
  MapPin,
  Heart,
  HelpCircle,
  Clock,
  Star,
  Send,
  Phone,
  Bookmark,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PRODUCTS } from './data/products';

export default function App() {
  const { currentView, navigateTo } = useCartStore();

  // Contact Form local state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // FAQ Accordion Open states
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true, // First open by default
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactMsg) {
      setContactSuccess(true);
      setTimeout(() => {
        setContactName('');
        setContactEmail('');
        setContactMsg('');
        setContactSuccess(false);
      }, 5000);
    }
  };

  const toggleFaq = (idx: number) => {
    setFaqOpen((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const FAQS = [
    {
      q: 'How long does it take to produce a custom resin frame or bouquet block?',
      a: 'Since all custom creations are hand-poured in slow, calculated layers to avoid overheating and bubbling, production takes about 3 to 7 business days for optimal curing. Once fully polished and checked, we bubble-wrap and dispatch.',
    },
    {
      q: 'Do you ship to other states outside Lagos/Enugu?',
      a: 'Yes, we provide safe nationwide delivery across Nigeria (including Abuja, Port Harcourt, Kaduna, Ibadan, etc.) and worldwide shipping for select premium pieces. We double-layer our cardboard wrapping to avoid cracking during transport.',
    },
    {
      q: 'How does payment work if there is no credit card checkout?',
      a: 'Once you checkout your items, our system automatically redirects you to WhatsApp with a beautifully compiled cart summary log. Our lead designer will verify your customization choices and send a standard pro-forma invoice with bank details to confirm.',
    },
    {
      q: 'Will the epoxy resin yellow or lose its luster over time?',
      a: 'Never! We use premium-imported visual-grade high-gloss epoxy resins with active UV-stabilizer blockers that resist yellowing, cracking, or warping under standard home lighting conditions.',
    },
    {
      q: 'Can I send you dynamic size specifications or personal photo ideas from my Pinterest boards?',
      a: 'Yes, absolutely! That is exactly our specialty. You can use our interactive Co-Design Atelier Customizer tool to select custom dimensions, frame colors, enter custom motivational texts, or upload your favorite Pinterest reference files directly.',
    }
  ];

  const TESTIMONIALS = [
    {
      id: 't1',
      name: 'Deborah Kolawole',
      loc: 'Lekki, Lagos',
      review: 'My wedding bouquet preservation is the most beautiful thing in my home. Spyce Crafts captured the real pink hues of the roses perfectly inside a clear hexagon block. Worth every single Naira!',
      stars: 5,
    },
    {
      id: 't2',
      name: 'Emeka Nwosu',
      loc: 'Wuse, Abuja',
      review: 'I ordered three typographical satin black frames (“TAKE RISKS”, “KEEP GOING”, “WORK HARD”) for my study desk. Standard of finish is immaculate. Packaged perfectly for shipping.',
      stars: 5,
    },
    {
      id: 't3',
      name: 'Ifeoma Okafor',
      loc: 'Port Harcourt',
      review: 'The Couples Portrait Line Art Frame made my anniversary. My husband literally teared up. The gold foil details are extremely elegant. Incredible craft!',
      stars: 5,
    }
  ];

  // Specific high-view TikTok screenshot references from Spyce Crafts feeds
  const SOCIAL_FEED = [
    {
      id: 'sf1',
      views: '395.7K',
      title: 'A resin artist & Pinterest frame vendor',
      desc: 'Bespoke handcraft on focus',
      url: '/assets/150630.jpg'
    },
    {
      id: 'sf2',
      views: '334.8K',
      title: 'Be Still | Know | I am God',
      desc: 'Three-panel bedroom decor series',
      url: '/assets/150631.jpg'
    },
    {
      id: 'sf3',
      views: '213K',
      title: 'Walking Pinterest Frame vendor packing stacks',
      desc: 'Packaging luxury shipments nationwide',
      url: '/assets/150633.jpg'
    },
    {
      id: 'sf4',
      views: '15K',
      title: 'Customized acrylic frame layouts',
      desc: 'Elegant motivational scripts on acrylic glass',
      url: '/assets/150634.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-secondary flex flex-col text-[#ECE9E4] font-sans selection:bg-brand-primary/20 selection:text-brand-primary">

      {/* Shared Navigation Header */}
      <Navbar />

      {/* Main Dynamic View Content Swapper */}
      <div className="grow">
        {currentView === 'home' && (
          <div id="home-view-elements" className="animate-fadeIn">

            {/* 1. Hero Spotlight */}
            <Hero />

            {/* 2. Featured Categories Section (Jump directly to Shop filters!) */}
            <section id="featured-categories-section" className="py-20 bg-stone-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center space-y-3 mb-16">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-primary">Artisan Catalogue</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                    Explore Curated Categories
                  </h2>
                  <p className="text-stone-500 font-sans max-w-xl mx-auto text-xs sm:text-sm">
                    Select your preferred handcrafted aesthetic. Clicking any card redirects you directly to the filtered catalog.
                  </p>
                </div>

                {/* 3x3 category grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Resin Art', img: '/assets/150635.jpg', desc: 'Lustrous ocean catchalls & trays' },
                    { name: 'Custom Frames', img: '/assets/150636.jpg', desc: 'Typographical quote blocks & standoffs' },
                    { name: 'Portrait Frames', img: '/assets/150637.jpg', desc: 'Bespoke hand-sketched couple outline frames' },
                    { name: 'Home Decor', img: '/assets/150638.jpg', desc: 'Warm minimalist living space items' },
                    { name: 'Personalized Gifts', img: '/assets/150639.jpg', desc: '9-grid polaroids & milestone items' },
                    { name: 'Wedding Gifts', img: '/assets/150640.jpg', desc: 'Dehydrated bouquet resin preservation blocks' }
                  ].map((cat, idx) => (
                    <div
                      id={`home-category-${idx}`}
                      key={cat.name}
                      onClick={() => navigateTo('shop')} // Redirects to Shop
                      className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl aspect-16/10 cursor-pointer bg-stone-100 transition-all duration-300"
                    >
                      <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-linear-to-t from-brand-dark/95 via-brand-dark/20 to-transparent flex flex-col justify-end p-6" />
                      <div className="absolute bottom-6 left-6 text-white space-y-1">
                        <span className="font-serif text-lg sm:text-xl font-bold tracking-tight block group-hover:text-brand-primary transition-colors">
                          {cat.name}
                        </span>
                        <span className="text-[10px] tracking-wide text-brand-secondary/80 font-sans block leading-none font-light">
                          {cat.desc}
                        </span>
                      </div>
                      <span className="absolute bottom-6 right-6 p-2 rounded-full bg-white/15 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity text-white">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Portfolio Masonry Feed (Pinterest-Style) */}
            <PortfolioGallery />

            {/* 4. Why Choose Us Standard value cards */}
            <WhyChooseUs />

            {/* 5. How It Works Pipeline */}
            <HowItWorks />

            {/* 6. Testimonials Carousel Layout */}
            <section id="testimonials-section" className="py-20 bg-brand-muted">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center space-y-3 mb-16">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-primary">Real Love Story</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                    Loved by Discerning Collectors
                  </h2>
                  <p className="text-stone-500 font-sans max-w-xl mx-auto text-xs sm:text-sm">
                    Read beautiful reviews of actual client shipments and custom invoice completions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((test, idx) => (
                    <div
                      id={`testimonial-${test.id}`}
                      key={test.id}
                      className="p-8 sm:p-10 rounded-2xl bg-white border border-brand-secondary/40 space-y-4 relative shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(test.stars)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <p className="text-stone-600 text-xs sm:text-sm italic leading-relaxed font-sans font-light">
                        "{test.review}"
                      </p>
                      <div className="pt-4 border-t border-brand-secondary/20 flex justify-between items-center text-xs">
                        <span className="font-bold text-brand-dark font-sans">{test.name}</span>
                        <span className="text-stone-400 font-sans">{test.loc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. Social Proof Section (TikTok / Instagram screenshot-accurate mockup) */}
            <section id="social-proof-section" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center space-y-3 mb-12">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-primary">Viral Feed Presence</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                    As Seen on TikTok &amp; Instagram
                  </h2>
                  <p className="text-stone-500 font-sans max-w-xl mx-auto text-xs sm:text-sm">
                    Our workspace processes, packaging stack lines, and frame design files regular clear massive organic followings.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {SOCIAL_FEED.map((post) => (
                    <div
                      id={`social-post-${post.id}`}
                      key={post.id}
                      className="rounded-2xl overflow-hidden bg-stone-50 border border-stone-200 relative group aspect-3/4"
                    >
                      <img src={post.url} alt={post.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-linear-to-t from-brand-dark/90 via-transparent to-transparent opacity-90" />

                      {/* Floating View overlay representing TikTok metric */}
                      <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-10 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                        {post.views} views
                      </span>

                      <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10 text-[11px]">
                        <span className="font-semibold block font-sans truncate">{post.title}</span>
                        <span className="text-stone-300 block text-[9px] truncate font-light font-sans">{post.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtext CTA */}
                <div className="text-center pt-8 mt-4 space-x-4">
                  <a
                    id="tiktok-follow-cta"
                    href="https://tiktok.com/@spyce_crafts"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-dark hover:text-brand-primary font-bold font-sans uppercase tracking-wider"
                  >
                    <span>Follow @spyce_crafts on TikTok</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>
                  <span className="text-stone-300 hidden sm:inline">|</span>
                  <a
                    id="insta-follow-cta"
                    href="https://instagram.com/spyce_crafts"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-dark hover:text-brand-primary font-bold font-sans uppercase tracking-wider"
                  >
                    <span>Follow on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>
                </div>
              </div>
            </section>

            {/* 8. Frequently Asked Questions accordion */}
            <section id="faq-section" className="py-20 bg-stone-50 border-t border-brand-secondary/30">
              <div className="max-w-4xl mx-auto px-4 sm:px-6">

                <div className="text-center space-y-3 mb-16">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-primary">Help Hub</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                    Design Questions? We Answered.
                  </h2>
                </div>

                {/* FAQ List */}
                <div id="faq-list" className="space-y-4">
                  {FAQS.map((faq, idx) => {
                    const isOpen = !!faqOpen[idx];
                    return (
                      <div
                        id={`faq-item-row-${idx}`}
                        key={idx}
                        className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden shadow-sm"
                      >
                        <button
                          id={`faq-toggle-btn-${idx}`}
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          className="w-full text-left px-6 py-5 flex items-center justify-between font-serif text-base font-bold text-brand-dark select-none"
                        >
                          <span>{faq.q}</span>
                          {isOpen ? <ChevronUp className="w-4.5 h-4.5 text-brand-primary shrink-0" /> : <ChevronDown className="w-4.5 h-4.5 text-stone-400 shrink-0" />}
                        </button>

                        {isOpen && (
                          <div id={`faq-answer-block-${idx}`} className="px-6 pb-5 font-sans text-xs sm:text-sm text-stone-500 leading-relaxed border-t border-stone-50 pt-3 animate-fadeIn">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 9. Contact Section with dual maps & email action */}
            <section id="contact-section" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                  {/* Left Side: Address Details */}
                  <div className="lg:col-span-5 space-y-8">
                    <div className="space-y-3 text-center lg:text-left">
                      <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-primary">Direct Contact Lines</span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                        Visit or Chat With Us
                      </h2>
                      <p className="text-stone-500 font-sans text-xs sm:text-sm leading-relaxed">
                        Have bulk inquiries, corporate plaque orders, or need flower preservation guides? Connect instantly or send a direct letter.
                      </p>
                    </div>

                    <div className="space-y-6 font-sans text-xs sm:text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
                        <div>
                          <strong className="block text-brand-dark mb-0.5">Headquarters &amp; Atelier Block</strong>
                          <span className="text-stone-500 leading-relaxed block">Lagos Main Hub (Nationwide Delivery Line Available). Enugu workshop branch. Nigeria</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                        <div>
                          <strong className="block text-brand-dark mb-0.5">WhatsApp hotline</strong>
                          <span className="text-stone-500 block">09069996290 (International: +234 906 999 6290)</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                        <div>
                          <strong className="block text-brand-dark mb-0.5">Electronic Mail</strong>
                          <span className="text-stone-500 block">contact@spycecrafts.com</span>
                        </div>
                      </div>
                    </div>

                    {/* Google Map Mockup Box (Luxury Styled Placeholder) */}
                    <div id="map-placeholder" className="rounded-2xl overflow-hidden aspect-video border border-stone-200 bg-stone-100 flex flex-col justify-center items-center text-center p-6 relative">
                      <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('/assets/150641.jpg')" }} />
                      <div className="w-10 h-10 rounded-full bg-brand-secondary/80 flex items-center justify-center text-brand-primary animate-pulse mb-3">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif text-sm font-bold text-brand-dark z-10">Lagos &amp; Enugu Atelier Maps</h4>
                      <p className="text-[10px] text-stone-400 font-sans max-w-xs z-10 leading-normal">Our closed physical ateliers can be visited upon scheduling deposit orders. Free transport coordination.</p>
                    </div>
                  </div>

                  {/* Right Side: Interactive Quick Message Email Web Form */}
                  <div className="lg:col-span-7 bg-brand-muted p-8 sm:p-12 rounded-3xl border border-brand-secondary/40 space-y-6">
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">Send a Message</h3>
                      <p className="text-xs text-stone-500 font-sans">Our average electronic correspondence response time is under 12 hours.</p>
                    </div>

                    <form id="contact-form-widget" onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase text-stone-400 font-sans font-bold block tracking-wider">Your Name *</label>
                          <input
                            id="contact-name-input"
                            type="text"
                            required
                            placeholder="e.g. Ama Okafor"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-xs"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase text-stone-400 font-sans font-bold block tracking-wider">Your Email</label>
                          <input
                            id="contact-email-input"
                            type="email"
                            placeholder="e.g. name@email.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-xs"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs uppercase text-stone-400 font-sans font-bold block tracking-wider">Message Details *</label>
                        <textarea
                          id="contact-msg-textarea"
                          rows={4}
                          required
                          placeholder="Describe your bulk plaque designs or flower bouquet dimensions..."
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-xs"
                        />
                      </div>

                      <button
                        id="contact-submit-btn"
                        type="submit"
                        className="w-full py-3.5 bg-brand-dark hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-brand-secondary" />
                        <span>Send Message</span>
                      </button>

                      {contactSuccess && (
                        <p id="contact-success-response" className="text-xs text-emerald-600 font-medium text-center animate-pulse">
                          Message sent! Our artisans will review your specifics and follow back over email soon. ✨
                        </p>
                      )}
                    </form>
                  </div>

                </div>
              </div>
            </section>

          </div>
        )}

        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product-detail' && <ProductDetailPage />}
        {currentView === 'blog' && <BlogView />}
        {currentView === 'blog-detail' && <BlogView />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'gallery' && <GalleryPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'dynamic-subview' && <DynamicSubView />}
      </div>

      {/* Shared Cart slide-out Drawer overlay */}
      <CartDrawer />

      {/* Shared Editorial Footer */}
      <Footer />

    </div>
  );
}
