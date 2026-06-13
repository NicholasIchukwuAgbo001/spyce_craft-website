import { Product } from '../types';

const BASE_PRODUCTS: Product[] = [
  {
    id: 'resin-coastal-ocean-tray',
    slug: 'resin-coastal-ocean-tray',
    name: 'Coastal Inception Resin Tray',
    description: 'A luxurious handcrafted catchall tray made with premium high-gloss epoxy resin. Captures the deep blues and frothy white lacing of ocean waves crash-coursing on natural wood. Finished with polished brass handles, perfect for premium vanity set-ups or living room styling.',
    price: 32000,
    salePrice: 28500,
    category: 'Resin Art',
    images: [
      '/assets/150577.jpg',
      '/assets/150578.jpg',
      '/assets/150579.jpg'
    ],
    featured: true,
    stock: 12,
    customizable: true,
    sizes: ['Medium (12x8")', 'Large (16x10")'],
    colors: ['Deep Azure', 'Ocean Coral', 'Emerald Wave'],
    rating: 4.9,
    reviewCount: 38,
    tags: ['resin', 'tray', 'home decor', 'coastal', 'handmade', 'best seller']
  },
  {
    id: 'acrylic-motivational-keep-going',
    slug: 'acrylic-motivational-keep-going',
    name: '“KEEP GOING” Premium Acrylic Frame',
    description: 'One of our most popular Pinterest-inspired designs on TikTok. Featuring high-definition white typographic arrows printed on high-gloss back-acrylic, encased in a premium sleek frame block. Elevates study desks, corporate workspaces, and modern bedrooms alike.',
    price: 18500,
    salePrice: null,
    category: 'Custom Frames',
    images: [
      '/assets/150580.jpg',
      '/assets/150581.jpg',
      '/assets/150582.jpg'
    ],
    featured: true,
    stock: 25,
    customizable: true,
    sizes: ['A5 (Compact)', 'A4 (Standard)', 'A3 (Premium Display)'],
    colors: ['Classic Obsidian Black', 'Sleek Pure White', 'Champagne Luxury Gold'],
    rating: 4.8,
    reviewCount: 94,
    tags: ['acrylic', 'frame', 'motivational', 'quote', 'pinterest', 'trending']
  },
  {
    id: 'custom-silhouette-lineart-couple',
    slug: 'custom-silhouette-lineart-couple',
    name: 'Infinite Love - Custom Line Art Frame',
    description: 'A bespoke hand-sketched minimalist line art print from your favorite couple/family portrait, rendered inside a state-of-the-art borderless clear acrylic panel or framed blocks. Embellished with fine hints of hand-laid gold foil for a premium, luxury finish.',
    price: 25000,
    salePrice: 22000,
    category: 'Portrait Frames',
    images: [
      '/assets/150584.jpg',
      '/assets/150585.jpg',
      '/assets/150586.jpg'
    ],
    featured: true,
    stock: 40,
    customizable: true,
    sizes: ['A4 (Standard)', 'A3 (Premium Display)'],
    colors: ['Sleek Pure White', 'Classic Obsidian Black', 'Champagne Luxury Gold'],
    rating: 5.0,
    reviewCount: 142,
    tags: ['portrait', 'custom', 'lineart', 'wedding', 'gift', 'limited edition']
  },
  {
    id: 'pinterest-work-hard-take-risks',
    slug: 'pinterest-work-hard-take-risks',
    name: 'Ambition Dual-Frame Set (Take Risks & Work Hard)',
    description: 'Luxury high-contrast custom set featuring "TAKE RISKS - Live with no excuses" and "WORK HARD - Study like dating, work like a slave". Inspired by viral Pinterest study layouts, designed in premium satin black frame boards.',
    price: 35000,
    salePrice: 32000,
    category: 'Home Decor',
    images: [
      '/assets/150587.jpg',
      '/assets/150588.jpg'
    ],
    featured: false,
    stock: 15,
    customizable: true,
    sizes: ['A4 Set of 2', 'A3 Set of 2'],
    colors: ['Classic Obsidian Black', 'Champagne Luxury Gold'],
    rating: 4.9,
    reviewCount: 52,
    tags: ['set', 'pinterest', 'office', 'inspiration']
  },
  {
    id: 'floral-resin-preservation-keepsake',
    slug: 'floral-resin-preservation-keepsake',
    name: 'Eternal Bloom Wedding Bouquet Preservation',
    description: 'Keep your magical bridal bouquet fresh forever. We dehydrate your wedding flowers and design them inside crystal-clear hexagonal or deep rectangular high-end resin blocks. Handcrafted with multiple layers of heat-proof resin to prevent yellowing over time.',
    price: 45000,
    salePrice: null,
    category: 'Wedding Gifts',
    images: [
      '/assets/150589.jpg',
      '/assets/150590.jpg',
      '/assets/150591.jpg'
    ],
    featured: true,
    stock: 8,
    customizable: true,
    sizes: ['Hexagon 6x6"', 'Hexagon 8x8"', 'Luxury Column 10x10"'],
    colors: ['Clear Acrylic Block', 'Gold Flaked Clear', 'Silver Dust Clear'],
    rating: 5.0,
    reviewCount: 64,
    tags: ['wedding', 'flower', 'resin', 'keepsake', 'preservation', 'best seller']
  },
  {
    id: 'acrylic-custom-name-plaque',
    slug: 'acrylic-custom-name-plaque',
    name: 'Executive Frosted Glass Name Plaque',
    description: 'An elegant personal name plaque featuring high-gloss minimalist typography on frosted custom glass with solid wood block mounts or brass standoffs. Elevates office desks, reception counters, or home workspace entrances with style.',
    price: 22000,
    salePrice: 19500,
    category: 'Name Plaques',
    images: [
      '/assets/150592.jpg',
      '/assets/150593.jpg'
    ],
    featured: false,
    stock: 30,
    customizable: true,
    sizes: ['Standard Desk (8x3")', 'Executive Large (12x4")'],
    colors: ['Frosted Glass Clear', 'Gloss Obsidian Back', 'Champagne Amber'],
    rating: 4.7,
    reviewCount: 41,
    tags: ['name', 'office', 'plaque', 'executive', 'custom', 'new']
  },
  {
    id: 'sculptural-kaws-pop-art-frame',
    slug: 'sculptural-kaws-pop-art-frame',
    name: 'Retro Hype - KAWS Art Acrylic Frame',
    description: 'Bold art piece depicting classic hypebeast pop-sculptures. Layered on an high-definition acrylic sheet that gives the artwork deep saturation, high luster, and modern aesthetic. Guaranteed to capture eyeballs and start conversations.',
    price: 27000,
    salePrice: null,
    category: 'Home Decor',
    images: [
      '/assets/150594.jpg',
      '/assets/150595.jpg'
    ],
    featured: false,
    stock: 18,
    customizable: true,
    sizes: ['A4 (Standard)', 'A3 (Premium Display)', 'A2 (Statement Art)'],
    colors: ['Classic Obsidian Black', 'Champagne Luxury Gold'],
    rating: 4.8,
    reviewCount: 29,
    tags: ['kaws', 'pop art', 'hypebeast', 'aesthetic', 'acrylic']
  },
  {
    id: 'personalized-polaroid-grid-frame',
    slug: 'personalized-polaroid-grid-frame',
    name: 'Storyteller - Personalized 9-Grid Photo Frame',
    description: 'Transform 9 of your beautiful digital photographs into physical custom Polaroid-styled layout frames. Styled with vintage handwritten titles of dates, coordinate codes, or loving thoughts. Sealed in high-grade clear protection glass.',
    price: 29500,
    salePrice: 26000,
    category: 'Personalized Gifts',
    images: [
      '/assets/150596.jpg',
      '/assets/150597.jpg',
      '/assets/150598.jpg'
    ],
    featured: true,
    stock: 35,
    customizable: true,
    sizes: ['Standard Grid (12x12")', 'Luxury Large Grid (18x18")'],
    colors: ['Classic Obsidian Black', 'Sleek Pure White', 'Natural Pine Wood', 'Champagne Luxury Gold'],
    rating: 4.9,
    reviewCount: 110,
    tags: ['gift', 'personalized', 'photo', 'collage', 'polaroid', 'best seller']
  },
  {
    id: 'organic-abstract-warm-palette',
    slug: 'organic-abstract-warm-palette',
    name: 'Sunset Solitude - Abstract Aesthetic Frame',
    description: 'A heartwarming high-contrast abstract shape composition rendering a tropical warm sun rising above sandy layers. Framed in high-quality premium acrylic framing glass with pristine corner finishes.',
    price: 19000,
    salePrice: 17000,
    category: 'Home Decor',
    images: [
      '/assets/150599.jpg',
      '/assets/150600.jpg'
    ],
    featured: false,
    stock: 22,
    customizable: true,
    sizes: ['A5 (Compact)', 'A4 (Standard)', 'A3 (Premium Display)'],
    colors: ['Classic Obsidian Black', 'Natural Pine Wood', 'Sleek Pure White'],
    rating: 4.7,
    reviewCount: 33,
    tags: ['abstract', 'warm', 'sunset', 'decor', 'art', 'new']
  },
  {
    id: 'corporate-engraved-wooden-giftbox',
    slug: 'corporate-engraved-wooden-giftbox',
    name: 'Sovereign Corporate Customized Gift Set',
    description: 'The ultimate handcrafted brand experience. Includes a bespoke acrylic desk plaque, an engraved high-density premium wood cardholder, and premium coaster art with your company logo hand-poured in matching metallic silver resin.',
    price: 55000,
    salePrice: null,
    category: 'Corporate Gifts',
    images: [
      '/assets/150601.jpg',
      '/assets/150602.jpg'
    ],
    featured: false,
    stock: 50,
    customizable: true,
    sizes: ['Premium Wood Set', 'Executive Acrylic Set'],
    colors: ['Obsidian & Walnut', 'Clear Frosted Acrylic'],
    rating: 5.0,
    reviewCount: 15,
    tags: ['corporate', 'gift', 'branding', 'plaque', 'executive', 'limited edition']
  }
];

