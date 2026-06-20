import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Heart, Minus, Phone, Plus, ShieldCheck, ShoppingCart, Star, Truck, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct, related } from "@/data/products";
import { useCommerce } from "@/lib/commerce";
import { site } from "@/lib/site";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Product not found" }] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} - Buy Online | ${site.name}` },
        { name: "description", content: `${product.shortDesc} Price Rs.${product.price} (${product.unit}). Add to cart and checkout online from ${site.name}.` },
        { property: "og:title", content: product.name },
        { property: "og:description", content: product.shortDesc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.slug}` },
        { property: "og:image", content: product.image },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: product.name, image: [product.image], description: product.description, sku: product.slug, brand: { "@type": "Brand", name: site.name }, aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews }, offers: { "@type": "Offer", priceCurrency: "INR", price: product.price, availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", url: `/products/${params.slug}` } }) }],
    };
  },
  component: ProductPage,
  notFoundComponent: () => <div className="mx-auto max-w-2xl px-4 py-24 text-center"><h1 className="font-display text-3xl font-extrabold text-ink">Product not found</h1><p className="mt-2 text-muted-foreground">It may be out of stock or removed.</p><Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">Shop Now</Link></div>,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const rel = related(product.slug);
  const commerce = useCommerce();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product.variants?.[0] ?? product.unit);
  const catLink = product.category === "grocery" ? "/kirana-items" : "/steel-bhandi";
  const catName = product.category === "grocery" ? "Grooming Products" : "Home & Kitchen Products";
  const discount = Math.max(0, Math.round(((product.mrp - product.price) / product.mrp) * 100));

  useEffect(() => commerce.recordView(product.slug), [commerce, product.slug]);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground"><Link to="/" className="hover:text-ink">Home</Link><span>/</span><Link to="/shop" className="hover:text-ink">Shop</Link><span>/</span><Link to={catLink} className="hover:text-ink">{catName}</Link><span>/</span><span className="truncate text-ink">{product.name}</span></nav>
      </div>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-8 lg:grid-cols-2 lg:py-12">
        <div className="overflow-hidden rounded-3xl bg-secondary shadow-soft ring-1 ring-border"><img src={product.image} alt={product.name} width={1200} height={1200} className="aspect-square w-full object-cover" /></div>
        <div className="flex flex-col">
          <Link to={catLink} className="inline-flex items-center gap-1 text-xs font-semibold text-primary"><ArrowLeft className="size-3" /> Back to {catName}</Link>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-base text-muted-foreground">{product.shortDesc}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm"><span className="inline-flex items-center gap-1 rounded-full bg-gold/20 px-3 py-1 font-black text-ink"><Star className="size-4 fill-gold text-gold" /> {product.rating} ({product.reviews} reviews)</span><span className={product.inStock ? "font-bold text-primary" : "font-bold text-destructive"}>{product.inStock ? "In stock" : "Currently out of stock"}</span></div>
          <div className="mt-6 flex flex-wrap items-end gap-3"><span className="font-display text-4xl font-extrabold text-ink">Rs.{product.price}</span><span className="pb-1 text-base text-muted-foreground line-through">Rs.{product.mrp}</span><span className="pb-1 text-sm font-black text-primary">{discount}% off</span>{product.offer && <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground">{product.offer}</span>}</div>
          <div className="mt-1 text-sm text-muted-foreground">Inclusive of GST {product.gstRate}% - {product.unit}</div>
          {product.variants && <div className="mt-6"><div className="text-sm font-black text-ink">Select variant</div><div className="mt-2 flex flex-wrap gap-2">{product.variants.map((item)=><button key={item} onClick={()=>setVariant(item)} className={`rounded-xl border px-4 py-2 text-sm font-bold ${variant===item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-ink"}`}>{item}</button>)}</div></div>}
          <div className="mt-6 flex items-center gap-3"><span className="text-sm font-black text-ink">Quantity</span><div className="inline-flex items-center rounded-xl border border-border bg-card"><button className="p-3" onClick={()=>setQty(Math.max(1, qty-1))}><Minus className="size-4"/></button><span className="min-w-10 text-center font-black">{qty}</span><button className="p-3" onClick={()=>setQty(qty+1)}><Plus className="size-4"/></button></div></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <button disabled={!product.inStock} onClick={()=>commerce.addToCart(product, qty, variant)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-black text-primary-foreground shadow-card transition hover:bg-primary-dark disabled:bg-muted disabled:text-muted-foreground"><ShoppingCart className="size-5" /> Add to Cart</button>
            <button disabled={!product.inStock} onClick={()=>commerce.buyNow(product)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-6 py-4 text-base font-black text-gold-foreground shadow-card transition hover:brightness-95 disabled:bg-muted disabled:text-muted-foreground"><Zap className="size-5" /> Buy Now</button>
            <button onClick={()=>commerce.toggleWishlist(product.slug)} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 py-4 text-base font-black text-ink"><Heart className="size-5" fill={commerce.isWishlisted(product.slug) ? "currentColor" : "none"} /> Wishlist</button>
          </div>
          <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-secondary/50 p-5 text-sm"><div className="flex items-center gap-2"><Truck className="size-4 text-primary" /> Free local delivery on orders above Rs.499</div><div className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> 100% genuine products with easy returns</div><div className="flex items-center gap-2"><Phone className="size-4 text-primary" /> Support available at {site.phone}</div></div>
          <div className="mt-8"><h2 className="font-display text-lg font-bold text-ink">Product details</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p></div>
        </div>
      </section>
      {rel.length > 0 && <section className="mx-auto max-w-7xl px-4 py-10"><h2 className="font-display text-2xl font-extrabold text-ink">Related products</h2><div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{rel.map((p) => <ProductCard key={p.slug} product={p} />)}</div></section>}
    </div>
  );
}

