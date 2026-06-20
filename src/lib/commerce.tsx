import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, products, type Product } from "@/data/products";

export type CartLine = {
  slug: string;
  qty: number;
  variant?: string;
};

type CommerceContextValue = {
  cart: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  addToCart: (product: Product, qty?: number, variant?: string) => void;
  buyNow: (product: Product) => void;
  removeFromCart: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  recordView: (slug: string) => void;
  totals: {
    subtotal: number;
    gst: number;
    delivery: number;
    discount: number;
    total: number;
    count: number;
  };
};

const CommerceContext = createContext<CommerceContextValue | null>(null);
const CART_KEY = "apna-bhandar-cart";
const WISHLIST_KEY = "apna-bhandar-wishlist";
const VIEWED_KEY = "apna-bhandar-viewed";

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CommerceProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readStored<CartLine[]>(CART_KEY, []));
    setWishlist(readStored<string[]>(WISHLIST_KEY, []));
    setRecentlyViewed(readStored<string[]>(VIEWED_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    setCart((lines) => lines.filter((line) => Boolean(getProduct(line.slug))));
  }, [hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setWishlist((items) => items.filter((slug) => Boolean(getProduct(slug))));
  }, [hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setRecentlyViewed((items) => items.filter((slug) => Boolean(getProduct(slug))));
  }, [hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(VIEWED_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed, hydrated]);

  const addToCart = useCallback((product: Product, qty = 1, variant?: string) => {
    setCart((lines) => {
      const index = lines.findIndex((line) => line.slug === product.slug && line.variant === variant);
      if (index === -1) return [...lines, { slug: product.slug, qty, variant }];
      return lines.map((line, i) => (i === index ? { ...line, qty: line.qty + qty } : line));
    });
  }, []);

  const buyNow = useCallback(
    (product: Product) => {
      addToCart(product, 1, product.variants?.[0]);
      if (typeof window !== "undefined") window.location.href = "/checkout";
    },
    [addToCart],
  );

  const removeFromCart = useCallback((slug: string) => {
    setCart((lines) => lines.filter((line) => line.slug !== slug));
  }, []);

  const updateQty = useCallback((slug: string, qty: number) => {
    setCart((lines) =>
      lines
        .map((line) => (line.slug === slug ? { ...line, qty: Math.max(1, qty) } : line))
        .filter((line) => line.qty > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((items) => (items.includes(slug) ? items.filter((item) => item !== slug) : [...items, slug]));
  }, []);

  const isWishlisted = useCallback((slug: string) => wishlist.includes(slug), [wishlist]);

  const recordView = useCallback((slug: string) => {
    setRecentlyViewed((items) => [slug, ...items.filter((item) => item !== slug)].slice(0, 8));
  }, []);

  const totals = useMemo(() => {
    const validLines = cart
      .map((line) => ({ ...line, product: getProduct(line.slug) }))
      .filter((line): line is CartLine & { product: Product } => Boolean(line.product));
    const subtotal = validLines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
    const count = validLines.reduce((sum, line) => sum + line.qty, 0);
    const discount = subtotal > 2499 ? 150 : subtotal > 999 ? 75 : 0;
    const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 49;
    const gst = Math.round((subtotal - discount) * 0.05);
    return { subtotal, gst, delivery, discount, total: subtotal + gst + delivery - discount, count };
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      recentlyViewed,
      addToCart,
      buyNow,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      isWishlisted,
      recordView,
      totals,
    }),
    [
      cart,
      wishlist,
      recentlyViewed,
      addToCart,
      buyNow,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      isWishlisted,
      recordView,
      totals,
    ],
  );

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce() {
  const value = useContext(CommerceContext);
  if (!value) throw new Error("useCommerce must be used inside CommerceProvider");
  return value;
}

export function cartProducts(cart: CartLine[]) {
  return cart
    .map((line) => {
      const product = products.find((item) => item.slug === line.slug);
      return product ? { ...line, product } : null;
    })
    .filter(Boolean) as Array<CartLine & { product: Product }>;
}