// Full image library — all assets in /public/assets
const RESIN_IMAGES = [
  '/assets/150577.jpg',
  '/assets/150578.jpg',
  '/assets/150579.jpg',
  '/assets/150580.jpg',
  '/assets/150581.jpg',
  '/assets/150582.jpg',
  '/assets/150584.jpg',
  '/assets/150585.jpg',
  '/assets/150586.jpg',
  '/assets/150587.jpg',
  '/assets/150588.jpg',
  '/assets/150589.jpg',
  '/assets/150590.jpg',
  '/assets/150591.jpg',
  '/assets/150592.jpg',
  '/assets/150593.jpg',
  '/assets/150594.jpg',
  '/assets/150595.jpg',
  '/assets/150596.jpg',
  '/assets/150597.jpg',
  '/assets/150598.jpg',
  '/assets/150599.jpg',
  '/assets/150600.jpg',
  '/assets/150601.jpg',
  '/assets/150602.jpg',
  '/assets/150603.jpg',
  '/assets/150604.jpg',
  '/assets/150605.jpg',
  '/assets/150606.jpg',
  '/assets/150607.jpg',
  '/assets/150608.jpg',
  '/assets/150609.jpg',
  '/assets/150610.jpg',
  '/assets/150611.jpg',
  '/assets/150612.jpg',
  '/assets/150613.jpg',
  '/assets/150614.jpg',
  '/assets/150615.jpg',
  '/assets/150616.jpg',
  '/assets/150617.jpg',
  '/assets/150618.jpg',
  '/assets/150619.jpg',
  '/assets/150620.jpg',
  '/assets/150621.jpg',
  '/assets/150622.jpg',
  '/assets/150623.jpg',
  '/assets/150624.jpg',
  '/assets/150625.jpg',
  '/assets/150626.jpg',
  '/assets/150627.jpg',
  '/assets/150628.jpg',
  '/assets/150629.jpg',
  '/assets/150630.jpg',
  '/assets/150631.jpg',
  '/assets/150633.jpg',
  '/assets/150634.jpg',
  '/assets/150635.jpg',
  '/assets/150636.jpg',
  '/assets/150637.jpg',
  '/assets/150638.jpg',
  '/assets/150639.jpg',
  '/assets/150640.jpg',
  '/assets/150641.jpg',
  '/assets/150642.jpg',
  '/assets/150643.jpg',
  '/assets/150644.jpg',
  '/assets/150645.jpg',
  '/assets/150646.jpg',
  '/assets/150647.jpg',
  '/assets/150648.jpg',
  '/assets/150649.jpg',
  '/assets/150650.jpg',
  '/assets/150651.jpg',
  // Cycle back through early assets to cover the full 95-item generated range
  '/assets/150577.jpg',
  '/assets/150579.jpg',
  '/assets/150581.jpg',
  '/assets/150584.jpg',
  '/assets/150584.jpg',
  '/assets/150586.jpg',
  '/assets/150588.jpg',
  '/assets/150590.jpg',
];

