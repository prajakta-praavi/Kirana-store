import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero, ProductGrid } from "@/components/site/PageKit";
import { byCategory, getCategory } from "@/data/products";
export const Route = createFileRoute("/categories/$slug")({ loader: ({params}) => { const category = getCategory(params.slug); if(!category) throw notFound(); return { category, products: byCategory(params.slug) }; }, head: ({loaderData}) => ({ meta: [{ title: loaderData ? `${loaderData.category.name} Online` : "Category" }, { name: "description", content: loaderData?.category.description ?? "Shop category products" }] }), component: CategoryPage });
function CategoryPage(){ const { category, products } = Route.useLoaderData(); return <div><PageHero eyebrow={category.department === "grocery" ? "Grocery" : "Steel"} title={category.name} subtitle={category.description}/><section className="mx-auto max-w-7xl px-4 py-8"><ProductGrid products={products}/></section></div> }
