export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  salePrice: number | null;
  category: string;
  images: string[];
  featured: boolean;
  stock: number;
  customizable: boolean;
  sizes: string[];
  colors: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface CustomizationData {
  referenceImage: string | null;
  frameSize: string;
  frameColor: string;
  artworkStyle: string;
  customText: string;
  notes: string;
}

export interface CartItem {
  id: string; // Can be product.id or product.id + customization hash
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  customization?: CustomizationData;
}

export interface CheckoutDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  notes: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  tags: string[];
  author: string;
}