const CATEGORIES = [
  'Resin Art',
  'Custom Frames',
  'Portrait Frames',
  'Home Decor',
  'Wall Decor',
  'Wedding Gifts',
  'Corporate Gifts',
  'Name Plaques',
  'Personalized Gifts',
  'Anniversary Gifts',
  'Birthday Gifts',
  'Luxury Decor',
  'Modern Decor',
  'Custom Orders'
];

const ADJECTIVES = [
  'Premium', 'Bespoke', 'Artisanal', 'Luxury', 'Ethereal', 'Sleek', 'Minimalist',
  'Classic', 'Pinterest-Inspired', 'Lustrous', 'Aesthetic', 'Sovereign', 'Modern',
  'Frosted', 'Fine-Line', 'Rustic', 'Warm', 'Cosmic', 'Polished', 'Satin'
];

const NOUNS = {
  'Resin Art': ['Ocean Coaster Set', 'Geode Wall Plaque', 'Fluid Vanity Tray', 'Cosmic Ash Collector', 'Deep Marine Desk Block', 'Marbled Jewelry Plate'],
  'Custom Frames': ['Inspirational Quote Frame', 'Minimalist Typography Board', 'Lover Mantra Acrylic Standoff', 'Desk Motivation Wedge', 'Classic Text Wood Frame'],
  'Portrait Frames': ['Couples Line Sketch Plate', 'Family Faceless Silhouette', 'Pet Portrait Clear Acrylic', 'Solo Fine-Line Gold Leaf Plaque'],
  'Home Decor': ['Organic Terracotta Ring Dish', 'Abstract Sunrise Wall Hanging', 'Textured Ceramic Incense Wedge', 'Geometric Concrete Bookend Set'],
  'Wall Decor': ['Floating Arch Mirror Set', 'Three-Panel God Speaks Canvas', 'Midnight Horizon Wood Hanger', 'Aesthetic Botanical Frame Set'],
  'Wedding Gifts': ['Wedding Flower Preservation Columns', 'Rose Petal Hexagonal Paperweight', 'Bridal Ring Dish with Gold Leaf', 'Save-the-Date Polaroid Plaque'],
  'Corporate Gifts': ['Frosted Brand Logo Desk Sign', 'Laser Engraved Walnut Card Box', 'Polished Brass Paperweight Wedge', 'Exclusive Executive Pen Block'],
  'Name Plaques': ['Desk Brass-Grommet Plaque', 'Frosted Glass Gate Sign', 'Gloss Obsidian Reception Name Sign', 'Warm Aromatic Pine Workspace Block'],
  'Personalized Gifts': ['Custom Map Coordinates Frame', 'Song Lyric Interactive Soundwave Board', 'Birthday Polaroid Collage Hanger', 'Star Constellation Golden Print'],
  'Anniversary Gifts': ['Wedding Day Song Glass Frame', 'Love Timeline Acrylic Border Plaque', 'Roman Numeral Date Custom Block', 'Our First Home Sketch Board'],
  'Birthday Gifts': ['Zodiac Star Sign Frame', 'Name Initials Monogram Frame', 'Age Milestone Polaroid Grid', 'Birth Month Flower Acrylic Panel'],
  'Luxury Decor': ['24k Gold Foil Resin Catchall', 'Sleek Agate-Edged Glass Display', 'Polished Brass Desktop Frame Kit', 'Ultra-Deep Liquid Resin Sculpture Panel'],
  'Modern Decor': ['Checkerboard Neon Glass Coaster Set', 'Arch Minimal Desk Frame Block', 'Sage Green Abstract Canvas Set', 'Terrazzo Coated Vanity Tray'],
  'Custom Orders': ['Full Bouquet Preservation Cube', 'Pinterest Dynamic Idea Board Replica', 'Double-Sided Frosted Message Column', 'Monologue Lettering Frame Set']
};

