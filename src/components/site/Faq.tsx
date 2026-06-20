import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const faqItems = [
  { q: "How do I place an order?", a: "Browse the shop, open a category or product page, add products to cart, review quantities, apply a coupon, enter your shipping address and place the order from checkout." },
  { q: "Do you deliver?", a: "Yes, we offer free local delivery on orders above Rs.499 within our serviceable area. Same-day delivery is available for orders placed before 5 PM." },
  { q: "What payment methods are available?", a: "Checkout supports Razorpay-ready online payments, UPI, credit/debit cards, net banking and Cash on Delivery." },
  { q: "Can I create an account?", a: "Yes. Customers can register, login, view order history, manage saved details and track orders." },
  { q: "Are your steel utensils food-grade?", a: "Every steel item we sell is food-grade stainless steel from trusted manufacturers, with original brand packaging where applicable." },
  { q: "Do you accept bulk / restaurant orders?", a: "Yes, submit a contact request or call the store for restaurant, catering and bulk household pricing." },
  { q: "What if I am not satisfied with a product?", a: "We accept returns for damaged, incorrect or eligible unopened items as described in our return and refund policy." },
];

export function Faq() { return <Accordion type="single" collapsible className="mx-auto max-w-3xl">{faqItems.map((it, i) => <AccordionItem key={i} value={`item-${i}`} className="border-border"><AccordionTrigger className="text-left font-display text-base font-semibold text-ink hover:no-underline">{it.q}</AccordionTrigger><AccordionContent className="text-sm leading-relaxed text-muted-foreground">{it.a}</AccordionContent></AccordionItem>)}</Accordion>; }
