import { createFileRoute } from "@tanstack/react-router";
import { CategoryListing } from "@/components/site/CategoryListing";
import { categoryImages, products } from "@/data/products";
export const Route = createFileRoute("/shop")({ head: () => ({ meta: [{ title: "Shop Products" }, { name: "description", content: "Browse all grooming, personal care, home utility and kitchen products with filters, sorting, ratings and offers." }] }), component: () => <CategoryListing title="Shop all products" description="Browse all new products in one fast mobile-first catalogue." banner={categoryImages.kirana} products={products} department="grocery" /> });
