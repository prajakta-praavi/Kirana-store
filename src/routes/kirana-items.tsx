import { createFileRoute } from "@tanstack/react-router";
import { CategoryListing } from "@/components/site/CategoryListing";
import { byCategory, categoryImages } from "@/data/products";
import { site } from "@/lib/site";

export const Route = createFileRoute("/kirana-items")({
  head: () => ({
    meta: [
      { title: `Grooming Products Online | ${site.name}` },
      { name: "description", content: `Shop rechargeable trimmers, hair clippers and grooming accessories from ${site.name}.` },
      { name: "keywords", content: "grooming products, trimmer, hair clipper, rechargeable trimmer, personal care accessories" },
      { property: "og:title", content: "Grooming Products Online" },
      { property: "og:description", content: "Rechargeable trimmers, clippers and personal care accessories." },
      { property: "og:url", content: "/kirana-items" },
      { property: "og:image", content: categoryImages.kirana },
    ],
    links: [{ rel: "canonical", href: "/kirana-items" }],
  }),
  component: () => <CategoryListing title="Grooming Products" description="Rechargeable trimmers, hair clippers and useful personal care accessories for daily grooming." banner={categoryImages.kirana} products={byCategory("grocery")} department="grocery" />,
});
