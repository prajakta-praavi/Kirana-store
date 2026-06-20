import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, PackageSearch } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import type { Product } from "@/data/products";

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return <section className="bg-secondary"><div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">{eyebrow && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary">{eyebrow}</span>}<h1 className="mt-3 font-display text-3xl font-black text-ink sm:text-5xl">{title}</h1>{subtitle && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{subtitle}</p>}</div></section>;
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return <EmptyState title="No products found" text="Try another search or remove filters." />;
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div>;
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center"><PackageSearch className="mx-auto size-10 text-muted-foreground" /><h2 className="mt-4 font-display text-xl font-black text-ink">{title}</h2><p className="mt-2 text-sm text-muted-foreground">{text}</p><Link to="/shop" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-black text-primary-foreground">Browse shop <ArrowRight className="size-4" /></Link></div>;
}

export function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-border bg-card p-5 shadow-soft"><h2 className="font-display text-lg font-black text-ink">{title}</h2><div className="mt-3 text-sm leading-7 text-muted-foreground">{children}</div></section>;
}

export function Checklist({ items }: { items: string[] }) {
  return <ul className="grid gap-2">{items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" /><span>{item}</span></li>)}</ul>;
}
