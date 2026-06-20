import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Phone, Search, ShoppingBasket, UserRound, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";
import { useCommerce } from "@/lib/commerce";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/track-order", label: "Track" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { totals, wishlist } = useCommerce();

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate({ to: "/search", search: { q: query } });
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="bg-ink text-xs text-primary-foreground/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5">
          <span className="truncate">Free delivery above Rs.499 - COD, UPI, cards and Razorpay-ready checkout</span>
          <a href={`tel:${site.phoneRaw}`} className="hidden items-center gap-1.5 sm:flex"><Phone className="size-3" /> {site.phone}</a>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 lg:gap-5">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-soft"><ShoppingBasket className="size-5" /></span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-extrabold leading-tight text-ink sm:text-lg">{site.name}</span>
            <span className="hidden text-[11px] font-medium text-muted-foreground sm:block">Grooming - Home Utility</span>
          </span>
        </Link>

        <form onSubmit={submitSearch} className="hidden min-w-0 items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 shadow-soft md:flex">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search trimmer, clipper, kitchen tool..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </form>

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <Link to="/wishlist" className="relative hidden size-10 place-items-center rounded-xl border border-border bg-card text-ink sm:grid" aria-label="Wishlist">
            <Heart className="size-5" />
            {wishlist.length > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">{wishlist.length}</span>}
          </Link>
          <Link to="/my-account" className="hidden size-10 place-items-center rounded-xl border border-border bg-card text-ink sm:grid" aria-label="My account"><UserRound className="size-5" /></Link>
          <Link to="/cart" className="relative inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-extrabold text-primary-foreground shadow-soft">
            <ShoppingBasket className="size-4" /><span className="hidden sm:inline">Cart</span>
            {totals.count > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-gold text-[10px] font-black text-gold-foreground">{totals.count}</span>}
          </Link>
          <button className="grid size-10 place-items-center rounded-xl border border-border lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </div>
      <nav className="hidden border-t border-border/70 bg-card/80 lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-2">
          {nav.map((n) => <Link key={n.to} to={n.to} className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/70 transition-colors hover:bg-accent hover:text-ink" activeProps={{ className: "bg-accent text-ink" }} activeOptions={{ exact: n.to === "/" }}>{n.label}</Link>)}
        </div>
      </nav>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <form onSubmit={submitSearch} className="mb-3 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
              <Search className="size-4 text-muted-foreground" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="w-full bg-transparent text-sm outline-none" />
            </form>
            <nav className="grid grid-cols-2 gap-2">
              {[...nav, { to: "/wishlist", label: "Wishlist" }, { to: "/my-account", label: "Account" }].map((n) => <Link key={n.to} to={n.to as any} onClick={() => setOpen(false)} className="rounded-xl border border-border bg-card px-3 py-3 text-sm font-bold text-ink">{n.label}</Link>)}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}





