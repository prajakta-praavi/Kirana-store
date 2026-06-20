import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Star, Zap } from "lucide-react";
import type { Product } from "@/data/products";
import { useCommerce } from "@/lib/commerce";

export function ProductCard({ product }: { product: Product }) {
  const { buyNow, toggleWishlist, isWishlisted } = useCommerce();
  const discount = Math.max(0, Math.round(((product.mrp - product.price) / product.mrp) * 100));
  const wishlisted = isWishlisted(product.slug);

  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="relative block aspect-square overflow-hidden bg-secondary">
        <img src={product.image} alt={product.name} loading="lazy" width={600} height={600} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.offer && <span className="rounded-full bg-gold px-2 py-1 text-[10px] font-extrabold uppercase text-gold-foreground shadow-soft">{product.offer}</span>}
          {product.newArrival && <span className="rounded-full bg-ink px-2 py-1 text-[10px] font-bold uppercase text-primary-foreground">New</span>}
        </div>
        {!product.inStock && <span className="absolute right-2 top-2 rounded-full bg-ink/85 px-2 py-1 text-[10px] font-semibold text-primary-foreground">Out</span>}
      </Link>

      <button
        type="button"
        onClick={() => toggleWishlist(product.slug)}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-white/95 shadow-soft transition ${wishlisted ? "text-destructive" : "text-ink hover:text-destructive"}`}
      >
        <Heart className="size-4" fill={wishlisted ? "currentColor" : "none"} />
      </button>

      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <span className="truncate rounded-full bg-secondary px-2 py-1 font-semibold capitalize">{product.subcategory.replaceAll("-", " ")}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-ink"><Star className="size-3 fill-gold text-gold" /> {product.rating}</span>
        </div>
        <Link to="/products/$slug" params={{ slug: product.slug }} className="min-w-0">
          <h3 className="line-clamp-2 font-display text-sm font-extrabold leading-snug text-ink sm:text-[15px]">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{product.shortDesc}</p>
        </Link>
        <div className="mt-auto">
          <div className="flex flex-wrap items-baseline gap-1.5">
            <span className="text-lg font-black text-ink">Rs.{product.price}</span>
            <span className="text-xs text-muted-foreground line-through">Rs.{product.mrp}</span>
            {discount > 0 && <span className="text-[11px] font-bold text-primary">{discount}% off</span>}
          </div>
          <div className="text-[11px] text-muted-foreground">{product.unit} - GST {product.gstRate}%</div>
          <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
            <Link to="/products/$slug" params={{ slug: product.slug }} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-extrabold text-primary-foreground transition hover:bg-primary-dark">
              Shop Now <ArrowRight className="size-3.5" />
            </Link>
            <button type="button" disabled={!product.inStock} onClick={() => buyNow(product)} className="grid size-9 place-items-center rounded-xl border border-border text-ink transition hover:bg-accent disabled:cursor-not-allowed disabled:text-muted-foreground" aria-label={`Buy ${product.name} now`}>
              <Zap className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}


