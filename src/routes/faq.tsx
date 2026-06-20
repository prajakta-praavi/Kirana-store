import { createFileRoute } from "@tanstack/react-router";
import { Faq } from "@/components/site/Faq";
import { PageHero } from "@/components/site/PageKit";
export const Route = createFileRoute("/faq")({ head: () => ({ meta: [{ title: "FAQ" }] }), component: () => <div><PageHero eyebrow="Help" title="Frequently asked questions" subtitle="Delivery, checkout, returns and product support."/><section className="mx-auto max-w-3xl px-4 py-8"><Faq/></section></div> });
