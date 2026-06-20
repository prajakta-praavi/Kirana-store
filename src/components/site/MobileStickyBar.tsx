import { Link } from "@tanstack/react-router";
import { Home, ShoppingBasket } from "lucide-react";
import { useCommerce } from "@/lib/commerce";

export function MobileStickyBar() {
  const { totals } = useCommerce();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <Link to="/shop" className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-ink">
        <Home className="size-4" /> Shop Now
      </Link>
      <Link to="/cart" className="relative flex items-center justify-center gap-2 bg-primary py-3 text-sm font-bold text-primary-foreground">
        <ShoppingBasket className="size-4" /> Cart
        {totals.count > 0 && <span className="absolute right-6 top-2 grid size-5 place-items-center rounded-full bg-gold text-[10px] font-black text-gold-foreground">{totals.count}</span>}
      </Link>
    </div>
  );
}