const MATERIALS = ['Epoxy Resin', 'Acrylic Glass', 'Pine Wood', 'Frosted Acrylic', 'Brass fittings', 'Gold Leaf Foil', 'Satin Backing', 'Glass Plate'];
const COLORS_LIST = ['Classic Obsidian Black', 'Sleek Pure White', 'Natural Pine Wood', 'Champagne Luxury Gold', 'Ocean Blue', 'Frosted Clear', 'Emerald Wave', 'Sunset Amber'];
const SIZES_LIST = ['A5 (Compact)', 'A4 (Standard)', 'A3 (Premium Display)', 'A2 (Statement Art)', 'Hexagonal 6x6"', 'Hexagonal 8x8"', 'Luxury 10x10"'];
const TAG_KEYWORDS = ['handmade', 'spycecrafts', 'aesthetic', 'pinterest', 'gift', 'decor', 'luxury', 'contemporary', 'lagos', 'enugu', 'nigeria'];


function generateDynamicProducts(): Product[] {
  const dynamicList: Product[] = [];
  let seed = 42;

  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const getRandomItem = <T>(arr: T[]): T => {
    return arr[Math.floor(random() * arr.length)];
  };

  const getMultipleRandomItems = <T>(arr: T[], count: number): T[] => {
    const shuffled = [...arr].sort(() => 0.5 - random());
    return shuffled.slice(0, count);
  };

  // Loop through categories to assure absolute representation
  for (let i = 0; i < 95; i++) {
    const targetCategory = CATEGORIES[i % CATEGORIES.length];
    const nounOptions = NOUNS[targetCategory as keyof typeof NOUNS] || ['Art Design Block'];
    const selectedNoun = nounOptions[Math.floor(random() * nounOptions.length)];
    const selectedAdjective = getRandomItem(ADJECTIVES);
    
    const productName = `${selectedAdjective} ${selectedNoun}`;
    const cleanId = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${100 + i}`;
    
    // Base pricing variations from 12k to 85k Naira
    const basePrice = Math.floor(12 + random() * 45) * 1000;
    // Generate sale price randomly (approx 30% of goods)
    const hasSale = random() < 0.35;
    const salePrice = hasSale ? Math.floor(basePrice * 0.85 / 500) * 500 : null;

    // Generate badges based on tags
    const randomBadgeTag = random() < 0.25 ? 'new' : (random() < 0.33 ? 'trending' : (random() < 0.5 ? 'limited edition' : 'best seller'));
    const combinedTags = Array.from(new Set([
      targetCategory.toLowerCase().replace(/\s/g, '-'),
      randomBadgeTag,
      ...getMultipleRandomItems(TAG_KEYWORDS, 3)
    ]));

    // Images mapping to support beautiful card hovers
    const mainImgIndex = Math.floor(random() * RESIN_IMAGES.length);
    const secondaryImgIndex = (mainImgIndex + 1) % RESIN_IMAGES.length;
    
    const images = [
      RESIN_IMAGES[mainImgIndex],
      RESIN_IMAGES[secondaryImgIndex]
    ];

    const customizedCount = Math.floor(10 + random() * 150);
    const customRating = Math.floor((4.2 + random() * 0.8) * 10) / 10;

    dynamicList.push({
      id: cleanId,
      slug: cleanId,
      name: productName,
      description: `Elevate your space with this beautiful, ${selectedAdjective.toLowerCase()} ${selectedNoun.toLowerCase()} designed by the artisans of Spyce Crafts. Carefully detailed with high-grade ${getRandomItem(MATERIALS).toLowerCase()} and a polished finish that captures premium bedroom aesthetics. Guaranteed to preserve special memories perfectly for years.`,
      price: basePrice,
      salePrice: salePrice,
      category: targetCategory,
      images: images,
      featured: random() < 0.15,
      stock: Math.floor(2 + random() * 30),
      customizable: random() < 0.85,
      sizes: getMultipleRandomItems(SIZES_LIST, Math.floor(2 + random() * 3)),
      colors: getMultipleRandomItems(COLORS_LIST, Math.floor(2 + random() * 3)),
      rating: customRating,
      reviewCount: customizedCount,
      tags: combinedTags
    });
  }

  return dynamicList;
}

export const PRODUCTS: Product[] = [
  ...BASE_PRODUCTS,
  ...generateDynamicProducts()
];
