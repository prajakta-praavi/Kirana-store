import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Leaf, Sparkles, Users } from "lucide-react";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About â€” ${site.name}` },
      { name: "description", content: `Learn the story behind ${site.name}, your trusted local kirana and steel utensil store.` },
      { property: "og:title", content: `About ${site.name}` },
      { property: "og:description", content: "Six years of serving fresh kirana and quality steel utensils to our neighbourhood." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="gradient-hero">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Our Story
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-ink sm:text-5xl">
            A neighbourhood bhandar, built on trust.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            For over six years, {site.name} has served families, hostels, restaurants and small businesses
            with honest prices on daily kirana and premium stainless steel utensils.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { Icon: Heart, title: "Family-run", text: "Locally owned since day one. We know our customers by name." },
          { Icon: Leaf, title: "Fresh stock", text: "Rotated weekly. Nothing sits â€” what you order is what we use ourselves." },
          { Icon: Sparkles, title: "Genuine quality", text: "Food-grade 304 steel and trusted grocery brands only." },
          { Icon: Users, title: "Bulk friendly", text: "Special pricing for restaurants, caterers and societies." },
        ].map(({ Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="font-display text-3xl font-extrabold text-ink">Why we built an online catalog</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          We saw busy families struggling to find time for shopping. So we put our shelves online with a complete cart and checkout flow. You browse, add products to cart, choose delivery and payment, track the order, and still get the trust of a neighbourhood store.
        </p>
        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Visit our store
          </Link>
        </div>
      </section>
    </div>
  );
}

