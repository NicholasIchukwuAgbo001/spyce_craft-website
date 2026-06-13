/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useCartStore } from '../../store/useCartStore';
import {
  ShoppingBag,
  Menu,
  X,
  MessageSquare,
  Sparkles,
  Heart,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkle,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  BookOpen,
  Gift,
  Clock,
  HelpCircle,
  Award,
  Image,
  Truck,
  HeartHandshake,
  Users,
  Briefcase,
  Layers,
  ChevronRight,
  TrendingUp,
  Flame,
  BadgeAlert,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export default function Navbar() {
  const { currentView, navigateTo, items, wishlist, setCartOpen } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Header announcements utility bar rotation
  const announcements = [
    { text: "✨ 340+ Happy Clients Nationwide", actionLabel: "View Reviews", targetView: "about" as const },
    { text: "🚚 Nationwide and Worldwide Luxury Delivery", actionLabel: "View Portfolio", targetView: "gallery" as const },
    { text: "🎁 Personalized Milestone Gifts Available", actionLabel: "Browse Gifts", targetView: "shop" as const },
    { text: "📱 Direct Client Ordering via WhatsApp", actionLabel: "Chat Now", link: "https://wa.me/2349069996290" }
  ];
  const [currentAnnouncementIdx, setCurrentAnnouncementIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Handle focus on search show
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigateTo('shop');
      setSearchOpen(false);
    }
  };

  const toggleMobileCategory = (catName: string) => {
    if (expandedMobileCategory === catName) {
      setExpandedMobileCategory(null);
    } else {
      setExpandedMobileCategory(catName);
    }
  };

  // Helper to handle sub-navigation click actions elegantly
  const handleSubnavClick = (destView: any, subTopic: string) => {
    const mainCategories = ['Home', 'Shop All', 'Gallery', 'Custom Order', 'Blog', 'About Us', 'Contact Us'];
    const isMainCategory = mainCategories.includes(subTopic);

    if (isMainCategory) {
      navigateTo(destView, null, null);
    } else {
      navigateTo('dynamic-subview', null, subTopic);
    }
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
    console.log(`Navigating to screen for ${subTopic}...`);
  };

  return (
    <>
      {/* 1. Header Utility Bar: Elegant Dark Sleek Announcement Ticker */}
      <div id="header-utility-bar" className="bg-[#121215] text-[11px] sm:text-xs text-stone-300 font-sans tracking-wide border-b border-white/5 py-2.5 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">

          {/* Static announcements or rotational element with nice transitions */}
          <div className="flex items-center gap-2 overflow-hidden h-5">
            <span className="font-semibold text-brand-primary flex items-center gap-1.5 animate-pulse">
              {announcements[currentAnnouncementIdx].text}
            </span>
          </div>

          {/* Quick links side */}
          <div className="hidden md:flex items-center gap-5 text-stone-400">
            <div className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-brand-primary" />
              <span>Free delivery on orders above ₦100k</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Primary Layout Sticky Header */}
      <header id="main-navigation-header" className="sticky top-[38px] sm:top-[38px] md:top-[38px] z-40 w-full transition-all duration-300 bg-brand-secondary/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* BRAND LOGO */}
            <div
              id="brand-logo-container"
              className="flex items-center gap-3 cursor-pointer group shrink-0"
              onClick={() => navigateTo('home')}
            >
              <div className="w-10.5 h-10.5 rounded-full bg-brand-primary flex items-center justify-center text-brand-secondary shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5.5 h-5.5 animate-pulse" />
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-brand-primary transition-colors duration-300">
                  Spyce Crafts
                </span>
                <span className="block text-[9px] tracking-widest uppercase font-sans text-stone-400">
                  Resin &amp; Frame Atelier
                </span>
              </div>
            </div>

            {/* DESKTOP NAVIGATION TABS */}
            <nav id="desktop-megamenu-nav" className="hidden lg:flex items-center gap-7">

              {/* Home */}
              <button
                onClick={() => handleSubnavClick('home', 'Home')}
                className={`text-xs font-semibold tracking-wider uppercase transition-colors py-2 cursor-pointer relative ${currentView === 'home' ? 'text-brand-primary font-bold' : 'text-stone-300 hover:text-brand-accent'
                  }`}
              >
                <span>Home</span>
                {currentView === 'home' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
                )}
              </button>

              {/* Shop Tab with Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('shop')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  onClick={() => handleSubnavClick('shop', 'Shop All')}
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors py-2 flex items-center gap-1 cursor-pointer ${currentView === 'shop' ? 'text-brand-primary font-bold' : 'text-stone-300 hover:text-brand-accent'
                    }`}
                >
                  <span>Shop</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeMegaMenu === 'shop' && (
                  <div
                    id="megamenu-shop"
                    className="absolute left-1/2 translate-x-[-25%] top-8 w-[720px] bg-[#111114]/95 border border-white/10 rounded-2xl shadow-2xl p-6 grid grid-cols-4 gap-6 animate-fadeIn text-left backdrop-blur-xl"
                  >
                    {/* Column 1: Resin Art */}
                    <div className="space-y-3 font-sans">
                      <div className="flex items-center gap-1.5 border-b border-white/5 pb-1">
                        <Sparkle className="w-3.5 h-3.5 text-brand-primary" />
                        <h4 className="text-[11px] uppercase tracking-wider text-brand-primary font-bold">Resin Art</h4>
                      </div>
                      <ul className="space-y-2 text-xs text-stone-400">
                        {['All Products', 'Resin Wall Art', 'Resin Coasters', 'Resin Trays', 'Resin Clocks', 'Resin Decor'].map((sub) => (
                          <li key={sub} className="hover:text-white cursor-pointer font-light hover:pl-1 transition-all duration-300" onClick={() => handleSubnavClick('shop', sub)}>
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Custom Frames */}
                    <div className="space-y-3 font-sans">
                      <div className="flex items-center gap-1.5 border-b border-white/5 pb-1">
                        <Award className="w-3.5 h-3.5 text-brand-primary" />
                        <h4 className="text-[11px] uppercase tracking-wider text-brand-primary font-bold">Custom Frames</h4>
                      </div>
                      <ul className="space-y-2 text-xs text-stone-400">
                        {['Portrait Frames', 'Family Frames', 'Baby Frames', 'Graduation Frames', 'Memory Frames'].map((sub) => (
                          <li key={sub} className="hover:text-white cursor-pointer font-light hover:pl-1 transition-all duration-300" onClick={() => handleSubnavClick('shop', sub)}>
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 3: Personalized Gifts */}
                    <div className="space-y-3 font-sans">
                      <div className="flex items-center gap-1.5 border-b border-white/5 pb-1">
                        <Gift className="w-3.5 h-3.5 text-brand-primary" />
                        <h4 className="text-[11px] uppercase tracking-wider text-brand-primary font-bold">Personalized</h4>
                      </div>
                      <ul className="space-y-2 text-xs text-stone-400">
                        {['Name Plaques', 'Birthday Gifts', 'Anniversary Gifts', 'Couple Gifts', 'Custom Gifts'].map((sub) => (
                          <li key={sub} className="hover:text-white cursor-pointer font-light hover:pl-1 transition-all duration-300" onClick={() => handleSubnavClick('shop', sub)}>
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 4: Home Decor */}
                    <div className="space-y-3 font-sans">
                      <div className="flex items-center gap-1.5 border-b border-white/5 pb-1">
                        <Layers className="w-3.5 h-3.5 text-brand-primary" />
                        <h4 className="text-[11px] uppercase tracking-wider text-brand-primary font-bold">Home Decor</h4>
                      </div>
                      <ul className="space-y-2 text-xs text-stone-400">
                        {['Wall Decor', 'Luxury Decor', 'Modern Decor', 'Table Decor', 'Decorative Accessories'].map((sub) => (
                          <li key={sub} className="hover:text-white cursor-pointer font-light hover:pl-1 transition-all duration-300" onClick={() => handleSubnavClick('shop', sub)}>
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Quick Bar inside Shop Mega Menu */}
                    <div className="col-span-4 border-t border-white/5 pt-4 mt-2 flex flex-wrap gap-4 text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider justify-between">
                      <div className="flex flex-wrap gap-4">
                        <button onClick={() => handleSubnavClick('shop', 'Wedding Gifts')} className="hover:text-brand-accent transition-colors flex items-center gap-1">
                          <Heart className="w-3 h-3 text-red-500 fill-red-500" /> Wedding Gifts
                        </button>
                        <button onClick={() => handleSubnavClick('shop', 'Corporate Gifts')} className="hover:text-brand-accent transition-colors flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-brand-primary" /> Corporate Gifts
                        </button>
                        <button onClick={() => handleSubnavClick('shop', 'Best Sellers')} className="hover:text-brand-accent transition-colors flex items-center gap-1">
                          <Flame className="w-3 h-3 text-orange-500 fill-orange-500" /> Best Sellers
                        </button>
                        <button onClick={() => handleSubnavClick('shop', 'New Arrivals')} className="hover:text-brand-accent transition-colors flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-yellow-400 fill-yellow-400" /> New Arrivals
                        </button>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => handleSubnavClick('shop', 'Trending')} className="hover:text-brand-primary font-bold flex items-center gap-0.5">
                          <TrendingUp className="w-3.5 h-3.5" /> Trending
                        </button>
                        <button onClick={() => handleSubnavClick('shop', 'Sale')} className="hover:text-pink-400 font-bold flex items-center gap-0.5">
                          <BadgeAlert className="w-3.5 h-3.5" /> Sale
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Collections Tab */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('collections')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors py-2 flex items-center gap-1 cursor-pointer ${currentView === 'shop' ? 'text-brand-primary font-bold' : 'text-stone-300 hover:text-brand-accent'
                    }`}
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeMegaMenu === 'collections' && (
                  <div
                    id="megamenu-collections"
                    className="absolute left-1/2 translate-x-[-50%] top-8 w-[240px] bg-[#111114] border border-white/10 rounded-2xl shadow-2xl p-4 animate-fadeIn text-left"
                  >
                    <ul className="space-y-1 text-xs text-stone-300">
                      {[
                        'Luxury Collection',
                        'Wedding Collection',
                        'Home Collection',
                        'Gift Collection',
                        'Premium Resin Collection',
                        'Executive Collection',
                        'Seasonal Collection',
                        'Limited Edition'
                      ].map((item) => (
                        <li key={item} className="p-2 hover:bg-white/5 hover:text-brand-accent rounded-lg cursor-pointer transition-colors" onClick={() => handleSubnavClick('shop', item)}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Gallery Tab */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('gallery')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  onClick={() => handleSubnavClick('gallery', 'Gallery')}
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors py-2 flex items-center gap-1 cursor-pointer ${currentView === 'gallery' ? 'text-brand-primary font-bold' : 'text-stone-300 hover:text-brand-accent'
                    }`}
                >
                  <span>Gallery</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeMegaMenu === 'gallery' && (
                  <div
                    id="megamenu-gallery"
                    className="absolute left-1/2 translate-x-[-50%] top-8 w-[260px] bg-[#111114] border border-white/10 rounded-2xl shadow-2xl p-4 animate-fadeIn text-left"
                  >
                    <ul className="space-y-1 text-xs text-stone-300 font-sans">
                      {[
                        'All Projects',
                        'Resin Art Gallery',
                        'Custom Frames Gallery',
                        'Home Decor Gallery',
                        'Wedding Projects',
                        'Corporate Projects',
                        'Client Installations',
                        'Before & After',
                        'Video Gallery'
                      ].map((item) => (
                        <li key={item} className="p-2 hover:bg-white/5 hover:text-brand-primary rounded-lg cursor-pointer transition-colors flex items-center justify-between" onClick={() => handleSubnavClick('gallery', item)}>
                          <span>{item}</span>
                          <ChevronRight className="w-3 h-3 opacity-30 group-hover:opacity-100" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Blog Tab */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('blog')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  onClick={() => handleSubnavClick('blog', 'Blog')}
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors py-2 flex items-center gap-1 cursor-pointer ${currentView === 'blog' ? 'text-brand-primary font-bold' : 'text-stone-300 hover:text-brand-accent'
                    }`}
                >
                  <span>Blog</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeMegaMenu === 'blog' && (
                  <div
                    id="megamenu-blog"
                    className="absolute left-1/2 translate-x-[-50%] top-8 w-[250px] bg-[#111114] border border-white/10 rounded-2xl shadow-2xl p-4 animate-fadeIn text-left"
                  >
                    <ul className="space-y-1 text-xs text-stone-300">
                      {[
                        'Resin Art Inspiration',
                        'Gift Ideas',
                        'Home Decor Tips',
                        'Interior Styling',
                        'Wedding Inspiration',
                        'Corporate Gifting',
                        'Care & Maintenance Guides'
                      ].map((item) => (
                        <li key={item} className="p-2 hover:bg-white/5 hover:text-brand-accent rounded-lg cursor-pointer transition-colors" onClick={() => handleSubnavClick('blog', item)}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* About Tab */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('about')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  onClick={() => handleSubnavClick('about', 'About Us')}
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors py-2 flex items-center gap-1 cursor-pointer ${currentView === 'about' ? 'text-brand-primary font-bold' : 'text-stone-300 hover:text-brand-accent'
                    }`}
                >
                  <span>About</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeMegaMenu === 'about' && (
                  <div
                    id="megamenu-about"
                    className="absolute left-1/2 translate-x-[-50%] top-8 w-[240px] bg-[#111114] border border-white/10 rounded-2xl shadow-2xl p-4 animate-fadeIn text-left"
                  >
                    <ul className="space-y-1 text-xs text-stone-300">
                      {[
                        'Our Story',
                        'Mission & Vision',
                        'Craftsmanship Process',
                        'Meet The Team',
                        'Customer Reviews',
                        'FAQs',
                        'Press & Features'
                      ].map((item) => (
                        <li key={item} className="p-2 hover:bg-white/5 hover:text-brand-accent rounded-lg cursor-pointer transition-colors" onClick={() => handleSubnavClick('about', item)}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Contact Tab */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('contact')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  onClick={() => handleSubnavClick('contact', 'Contact Us')}
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors py-2 flex items-center gap-1 cursor-pointer ${currentView === 'contact' ? 'text-brand-primary font-bold' : 'text-stone-300 hover:text-brand-accent'
                    }`}
                >
                  <span>Contact</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeMegaMenu === 'contact' && (
                  <div
                    id="megamenu-contact"
                    className="absolute left-1/2 translate-x-[-50%] top-8 w-[240px] bg-[#111114] border border-white/10 rounded-2xl shadow-2xl p-4 animate-fadeIn text-left"
                  >
                    <ul className="space-y-1 text-xs text-stone-300">
                      {[
                        { label: 'Contact Us', view: 'contact' as const },
                        { label: 'WhatsApp Direct', url: 'https://wa.me/2349069996290' },
                        { label: 'Instagram Feed', url: 'https://instagram.com/spyce_crafts' },
                        { label: 'Facebook Page', url: '#' },
                        { label: 'TikTok Studio', url: '#' },
                        { label: 'Email Support', view: 'contact' as const },
                        { label: 'Business Hours', view: 'contact' as const },
                        { label: 'Atelier Location', view: 'contact' as const }
                      ].map((item) => (
                        <li
                          key={item.label}
                          className="p-2 hover:bg-white/5 hover:text-brand-accent rounded-lg cursor-pointer transition-colors flex items-center justify-between"
                          onClick={() => {
                            if (item.url) {
                              window.open(item.url, '_blank');
                            } else {
                              handleSubnavClick(item.view, item.label);
                            }
                          }}
                        >
                          <span>{item.label}</span>
                          {item.url && <Sparkle className="w-2.5 h-2.5 text-emerald-400" />}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </nav>

            {/* UTILITIES BAR - Desktop Cart, Wish, Direct WhatsApp */}
            <div id="nav-utilities" className="flex items-center gap-3">

              {/* Quick Lens Search bar */}
              <div className="relative flex items-center">
                {searchOpen ? (
                  <form id="navbar-search-inline" onSubmit={handleSearchSubmit} className="flex items-center animate-fadeIn">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search resins or frames..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="px-3 py-1.5 bg-[#121216] text-xs border border-white/10 rounded-lg text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-brand-primary w-36 sm:w-44 transition-all"
                    />
                    <button
                      id="search-close-x-btn"
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchText('');
                      }}
                      className="p-1 text-stone-400 hover:text-stone-100 ml-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <button
                    id="search-trigger-lens"
                    onClick={() => setSearchOpen(true)}
                    className="p-2 rounded-full hover:bg-white/5 text-stone-200 transition-all cursor-pointer"
                    aria-label="Search items"
                  >
                    <Search className="w-5 h-5 opacity-80" />
                  </button>
                )}
              </div>

              {/* Wishlist Icon */}
              <button
                _id="navbar-wishlist-icon"
                onClick={() => navigateTo('wishlist')}
                className="relative p-2 rounded-full hover:bg-white/5 text-stone-200 transition-all cursor-pointer"
                aria-label="My Wishlist"
              >
                <Heart className={`w-5 h-5 opacity-80 ${wishlistCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[8px] font-bold flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Icon */}
              <button
                id="navbar-cart-icon"
                onClick={() => navigateTo('cart')}
                className="relative p-2 rounded-full hover:bg-white/5 text-stone-200 transition-all cursor-pointer"
                aria-label="Items inside cart"
              >
                <ShoppingBag className="w-5 h-5 opacity-80" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-brand-primary text-stone-950 text-[8px] font-bold flex items-center justify-center rounded-full animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* WhatsApp direct order quick link for Desktop only */}
              <a
                id="nav-whatsapp-cta-direct"
                href="https://wa.me/2349069996290"
                target="_blank"
                rel="noreferrer"
                className="hidden xl:flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/60 text-emerald-300 font-bold text-xs transition-all duration-300 shadow-xl shrink-0 border border-emerald-500/25 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 animate-pulse animate-duration-1000" />
                <span>WhatsApp Order</span>
              </a>

              {/* Mobile Drawer Hamburger Button */}
              <button
                id="mobile-drawer-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -mr-2 text-white hover:text-brand-primary lg:hidden transition-colors cursor-pointer"
                aria-label="Toggle Navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>

        {/* 3. MOBILE FULLSCREEN OVERLAY SLIDING DRAWER MENU */}
        {mobileMenuOpen && (
          <div
            id="mobile-drawer-overlay"
            className="lg:hidden fixed top-[116px] sm:top-[116px] left-0 w-full h-[calc(100vh-172px)] bg-brand-secondary border-t border-white/5 z-55 overflow-y-auto px-6 py-6 animate-fadeIn pb-24"
          >
            <div className="flex flex-col gap-2 font-sans">

              {/* Home */}
              <div>
                <button
                  onClick={() => handleSubnavClick('home', 'Home')}
                  className={`w-full py-3.5 text-left font-bold text-sm tracking-widest uppercase border-b border-white/5 flex items-center justify-between ${currentView === 'home' ? 'text-brand-primary' : 'text-stone-300'
                    }`}
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </button>
              </div>

              {/* Shop with sublinks */}
              <div className="border-b border-white/5 py-1">
                <button
                  onClick={() => toggleMobileCategory('shop')}
                  className="w-full py-3 text-left font-bold text-sm tracking-widest uppercase text-stone-300 flex items-center justify-between"
                >
                  <span>Shop Catalog</span>
                  {expandedMobileCategory === 'shop' ? <ChevronUp className="w-4 h-4 text-brand-primary" /> : <ChevronDown className="w-4 h-4 opacity-55" />}
                </button>
                {expandedMobileCategory === 'shop' && (
                  <div className="pl-4 pb-3 space-y-4 pt-1 animate-slideIn">
                    {/* Resin */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-brand-primary font-bold tracking-widest uppercase">Resin Art</span>
                      <div className="grid grid-cols-2 gap-2 text-xs text-stone-400">
                        {['All Products', 'Resin Wall Art', 'Resin Coasters', 'Resin Trays', 'Resin Clocks', 'Resin Decor'].map((sub) => (
                          <div key={sub} className="py-1 active:text-brand-accent cursor-pointer" onClick={() => handleSubnavClick('shop', sub)}>
                            • {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Custom Frames */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-brand-primary font-bold tracking-widest uppercase">Custom Frames</span>
                      <div className="grid grid-cols-2 gap-2 text-xs text-stone-400">
                        {['Portrait Frames', 'Family Frames', 'Baby Frames', 'Graduation Frames', 'Memory Frames'].map((sub) => (
                          <div key={sub} className="py-1 active:text-brand-accent cursor-pointer" onClick={() => handleSubnavClick('shop', sub)}>
                            • {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Personalized */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-brand-primary font-bold tracking-widest uppercase">Personalized Gifts</span>
                      <div className="grid grid-cols-2 gap-2 text-xs text-stone-400">
                        {['Name Plaques', 'Birthday Gifts', 'Anniversary Gifts', 'Couple Gifts', 'Custom Gifts'].map((sub) => (
                          <div key={sub} className="py-1 active:text-brand-accent" onClick={() => handleSubnavClick('shop', sub)}>
                            • {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Home Decor */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-brand-primary font-bold tracking-widest uppercase">Home Decor</span>
                      <div className="grid grid-cols-2 gap-2 text-xs text-stone-400">
                        {['Wall Decor', 'Luxury Decor', 'Modern Decor', 'Table Decor', 'Decorative Accessories'].map((sub) => (
                          <div key={sub} className="py-1 active:text-brand-accent" onClick={() => handleSubnavClick('shop', sub)}>
                            • {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Occasions */}
                    <div className="pt-2 border-t border-white/5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-stone-300 font-semibold uppercase">
                      {['Wedding Gifts', 'Corporate Gifts', 'Best Sellers', 'New Arrivals', 'Trending', 'Sale'].map((tag) => (
                        <div key={tag} className="px-2 py-0.5 bg-white/5 rounded" onClick={() => handleSubnavClick('shop', tag)}>
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Collections with sublinks */}
              <div className="border-b border-white/5 py-1">
                <button
                  onClick={() => toggleMobileCategory('collections')}
                  className="w-full py-3 text-left font-bold text-sm tracking-widest uppercase text-stone-300 flex items-center justify-between"
                >
                  <span>Collections</span>
                  {expandedMobileCategory === 'collections' ? <ChevronUp className="w-4 h-4 text-brand-primary" /> : <ChevronDown className="w-4 h-4 opacity-55" />}
                </button>
                {expandedMobileCategory === 'collections' && (
                  <div className="pl-4 pb-3 grid grid-cols-2 gap-2 text-xs text-stone-400 pt-1 animate-slideIn">
                    {[
                      'Luxury Collection',
                      'Wedding Collection',
                      'Home Collection',
                      'Gift Collection',
                      'Premium Resin Collection',
                      'Executive Collection',
                      'Seasonal Collection',
                      'Limited Edition'
                    ].map((item) => (
                      <div key={item} className="py-1 active:text-white" onClick={() => handleSubnavClick('shop', item)}>
                        • {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery with sublinks */}
              <div className="border-b border-white/5 py-1">
                <button
                  onClick={() => toggleMobileCategory('gallery')}
                  className="w-full py-3 text-left font-bold text-sm tracking-widest uppercase text-stone-300 flex items-center justify-between"
                >
                  <span>Gallery</span>
                  {expandedMobileCategory === 'gallery' ? <ChevronUp className="w-4 h-4 text-brand-primary" /> : <ChevronDown className="w-4 h-4 opacity-55" />}
                </button>
                {expandedMobileCategory === 'gallery' && (
                  <div className="pl-4 pb-3 grid grid-cols-2 gap-2 text-xs text-stone-400 pt-1 animate-slideIn" onClick={() => navigateTo('gallery')}>
                    {[
                      'All Projects',
                      'Resin Art Gallery',
                      'Custom Frames Gallery',
                      'Home Decor Gallery',
                      'Wedding Projects',
                      'Corporate Projects',
                      'Client Installations',
                      'Before & After',
                      'Video Gallery'
                    ].map((item) => (
                      <div key={item} className="py-1 active:text-white" onClick={() => handleSubnavClick('gallery', item)}>
                        • {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Blog */}
              <div className="border-b border-white/5 py-1">
                <button
                  onClick={() => toggleMobileCategory('blog')}
                  className="w-full py-3 text-left font-bold text-sm tracking-widest uppercase text-stone-300 flex items-center justify-between"
                >
                  <span>Blog</span>
                  {expandedMobileCategory === 'blog' ? <ChevronUp className="w-4 h-4 text-brand-primary" /> : <ChevronDown className="w-4 h-4 opacity-55" />}
                </button>
                {expandedMobileCategory === 'blog' && (
                  <div className="pl-4 pb-3 space-y-2 text-xs text-stone-400 pt-1 animate-slideIn">
                    {[
                      'Resin Art Inspiration',
                      'Gift Ideas',
                      'Home Decor Tips',
                      'Interior Styling',
                      'Wedding Inspiration',
                      'Corporate Gifting',
                      'Care & Maintenance Guides'
                    ].map((item) => (
                      <div key={item} className="py-1.5" onClick={() => handleSubnavClick('blog', item)}>
                        • {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* About */}
              <div className="border-b border-white/5 py-1">
                <button
                  onClick={() => toggleMobileCategory('about')}
                  className="w-full py-3 text-left font-bold text-sm tracking-widest uppercase text-stone-300 flex items-center justify-between"
                >
                  <span>About</span>
                  {expandedMobileCategory === 'about' ? <ChevronUp className="w-4 h-4 text-brand-primary" /> : <ChevronDown className="w-4 h-4 opacity-55" />}
                </button>
                {expandedMobileCategory === 'about' && (
                  <div className="pl-4 pb-3 space-y-2 text-xs text-stone-400 pt-1 animate-slideIn">
                    {[
                      'Our Story',
                      'Mission & Vision',
                      'Craftsmanship Process',
                      'Meet The Team',
                      'Customer Reviews',
                      'FAQs',
                      'Press & Features'
                    ].map((item) => (
                      <div key={item} className="py-1.5" onClick={() => handleSubnavClick('about', item)}>
                        • {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact */}
              <div className="border-b border-white/5 py-1">
                <button
                  onClick={() => toggleMobileCategory('contact')}
                  className="w-full py-3 text-left font-bold text-sm tracking-widest uppercase text-stone-300 flex items-center justify-between"
                >
                  <span>Contact</span>
                  {expandedMobileCategory === 'contact' ? <ChevronUp className="w-4 h-4 text-brand-primary" /> : <ChevronDown className="w-4 h-4 opacity-55" />}
                </button>
                {expandedMobileCategory === 'contact' && (
                  <div className="pl-4 pb-3 space-y-3.5 text-xs text-stone-400 pt-1 animate-slideIn">
                    {[
                      { label: 'Contact Us', view: 'contact' as const },
                      { label: 'WhatsApp direct', url: 'https://wa.me/2349069996290' },
                      { label: 'Instagram feed', url: 'https://instagram.com/spyce_crafts' },
                      { label: 'Facebook page', url: '#' },
                      { label: 'TikTok studio', url: '#' },
                      { label: 'Email support', view: 'contact' as const },
                      { label: 'Business hours', view: 'contact' as const },
                      { label: 'Atelier Location', view: 'contact' as const }
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="py-1 active:text-white cursor-pointer flex justify-between items-center"
                        onClick={() => {
                          if (item.url) {
                            window.open(item.url, '_blank');
                          } else {
                            handleSubnavClick(item.view, item.label);
                          }
                        }}
                      >
                        <span>• {item.label}</span>
                        {item.url && <Sparkle className="w-3 h-3 text-emerald-400" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </header>

      {/* 4. FLOATING ACTION BUTTON (WhatsApp Anchored on Bottom-Right) */}
      <a
        id="floating-whatsapp-fab"
        href="https://wa.me/2349069996290?text=Hello%20Spyce%20Crafts%20Lagos,%20I%20am%20interested%20in%20customized%20resins%20or%20frames!"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 md:bottom-8 right-6 z-50 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group border border-emerald-500/30"
        aria-label="Direct Telegram or WhatsApp Designer Chat"
      >
        {/* Glow pulsing wave */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 group-hover:scale-125 transition-transform animate-ping" />
        <MessageSquare className="w-6 h-6 text-white" />
      </a>

      {/* 5. MOBILE BOTTOM NAVIGATION STRIP (Fixed to screen bottom viewport) */}
      <nav
        id="mobile-bottom-navigation-strip"
        className="lg:hidden fixed bottom-0 left-0 w-full bg-brand-secondary/95 border-t border-white/5 z-50 flex items-center justify-around py-3.5 px-2 backdrop-blur-md"
      >
        {[
          { label: 'Home', view: 'home' as const, icon: <span className="text-lg">🏠</span> },
          { label: 'Shop', view: 'shop' as const, icon: <span className="text-lg">🛍</span> },
          { label: 'Gallery', view: 'gallery' as const, icon: <span className="text-lg">🖼</span> },
          { label: 'Wishlist', view: 'wishlist' as const, icon: <span className="text-lg">♡</span>, badge: wishlistCount },
          { label: 'Cart', view: 'cart' as const, icon: <span className="text-lg">🛒</span>, badge: cartCount }
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => handleSubnavClick(item.view, item.label)}
            className="flex flex-col items-center gap-1 text-[10px] font-sans tracking-wide uppercase font-semibold relative flex-1 cursor-pointer"
          >
            <div className="relative">
              {item.icon}
              {!!item.badge && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand-primary text-stone-950 text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`${currentView === item.view ? 'text-brand-primary font-bold' : 'text-stone-400'}`}>
              {item.label}
            </span>
            {currentView === item.view && (
              <span className="absolute -bottom-1.5 w-4 h-0.5 bg-brand-primary rounded-full" />
            )}
          </button>
        ))}
      </nav>
    </>
  );
}
