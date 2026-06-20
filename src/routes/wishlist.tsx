import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ProductGrid } from "@/components/site/PageKit";
import { products } from "@/data/products";
import { useCommerce } from "@/lib/commerce";
export const Route = createFileRoute("/wishlist")({ head: () => ({ meta: [{ title: "Wishlist" }] }), component: () => { const { wishlist } = useCommerce(); return <div><PageHero eyebrow="Wishlist" title="Saved products" subtitle="Keep your saved grooming, home utility and kitchen products ready for checkout."/><section className="mx-auto max-w-7xl px-4 py-8"><ProductGrid products={products.filter((p)=>wishlist.includes(p.slug))}/></section></div> } });

