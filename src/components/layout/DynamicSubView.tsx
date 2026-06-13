import React, { useState } from 'react'; import { useCartStore } from '../../store/useCartStore'; import { PRODUCTS } from '../../data/products'; import {
 Sparkles,
 ArrowLeft,
 MessageSquare,
 Heart,
 ShoppingCart,
 Check,
 Info,
 Calendar,
 Phone,
 Clock,
 MapPin,
 ArrowRight,
 User,
 Star,
 BookOpen,
 ShoppingBag,
 FileText,
 BadgeAlert,
 Send,
 Camera,
 Layers,
 Award,
 Bookmark,
 Volume2,
 Trash,
 HelpCircle,
 Percent,
 Plus
} from 'lucide-react'; export default function DynamicSubView() {
 const { activeSubTopic, navigateTo, addItem, toggleWishlist, isInWishlist } = useCartStore();
 const [successToast, setSuccessToast] = useState<string | null>(null);
 // Gallery view state
 const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
 const [sliderVal, setSliderVal] = useState<number>(50); // Before & After percentage
 // Form states
 const [formName, setFormName] = useState('');
 const [formEmail, setFormEmail] = useState('');
 const [formDetail, setFormDetail] = useState('');
 const [formCustomVal, setFormCustomVal] = useState('');
 const [formSuccess, setFormSuccess] = useState(false);
 if (!activeSubTopic) {
 return (
 <div className="py-20 text-center text-stone-400">
 <p>No category screen selected. Please choose an item from the Spyce Crafts menu.</p>
 <button
 onClick={() => navigateTo('home')}
 className="mt-4 px-6 py-2.5 bg-brand-primary text-white rounded-lg text-xs"
 >
 Return Home
 </button>
 </div>
 );
 }
 const normalizedTopic = activeSubTopic.trim();
 // Temporary function to add items smoothly
 const triggerAddToCart = (product: any) => {
 addItem(product, 1, product.sizes[0], product.colors[0]);
 setSuccessToast(`Added "${product.name}" to your shopping cart!`);
 setTimeout(() => setSuccessToast(null), 3000);
 };
 // ────────────────────────────────────────────────────────
 // DATA DICTIONARY FOR SUBVIEWS
 // ────────────────────────────────────────────────────────
 // Core metadata helper for headers & descriptions
 const getTopicMetadata = (topic: string) => {
 switch (topic) {
 // 1. SHOP ITEMS
 case 'All Products':
 return {
 title: 'All Atelier Products',
 subtitle: 'The full curated catalog of Spyce Crafts art pieces, frames, and decorations.',
 accent: 'HANDCRAFTED EDITIONS',
 bgColor: 'bg-stone-50',
 image: '/assets/150577.jpg'
 };
 case 'Resin Art':
 return {
 title: 'Premium Resin Art',
 subtitle: 'High-gloss visual masterpieces encapsulating colors, fluids, and raw materials.',
 accent: 'SLOW LAYER CURING',
 bgColor: 'bg-emerald-950/10',
 image: '/assets/150578.jpg'
 };
 case 'Resin Wall Art':
 return {
 title: 'Resin Wall Art Panels',
 subtitle: 'Large-scale liquid glass panels capturing oceanic shorelines and abstract marbling.',
 accent: 'LUXURY LIVING CENTERPIECES',
 bgColor: 'bg-blue-950/10',
 image: '/assets/150579.jpg'
 };
 case 'Resin Coasters':
 return {
 title: 'Resin Luxury Coasters',
 subtitle: 'Set of bespoke cup rests with high-heat resistance, fine gold flake inlay, and organic geodes.',
 accent: 'HEAT-RESISTANT PROTECTION',
 bgColor: 'bg-stone-900/10',
 image: '/assets/150580.jpg'
 };
 case 'Resin Trays':
 return {
 title: 'Bespoke Catchall Trays',
 subtitle: 'Lustrous, layered ocean trays fitted with solid brass handles for elegant vanity serving.',
 accent: 'FUNCTIONAL OCEAN ART',
 bgColor: 'bg-cyan-950/10',
 image: '/assets/150581.jpg'
 };
 case 'Resin Clocks':
 return {
 title: 'Eternal Ocean clocks',
 subtitle: 'Premium silent clockwork layered with ocean wave simulation and real beach sand.',
 accent: 'EPOXY HOROLOGY',
 bgColor: 'bg-sky-950/10',
 image: '/assets/150582.jpg'
 };
 case 'Resin Decor':
 return {
 title: 'Resin Accent Decor',
 subtitle: 'Sculptured bookends, diamond facets, and geometric paperweights for modern desks.',
 accent: 'ORGANIC PYRAMIDS',
 bgColor: 'bg-stone-900/10',
 image: '/assets/150584.jpg'
 };
 case 'Custom Frames':
 return {
 title: 'Custom Typographic Frames',
 subtitle: 'Minimalist Pinterest-inspired frame grids, motivation quotes, and clear visual block systems.',
 accent: 'ACRYLIC SATIN BOARDS',
 bgColor: 'bg-orange-950/10',
 image: '/assets/150585.jpg'
 };
 case 'Portrait Frames':
 return {
 title: 'Custom Silhouette Portrait Frames',
 subtitle: 'Turn personal snapshots into outstanding minimalist hand-sketched line art frames.',
 accent: 'HAND-SKETCHED SILHOUETTES',
 bgColor: 'bg-red-950/10',
 image: '/assets/150586.jpg'
 };
 case 'Family Frames':
 return {
 title: 'Curated Family Portrait Frames',
 subtitle: 'Multiple photo-grid layouts with laser-engraved names and custom wooden frame casings.',
 accent: 'HOUSEHOLD HEIRLOOMS',
 bgColor: 'bg-amber-950/10',
 image: '/assets/150587.jpg'
 };
 case 'Baby Frames':
 return {
 title: 'Newborn Milestone Frames',
 subtitle: 'Incorporate baby details, hospital bands, and handprints into clear glass panels.',
 accent: 'BABY BIRTH RECORDINGS',
 bgColor: 'bg-pink-950/10',
 image: '/assets/150588.jpg'
 };
 case 'Graduation Frames':
 return {
 title: 'Elite Graduation Frames',
 subtitle: 'Celebrate milestones with premium dual-matted slots matching school colors and portraits.',
 accent: 'ACADEMIC RECOGNITION',
 bgColor: 'bg-blue-950/10',
 image: '/assets/150589.jpg'
 };
 case 'Memory Frames':
 return {
 title: 'Remembrance Memory Frames',
 subtitle: 'Beautiful memorial arrangements honoring departed loved ones, configured with letters.',
 accent: 'ETERNAL REVERENCE',
 bgColor: 'bg-stone-950/10',
 image: '/assets/150590.jpg'
 };
 case 'Personalized Gifts':
 return {
 title: 'Personalized Art Gifts',
 subtitle: 'Bespoke custom-made nameplates, photo collections, and custom text displays.',
 accent: 'MILESTONE ACCENTS',
 bgColor: 'bg-purple-950/10',
 image: '/assets/150591.jpg'
 };
 case 'Name Plaques':
 return {
 title: 'Acrylic Name Signs & Plaques',
 subtitle: 'Executive table plaques, room labels, and nursery text overlays on crystal acrylic.',
 accent: 'LASER-CUT LETTERS',
 bgColor: 'bg-emerald-950/10',
 image: '/assets/150592.jpg'
 };
 case 'Birthday Gifts':
 return {
 title: 'Custom Birthday Art Gifts',
 subtitle: 'Elegant 9-grid photo block frames, zodiac resin coasters, and customized luxury boxes.',
 accent: 'CELEBRATING BIRTHDAYS',
 bgColor: 'bg-indigo-950/10',
 image: '/assets/150593.jpg'
 };
 case 'Anniversary Gifts':
 return {
 title: 'Bespoke Anniversary Displays',
 subtitle: 'Minimalist outlines of anniversaries, dried-flower blocks, and wedding date layouts.',
 accent: 'MARITAL MILESTONES',
 bgColor: 'bg-rose-950/10',
 image: '/assets/150594.jpg'
 };
 case 'Couple Gifts':
 return {
 title: 'Premium Couple Art Designs',
 subtitle: 'Matching silhouette wall frames, custom couples song-plaque, and shared memory blocks.',
 accent: 'COMMEMORATIVE DESIGN',
 bgColor: 'bg-amber-950/10',
 image: '/assets/150595.jpg'
 };
 case 'Custom Gifts':
 return {
 title: 'Atelier Bespoke Custom Gifts',
 subtitle: 'If you can dream it, we can pour it. Complete control over elements, colors, and layout.',
 accent: 'NO LIMIT ON DESIGN',
 bgColor: 'bg-stone-900/10',
 image: '/assets/150596.jpg'
 };
 case 'Home Decor':
 return {
 title: 'Home Accent & Decor Art',
 subtitle: 'Premium handcrafted pieces designed to instill luxury into your residential layout.',
 accent: 'INTERIOR UPSCUPTING',
 bgColor: 'bg-neutral-900/10',
 image: '/assets/150597.jpg'
 };
 case 'Wall Decor':
 return {
 title: 'Atelier Wall Art & Frames',
 subtitle: 'Sophisticated panels, geometric wall prints, and three-dimensional dried leaf alignments.',
 accent: 'ELEGANT RESIDENTIAL WALLS',
 bgColor: 'bg-stone-850/10',
 image: '/assets/150598.jpg'
 };
 case 'Luxury Decor':
 return {
 title: 'Luxury Decor Collections',
 subtitle: 'Polished gold-inlaid wave boards, thick resin blocks, and oversized signature frames.',
 accent: 'PREMIUM ARTISAN RESERVE',
 bgColor: 'bg-brand-primary/15',
 image: '/assets/150599.jpg'
 };
 case 'Modern Decor':
 return {
 title: 'Modern Minimalist Decor',
 subtitle: 'Clean lines, raw textures, crystal-clear acrylic layers, and monochromatic frames.',
 accent: 'MINIMAL ARCHITECTURE',
 bgColor: 'bg-stone-50',
 image: '/assets/150600.jpg'
 };
 case 'Table Decor':
 return {
 title: 'Table accessories & Servings',
 subtitle: 'Ocean trays, matching geode coaster packs, and multi-faceted resin flower vases.',
 accent: 'DINING TABLE ARTISTRY',
 bgColor: 'bg-stone-900/10',
 image: '/assets/150601.jpg'
 };
 case 'Decorative Accessories':
 return {
 title: 'Boutique Fine Accessories',
 subtitle: 'Artistic magnifying accessories, matching key organizers, and clear ring holders.',
 accent: 'EVERYDAY MAJESTY',
 bgColor: 'bg-yellow-950/10',
 image: '/assets/150602.jpg'
 };
 case 'Wedding Gifts':
 return {
 title: 'Bespoke Wedding Gifts & Preservations',
 subtitle: 'Foreverize the fresh flowers from the ceremony into durable crystal-clear blocks.',
 accent: 'THE PRESENSATION LEADER',
 bgColor: 'bg-rose-950/10',
 image: '/assets/150603.jpg'
 };
 case 'Corporate Gifts':
 return {
 title: 'Executive Corporate Plaques & Gifts',
 subtitle: 'Custom brand name boards, recognition blocks, and sleek acrylic office frames.',
 accent: 'ELITE OFFICE DESIGNS',
 bgColor: 'bg-indigo-950/10',
 image: '/assets/150604.jpg'
 };
 case 'Best Sellers':
 return {
 title: 'The Best Sellers Guild',
 subtitle: 'Most viral, highly requested, and continuously reviewed premium items in Nigeria.',
 accent: 'CLIENT FAVORITES',
 bgColor: 'bg-amber-950/10',
 image: '/assets/150605.jpg'
 };
 case 'New Arrivals':
 return {
 title: 'New Artisanal Releases',
 subtitle: 'Fresh slow-cast layer items, new frame board colors, and seasonal bloom collections.',
 accent: 'FRESH OFF THE MOLD',
 bgColor: 'bg-emerald-950/10',
 image: '/assets/150606.jpg'
 };
 case 'Trending':
 return {
 title: 'Viral Pinterest-Style Designs',
 subtitle: 'Top shared items on TikTok and Instagram, driving modern study setup aesthetics.',
 accent: 'SOCIAL FEED POPULARS',
 bgColor: 'bg-rose-950/10',
 image: '/assets/150607.jpg'
 };
 case 'Sale':
 return {
 title: 'Active Archive Sales',
 subtitle: 'Exclusive discounts on selected pre-molded resin art, sample display frames, and ready-to-dispatch designs.',
 accent: 'EXCLUSIVE ACQUISITION DISCOUNT',
 bgColor: 'bg-red-950/10',
 image: '/assets/150608.jpg'
 };
 // 2. COLLECTIONS
 case 'Luxury Collection':
 return {
 title: 'The Luxury Atelier Collection',
 subtitle: 'Oversized heavy-pour ocean boards, brass double hardware, and high-gloss 24K gold foil trim details.',
 accent: 'THE SPYCE MONARCH RANGE',
 bgColor: 'bg-brand-primary/20',
 image: '/assets/150609.jpg'
 };
 case 'Wedding Collection':
 return {
 title: 'The Eternal Wedding Collection',
 subtitle: 'Bouquet block encapsulations, wedding vows framed on clear acrylic, and couple date outline silouhettes.',
 accent: 'MATRIMONIAL FOREVER RECURRENCE',
 bgColor: 'bg-pink-950/10',
 image: '/assets/150610.jpg'
 };
 case 'Home Collection':
 return {
 title: 'Living Room Styling Essentials',
 subtitle: 'Large coastal wave wall panels, matching luxury coaster grids, and statement home signage.',
 accent: 'FULL HOME ENSEMBLE',
 bgColor: 'bg-neutral-900/10',
 image: '/assets/150611.jpg'
 };
 case 'Gift Collection':
 return {
 title: 'Bespoke Milestone Gift Suite',
 subtitle: 'Curated 9-box framed albums, birthday plaques, and customizable flower geode trinket plates.',
 accent: 'MEANINGFUL CONNECTIONS',
 bgColor: 'bg-indigo-950/10',
 image: '/assets/150612.jpg'
 };
 case 'Premium Resin Collection':
 return {
 title: 'The slow-Cure Polymer Reserve',
 subtitle: 'Immaculately cured, zero-bubble deep resin blocks for floral arrangements or ocean lacing models.',
 accent: 'MASTER ULTRA-CLEAR POLYMER',
 bgColor: 'bg-cyan-950/10',
 image: '/assets/150613.jpg'
 };
 case 'Executive Collection':
 return {
 title: 'Executive Desk & Corporate Accents',
 subtitle: 'Luxury black and champagne gold motivational boards, heavy desk plates, and premium frames.',
 accent: 'STYLING HIGH-ALTITUDE SPACES',
 bgColor: 'bg-amber-950/15',
 image: '/assets/150614.jpg'
 };
 case 'Seasonal Collection':
 return {
 title: 'Harmattan & Dry Season Dried-Floral Series',
 subtitle: 'Warm copper-gold beach sand undertones layered with preserved seasonal brown leaf inlays.',
 accent: 'LIMITED EQUINOX STYLING',
 bgColor: 'bg-stone-900/10',
 image: '/assets/150615.jpg'
 };
 case 'Limited Edition':
 return {
 title: 'Atelier Vault Series (Limited to 5 Pieces)',
 subtitle: 'Unique resin pours containing intricate fluid dynamics and raw solid mahogany wood blocks.',
 accent: 'ARTISAN SIGNED COPIES',
 bgColor: 'bg-stone-950',
 image: '/assets/150616.jpg'
 };
 // 3. GALLERY OPTIONS
 case 'All Projects':
 return {
 title: 'Client Archive & Installations',
 subtitle: 'Browse through finished works, dispatch stacks, and gorgeous Pinterest styled desks.',
 accent: 'THE COMPLETED GLORY',
 bgColor: 'bg-stone-50',
 image: '/assets/150617.jpg'
 };
 case 'Resin Art Gallery':
 return {
 title: 'Resin Art wave Designs',
 subtitle: 'Finished high-gloss waves, geodes, trays, and functional clocks shipped worldwide.',
 accent: 'POLYMER FINISH PREVIEWS',
 bgColor: 'bg-cyan-950/5',
 image: '/assets/150618.jpg'
 };
 case 'Custom Frames Gallery':
 return {
 title: 'Custom Frame configurations',
 subtitle: 'Showcasing our iconic typography lines, acrylic song plaques, and newborn record blocks.',
 accent: 'WALL DECOR PREVIEWS',
 bgColor: 'bg-neutral-900/5',
 image: '/assets/150619.jpg'
 };
 case 'Home Decor Gallery':
 return {
 title: 'Home Decor Live Settings',
 subtitle: 'Explore our clocks and wall art panels styled in real luxury living rooms throughout Nigeria.',
 accent: 'LIVING ROOM PREVIEWS',
 bgColor: 'bg-blue-950/5',
 image: '/assets/150620.jpg'
 };
 case 'Wedding Projects':
 return {
 title: 'Wedding preservations Journal',
 subtitle: 'See bridal bouquet transformations from wild, hydrated stems to fully-sealed hexagon resin icons.',
 accent: 'MATRIMONIAL PRESERVATION LIFE',
 bgColor: 'bg-rose-900/5',
 image: '/assets/150621.jpg'
 };
 case 'Corporate Projects':
 return {
 title: 'Corporate installations Portfolio',
 subtitle: 'Bespoke boardroom logos, customized plaques for financial organizations, and executive gifts.',
 accent: 'CORPORATE RECOGNITION GALLERY',
 bgColor: 'bg-brand-primary/10',
 image: '/assets/150622.jpg'
 };
 case 'Client Installations':
 return {
 title: 'Home Installations of Spyce Crafts',
 subtitle: 'Photos sent directly by our clients, showing their wall sets paired with modern furniture.',
 accent: 'REAL RESIDENTIAL SETTINGS',
 bgColor: 'bg-stone-900/5',
 image: '/assets/150623.jpg'
 };
 case 'Before & After':
 return {
 title: 'Before & After: The Preservations Process',
 subtitle: 'Interact with our slider to see actual flower bouquet stems dry out and cure inside our slow-pour blocks.',
 accent: 'CRAFT TRANSFORMATION CONTROLS',
 bgColor: 'bg-amber-950/5',
 image: '/assets/150624.jpg'
 };
 case 'Video Gallery':
 return {
 title: 'Atelier Video logs & TikTok clips',
 subtitle: 'Behind-the-scenes pouring, peeling acrylic protectors, packing dispatch lists, and satisfying polishing sounds.',
 accent: 'SATISFYING MULTIMEDIA REELS',
 bgColor: 'bg-rose-950/5',
 image: '/assets/150625.jpg'
 };
 // 4. CUSTOM ORDER OPTIONS
 case 'Start Custom Order':
 return {
 title: 'Custom Order briefs builder',
 subtitle: 'Fill your customized specifications to prompt a detailed quote discussion with our lead artist.',
 accent: 'CO-DESIGN ATELIER FORM',
 bgColor: 'bg-brand-primary/15',
 image: '/assets/150626.jpg'
 };
 case 'Resin Art Request':
 return {
 title: 'Bespoke Resin Art Commission request',
 subtitle: 'Specify desired colors, oceanic depth waves, handles, dimensions, or specific mahogany wood layouts.',
 accent: 'slowPOLYMER COMMISSIONS',
 bgColor: 'bg-emerald-950/10',
 image: '/assets/150627.jpg'
 };
 case 'Custom Frame Request':
 return {
 title: 'Personalized Custom Frame commission',
 subtitle: 'Submit text phrases, custom sizes, background colors, and typography orientations.',
 accent: 'TYPOGRAPHY MATTING SPECS',
 bgColor: 'bg-indigo-950/10',
 image: '/assets/150628.jpg'
 };
 case 'Personalized Gift Request':
 return {
 title: 'Milestone Gift custom builder',
 subtitle: 'Describe the occasion (Birthday, Proposal, Baby Birth, Graduation) and let us design a custom suite.',
 accent: 'BOU-TIQUE GIFT PACKAGING LAYOUT',
 bgColor: 'bg-rose-950/10',
 image: '/assets/150629.jpg'
 };
 case 'Wedding Order Request':
 return {
 title: 'Wedding preserves Booking block',
 subtitle: 'Reserve your date of flower dispatch ahead of time to lock our visual dehydration ovens.',
 accent: 'GUARANTEED RE-HYDRATED BOOKINGS',
 bgColor: 'bg-purple-950/10',
 image: '/assets/150630.jpg'
 };
 case 'Corporate Order Request':
 return {
 title: 'Corporate bulk commission briefing',
 subtitle: 'Upload logo blueprints, required dimensions, wooden base properties, and delivery schedules.',
 accent: 'SCALABLE OFFICE MATTING',
 bgColor: 'bg-stone-900/10',
 image: '/assets/150631.jpg'
 };
 case 'Bulk Orders':
 return {
 title: 'Bulk & Corporate Favor arrangements',
 subtitle: 'Custom sets of coasters, miniature name tags, or themed gift sets for events/companies.',
 accent: 'BULK HANDCRAFT PRICE BREAKS',
 bgColor: 'bg-amber-950/10',
 image: '/assets/150633.jpg'
 };
 case 'Design Consultation':
 return {
 title: 'Live Design Atelier consultation slot',
 subtitle: 'Book a 1-on-1 voice or chat consultation with our Lead Craftsman to layout Pinterest ideas.',
 accent: 'DIRECT CO-CREATOR STUDIO',
 bgColor: 'bg-brand-primary/15',
 image: '/assets/150634.jpg'
 };
 // 5. BLOG OPTIONS
 case 'Resin Art Inspiration':
 return {
 title: 'Resin Art Inspiration & Decor guide',
 subtitle: 'Discover visual ways to style transparent shorelines on your bedroom dressers and bathroom vanities.',
 accent: 'STYLING TREND JOURNAL',
 bgColor: 'bg-blue-950/10',
 image: '/assets/150635.jpg'
 };
 case 'Gift Ideas':
 return {
 title: 'The ultimate bespoke Gift pairings guidebook',
 subtitle: 'Find out why dried-floral hexagons and custom portrait line art represent Nigeria’s top-trending gifts.',
 accent: 'MILESTONE MOMENTS',
 bgColor: 'bg-amber-950/10',
 image: '/assets/150636.jpg'
 };
 case 'Home Decor Tips':
 return {
 title: 'Warm Minimalist Home Decor tips',
 subtitle: 'Learn the mathematical spacing rule of three-frame bedroom gallery walls for an perfect clean display.',
 accent: 'INTERIOR MATHEMATICS',
 bgColor: 'bg-neutral-900/10',
 image: '/assets/150637.jpg'
 };
 case 'Interior Styling':
 return {
 title: 'Interior house styling insights',
 subtitle: 'Aesthetically pairing shiny high-gloss resin panels with natural wooden furniture and brass finishes.',
 accent: 'TEXTURE BALANCE',
 bgColor: 'bg-stone-900/10',
 image: '/assets/150638.jpg'
 };
 case 'Wedding Inspiration':
 return {
 title: 'Bridal bouquet collection & preserves guide',
 subtitle: 'Everything brides in Nigeria need to know to safely coordinate flower shipping within 48 hours.',
 accent: 'POST-WEDDING CARE PLANNERS',
 bgColor: 'bg-pink-950/10',
 image: '/assets/150639.jpg'
 };
 case 'Corporate Gifting':
 return {
 title: 'The Art of high-quality corporate Recognition',
 subtitle: 'Stand out from generic cheap paper awards. Design premium laser-engraved custom clear plaques.',
 accent: 'BUSINESS BRAND STANDING',
 bgColor: 'bg-indigo-950/10',
 image: '/assets/150640.jpg'
 };
 case 'Care & Maintenance Guides':
 return {
 title: 'Crystalline resin & Acrylic care tutorials',
 subtitle: 'Our guidelines on micro-felt cleaning, UV placement, heat thresholds, and scratching avoidance.',
 accent: 'PRESERVING FOREVER GLOSS',
 bgColor: 'bg-emerald-950/10',
 image: '/assets/150641.jpg'
 };
 // 6. ABOUT OPTIONS
 case 'Our Story':
 return {
 title: 'Spyce Crafts: Lagos-to-Nationwide',
 subtitle: 'How an unwavering fixation with lento polymer layers and Pinterest aesthetics built Nigeria’s foremost resin brand.',
 accent: 'HOW WE EMBARKED',
 bgColor: 'bg-stone-50',
 image: '/assets/150642.jpg'
 };
 case 'Mission & Vision':
 return {
 title: 'Our Craft Values: Crystalline Perfection',
 subtitle: 'Empowering domestic physical artisans, ensuring crystal clarity, and memorializing life’s sweet memories.',
 accent: 'THE SPYCE CODE',
 bgColor: 'bg-stone-950',
 image: '/assets/150643.jpg'
 };
 case 'Craftsmanship Process':
 return {
 title: 'How It’s Made: Behind our Slow Layer Cures',
 subtitle: 'An aesthetic deep dive into our meticulous sand-sanding, heat micro-torch flame treatments, and acrylic backing.',
 accent: '24-HOUR CURE TIMELINES',
 bgColor: 'bg-brand-primary/10',
 image: '/assets/150644.jpg'
 };
 case 'Meet The Team':
 return {
 title: 'The Masters of Spyce Crafts Atelier',
 subtitle: 'Meet our lead resin caster, typographic alignment tech, floral dehydration experts, and dispatch leads.',
 accent: 'MEET THE ARTISANS',
 bgColor: 'bg-stone-50',
 image: '/assets/150645.jpg'
 };
 case 'Customer Reviews':
 return {
 title: 'Unedited Client reviews wall',
 subtitle: 'Read true testimonials of dry-bouquet arrivals, study frame reactions, and customized couple outlines.',
 accent: 'OUR CLIENTS ARE CO-SIGNEES',
 bgColor: 'bg-brand-primary/5',
 image: '/assets/150646.jpg'
 };
 case 'FAQs':
 return {
 title: 'Frequently Asked Atelier Questions',
 subtitle: 'Full details on dispatch packaging protection, custom outlines, bank invoices, and regional shipping.',
 accent: 'IMMEDIATE COMFORT ANSWERS',
 bgColor: 'bg-neutral-900/5',
 image: '/assets/150647.jpg'
 };
 case 'Press & Features':
 return {
 title: 'Spyce Crafts in publications & feeds',
 subtitle: 'Features covering our floral preservation blocs and viral Pinterest room organization threads.',
 accent: 'IN THE HEADLINES',
 bgColor: 'bg-brand-primary/15',
 image: '/assets/150648.jpg'
 };
 // 7. CONTACT OPTIONS
 case 'Contact Us':
 return {
 title: 'Get In Touch',
 subtitle: 'Connect with Spyce Crafts. Choose your preferred digital media or submit an email details.',
 accent: 'IMMEDIATE DIRECT CHANNELS',
 bgColor: 'bg-stone-50',
 image: '/assets/150649.jpg'
 };
 case 'WhatsApp Direct':
 case 'WhatsApp':
 return {
 title: 'WhatsApp Instant Order Hotlines',
 subtitle: 'Skip the standard shopping checkout list and speak straight to a designer about custom frames or trays.',
 accent: 'CHAT IN SECONDS',
 bgColor: 'bg-emerald-950/15',
 image: '/assets/150650.jpg'
 };
 case 'Instagram Feed':
 case 'Instagram':
 return {
 title: 'Our Instagram Community Feed',
 subtitle: 'Join over 5,000 design lovers interacting daily over high-fidelity luxury content grids.',
 accent: 'FOLLOW @SPYCE_CRAFTS',
 bgColor: 'bg-pink-950/10',
 image: '/assets/150651.jpg'
 };
 case 'Facebook Page':
 case 'Facebook':
 return {
 title: 'Spyce Crafts official Facebook Studio',
 subtitle: 'Stay updated with local community reviews, seasonal pre-orders, and Harmattan sales catalogs.',
 accent: 'SPYCE FACEBOOK COMMONS',
 bgColor: 'bg-blue-950/10',
 image: '/assets/150577.jpg'
 };
 case 'TikTok Studio':
 case 'TikTok':
 return {
 title: 'Satisfying TikTok workspace reels',
 subtitle: 'Watch satisfying bubbles disappearing on heat-flames and custom silhouettes painted in slow motion.',
 accent: 'WATCH @SPYCE_CRAFTS VIRAL REELS',
 bgColor: 'bg-[#ECE9E4]/10',
 image: '/assets/150578.jpg'
 };
 case 'Email Support':
 return {
 title: 'Electronic Client Support Desk',
 subtitle: 'Send official corporate proposals, bulk event bookings, and media collaborations lines.',
 accent: 'contact@spycecrafts.com',
 bgColor: 'bg-[#ECE9E4]/10',
 image: '/assets/150579.jpg'
 };
 case 'Business Hours':
 return {
 title: 'Active Atelier Working schedule',
 subtitle: 'Check detailed hourly rosters for our physical workshops, customer response teams, and pickup desks.',
 accent: 'OPENED 6 DAYS A WEEK',
 bgColor: 'bg-neutral-900/10',
 image: '/assets/150580.jpg'
 };
 case 'Atelier Location':
 case 'Location':
 return {
 title: 'Lagos & Enugu Atelier Locations',
 subtitle: 'Physical pick-up instructions, secure dropping of wedding flower bouquets, and scheduling appointments.',
 accent: 'VISITING THE GLORY',
 bgColor: 'bg-brand-primary/15',
 image: '/assets/150581.jpg'
 };
 default:
 return {
 title: `${topic} Showcase`,
 subtitle: `A customized premium screen exploring exquisite artisan details about ${topic}.`,
 accent: 'SPYCE CRAFT ATELIER SELECTION',
 bgColor: 'bg-stone-50',
 image: '/assets/150582.jpg'
 };
 }
 };
 const meta = getTopicMetadata(normalizedTopic);
 // Group categorization helper
 const getTopicGroup = (topic: string): 'shop' | 'collections' | 'gallery' | 'custom' | 'blog' | 'about' | 'contact' => {
 // Gallery Options
 if ([
 'All Projects', 'Resin Art Gallery', 'Custom Frames Gallery', 'Home Decor Gallery',
 'Wedding Projects', 'Corporate Projects', 'Client Installations', 'Before & After', 'Video Gallery'
 ].includes(topic)) return 'gallery';
 // Custom request options
 if ([
 'Start Custom Order', 'Resin Art Request', 'Custom Frame Request',
 'Personalized Gift Request', 'Wedding Order Request', 'Corporate Order Request', 'Bulk Orders', 'Design Consultation'
 ].includes(topic)) return 'custom';
 // Collections Options
 if ([
 'Luxury Collection', 'Wedding Collection', 'Home Collection', 'Gift Collection',
 'Premium Resin Collection', 'Executive Collection', 'Seasonal Collection', 'Limited Edition'
 ].includes(topic)) return 'collections';
 // Blog options
 if ([
 'Resin Art Inspiration', 'Gift Ideas', 'Home Decor Tips',
 'Interior Styling', 'Wedding Inspiration', 'Corporate Gifting', 'Care & Maintenance Guides'
 ].includes(topic)) return 'blog';
 // About options
 if ([
 'Our Story', 'Mission & Vision', 'Craftsmanship Process', 'Meet The Team', 'Customer Reviews', 'FAQs', 'Press & Features'
 ].includes(topic)) return 'about';
 // Contact options
 if ([
 'Contact Us', 'WhatsApp Direct', 'WhatsApp', 'Instagram Feed', 'Instagram', 'Facebook Page', 'Facebook',
 'TikTok Studio', 'TikTok', 'Email Support', 'Business Hours', 'Atelier Location', 'Location'
 ].includes(topic)) return 'contact';
 // Default or Shop Subcategories
 return 'shop';
 };
 const group = getTopicGroup(normalizedTopic);
 const handleSubmitBrief = (e: React.FormEvent) => {
 e.preventDefault();
 setFormSuccess(true);
 // Auto WhatsApp text builder
 const message = `Hello Spyce Crafts! I would like to submit a customized design brief:\n` +
 `- Occasions/Scope: ${normalizedTopic}\n` +
 `- Customer Name: ${formName}\n` +
 `- Scope Details: ${formDetail}\n` +
 `- Additional Inclusions: ${formCustomVal || 'None'}`;
 const waUrl = `https://wa.me/2349069996290?text=${encodeURIComponent(message)}`;
 setTimeout(() => {
 window.open(waUrl, '_blank');
 setFormSuccess(false);
 setFormName('');
 setFormDetail('');
 setFormCustomVal('');
 }, 1500);
 };
 return (
 <div id="dynamic-custom-subview" className="bg-brand-secondary min-h-screen text-stone-200 py-12 px-4 sm:px-6 lg:px-8">
 {/* Cart Added Flash Toast */}
 <div
 className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${successToast ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
 }`}
 >
 <div className="flex items-center gap-3 bg-stone-900 border border-brand-primary/30 text-white px-5 py-3.5 rounded-2xl shadow-2xl min-w-[280px] max-w-sm">
 <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center shrink-0">
 <Check className="w-4 h-4 text-stone-950" />
 </div>
 <p className="flex-1 text-xs font-sans text-stone-200 truncate">{successToast}</p>
 <button
 onClick={() => { navigateTo('cart'); setSuccessToast(null); }}
 className="shrink-0 px-3 py-1.5 bg-brand-primary hover:bg-white hover:text-stone-900 text-stone-950 text-[10px] font-bold uppercase rounded-lg transition-colors cursor-pointer"
 >
 View
 </button>
 </div>
 </div>
 {/* Elegant Nav Header Breadcrumb */}
 <div className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans text-xs border-b border-white/5 pb-6">
 <div className="flex items-center gap-2.5 text-stone-400">
 <button
 onClick={() => navigateTo('home')}
 className="hover:text-brand-primary cursor-pointer uppercase tracking-wider font-semibold"
 >
 Atelier Home
 </button>
 <span className="opacity-30">/</span>
 <span className="uppercase tracking-wider opacity-60 text-stone-400">{group}</span>
 <span className="opacity-30">/</span>
 <span className="text-brand-primary font-bold tracking-widest uppercase">{normalizedTopic}</span>
 </div>
 <button
 onClick={() => {
 // Smart back navigation
 if (group === 'shop' || group === 'collections') {
 navigateTo('shop');
 } else if (group === 'gallery') {
 navigateTo('gallery');
 } else if (group === 'blog') {
 navigateTo('blog');
 } else if (group === 'about') {
 navigateTo('about');
 } else {
 navigateTo('home');
 }
 }}
 className="inline-flex items-center gap-1.5 text-stone-300 hover:text-brand-primary group transition-colors cursor-pointer"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
 <span className="font-semibold uppercase tracking-widest text-[10px]">Back to {group} Main</span>
 </button>
 </div>
 {/* PREMIUM SPOTLIGHT HEADER CARD */}
 <section className="max-w-7xl mx-auto mb-16 rounded-3xl overflow-hidden border border-white/5 relative bg-[#111114]/80 ">
 <div className="grid grid-cols-1 lg:grid-cols-12">
 <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-between space-y-8 text-left">
 <div className="space-y-4">
 <span className="text-[10px] sm:text-xs text-brand-primary tracking-[0.25em] uppercase font-bold block">
 ✦ {meta.accent} ✦
 </span>
 <h1 className="font-serif text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
 {meta.title}
 </h1>
 <p className="text-stone-400 font-sans text-xs sm:text-base leading-relaxed max-w-xl font-light">
 {meta.subtitle}
 </p>
 </div>
 <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5 text-xs text-stone-500 font-sans">
 <div className="flex items-center gap-1.5">
 <Check className="w-4 h-4 text-brand-primary" />
 <span>Handcrafted in Nigeria</span>
 </div>
 <div className="w-1.5 h-1.5 rounded-full bg-stone-700 self-center" />
 <div className="flex items-center gap-1.5">
 <Check className="w-4 h-4 text-brand-primary" />
 <span>Slow Cured Glass Layer</span>
 </div>
 <div className="w-1.5 h-1.5 rounded-full bg-stone-700 self-center" />
 <div className="flex items-center gap-1.5">
 <Check className="w-4 h-4 text-brand-primary" />
 <span>Direct WhatsApp Invoicing</span>
 </div>
 </div>
 </div>
 <div className="lg:col-span-5 aspect-16/10 lg:aspect-auto relative min-h-[300px]">
 <img
 src={meta.image}
 alt={meta.title}
 className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 contrast-125"
 />
 <div className="absolute inset-0 bg-linear-to-r lg:bg-linear-to-t from-brand-secondary via-brand-secondary/40 to-transparent" />
 <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-brand-secondary/80 border border-white/5 text-right">
 <span className="block text-[8px] tracking-widest uppercase text-stone-500 font-medium">Atelier Catalog Status</span>
 <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5 justify-end">
 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
 Active Casting Slot: open
 </span>
 </div>
 </div>
 </div>
 </section>
 {/* ────────────────────────────────────────────────────────
GRID TEMPLATE 1: SHOP OR COLLECTIONS CATEGORIES
──────────────────────────────────────────────────────── */}
 {(group === 'shop' || group === 'collections') && (
 <section className="max-w-7xl mx-auto space-y-16">
 <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/5 pb-6 gap-4">
 <div className="space-y-1 text-left">
 <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Curated Products Inside This Selection</h2>
 <p className="text-stone-400 text-xs sm:text-sm font-sans">Handcrafted resin objects and custom frames representing your selected category theme.</p>
 </div>
 <div className="bg-[#121215] border border-white/5 rounded-xl px-4 py-2 text-xs text-stone-400 font-sans">
 Showing <span className="text-white font-bold">2 - 4 luxury objects</span> matching theme
 </div>
 </div>
 {/* Curated Product list matching current subTopic tags or fallback items */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {PRODUCTS.map((prod) => {
 const matchesTag = prod.tags.some(tag => normalizedTopic.toLowerCase().includes(tag.toLowerCase()));
 const matchesCategory = prod.category.toLowerCase() === normalizedTopic.toLowerCase();
 const isSaleView = normalizedTopic === 'Sale' && prod.salePrice !== null;
 const isBestSeller = normalizedTopic === 'Best Sellers' && prod.tags.includes('best seller');
 const isTrending = normalizedTopic === 'Trending' && prod.tags.includes('trending');
 const isNewArrival = normalizedTopic === 'New Arrivals' && !prod.tags.includes('best seller');
 // Display matches, fallback if none match
 const shouldShow = matchesTag || matchesCategory || isSaleView || isBestSeller || isTrending || isNewArrival || PRODUCTS.indexOf(prod) < 3;
 if (!shouldShow) return null;
 const isItemWishlisted = isInWishlist(prod.id);
 return (
 <div
 id={`subview-item-${prod.id}`}
 key={prod.id}
 className="rounded-2xl overflow-hidden bg-brand-secondary/60 border border-white/5 flex flex-col justify-between group hover:border-brand-primary/30 transition-all duration-300"
 >
 <div className="relative aspect-square overflow-hidden bg-stone-900">
 <img
 src={prod.images[0]}
 alt={prod.name}
 className="w-full h-full object-cover transition-transform duration-500"
 />
 {/* Discount or tag badge */}
 {prod.salePrice ? (
 <span className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md">
 {Math.round(((prod.price - prod.salePrice) / prod.price) * 100)}% Off
 </span>
 ) : prod.tags.includes('best seller') ? (
 <span className="absolute top-4 left-4 bg-brand-primary text-brand-secondary text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md">
 Best Seller
 </span>
 ) : null}
 <button
 onClick={() => toggleWishlist(prod)}
 className="absolute top-4 right-4 p-2.5 bg-brand-secondary/60 rounded-full text-white hover:text-red-500 transition-colors cursor-pointer"
 >
 <Heart className={`w-4 h-4 ${isItemWishlisted ? 'text-red-500 fill-red-500' : ''}`} />
 </button>
 {prod.customizable && (
 <div className="absolute bottom-4 left-4 right-4 text-center">
 <span className="inline-block bg-black/65 text-brand-primary text-[9.5px] font-semibold uppercase tracking-wider py-1 px-3 rounded-full border border-brand-primary/20">
 ✨ Pinterest Customizer Available
 </span>
 </div>
 )}
 </div>
 {/* Product details */}
 <div className="p-6 text-left space-y-4">
 <div className="space-y-1">
 <span className="text-[10px] tracking-wider text-brand-primary uppercase font-bold">{prod.category}</span>
 <h3 className="font-serif text-lg font-bold text-white group-hover:text-brand-primary transition-colors line-clamp-1">{prod.name}</h3>
 <p className="text-stone-400 font-sans text-xs font-light line-clamp-2">{prod.description}</p>
 </div>
 <div className="flex justify-between items-center pt-3 border-t border-white/5">
 <div>
 {prod.salePrice ? (
 <div className="space-x-2">
 <span className="text-white font-serif text-base font-bold">₦{prod.salePrice.toLocaleString()}</span>
 <span className="text-stone-500 font-serif text-xs line-through">₦{prod.price.toLocaleString()}</span>
 </div>
 ) : (
 <span className="text-white font-serif text-base font-bold">₦{prod.price.toLocaleString()}</span>
 )}
 </div>
 <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-widest">
 {prod.stock > 0 ? `${prod.stock} Units Left` : 'Sold Out'}
 </span>
 </div>
 {/* Quick cart CTA */}
 <div className="grid grid-cols-2 gap-2.5 pt-2">
 <button
 onClick={() => navigateTo('product-detail', prod.slug)}
 className="py-2.5 rounded-xl border border-white/10 text-stone-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
 >
 Details
 </button>
 <button
 onClick={() => triggerAddToCart(prod)}
 className="py-2.5 rounded-xl bg-brand-primary hover:bg-[#b0936b] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
 >
 <ShoppingCart className="w-3.5 h-3.5 text-stone-200" />
 <span>Add To Cart</span>
 </button>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 {/* Interactive Custom Order CTA at bottom of Shop/Collections Subviews */}
 <div className="bg-linear-to-r from-emerald-950/20 via-neutral-900/40 to-brand-secondary p-8 sm:p-12 rounded-3xl border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
 <div className="lg:col-span-8 space-y-3">
 <span className="text-[10px] tracking-widest text-emerald-400 uppercase font-black">STATED BESPOKE REQUESTS</span>
 <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Need a dynamic size or unique design for {normalizedTopic}?</h3>
 <p className="text-stone-400 font-sans text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
 We design and slowly layer-cast everything to absolute perfection. Pitch your favorite color values, custom sizing limits, or share your Pinterest board photo with Spyce Crafts.
 </p>
 </div>
 <div className="lg:col-span-4 justify-self-start lg:justify-self-end">
 <button
 onClick={() => navigateTo('shop')}
 className="px-8 py-4 rounded-xl bg-brand-primary hover:bg-white hover:text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl cursor-pointer"
 >
 Shop This Collection
 </button>
 </div>
 </div>
 </section>
 )}
 {/* ────────────────────────────────────────────────────────
GRID TEMPLATE 2: DYNAMIC GALLERY OPTIONS
──────────────────────────────────────────────────────── */}
 {group === 'gallery' && (
 <section className="max-w-7xl mx-auto space-y-16">
 <div className="text-center space-y-3 max-w-xl mx-auto">
 <span className="text-[10px] tracking-wider text-brand-primary uppercase font-bold block">✦ HIGH-ACCURACY VISUAL ARCHIVE ✦</span>
 <h2 className="font-serif text-3xl font-black text-white">{normalizedTopic} Slides</h2>
 <p className="text-stone-400 font-sans text-xs sm:text-sm font-light leading-normal">
 A historical display of real custom placements, client living room aesthetics, and satisfying drying processes.
 </p>
 </div>
 {/* INVENTIVE SPECIAL SECTION: Before & After slider */}
 {normalizedTopic === 'Before & After' ? (
 <div className="max-w-4xl mx-auto bg-[#111114] border border-white/5 rounded-3xl p-6 sm:p-10 space-y-8 text-left">
 <div className="space-y-2">
 <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Interactive Transformation Slider</h3>
 <p className="text-stone-400 font-sans text-xs">Drag the bar left or right to inspect a client wedding flower bouquet before dehydration compared with its final 3D hexagon glass preservation block.</p>
 </div>
 {/* Physical Comparison Container */}
 <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/5">
 {/* AFTER IMAGE (Background) */}
 <img
 src="/assets/150589.jpg"
 alt="Floral Curing After"
 className="absolute inset-0 w-full h-full object-cover"
 />
 <div className="absolute bottom-4 right-4 bg-brand-primary text-stone-950 text-[10px] font-extrabold font-sans uppercase px-3 py-1 rounded-md tracking-wider">
 After: Slowly Layered Epoxy Block
 </div>
 {/* BEFORE IMAGE (Clipped Foreground) */}
 <div
 className="absolute inset-y-0 left-0 overflow-hidden"
 style={{ width: `${sliderVal}%` }}
 >
 <img
 src="/assets/150577.jpg"
 alt="Floral Curing Before"
 className="absolute inset-0 w-full h-full object-cover max-w-none"
 style={{ width: '100%' }}
 />
 <div className="absolute bottom-4 left-4 bg-black/60 text-white text-[10px] font-extrabold font-sans uppercase px-3 py-1 rounded-md tracking-wider">
 Before: Fresh Floral Bouquet
 </div>
 </div>
 {/* Vertical Divider Indicator */}
 <div
 className="absolute inset-y-0 w-0.5 bg-white shadow-2xl pointer-events-none"
 style={{ left: `${sliderVal}%` }}
 >
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-primary text-stone-950 font-bold flex items-center justify-center text-xs shadow-2xl">
 ↔
 </div>
 </div>
 </div>
 {/* Slider Input */}
 <div className="space-y-2">
 <input
 type="range"
 min="0"
 max="100"
 value={sliderVal}
 onChange={(e) => setSliderVal(Number(e.target.value))}
 className="w-full accent-brand-primary bg-stone-800 rounded-lg cursor-pointer h-2"
 />
 <div className="flex justify-between text-[11px] font-mono text-stone-500 uppercase tracking-widest">
 <span>Dry Stem Preparation</span>
 <span>Drag To Compare</span>
 <span>Glossy Crystal Preservation</span>
 </div>
 </div>
 </div>
 ) : (
 /* GENERAL ARTISAN MASONRY PREVIEW GALLERY */
 <div className="space-y-8">
 <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
 {[
 { title: 'The Coastal Sea Ring geode tray', cat: 'Resin waves', img: '/assets/150645.jpg', size: '12x8"' },
 { title: 'Minimalist study desk typographic installation', cat: 'Wall Frames', img: '/assets/150646.jpg', size: 'A4 Panel' },
 { title: 'Dehydrated Pink Rose and Baby Breath faceted Block', cat: 'Wedding Preserve', img: '/assets/150647.jpg', size: '6" Hexagon' },
 { title: 'Lagos Couple Portrait Gold-Foil Silhouette outline', cat: 'Portrait Sketch', img: '/assets/150648.jpg', size: 'A3 Wooden frame' },
 { title: 'Ambition quote matte acrylic dual grid', cat: 'Office styling', img: '/assets/150649.jpg', size: 'A4 Twin Set' },
 { title: 'Deep Ocean lacing brass handle tray', cat: 'Resin Art', img: '/assets/150650.jpg', size: '14" Round' }
 ].map((item, idx) => (
 <div
 id={`gallery-masonry-${idx}`}
 key={idx}
 onClick={() => setActiveImageIdx(idx)}
 className="group rounded-2xl overflow-hidden border border-white/5 bg-[#111114]/40 cursor-pointer relative aspect-square shadow-md hover:border-brand-primary transition-all duration-300"
 >
 <img
 src={item.img}
 alt={item.title}
 className="w-full h-full object-cover transition-transform duration-500"
 />
 <div className="absolute inset-0 bg-linear-to-t from-brand-secondary/90 via-brand-secondary/20 to-transparent flex flex-col justify-end p-5 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
 <span className="text-[9px] tracking-widest text-brand-primary uppercase font-bold block">{item.cat} ({item.size})</span>
 <h4 className="font-serif text-sm font-bold text-white leading-tight mt-1">{item.title}</h4>
 </div>
 </div>
 ))}
 </div>
 {/* Subtext CTA */}
 <div className="p-8 bg-[#111114]/40 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between text-left gap-4">
 <div className="space-y-1">
 <h4 className="font-serif text-lg font-bold text-white">Looking for live physical pouring clips?</h4>
 <p className="text-stone-400 font-sans text-xs">Our TikTok studio features satisfying process videos peeling acrylic panels and custom line sketches in Lagos.</p>
 </div>
 <a
 href="https://tiktok.com/@spyce_crafts"
 target="_blank"
 rel="noreferrer"
 className="px-5 py-3 rounded-xl bg-pink-950/20 text-pink-300 border border-pink-500/20 font-bold text-xs uppercase tracking-wider hover:bg-pink-950/40 cursor-pointer flex items-center gap-1.5"
 >
 <Camera className="w-4 h-4" />
 <span>Launch TikTok Studio</span>
 </a>
 </div>
 </div>
 )}
 </section>
 )}
 {/* ────────────────────────────────────────────────────────
GRID TEMPLATE 3: CUSTOM BRIEFS & COMMISSION REQUESTS
──────────────────────────────────────────────────────── */}
 {group === 'custom' && (
 <section className="max-w-4xl mx-auto bg-[#111114]/80 rounded-3xl border border-white/5 p-6 sm:p-12 text-left space-y-10">
 <div className="space-y-2 border-b border-white/5 pb-6">
 <span className="text-[10px] tracking-[0.25em] text-brand-primary font-bold block uppercase">✧ CO-CREATOR SPECIFICATIONS ✧</span>
 <h2 className="font-serif text-3xl font-bold text-white">Create dynamic brief for {normalizedTopic}</h2>
 <p className="text-stone-400 font-sans text-xs leading-normal font-light">
 Submit your preferred details below. Our builder formats a structural text document and launches directly to WhatsApp for artisan review.
 </p>
 </div>
 <form onSubmit={handleSubmitBrief} className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-[10px] tracking-wider text-stone-400 uppercase font-bold block">Your Name (Client Contact) *</label>
 <input
 type="text"
 required
 placeholder="e.g. Ifeanyi Okafor"
 value={formName}
 onChange={(e) => setFormName(e.target.value)}
 className="w-full bg-brand-secondary border border-white/10 rounded-xl px-4 py-3 text-stone-200 text-xs focus:outline-none focus:border-brand-primary"
 />
 </div>
 <div className="space-y-2">
 <label className="text-[10px] tracking-wider text-stone-400 uppercase font-bold block">Optional email support</label>
 <input
 type="email"
 placeholder="e.g. name@domain.com"
 value={formEmail}
 onChange={(e) => setFormEmail(e.target.value)}
 className="w-full bg-brand-secondary border border-white/10 rounded-xl px-4 py-3 text-stone-200 text-xs focus:outline-none focus:border-brand-primary"
 />
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-[10px] tracking-wider text-brand-primary uppercase font-bold block">
 {normalizedTopic.includes('Frame') ? 'Frame Text Phrase, Typographical Orientation & Matting Font *' :
 normalizedTopic.includes('Wedding') || normalizedTopic.includes('Gift') ? 'Scope of Ocassions, Date of Event & Dried Flower preservations *' :
 'Describe Custom Resin Art Wave designs, sizes, mahogany handles, or wood inclusions *'}
 </label>
 <textarea
 rows={5}
 required
 placeholder={
 normalizedTopic.includes('Frame') ? 'e.g. Phrase: "FEAR NOT | FOR I AM WITH YOU". Alignment: Center stacked. Matting board: A3, Satin Black premium border with double portrait line art sketch and fine gold flakes.' :
 normalizedTopic.includes('Wedding') ? 'e.g. Wedding Date: Aug 12. Flora details: preserve white spray orchids, dry peach hybrid tea roses. Hexagon clear block 8" deep with bride & groom brass plate.' :
 'Describe desired tray handles, wave ocean colors, geode details, corporate branding logo details, or custom clockwork diameters...'
 }
 value={formDetail}
 onChange={(e) => setFormDetail(e.target.value)}
 className="w-full bg-brand-secondary border border-white/10 rounded-xl px-4 py-3.5 text-stone-200 text-xs focus:outline-none focus:border-brand-primary"
 />
 </div>
 <div className="space-y-2">
 <label className="text-[10px] tracking-wider text-stone-400 uppercase font-bold block">Additional details or TikTok / Pinterest reference links</label>
 <input
 type="text"
 placeholder="e.g. Pinterest inspiration link. Desired mahogany wood slab details..."
 value={formCustomVal}
 onChange={(e) => setFormCustomVal(e.target.value)}
 className="w-full bg-brand-secondary border border-white/10 rounded-xl px-4 py-3 text-stone-200 text-xs focus:outline-none focus:border-brand-primary"
 />
 </div>
 <div className="bg-brand-secondary p-5 rounded-2xl border border-white/5 space-y-2 text-xs">
 <span className="font-serif font-bold text-white block">WhatsApp co-designer mechanism details:</span>
 <p className="text-stone-400 leading-relaxed font-light">
 Spyce Crafts processes pricing deposits manually over secure bank invoices. No credit cards required during design submissions. This brief formats perfectly and directs straight to our active Lagos customer hotlines.
 </p>
 </div>
 <button
 type="submit"
 className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-2 cursor-pointer"
 >
 <MessageSquare className="w-4 h-4" />
 <span>Send Brief via WhatsApp</span>
 </button>
 {formSuccess && (
 <p className="text-center text-xs text-emerald-400 font-bold animate-pulse">
 Dynamic brief compiles successfully! Redirecting and opening WhatsApp...
 </p>
 )}
 </form>
 </section>
 )}
 {/* ────────────────────────────────────────────────────────
GRID TEMPLATE 4: CHOSEN BLOG CATEGORY SHOWCASE
──────────────────────────────────────────────────────── */}
 {group === 'blog' && (
 <section className="max-w-7xl mx-auto space-y-12 text-left">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {[
 {
 title: `Premium styling: Perfect Placement in modern settings`,
 excerpt: `How designers capture natural light to elevate clear resin tables and reflective crystal hexagons.`,
 time: '4 mins read',
 author: 'Sonia Agbo',
 date: 'June 4, 2026',
 img: '/assets/150651.jpg'
 },
 {
 title: `Curing micro-bubbles: The slow-cool polymer technology secrets`,
 excerpt: `A look behind high- gloss liquid glass layers. Why traditional hair dryers fail and visual heat blasters win.`,
 time: '7 mins read',
 author: 'Chijioke N.',
 date: 'May 28, 2026',
 img: '/assets/150577.jpg'
 },
 {
 title: `Preserving Bridal Bouquets: The 48-Hour Dehydration Guideline`,
 excerpt: `Essential instructions on wrapping, storing, and shipping wedding lilies so color states don't rot.`,
 time: '5 mins read',
 author: 'Agnes D.',
 date: 'May 15, 2026',
 img: '/assets/150591.jpg'
 }
 ].map((art, idx) => (
 <div
 id={`blog-item-card-${idx}`}
 key={idx}
 className="rounded-2xl overflow-hidden bg-[#111114]/50 border border-white/5 flex flex-col justify-between hover:border-brand-primary transition-all duration-300 group"
 >
 <div className="aspect-16/10 overflow-hidden bg-stone-900 pointer-events-none">
 <img src={art.img} alt={art.title} className="w-full h-full object-cover transition-transform duration-500" />
 </div>
 <div className="p-6 space-y-4">
 <div className="flex items-center gap-2 text-[10px] text-brand-primary uppercase tracking-wider font-bold">
 <span>{normalizedTopic}</span>
 <span className="w-1 h-1 rounded-full bg-stone-600" />
 <span>{art.time}</span>
 </div>
 <div className="space-y-1">
 <h3 className="font-serif text-lg font-bold text-white group-hover:text-brand-primary transition-colors leading-tight">{art.title}</h3>
 <p className="text-stone-400 font-sans text-xs font-light line-clamp-3">{art.excerpt}</p>
 </div>
 <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-stone-500">
 <span className="font-medium text-stone-300">By {art.author}</span>
 <span>{art.date}</span>
 </div>
 </div>
 </div>
 ))}
 </div>
 </section>
 )}
 {/* ────────────────────────────────────────────────────────
GRID TEMPLATE 5: CUSTOM ABOUT MODULES
──────────────────────────────────────────────────────── */}
 {group === 'about' && (
 <section className="max-w-4xl mx-auto text-left space-y-12 font-sans">
 {/* TEAM PROFILE VIEW */}
 {normalizedTopic === 'Meet The Team' ? (
 <div className="space-y-10">
 <div className="text-center space-y-2 max-w-xl mx-auto">
 <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">The Creators Behind The Polymer Layers</h3>
 <p className="text-stone-400 text-xs font-light leading-normal">Our closed physically curated team operates dynamic handcraft stations matching specific areas of frames alignment and resin layer development.</p>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
 {[
 { name: 'Sonia Kolawole', role: 'Founder & Lead Resin Artisan', desc: 'Overstands heavy oceanic geode tray pouring, fluid resin wave chemistry, and botanical encapsulation layering.' },
 { name: 'Chijioke Nwosu', role: 'Head of Typography & Frame matted', desc: 'Designs high-contrast line layouts, edits minimalist photo selections, and coordinates precision typographic matting.' },
 { name: 'Agnes Okafor', role: 'Botanical Dehydration expert', desc: 'Manages silica sand flower hydration ovens, preserving pigment colors from luxury bridal wedding bouquets.' }
 ].map((member, idx) => (
 <div key={idx} className="bg-[#111114]/80 p-6 rounded-2xl border border-white/5 space-y-4">
 <div className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center text-stone-950 font-bold text-lg">
 {member.name.split(' ').map(n => n[0]).join('')}
 </div>
 <div className="space-y-1">
 <strong className="block text-white text-sm font-serif">{member.name}</strong>
 <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block">{member.role}</span>
 </div>
 <p className="text-stone-400 text-xs leading-relaxed font-light">{member.desc}</p>
 </div>
 ))}
 </div>
 </div>
 ) : normalizedTopic === 'Craftsmanship Process' ? (
 /* CRAFTSMANSHIP TIMELINE PROCESS */
 <div className="space-y-12">
 <div className="space-y-3">
 <h3 className="font-serif text-2xl font-bold text-white">Our slow-Cast layer Curing Timeline</h3>
 <p className="text-stone-400 text-xs font-light leading-relaxed">
 Unlike fast industrial plastic toys, physical handcraft takes calculated layered cooling steps. Here is how Spyce Crafts perfects your custom resin plate or typographical art.
 </p>
 </div>
 <div className="space-y-8 pl-4 border-l border-brand-primary/20">
 {[
 { step: 'Step 1: Board Matting & Silica Dehydration', desc: 'Dry botanical materials are sealed inside specific visual ovens to lock chemical state. Acrylic sheets are laser-sliced matching Pinterest dimension lists.' },
 { step: 'Step 2: slow Cast wave pouring', desc: 'Epoxy resin polymers are slowly handcast in 1/4 inch segments. A dynamic micro-torch flame treatments eliminates all trapped air bubble drafts.' },
 { step: 'Step 3: Polishing & Brass Matting', desc: 'Fully cured geode units undergo wood orbital sanding and double high-gloss coat wax. Brass handles are fastened using state machinery.' },
 { step: 'Step 4: thick double-wrap dispatch', desc: 'Each crystal bloc is double wrapped inside padded cardboard boards to prevent transport chips across Nigerian states.' }
 ].map((tm, idx) => (
 <div key={idx} className="relative space-y-2">
 <div className="absolute left-[-25px] top-1.5 w-3 h-3 rounded-full bg-brand-primary border-4 border-stone-950" />
 <strong className="block text-white text-sm font-serif">{tm.step}</strong>
 <p className="text-stone-400 text-xs leading-relaxed font-light max-w-2xl">{tm.desc}</p>
 </div>
 ))}
 </div>
 </div>
 ) : normalizedTopic === 'Customer Reviews' ? (
 /* DETAILED MASSONRY REVIEWS */
 <div className="space-y-6">
 {[
 { name: 'Deborah Kolawole', review: 'My bouquet preservation was packaged beautifully. The depth matches real hex blocks and color is perfect!', location: 'Victoria Island, Lagos' },
 { name: 'Emeka Nwosu', review: 'Typographical quote frame matte standard is perfect. Highly recommended Pinterest style.', location: 'Garki, Abuja' },
 { name: 'Ifeoma Okafor', review: 'Anniversary couples sketch line display literally moved my partner. Handcrafted gold flake highlights are superior.', location: 'Port Harcourt' }
 ].map((rev, idx) => (
 <div key={idx} className="bg-[#111114]/60 border border-white/5 p-6 rounded-2xl flex flex-col justify-between gap-3 text-left">
 <div className="flex items-center gap-1.5 text-amber-500 text-xs">
 {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />)}
 </div>
 <p className="text-stone-300 text-xs italic font-light">"{rev.review}"</p>
 <div className="text-[10px] text-stone-500 font-sans tracking-wide">
 <strong className="text-white font-medium">{rev.name}</strong> — {rev.location}
 </div>
 </div>
 ))}
 </div>
 ) : (
 /* GENERAL EDITORIAL STORY BLOCKS */
 <div className="space-y-6 text-stone-300 font-light leading-relaxed text-xs sm:text-sm">
 <p>
 Spyce Crafts operates as Nigeria’s elite boutique resin and custom frame atelier. Founded with the conviction that domestic physical craftsmanship holds greater value than generic mass-produced catalog decor.
 </p>
 <p>
 Our processes are calculated to the millisecond. By taking slow curing layering parameters, using top-tier scratch-resistant glass resin blends, and offering completely custom digital matting layouts, each piece acts as an eternal landmark.
 </p>
 <div className="p-6 bg-[#111114] rounded-2xl border border-white/5 text-center mt-3">
 <span className="font-serif text-brand-primary tracking-widest text-xs uppercase font-extrabold block mb-2">Our physical motto</span>
 <span className="text-white italic text-base">“We clear bubbles, protect fresh wedding blooms, and outline dynamic memories to stand crystalline forever.”</span>
 </div>
 </div>
 )}
 </section>
 )}
 {/* ────────────────────────────────────────────────────────
GRID TEMPLATE 6: REAL SPECIAL CHANNELS & PHONE ROSTERS
──────────────────────────────────────────────────────── */}
 {group === 'contact' && (
 <section className="max-w-4xl mx-auto text-left gap-8 grid grid-cols-1 md:grid-cols-12">
 <div className="md:col-span-5 space-y-6">
 <div className="space-y-1.5">
 <span className="text-[10px] tracking-widest text-emerald-400 font-black uppercase">DIRECT CHANNELS</span>
 <h3 className="font-serif text-2xl font-bold text-white">Speak With Spyce Crafts</h3>
 <p className="text-stone-400 font-sans text-xs">Our artisans maintain active WhatsApp lines for custom quote calculations and dropping wedding bouquet collections.</p>
 </div>
 <div className="space-y-4 font-sans text-xs text-stone-300">
 <div className="p-4 bg-[#111114] border border-white/5 rounded-2xl flex items-center gap-3">
 <MessageSquare className="w-5 h-5 text-emerald-400" />
 <div>
 <strong className="block text-white">WhatsApp direct Hotline</strong>
 <span className="text-stone-400">+234 (0) 906 999 6290</span>
 </div>
 </div>
 <div className="p-4 bg-[#111114] border border-white/5 rounded-2xl flex items-center gap-3">
 <Clock className="w-5 h-5 text-brand-primary" />
 <div>
 <strong className="block text-white">Active response Hours</strong>
 <span className="text-stone-400">Weekdays: 9AM - 6PM | Sat: 10AM - 4PM</span>
 </div>
 </div>
 <div className="p-4 bg-[#111114] border border-white/5 rounded-2xl flex items-center gap-3">
 <MapPin className="w-5 h-5 text-brand-accent animate-pulse" />
 <div>
 <strong className="block text-white">Atelier pick-up spots</strong>
 <span className="text-stone-400">Lagos Main Hub (pickup drops). Enugu Workshop branch.</span>
 </div>
 </div>
 </div>
 </div>
 <div className="md:col-span-7 bg-[#111114] p-8 rounded-3xl border border-white/5 space-y-6 text-left">
 <h4 className="font-serif text-lg font-bold text-white">Email Proposal Form</h4>
 <p className="text-xs text-stone-400 font-sans leading-normal">Submit details directly to our corporate inbox to initiate invoice proposals for plaques or favors.</p>
 <form onSubmit={(e) => {
 e.preventDefault();
 setFormSuccess(true);
 setTimeout(() => {
 setFormSuccess(false);
 setFormName('');
 setFormEmail('');
 setFormDetail('');
 }, 3000);
 }} className="space-y-4">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <input
 type="text"
 required
 placeholder="Your Name *"
 value={formName}
 onChange={(e) => setFormName(e.target.value)}
 className="w-full bg-brand-secondary border border-white/10 rounded-xl px-4 py-3 text-stone-200 text-xs focus:outline-none focus:border-brand-primary"
 />
 <input
 type="email"
 required
 placeholder="Your Email *"
 value={formEmail}
 onChange={(e) => setFormEmail(e.target.value)}
 className="w-full bg-brand-secondary border border-white/10 rounded-xl px-4 py-3 text-stone-200 text-xs focus:outline-none focus:border-brand-primary"
 />
 </div>
 <textarea
 rows={4}
 required
 placeholder="Submit desired custom order scope details or questions..."
 value={formDetail}
 onChange={(e) => setFormDetail(e.target.value)}
 className="w-full bg-brand-secondary border border-white/10 rounded-xl px-4 py-3 text-stone-200 text-xs focus:outline-none focus:border-brand-primary"
 />
 <button
 type="submit"
 className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
 >
 <MessageSquare className="w-4 h-4" />
 Send via WhatsApp
 </button>
 {formSuccess && (
 <p className="text-center text-[10px] text-emerald-400 font-sans animate-pulse">
 WhatsApp is opening — tap <strong>Send</strong> in the chat to submit your message.
 </p>
 )}
 </form>
 </div>
 </section>
 )}
 {/* DYNAMIC BACK-TO-TOP CHANNELS FOOTNOTE */}
 <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center text-xs text-stone-600 font-sans">
 <p className="max-w-md mx-auto leading-relaxed">
 Spyce Crafts protects raw design ideas. Every custom quote formulated inside our co-designer studio triggers secure chat alignments.
 </p>
 </footer>
 </div>
 );
}
