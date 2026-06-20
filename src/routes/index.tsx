import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgePercent, CreditCard, Headphones, ShieldCheck, Truck } from "lucide-react";
import heroImg from "@/assets/banner-1.png";
import { ProductCard } from "@/components/site/ProductCard";
import { Section } from "@/components/site/Section";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq, faqItems } from "@/components/site/Faq";
import { products } from "@/data/products";
import { site } from "@/lib/site";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} - Grooming, Home Utility and Kitchen Products Online` },
      { name: "description", content: `Shop rechargeable trimmers, grooming kits, kitchen tools and home utility products from ${site.name}. Mobile-first ecommerce with COD, UPI and Razorpay-ready checkout.` },
      { name: "keywords", content: "grooming products online, trimmer, hair clipper, kitchen tools, home utility products, ecommerce store" },
      { property: "og:title", content: `${site.name} - Premium Product Store` },
      { property: "og:description", content: "Fast local delivery, best prices, secure checkout and trusted quality for Indian households." },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <Hero />
      <TrustStrip />
      <ProductGrid />
      <Section eyebrow="Reviews" title="Customers trust us" subtitle="A simple shopping experience with clear product details and checkout."><Testimonials /></Section>
      <Section eyebrow="Help" title="Frequently asked questions" subtitle="Ordering, payments, delivery and returns made clear."><Faq /></Section>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <img src={heroImg} alt="Premium grooming and home utility products" width={1600} height={900} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/10" />
      <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-end gap-8 px-4 py-10 text-primary-foreground lg:grid-cols-[1fr_340px] lg:items-center lg:py-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur"><BadgePercent className="size-4 text-gold" /> Weekend sale live</span>
          <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">Premium grooming, home utility and kitchen products.</h1>
          <p className="mt-5 max-w-xl text-base text-primary-foreground/80 sm:text-lg">Browse products, open details, add items to cart, apply coupons and checkout with COD, UPI or cards.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-primary-foreground shadow-card transition hover:bg-primary-dark">Shop Now <ArrowRight className="size-4" /></Link>
            <Link to="/cart" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-ink">Go to Cart</Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/15 bg-white/12 p-5 backdrop-blur">
          <div className="text-sm font-bold text-gold">Store benefits</div>
          <div className="mt-4 space-y-3 text-sm">
            {["Free delivery above Rs.499", "COD and UPI available", "GST invoice support"].map((item) => <div key={item} className="rounded-2xl bg-white/12 px-4 py-3 font-semibold">{item}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductGrid() {
  return (
    <Section
      eyebrow="Products"
      title="Featured products"
      subtitle="Browse the latest grooming, home utility and kitchen products."
      action={<Link to="/shop" className="hidden items-center gap-1 text-sm font-bold text-primary sm:inline-flex">View all <ArrowRight className="size-4" /></Link>}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {products.slice(0, 10).map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </Section>
  );
}

function TrustStrip() {
  const items = [
    { Icon: Truck, title: "Fast delivery", desc: "Same-day local shipping" },
    { Icon: ShieldCheck, title: "Quality checked", desc: "Verified product stock" },
    { Icon: CreditCard, title: "Secure payments", desc: "Razorpay, UPI, cards, COD" },
    { Icon: Headphones, title: "Support", desc: "Friendly order help" },
  ];
  return <section className="border-y border-border bg-card"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4">{items.map(({ Icon, title, desc }) => <div key={title} className="flex items-center gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" /></span><div><div className="font-display text-sm font-black text-ink">{title}</div><div className="text-xs text-muted-foreground">{desc}</div></div></div>)}</div></section>;
}



