import { createFileRoute } from "@tanstack/react-router";
import { CategoryListing } from "@/components/site/CategoryListing";
import { byCategory, categoryImages } from "@/data/products";
import { site } from "@/lib/site";

export const Route = createFileRoute("/steel-bhandi")({
  head: () => ({
    meta: [
      { title: `Home and Kitchen Utility Products | ${site.name}` },
      { name: "description", content: `Shop kitchen tools, home utility products and decorative household items from ${site.name}.` },
      { name: "keywords", content: "home utility products, kitchen tools, sink strainer, bottle organizer, decorative home products" },
      { property: "og:title", content: "Home and Kitchen Utility Products" },
      { property: "og:description", content: "Useful kitchen tools, home utility products and display-friendly household items." },
      { property: "og:url", content: "/steel-bhandi" },
      { property: "og:image", content: categoryImages.steel },
    ],
    links: [{ rel: "canonical", href: "/steel-bhandi" }],
  }),
  component: () => <CategoryListing title="Home & Kitchen Products" description="Kitchen helpers, home utility products and decorative household packs for daily use." banner={categoryImages.steel} products={byCategory("steel")} department="steel" />,
});
