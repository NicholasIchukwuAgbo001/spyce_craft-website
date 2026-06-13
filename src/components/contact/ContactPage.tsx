import React, { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { Send, MapPin, Phone, Mail, Clock, MessageSquare, Instagram, Compass, CheckCircle } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER, encodeWhatsAppMessage } from '../../lib/whatsapp';

export default function ContactPage() {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');
 const [subject, setSubject] = useState('Custom Bouquet Preservation Inquiry');
 const [msg, setMsg] = useState('');
 const [submitted, setSubmitted] = useState(false);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 if (name && msg) {
 // Compile beautiful WhatsApp message
 let message = `Hello Spyce Crafts ✨,\n\nI would like to submit an Atelier Design Brief from your website:\n\n`;
 message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
 message += `👤 CONTACT INFORMATION\n`;
 message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
 message += `• Name: ${name}\n`;
 if (email) {
 message += `• Email: ${email}\n`;
 }
 if (phone) {
 message += `• Phone: ${phone}\n`;
 }
 message += `• Subject/Theme: ${subject}\n\n`;

 message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
 message += `🎨 DESIGN BRIEF DETAILS\n`;
 message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
 message += `"${msg}"\n\n`;
 message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
 message += `Please let me know the next steps for sample drafts and quotes. Thank you! 🙏✨`;

 const encodedText = encodeWhatsAppMessage(message);
 const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`;


 window.open(whatsappUrl, '_blank');

 setSubmitted(true);
 setTimeout(() => {
 setName('');
 setEmail('');
 setPhone('');
 setMsg('');
 setSubmitted(false);
 }, 5000);
 }
 };

 return (
 <main id="contact-page-container" className="py-16 bg-white min-h-screen">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 {/* Caption */}
 <div className="text-center space-y-3 mb-16">
 <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-primary block">Ready for bespoke styling?</span>
 <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-dark">
 Connect With Our <span className="font-normal italic text-brand-primary">Atelier Artists</span>
 </h1>
 <p className="text-stone-500 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
 Have bulk corporate questions, urgent wedding bouquet preserves, or custom frame sizing requirements? We respond immediately across all interactive networks.
 </p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

 {/* Left Column: Direct channels and landmarks */}
 <div className="lg:col-span-5 space-y-8 font-sans text-xs sm:text-sm">

 <div className="space-y-4">
 <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-dark pb-2 border-b border-stone-100">
 Studio Channels
 </h3>
 <p className="text-stone-500 leading-relaxed font-light">
 Feel free to visit our social media feeds, check viral process videos, or reach out to our primary WhatsApp design lounge.
 </p>
 </div>

 <div className="space-y-6">
 <div className="flex items-start gap-3.5">
 <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
 <div>
 <strong className="block text-brand-dark mb-0.5">Physical Atelier Locations</strong>
 <span className="text-stone-500 leading-relaxed block">
 • Lagos Headquarters: 12B, Admiralty Hub Way, Lekki Phase 1, Lagos State, Nigeria.
 </span>
 <span className="text-stone-500 leading-relaxed block">
 • Enugu Production Annex: Ogui Link Lane Block, Enugu State, Nigeria.
 </span>
 </div>
 </div>

 <div className="flex items-start gap-3.5">
 <Phone className="w-5 h-5 text-brand-primary shrink-0" />
 <div>
 <strong className="block text-brand-dark mb-0.5">WhatsApp Designer Chat</strong>
 <span className="text-stone-500 block">
 09069996290 (International: +234 906 999 6290)
 </span>
 </div>
 </div>

 <div className="flex items-start gap-3.5">
 <Mail className="w-5 h-5 text-brand-primary shrink-0" />
 <div>
 <strong className="block text-brand-dark mb-0.5">Electronic Inquiries</strong>
 <span className="text-stone-500 block">contact@spycecrafts.com</span>
 <span className="text-brand-primary block font-light text-[11px] mt-0.5">Support Ticket Queue: average 6-hour reply</span>
 </div>
 </div>

 <div className="flex items-start gap-3.5">
 <Clock className="w-5 h-5 text-brand-primary shrink-0" />
 <div>
 <strong className="block text-brand-dark mb-0.5">Atelier Crafting Hours</strong>
 <span className="text-stone-500 block">Monday to Friday: 9:00 AM – 6:00 PM (WAT)</span>
 <span className="text-stone-500 block font-light">Saturday Curing Shifts: 10:00 AM – 3:00 PM (No phone pickups)</span>
 </div>
 </div>
 </div>

 {/* Simulated interactive brand maps */}
 <div className="p-6 rounded-2xl bg-brand-secondary/20 border border-brand-secondary/40 relative overflow-hidden space-y-3">
 <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('/assets/150650.jpg')" }} />
 <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-brand-primary shadow-sm">
 <Compass className="w-4.5 h-4.5 animate-spin" />
 </div>
 <h4 className="font-serif text-sm font-bold text-brand-dark">Safe Transit Packing Guarantee</h4>
 <p className="text-stone-500 leading-relaxed font-light text-[11px]">
 All dispatch orders from our Lekki and Enugu lines are double-layered in foam wrap and luxury box packaging to survive nationwide Nigeria transit flawlessly. If anything arrives chipped, we handcraft a replica to replace it immediately.
 </p>
 </div>

 </div>

 {/* Right Column: High-end Form */}
 <div className="lg:col-span-7 bg-brand-muted p-8 sm:p-12 rounded-3xl border border-brand-secondary/40 space-y-6">
 <div className="space-y-1">
 <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-primary">Draft Your Inquiry Template</span>
 <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">Atelier Design Brief</h3>
 <p className="text-xs text-stone-500">Provide your custom art choices so our lead creator can compile a pro-forma quote.</p>
 </div>

 <form id="detailed-contact-form" onSubmit={handleSubmit} className="space-y-4">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-1.5">
 <label className="text-xs uppercase text-stone-400 font-bold tracking-wider">Your Full Name *</label>
 <input
 id="detailed-contact-name"
 type="text"
 required
 placeholder="e.g. Ama Okafor"
 value={name}
 onChange={(e) => setName(e.target.value)}
 className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-xs text-stone-800"
 />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs uppercase text-stone-400 font-bold tracking-wider">Your Email</label>
 <input
 id="detailed-contact-email"
 type="email"
 placeholder="e.g. name@email.com"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-xs text-stone-800"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-1.5">
 <label className="text-xs uppercase text-stone-400 font-bold tracking-wider">Phone Number (WhatsApp Active)</label>
 <input
 id="detailed-contact-phone"
 type="text"
 placeholder="e.g. 09069996290"
 value={phone}
 onChange={(e) => setPhone(e.target.value)}
 className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-xs text-stone-800"
 />
 </div>
 <div className="space-y-1.5">
 <label className="text-xs uppercase text-stone-400 font-bold tracking-wider">Inquiry Theme *</label>
 <select
 id="detailed-contact-theme"
 value={subject}
 onChange={(e) => setSubject(e.target.value)}
 className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-xs text-stone-800"
 >
 <option value="Custom Bouquet Preservation Inquiry">Custom Bouquet Preservation Inquiry</option>
 <option value="Bulk Corporate Gift Plaques">Bulk Corporate Gift Plaques</option>
 <option value="Bespoke Frame Project Request">Bespoke Frame Project Request</option>
 <option value="Collab / Press Request">Collab / Press Request</option>
 <option value="General Question">General Question</option>
 </select>
 </div>
 </div>

 <div className="space-y-1.5">
 <label className="text-xs uppercase text-stone-400 font-bold tracking-wider">Craft Request Details *</label>
 <textarea
 id="detailed-contact-details"
 rows={5}
 required
 placeholder="Describe your desired sizes, typography quote lines, background colors, and whether gold leaf foil additions are requested..."
 value={msg}
 onChange={(e) => setMsg(e.target.value)}
 className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-brand-primary text-xs text-stone-800"
 />
 </div>

 <div className="flex items-center gap-2 text-[10px] text-stone-400 font-sans pt-1">
 <MessageSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
 <span>Submitting will open <strong className="text-emerald-400">WhatsApp</strong> with your brief pre-filled — no account needed.</span>
 </div>

 <button
 id="detailed-contact-submit-btn"
 type="submit"
 className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-emerald-900/30 cursor-pointer"
 >
 <MessageSquare className="w-4 h-4" />
 <span>Send via WhatsApp</span>
 </button>

 {submitted && (
 <div id="detailed-contact-response" className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs flex items-start gap-2 font-medium animate-fadeIn">
 <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
 <span className="text-emerald-200">WhatsApp is opening with your brief pre-filled. Just tap <strong>Send</strong> in the chat to submit your inquiry. ✨</span>
 </div>
 )}
 </form>
 </div>

 </div>
 </div>
 </main>
 );
}
