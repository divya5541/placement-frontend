import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { PLANS, PRICING_FEATURES, FAQS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionTag } from "@/components/SectionTag";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CTABanner } from "@/components/CTABanner";
import { WhichPlanSection } from "@/components/WhichPlanSection";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Placement Spark" },
      { name: "description", content: "Simple, honest pricing. Free trial, Solo, Buddy, and Squad plans with a full feature comparison." },
      { property: "og:title", content: "Pricing — Placement Spark" },
      { property: "og:description", content: "Free trial + Solo, Buddy, and Squad plans." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function Cell({ v }: { v: boolean }) {
  return v
    ? <Check size={18} className="mx-auto text-[color:var(--color-brand-black)]" />
    : <X size={18} className="mx-auto text-black/25" />;
}

function PricingPage() {
  const pricingFaqs = FAQS.find((f) => f.category === "Pricing & Registration")!.items;
  return (
    <>
      <section className="container-x pt-14 md:pt-20">
        <Reveal className="max-w-3xl">
          <SectionTag>Pricing</SectionTag>
          <p className="mt-4 text-black/70 leading-relaxed">Choose the Preparation That Fits You Best...</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">Choose Your Path to Placement Success.</h1>
          <p className="mt-4 text-black/70 leading-relaxed">Whether you prefer learning individually, with a friend, or as a group, we've designed a plan that matches your journey.</p>
          <p className="mt-2 text-xs text-black/40 uppercase tracking-wider">* Confidence isn't built in the interview room. It's built during preparation.</p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div className={"card-lift h-full rounded-2xl p-6 flex flex-col " + (p.highlight ? "bg-[color:var(--color-brand-black)] text-white ring-2 ring-[color:var(--color-brand-yellow)]" : "border border-black/5 bg-white")}>
                {p.highlight && <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-yellow)]">{p.highlight}</div>}
                <div className="mt-2 text-sm font-semibold opacity-70">{p.name}</div>
                <div className="mt-1 text-4xl font-bold">{p.price}<span className="text-sm font-normal opacity-60">{p.cadence}</span></div>
                <p className="mt-2 text-sm opacity-70">{p.tagline}</p>
                <ul className="mt-5 space-y-2 text-sm flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[color:var(--color-brand-yellow)]" />{f}</li>
                  ))}
                </ul>
                <Link to="/contact" className={"mt-6 text-center rounded-md px-4 py-2.5 text-sm font-semibold " + (p.highlight ? "bg-[color:var(--color-brand-yellow)] text-black hover:bg-[#FFB300]" : "bg-black text-white hover:bg-black/80")}>
                  {p.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <WhichPlanSection />


        <Reveal>
          <h2 className="mt-20 text-2xl md:text-3xl font-bold">Full comparison</h2>
        </Reveal>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[color:var(--color-brand-grey-light)]">
                <th className="text-left px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-semibold">Free Trial</th>
                <th className="px-4 py-3 font-semibold">Solo</th>
                <th className="px-4 py-3 font-semibold">Buddy</th>
                <th className="px-4 py-3 font-semibold">Squad</th>
              </tr>
            </thead>
            <tbody>
              {PRICING_FEATURES.map((r) => (
                <tr key={r.feature} className="border-t border-black/5">
                  <td className="px-4 py-3">{r.feature}</td>
                  <td className="px-4 py-3"><Cell v={r.free} /></td>
                  <td className="px-4 py-3"><Cell v={r.solo} /></td>
                  <td className="px-4 py-3"><Cell v={r.buddy} /></td>
                  <td className="px-4 py-3"><Cell v={r.squad} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-20 max-w-3xl">
          <SectionTag>Pricing FAQ</SectionTag>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold">Common questions</h2>
          <div className="mt-6">
            <FaqAccordion items={pricingFaqs} />
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
