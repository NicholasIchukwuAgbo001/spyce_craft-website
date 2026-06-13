import React, { useState, useMemo } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { BLOGS } from '../../data/blogs';
import { ArrowLeft, Clock, Calendar, User, Search, Sparkles, MessageSquare, Tag, Eye } from 'lucide-react';

export default function BlogView() {
 const { selectedBlogSlug, navigateTo } = useCartStore();
 const [blogFilter, setBlogFilter] = useState('All');
 const [searchTerm, setSearchTerm] = useState('');

 // Extract categories dynamically
 const blogCategories = useMemo(() => {
 const list = new Set(BLOGS.map((b) => b.category));
 return ['All', ...Array.from(list)];
 }, []);

 // Filtered blog list
 const filteredBlogs = useMemo(() => {
 let result = [...BLOGS];

 if (blogFilter !== 'All') {
 result = result.filter((b) => b.category === blogFilter);
 }

 if (searchTerm.trim() !== '') {
 const term = searchTerm.toLowerCase();
 result = result.filter(
 (b) =>
 b.title.toLowerCase().includes(term) ||
 b.excerpt.toLowerCase().includes(term) ||
 b.content.toLowerCase().includes(term) ||
 b.tags.some((t) => t.toLowerCase().includes(term))
 );
 }

 return result;
 }, [blogFilter, searchTerm]);

 // Find the detailed active post if any
 const activePost = useMemo(() => {
 if (!selectedBlogSlug) return null;
 return BLOGS.find((b) => b.slug === selectedBlogSlug) || null;
 }, [selectedBlogSlug]);

 return (
 <main id="blog-atelier-view" className="py-12 bg-white min-h-screen text-stone-800 font-sans">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 {activePost ? (
 // DETAILED POST VIEW
 <article id={`blog-post-article-${activePost.slug}`} className="max-w-3xl mx-auto space-y-8 animate-fadeIn">

 {/* Back to Blog bar */}
 <div className="flex items-center justify-between border-b border-stone-100 pb-4">
 <button
 id="back-to-blogs-btn"
 onClick={() => navigateTo('blog')}
 className="inline-flex items-center gap-1.5 text-stone-500 hover:text-brand-primary text-sm font-semibold font-sans uppercase transition-colors cursor-pointer"
 >
 <ArrowLeft className="w-4 h-4" />
 <span>Return to Blog Hub</span>
 </button>
 <div className="flex items-center gap-4 text-xs text-stone-400">
 <span className="flex items-center gap-1">
 <Calendar className="w-3.5 h-3.5" />
 {activePost.date}
 </span>
 <span className="flex items-center gap-1">
 <Clock className="w-3.5 h-3.5" />
 {activePost.readTime}
 </span>
 </div>
 </div>

 {/* Post Title Heading block */}
 <div className="space-y-4">
 <span className="px-3 py-1 bg-brand-secondary text-brand-dark font-semibold text-xs rounded-full uppercase tracking-wider">
 {activePost.category}
 </span>
 <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark leading-tight">
 {activePost.title}
 </h1>

 {/* Writer Credential line */}
 <div className="flex items-center gap-3 pt-2">
 <div className="w-10 h-10 rounded-full bg-brand-secondary border border-brand-primary/20 flex items-center justify-center text-brand-primary">
 <User className="w-5 h-5" />
 </div>
 <div>
 <span className="block text-stone-800 text-xs font-bold">{activePost.author}</span>
 <span className="block text-stone-400 text-[10px]">Atelier Master Craftperson</span>
 </div>
 </div>
 </div>

 {/* Post Hero banner */}
 <div className="rounded-2xl overflow-hidden aspect-video shadow-md border border-stone-100 bg-stone-50">
 <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
 </div>

 {/* Full Markdown/Aesthetic Paragraph Content */}
 <div className="prose prose-stone max-w-none text-stone-600 text-sm sm:text-base leading-relaxed space-y-6">
 {/* Parse headers and text lines with beautiful styling natively */}
 {activePost.content.split('\n\n').map((paragraph, index) => {
 if (paragraph.startsWith('###')) {
 return (
 <h3 key={index} className="font-serif text-xl sm:text-2xl font-bold text-stone-900 pt-4 border-b border-stone-100 pb-1.5">
 {paragraph.replace('###', '').trim()}
 </h3>
 );
 }
 if (paragraph.startsWith('##')) {
 return (
 <h2 key={index} className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 pt-6">
 {paragraph.replace('##', '').trim()}
 </h2>
 );
 }
 return (
 <p key={index} className="font-sans font-light">
 {paragraph}
 </p>
 );
 })}
 </div>

 {/* Tags row */}
 <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-stone-100">
 <Tag className="w-4 h-4 text-brand-primary mr-1" />
 {activePost.tags.map((tag) => (
 <span key={tag} className="text-xs bg-stone-100 text-stone-500 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
 #{tag}
 </span>
 ))}
 </div>

 {/* Writer bio block & WhatsApp CTA */}
 <div className="p-6 sm:p-8 rounded-2xl bg-brand-secondary/20 border border-brand-primary/10 grid grid-cols-1 sm:grid-cols-4 gap-6 items-center">
 <div className="sm:col-span-3 space-y-2 text-center sm:text-left">
 <h4 className="font-serif text-lg font-bold text-brand-dark">Inspired by this read?</h4>
 <p className="text-xs text-stone-500 font-sans leading-relaxed">
 Discuss wood finishes, gold-laced resin waves, or floral drying parameters directly with our lead specialist inside our active WhatsApp chat workshop!
 </p>
 </div>
 <div className="sm:col-span-1 text-center">
 <a
 id="blog-success-wa-cta"
 href={`https://wa.me/2349069996290?text=Hello%20Spyce%20Crafts,%20I%20just%20read%20your%20article%20"${encodeURIComponent(activePost.title)}"%20and%20want%20to%20consult%20on%20a%20similar%20look!`}
 target="_blank"
 rel="noreferrer"
 className="w-full sm:w-auto px-5 py-3 rounded-xl bg-brand-dark hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 shadow-md"
 >
 <MessageSquare className="w-4.5 h-4.5 text-brand-secondary" />
 <span>Consult</span>
 </a>
 </div>
 </div>

 </article>
 ) : (
 // BLOG LANDING LIST HUB
 <div id="blog-hub-catalog" className="space-y-12 animate-fadeIn">

 {/* Header titles */}
 <div id="blog-header" className="text-center space-y-3">
 <span className="text-[10px] tracking-widest uppercase font-sans font-semibold text-brand-primary">The Spyce Chronicles</span>
 <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark">
 Atelier Inspiration &amp; <span className="text-brand-primary font-normal italic">Styling Guide</span>
 </h1>
 <p className="font-sans text-stone-500 max-w-xl mx-auto text-sm">
 Secrets of epoxy resin lacing, wedding keepsake preservation, minimalist quote pairings, and aesthetic master bedroom layouts.
 </p>
 </div>

 {/* Toolbar section: Search & Filtering Tabs */}
 <div id="blog-hub-toolbar" className="flex flex-col sm:flex-row items-center justify-between border-y border-stone-100 py-6 gap-6">

 {/* Category tabs */}
 <div className="flex flex-wrap items-center gap-2 overflow-x-auto max-w-full">
 {blogCategories.map((bCat) => (
 <button
 id={`blog-tab-${bCat.replace(/\s/g, '').toLowerCase()}`}
 key={bCat}
 onClick={() => setBlogFilter(bCat)}
 className={`px-4 py-2 rounded-full text-xs font-sans tracking-wide uppercase transition-colors ${blogFilter === bCat
 ? 'bg-brand-primary text-white font-semibold'
 : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-brand-dark border border-stone-100'
 }`}
 >
 {bCat}
 </button>
 ))}
 </div>

 {/* Keyword Filter Input */}
 <div className="w-full sm:w-80 relative">
 <input
 id="blog-keyword-search"
 type="text"
 placeholder="Search articles &amp; guides..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full px-4 py-2 pl-9 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-xs font-sans text-stone-800 font-light"
 />
 <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
 </div>
 </div>

 {/* Articles List dynamic grid */}
 {filteredBlogs.length > 0 ? (
 <div id="blog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {filteredBlogs.map((post) => (
 <div
 id={`blog-card-${post.slug}`}
 key={post.slug}
 onClick={() => navigateTo('blog-detail', post.slug)}
 className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
 >
 {/* Cover art image */}
 <div className="aspect-16/10 overflow-hidden bg-stone-50 relative">
 <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500" />
 <span className="absolute top-4 left-4 bg-white/95 text-brand-dark px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-stone-100 z-10">
 {post.category}
 </span>
 </div>

 {/* Details content card */}
 <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
 <div className="space-y-2">
 {/* Meta information row */}
 <div className="flex items-center gap-4 text-[10px] text-stone-400 font-sans tracking-wide">
 <span className="flex items-center gap-1">
 <Calendar className="w-3.5 h-3.5" />
 {post.date}
 </span>
 <span className="flex items-center gap-1">
 <Clock className="w-3.5 h-3.5" />
 {post.readTime}
 </span>
 </div>

 {/* Title & snippet */}
 <h3 className="font-serif text-lg font-bold text-brand-dark line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors">
 {post.title}
 </h3>
 <p className="text-stone-500 text-xs leading-relaxed line-clamp-3 font-light font-sans">
 {post.excerpt}
 </p>
 </div>

 {/* Sub-action trigger indicator */}
 <div className="flex items-center justify-between pt-4 border-t border-stone-50">
 <span className="text-[10px] tracking-wider uppercase text-brand-primary font-bold font-mono">
 Read Full Article
 </span>
 <div className="flex items-center gap-1 text-[10px] text-stone-400 font-sans">
 <Eye className="w-3.5 h-3.5" />
 <span>400+ readers</span>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 ) : (
 // Empty search fallback
 <div id="blog-empty-state" className="text-center py-20 px-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-4">
 <p className="text-stone-400 text-sm font-sans">No inspiration articles matched your keyword query.</p>
 <button
 id="reset-blog-empty-btn"
 onClick={() => {
 setSearchTerm('');
 setBlogFilter('All');
 }}
 className="px-6 py-2 bg-stone-900 text-white rounded-xl text-xs uppercase font-semibold hover:bg-brand-primary transition-colors cursor-pointer"
 >
 See all articles
 </button>
 </div>
 )}

 </div>
 )}
 </div>
 </main>
 );
}
