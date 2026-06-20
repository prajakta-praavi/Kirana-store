import product1 from "@/assets/product-1.jpeg";
import product2 from "@/assets/product-2.jpeg";
import product3 from "@/assets/product-3.jpeg";
import product4 from "@/assets/product-4.jpeg";
import product5 from "@/assets/product-5.jpeg";
import product6 from "@/assets/product-6.jpeg";
import product7 from "@/assets/product-7.jpeg";
import product8 from "@/assets/product-8.jpeg";
import product9 from "@/assets/product-9.jpeg";
import product10 from "@/assets/product-10.jpeg";
import product11 from "@/assets/product-11.jpeg";
import product12 from "@/assets/product-12.jpeg";
import product13 from "@/assets/product-13.jpeg";
import product14 from "@/assets/product-14.jpeg";
import product15 from "@/assets/product-15.jpeg";

export type Department = "grocery" | "steel";

export interface CategoryNode {
  slug: string;
  name: string;
  department: Department;
  image: string;
  description: string;
  badge?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: Department;
  subcategory: string;
  image: string;
  shortDesc: string;
  description: string;
  price: number;
  mrp: number;
  unit: string;
  rating: number;
  reviews: number;
  popularity: number;
  stock: number;
  inStock: boolean;
  gstRate: number;
  variants?: string[];
  tags: string[];
  bestseller?: boolean;
  featured?: boolean;
  newArrival?: boolean;
  offer?: string;
}

const bannerImages = {
  grooming: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1600&q=80",
  clippers: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1600&q=80",
  kitchen: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
  utility: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
  personalCare: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
  decor: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80",
};

export const categoryImages = { kirana: bannerImages.grooming, steel: bannerImages.kitchen, grocery: bannerImages.grooming };

export const categories: CategoryNode[] = [
  {
    slug: "grooming-trimmers",
    name: "Grooming Trimmers",
    department: "grocery",
    image: bannerImages.grooming,
    description: "Rechargeable hair and beard trimmers for daily grooming.",
    badge: "Best sellers",
  },
  {
    slug: "hair-clippers",
    name: "Hair Clippers",
    department: "grocery",
    image: bannerImages.clippers,
    description: "Professional cordless clippers with guide combs and accessories.",
  },
  {
    slug: "kitchen-tools",
    name: "Kitchen Tools",
    department: "steel",
    image: bannerImages.kitchen,
    description: "Useful sink, cooking and kitchen helper products.",
    badge: "Kitchen",
  },
  {
    slug: "home-utility",
    name: "Home Utility",
    department: "steel",
    image: bannerImages.utility,
    description: "Compact utility products for home, storage and daily use.",
  },
  {
    slug: "personal-care-accessories",
    name: "Personal Care Accessories",
    department: "grocery",
    image: bannerImages.personalCare,
    description: "Clipper blades, attachments and practical grooming add-ons.",
  },
  {
    slug: "decorative-home-products",
    name: "Decorative Home Products",
    department: "steel",
    image: bannerImages.decor,
    description: "Attractive household products and display-friendly daily items.",
  },
];

const grooming = "grocery" as const;
const home = "steel" as const;

