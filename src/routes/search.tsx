import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ProductGrid } from "@/components/site/PageKit";
import { searchProducts } from "@/data/products";
export const Route = createFileRoute("/search")({ validateSearch: (search: Record<string, unknown>) => ({ q: String(search.q ?? "") }), head: ({search}) => ({ meta: [{ title: `Search ${search.q || "Products"}` }, { name: "description", content: "Search grooming, home utility and kitchen products." }] }), component: SearchPage });
function SearchPage(){ const { q } = Route.useSearch(); const results = searchProducts(q); return <div><PageHero eyebrow="Search" title={q ? `Results for ${q}` : "Search products"} subtitle={`${results.length} matching products across the new catalogue.`}/><section className="mx-auto max-w-7xl px-4 py-8"><ProductGrid products={results}/></section></div> }

