import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, ShoppingBasket } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 bg-ink text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-xl gradient-primary">
              <ShoppingBasket className="size-5" />
            </span>
            <span className="font-display text-lg font-extrabold">{site.name}</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70">{site.tagline}</p>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-gold">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/kirana-items" className="hover:text-gold">Grooming Products</Link></li>
            <li><Link to="/steel-bhandi" className="hover:text-gold">Home & Kitchen</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-gold">Visit Store</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-2"><MapPin className="size-4 shrink-0 text-gold" /> {site.address}, {site.city}</li>
            <li className="flex gap-2"><Phone className="size-4 shrink-0 text-gold" /> {site.phone}</li>
            <li className="flex gap-2"><Mail className="size-4 shrink-0 text-gold" /> {site.email}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-gold">Store Hours</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>{site.hoursWeekday}</li>
            <li>{site.hoursSunday}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <span>Â© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>Made with care for our local community.</span>
        </div>
      </div>
    </footer>
  );
}