export const products: Product[] = [
  {
    slug: "compact-foldable-utility-holder",
    name: "Compact Foldable Utility Holder",
    category: home,
    subcategory: "home-utility",
    image: product1,
    shortDesc: "Space-saving foldable holder for daily household use.",
    description: "A compact foldable utility holder designed for easy storage and daily home organisation. Its lightweight build makes it simple to carry, place and reuse around the kitchen, bathroom or desk area.",
    price: 249,
    mrp: 399,
    unit: "1 piece",
    rating: 4.4,
    reviews: 42,
    popularity: 72,
    stock: 24,
    inStock: true,
    gstRate: 18,
    variants: ["Standard"],
    tags: ["utility", "home", "holder", "foldable"],
    featured: true,
    offer: "38% off",
  },
  {
    slug: "gemei-metal-body-trimmer",
    name: "Gemei Metal Body Trimmer",
    category: grooming,
    subcategory: "grooming-trimmers",
    image: product2,
    shortDesc: "Rechargeable metal body trimmer for beard and hair.",
    description: "A premium rechargeable Gemei-style grooming trimmer with a strong metal body, sharp cutting blade and easy grip design. Suitable for beard shaping, hair touch-ups and everyday personal grooming.",
    price: 799,
    mrp: 1299,
    unit: "1 trimmer kit",
    rating: 4.7,
    reviews: 128,
    popularity: 96,
    stock: 18,
    inStock: true,
    gstRate: 18,
    variants: ["Gold", "Silver"],
    tags: ["trimmer", "grooming", "gemei", "rechargeable"],
    bestseller: true,
    featured: true,
    offer: "39% off",
  },
  {
    slug: "gm-6868-cordless-trimmer",
    name: "GM-6868 Cordless Trimmer",
    category: grooming,
    subcategory: "grooming-trimmers",
    image: product3,
    shortDesc: "Cordless grooming trimmer with guide comb accessories.",
    description: "A cordless GM-6868 style trimmer made for convenient grooming at home. Comes with trimming attachments for different beard lengths and a rechargeable design for portable use.",
    price: 699,
    mrp: 1099,
    unit: "1 trimmer set",
    rating: 4.5,
    reviews: 94,
    popularity: 88,
    stock: 20,
    inStock: true,
    gstRate: 18,
    variants: ["Standard kit"],
    tags: ["trimmer", "cordless", "beard", "hair"],
    bestseller: true,
  },
  {
    slug: "gm-6869-professional-trimmer",
    name: "GM-6869 Professional Trimmer",
    category: grooming,
    subcategory: "grooming-trimmers",
    image: product4,
    shortDesc: "Professional rechargeable trimmer with comb attachments.",
    description: "A professional rechargeable trimmer kit built for clean beard lines, neck trimming and quick hair touch-ups. The slim body and included combs make it suitable for salon-style grooming at home.",
    price: 749,
    mrp: 1199,
    unit: "1 trimmer kit",
    rating: 4.6,
    reviews: 87,
    popularity: 84,
    stock: 16,
    inStock: true,
    gstRate: 18,
    variants: ["Black", "Maroon"],
    tags: ["professional trimmer", "grooming", "rechargeable"],
    featured: true,
  },
  {
    slug: "gemei-premium-hair-clipper-kit",
    name: "Gemei Premium Hair Clipper Kit",
    category: grooming,
    subcategory: "hair-clippers",
    image: product5,
    shortDesc: "Heavy-duty clipper kit for hair cutting and trimming.",
    description: "A premium hair clipper kit with a robust body, trimming guards and grooming accessories. Ideal for home haircut maintenance, beard shaping and regular personal care use.",
    price: 999,
    mrp: 1599,
    unit: "1 clipper kit",
    rating: 4.7,
    reviews: 116,
    popularity: 91,
    stock: 14,
    inStock: true,
    gstRate: 18,
    variants: ["Premium box"],
    tags: ["clipper", "hair clipper", "grooming kit"],
    bestseller: true,
    featured: true,
    offer: "Save Rs.600",
  },
  {
    slug: "gm-8051-multi-grooming-kit",
    name: "GM-8051 Multi Grooming Kit",
    category: grooming,
    subcategory: "hair-clippers",
    image: product6,
    shortDesc: "Rechargeable multi-grooming kit with boxed accessories.",
    description: "A complete GM-8051 style multi-grooming kit for beard, hair and detailing work. The set includes useful grooming attachments and a rechargeable clipper for everyday styling.",
    price: 1199,
    mrp: 1899,
    unit: "1 grooming kit",
    rating: 4.8,
    reviews: 151,
    popularity: 94,
    stock: 12,
    inStock: true,
    gstRate: 18,
    variants: ["Black", "Maroon"],
    tags: ["multi grooming", "clipper", "trimmer", "gm8051"],
    bestseller: true,
    newArrival: true,
    offer: "37% off",
  },
  {
    slug: "rechargeable-detailing-trimmer",
    name: "Rechargeable Detailing Trimmer",
    category: grooming,
    subcategory: "grooming-trimmers",
    image: product7,
    shortDesc: "Precision trimmer for beard edges and fine detailing.",
    description: "A rechargeable detailing trimmer designed for clean beard edges, neckline touch-ups and accurate grooming. Compact, easy to handle and suitable for daily personal care.",
    price: 649,
    mrp: 999,
    unit: "1 trimmer",
    rating: 4.4,
    reviews: 61,
    popularity: 73,
    stock: 22,
    inStock: true,
    gstRate: 18,
    variants: ["Standard"],
    tags: ["detailer", "trimmer", "personal care"],
    newArrival: true,
  },
  {
    slug: "cordless-shaver-trimmer-combo",
    name: "Cordless Shaver Trimmer Combo",
    category: grooming,
    subcategory: "grooming-trimmers",
    image: product8,
    shortDesc: "Portable shaving and trimming combo for quick grooming.",
    description: "A compact cordless shaver and trimmer combo for quick grooming needs. Useful for travel, daily beard maintenance and finishing touches before work or events.",
    price: 599,
    mrp: 899,
    unit: "1 combo set",
    rating: 4.3,
    reviews: 48,
    popularity: 68,
    stock: 19,
    inStock: true,
    gstRate: 18,
    variants: ["Standard"],
    tags: ["shaver", "trimmer", "combo"],
  },
  {
    slug: "professional-grooming-accessory-set",
    name: "Professional Grooming Accessory Set",
    category: grooming,
    subcategory: "personal-care-accessories",
    image: product9,
    shortDesc: "Useful accessory set for grooming tools and maintenance.",
    description: "A practical grooming accessory set for daily tool care and personal grooming routines. Designed to pair well with trimmers, clippers and other personal care products.",
    price: 349,
    mrp: 549,
    unit: "1 set",
    rating: 4.2,
    reviews: 35,
    popularity: 57,
    stock: 30,
    inStock: true,
    gstRate: 18,
    variants: ["Standard"],
    tags: ["grooming accessories", "personal care"],
  },
  {
    slug: "premium-rechargeable-clipper",
    name: "Premium Rechargeable Clipper",
    category: grooming,
    subcategory: "hair-clippers",
    image: product10,
    shortDesc: "Rechargeable clipper for smooth hair and beard trimming.",
    description: "A premium rechargeable clipper created for regular hair cutting, beard trimming and clean finishing work. Strong motor performance and easy handling make it a dependable home grooming product.",
    price: 899,
    mrp: 1399,
    unit: "1 clipper",
    rating: 4.5,
    reviews: 73,
    popularity: 79,
    stock: 17,
    inStock: true,
    gstRate: 18,
    variants: ["Standard"],
    tags: ["clipper", "rechargeable", "hair"],
    featured: true,
  },
  {
    slug: "portable-personal-grooming-device",
    name: "Portable Personal Grooming Device",
    category: grooming,
    subcategory: "personal-care-accessories",
    image: product11,
    shortDesc: "Compact personal care device for quick grooming tasks.",
    description: "A portable grooming device made for simple everyday personal care. Lightweight, easy to store and useful for quick touch-ups at home or while travelling.",
    price: 499,
    mrp: 799,
    unit: "1 piece",
    rating: 4.1,
    reviews: 29,
    popularity: 51,
    stock: 21,
    inStock: true,
    gstRate: 18,
    variants: ["Standard"],
    tags: ["portable", "personal care", "grooming"],
  },
  {
    slug: "t-blade-trimmer-attachment-set",
    name: "T-Blade Trimmer Attachment Set",
    category: grooming,
    subcategory: "personal-care-accessories",
    image: product12,
    shortDesc: "Replacement-style T-blade and attachment kit for trimmers.",
    description: "A T-blade attachment set for compatible trimmers, useful for sharp outlines, beard detailing and close finishing. A practical add-on for grooming kits and salon-style maintenance.",
    price: 299,
    mrp: 499,
    unit: "1 accessory set",
    rating: 4.3,
    reviews: 44,
    popularity: 60,
    stock: 26,
    inStock: true,
    gstRate: 18,
    variants: ["Standard"],
    tags: ["t blade", "attachment", "trimmer accessory"],
    offer: "40% off",
  },
  {
    slug: "stainless-steel-sink-strainer-spoon",
    name: "Stainless Steel Sink Strainer Spoon",
    category: home,
    subcategory: "kitchen-tools",
    image: product13,
    shortDesc: "Long-handle strainer spoon for kitchen and sink use.",
    description: "A stainless steel long-handle strainer spoon designed for scooping, draining and kitchen sink use. Handy for removing fried items, rinsing food and keeping everyday cooking cleaner.",
    price: 199,
    mrp: 349,
    unit: "1 piece",
    rating: 4.6,
    reviews: 81,
    popularity: 86,
    stock: 35,
    inStock: true,
    gstRate: 18,
    variants: ["Single", "Pack of 2"],
    tags: ["kitchen", "strainer", "steel", "spoon"],
    bestseller: true,
    featured: true,
  },
  {
    slug: "mini-bottle-set-organizer",
    name: "Mini Bottle Set Organizer",
    category: home,
    subcategory: "home-utility",
    image: product14,
    shortDesc: "Compact set of small bottles for storage and travel.",
    description: "A compact mini bottle set that is useful for storing liquids, samples, oils or travel essentials. Easy to arrange, refill and carry for daily household or personal use.",
    price: 399,
    mrp: 649,
    unit: "1 set",
    rating: 4.4,
    reviews: 52,
    popularity: 66,
    stock: 23,
    inStock: true,
    gstRate: 18,
    variants: ["Assorted set"],
    tags: ["bottle set", "organizer", "storage", "travel"],
    newArrival: true,
  },
  {
    slug: "decorative-household-display-pack",
    name: "Decorative Household Display Pack",
    category: home,
    subcategory: "decorative-home-products",
    image: product15,
    shortDesc: "Attractive display-style household product pack.",
    description: "A decorative household display pack with a clean presentation and practical daily-use appeal. Suitable for gifting, counter display or home utility collections.",
    price: 299,
    mrp: 499,
    unit: "1 pack",
    rating: 4.2,
    reviews: 31,
    popularity: 49,
    stock: 18,
    inStock: true,
    gstRate: 18,
    variants: ["Standard"],
    tags: ["decorative", "home", "display", "gift"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function byDepartment(department: Department) {
  return products.filter((p) => p.category === department);
}

export function byCategory(key: Department | string) {
  if (key === "kirana") return byDepartment("grocery");
  if (key === "grocery" || key === "steel") return byDepartment(key);
  return products.filter((p) => p.subcategory === key);
}

export function bestsellers() {
  return products.filter((p) => p.bestseller);
}

export function featured() {
  return products.filter((p) => p.featured);
}

export function todaysDeals() {
  return products.filter((p) => p.offer || p.mrp > p.price);
}

export function newArrivals() {
  return products.filter((p) => p.newArrival);
}

export function related(slug: string, limit = 4) {
  const p = getProduct(slug);
  if (!p) return [];
  return products
    .filter((x) => x.subcategory === p.subcategory && x.slug !== slug)
    .concat(products.filter((x) => x.category === p.category && x.slug !== slug))
    .slice(0, limit);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((product) =>
    [product.name, product.shortDesc, product.description, product.subcategory, ...product.tags]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

export const departments = [
  {
    slug: "kirana-items",
    key: "grocery" as const,
    name: "Grooming Products",
    tagline: "Rechargeable trimmers, clippers and personal care accessories",
    image: bannerImages.grooming,
  },
  {
    slug: "steel-bhandi",
    key: "steel" as const,
    name: "Home & Kitchen Products",
    tagline: "Kitchen tools, utility products and decorative home items",
    image: bannerImages.kitchen,
  },
];


