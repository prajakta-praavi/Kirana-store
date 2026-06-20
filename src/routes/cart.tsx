import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { PageHero, EmptyState } from "@/components/site/PageKit";
import { cartProducts, useCommerce } from "@/lib/commerce";

export const Route = createFileRoute("/cart")({ head: () => ({ meta: [{ title: "Cart" }, { name: "description", content: "Review your shopping cart, quantities, GST, delivery, coupons and discounts." }] }), component: CartPage });

function CartPage(){
  const commerce = useCommerce();
  const lines = cartProducts(commerce.cart);
  if(lines.length===0) return <div><PageHero eyebrow="Cart" title="Your cart" subtitle="Add products to checkout."/><section className="mx-auto max-w-3xl px-4 py-8"><EmptyState title="Your cart is empty" text="Explore products and add your favourites."/></section></div>;
  return <div><PageHero eyebrow="Cart" title="Your shopping cart" subtitle="Review items, apply coupons, update quantities and proceed to secure checkout."/><section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]"><div className="space-y-3">{lines.map(({product,qty})=><div key={product.slug} className="grid grid-cols-[88px_1fr] gap-4 rounded-2xl border border-border bg-card p-3 shadow-soft"><img src={product.image} alt={product.name} className="size-22 rounded-xl object-cover"/><div><Link to="/products/$slug" params={{slug:product.slug}} className="font-display font-black text-ink">{product.name}</Link><div className="mt-1 text-sm text-muted-foreground">Rs.{product.price} - {product.unit}</div><div className="mt-3 flex items-center justify-between gap-3"><div className="inline-flex items-center rounded-xl border border-border"><button type="button" className="p-2" onClick={()=>commerce.updateQty(product.slug, qty-1)}><Minus className="size-4"/></button><span className="min-w-8 text-center text-sm font-bold">{qty}</span><button type="button" className="p-2" onClick={()=>commerce.updateQty(product.slug, qty+1)}><Plus className="size-4"/></button></div><button type="button" onClick={()=>commerce.removeFromCart(product.slug)} className="text-destructive"><Trash2 className="size-4"/></button></div></div></div>)}</div><OrderSummary/></section></div>;
}

function OrderSummary(){
  const { totals } = useCommerce();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const validCoupon = coupon.trim().toUpperCase() === "APNA150" && totals.subtotal >= 2499;
  const couponMessage = applied ? (validCoupon ? "Coupon APNA150 applied successfully." : "APNA150 applies above Rs.2499.") : "Try APNA150 on orders above Rs.2499.";
  return <aside className="h-fit rounded-2xl border border-border bg-card p-5 shadow-card"><h2 className="font-display text-xl font-black text-ink">Order summary</h2><form onSubmit={(event)=>{event.preventDefault(); setApplied(true);}} className="mt-4 flex gap-2"><label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2"><Tag className="size-4 text-primary"/><input value={coupon} onChange={(event)=>{setCoupon(event.target.value); setApplied(false);}} placeholder="Coupon code" className="min-w-0 flex-1 bg-transparent text-sm outline-none"/></label><button className="rounded-xl bg-ink px-4 text-sm font-black text-primary-foreground">Apply</button></form><p className={`mt-2 text-xs ${applied && validCoupon ? "text-primary" : "text-muted-foreground"}`}>{couponMessage}</p><div className="mt-4 space-y-2 text-sm"><Row k="Subtotal" v={`Rs.${totals.subtotal}`}/><Row k="Discount" v={`- Rs.${totals.discount}`}/><Row k="GST" v={`Rs.${totals.gst}`}/><Row k="Delivery" v={totals.delivery ? `Rs.${totals.delivery}` : "Free"}/></div><div className="mt-4 border-t border-border pt-4 text-lg font-black text-ink"><Row k="Total" v={`Rs.${totals.total}`}/></div><Link to="/checkout" className="mt-5 flex w-full justify-center rounded-xl bg-primary px-4 py-3 text-sm font-black text-primary-foreground">Proceed to Checkout</Link><p className="mt-3 text-xs text-muted-foreground">GST invoice available. Free delivery above Rs.499.</p></aside>;
}
function Row({k,v}:{k:string;v:string}){return <div className="flex justify-between gap-4"><span className="text-muted-foreground">{k}</span><span className="font-bold text-ink">{v}</span></div>}

