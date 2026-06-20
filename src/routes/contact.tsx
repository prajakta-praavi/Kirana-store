import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";
import { site } from "@/lib/site";

const contactSchema = z.object({ name: z.string().trim().min(2, "Name must be at least 2 characters").max(80), phone: z.string().trim().min(7, "Enter a valid phone number").max(20), message: z.string().trim().min(5, "Message is too short").max(800) });

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: `Contact - ${site.name}` }, { name: "description", content: `Reach ${site.name} for grocery and steel utensil orders, bulk enquiries, delivery support or store visits.` }, { property: "og:title", content: `Contact ${site.name}` }, { property: "og:description", content: "Visit our store, call, email or submit a support request." }, { property: "og:url", content: "/contact" }], links: [{ rel: "canonical", href: "/contact" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const r = contactSchema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
  }

  return (
    <div>
      <section className="gradient-hero"><div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20"><h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">Get in touch</h1><p className="mt-4 text-base text-muted-foreground">We are here to help with orders, delivery, returns, bulk pricing and kitchenware recommendations.</p></div></section>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink">Store information</h2>
          <ul className="mt-6 space-y-5 text-sm">
            <li className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><MapPin className="size-5" /></span><div><div className="font-display font-bold text-ink">Address</div><div className="text-muted-foreground">{site.address}, {site.city}</div></div></li>
            <li className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Phone className="size-5" /></span><div><div className="font-display font-bold text-ink">Phone</div><a href={`tel:${site.phoneRaw}`} className="text-muted-foreground hover:text-primary">{site.phone}</a></div></li>
            <li className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Mail className="size-5" /></span><div><div className="font-display font-bold text-ink">Email</div><a href={`mailto:${site.email}`} className="text-muted-foreground hover:text-primary">{site.email}</a></div></li>
            <li className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Clock className="size-5" /></span><div><div className="font-display font-bold text-ink">Hours</div><div className="text-muted-foreground">{site.hoursWeekday}</div><div className="text-muted-foreground">{site.hoursSunday}</div></div></li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3"><a href={`tel:${site.phoneRaw}`} className="rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-card">Call Store</a><a href={`mailto:${site.email}`} className="rounded-2xl border border-border bg-card px-6 py-3 text-sm font-bold text-ink shadow-soft">Email Support</a></div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-soft"><iframe title="Store location" src={site.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full" /></div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-2xl font-extrabold text-ink">Send us a message</h2>
          <p className="text-sm text-muted-foreground">Submit your details and our store team will contact you by phone or email.</p>
          {sent && <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm font-bold text-primary"><CheckCircle2 className="size-4" /> Message received. Our team will get back to you shortly.</div>}
          <Field label="Your name" value={form.name} onChange={(value)=>setForm({...form,name:value})} error={errors.name} placeholder="e.g. Anita Sharma" />
          <Field label="Phone" value={form.phone} onChange={(value)=>setForm({...form,phone:value})} error={errors.phone} placeholder="e.g. +91 98765 43210" />
          <div><label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Message</label><textarea value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} maxLength={800} rows={5} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Tell us what you need..." />{errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}</div>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 font-bold text-primary-foreground">Send Message</button>
        </form>
      </section>
    </div>
  );
}
function Field({label,value,onChange,error,placeholder}:{label:string;value:string;onChange:(value:string)=>void;error?:string;placeholder:string}){return <div><label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</label><input value={value} onChange={(e)=>onChange(e.target.value)} maxLength={80} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder={placeholder}/>{error && <p className="mt-1 text-xs text-destructive">{error}</p>}</div>}
