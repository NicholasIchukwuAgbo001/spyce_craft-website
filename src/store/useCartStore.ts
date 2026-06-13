import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, CustomizationData } from '../types';

export type AppView =
  | 'home'
  | 'shop'
  | 'blog'
  | 'checkout'
  | 'product-detail'
  | 'blog-detail'
  | 'gallery'
  | 'about'
  | 'contact'
  | 'wishlist'
  | 'cart'
  | 'dynamic-subview';

interface CartState {
  items: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  currentView: AppView;
  selectedProductSlug: string | null;
  selectedBlogSlug: string | null;
  activeSubTopic: string | null;
  setCartOpen: (open: boolean) => void;
  navigateTo: (view: AppView, slug?: string | null, subTopic?: string | null) => void;
  addItem: (
    product: Product,
    quantity: number,
    size: string,
    color: string,
    customization?: CustomizationData
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getDeliveryFee: () => number;
  getCartTotal: () => number;
  
  // Wishlist Actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (productId: string, size?: string, color?: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      isCartOpen: false,
      currentView: 'home',
      selectedProductSlug: null,
      selectedBlogSlug: null,
      activeSubTopic: null,
      setCartOpen: (open) => set({ isCartOpen: open }),
      navigateTo: (view, slug = null, subTopic = null) => {
        set({
          currentView: view,
          selectedProductSlug: view === 'product-detail' ? slug : get().selectedProductSlug,
          selectedBlogSlug: view === 'blog-detail' ? slug : get().selectedBlogSlug,
          activeSubTopic: subTopic || (view === 'dynamic-subview' ? get().activeSubTopic : null),
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      addItem: (product, quantity, size, color, customization) => {
        const itemUniqueId = customization
          ? `${product.id}-${size}-${color}-${JSON.stringify(customization).replace(/\s/g, '')}`
          : `${product.id}-${size}-${color}`;

        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.id === itemUniqueId);

          if (existingItemIndex > -1) {
            const nextItems = [...state.items];
            nextItems[existingItemIndex].quantity += quantity;
            return { items: nextItems };
          } else {
            const newItem: CartItem = {
              id: itemUniqueId,
              product,
              quantity,
              selectedSize: size,
              selectedColor: color,
              customization,
            };
            return { items: [...state.items, newItem] };
          }
        });
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
            .filter((item) => item.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
      getCartSubtotal: () => {
        const state = get();
        return state.items.reduce((acc, item) => {
          const currentPrice = item.product.salePrice ?? item.product.price;
          return acc + currentPrice * item.quantity;
        }, 0);
      },
      getDeliveryFee: () => {
        const subtotal = get().getCartSubtotal();
        if (subtotal === 0) return 0;
        return subtotal > 100000 ? 0 : 3500; // Free shipping above NGN 100k
      },
      getCartTotal: () => {
        return get().getCartSubtotal() + get().getDeliveryFee();
      },

      // Wishlist handling
      toggleWishlist: (product) => {
        set((state) => {
          const inWish = state.wishlist.some((item) => item.id === product.id);
          if (inWish) {
            return { wishlist: state.wishlist.filter((item) => item.id !== product.id) };
          } else {
            return { wishlist: [...state.wishlist, product] };
          }
        });
      },
      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },
      moveToCart: (productId, size, color) => {
        const product = get().wishlist.find((p) => p.id === productId);
        if (!product) return;
        
        const selectedSize = size || product.sizes[0] || 'Standard';
        const selectedColor = color || product.colors[0] || 'Original';
        
        get().addItem(product, 1, selectedSize, selectedColor);
        // Remove from wishlist
        set((state) => ({
          wishlist: state.wishlist.filter((p) => p.id !== productId)
        }));
      }
    }),
    {
      name: 'spyce-crafts-cart-storage',
    }
  )
);
