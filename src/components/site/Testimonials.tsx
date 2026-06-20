import { Star } from "lucide-react";

const items = [
  { name: "Anita Sharma", role: "Regular customer, 6 yrs", text: "Always fresh dal, atta and spices. I add my monthly staples to cart and checkout in minutes." },
  { name: "Rakesh Verma", role: "Restaurant owner", text: "Bulk orders for kadai, thali and storage dabba are easy to manage. Top quality steel and fair pricing." },
  { name: "Priya Iyer", role: "Working mother", text: "Premium basmati and pure ghee at honest rates. Delivery is quick, checkout is simple, and tracking is clear." },
];

export function Testimonials() { return <div className="grid gap-5 md:grid-cols-3">{items.map((t) => <figure key={t.name} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"><div className="flex gap-0.5 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-gold" />)}</div><blockquote className="text-sm leading-relaxed text-foreground">"{t.text}"</blockquote><figcaption className="mt-auto"><div className="font-display text-sm font-bold text-ink">{t.name}</div><div className="text-xs text-muted-foreground">{t.role}</div></figcaption></figure>)}</div>; }
