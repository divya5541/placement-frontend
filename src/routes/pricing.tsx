import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { useState } from "react";
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
      {
        name: "description",
        content:
          "Simple, honest pricing. Free trial, Solo, Buddy, and Squad plans with a full feature comparison.",
      },
      { property: "og:title", content: "Pricing — Placement Spark" },
      {
        property: "og:description",
        content: "Free trial + Solo, Buddy, and Squad plans.",
      },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

type PlanKey = "free" | "solo" | "buddy" | "squad";

function getPlanKey(name: string): PlanKey {
  switch (name.toLowerCase()) {
    case "free trial":
      return "free";
    case "solo":
      return "solo";
    case "buddy":
      return "buddy";
    case "squad":
      return "squad";
    default:
      return "free";
  }
}

function PricingPage() {
  const pricingFaqs = FAQS.find(
    (f) => f.category === "Pricing & Registration"
  )!.items;

  const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null);

  const selectedPlanData = selectedPlan
    ? PLANS.find((p) => getPlanKey(p.name) === selectedPlan)
    : null;

  return (
    <>
      <section className="container-x pt-14 md:pt-20">
        {/* ============================= */}
        {/* PAGE HEADER */}
        {/* ============================= */}

        <Reveal className="max-w-3xl">
          <SectionTag>Pricing</SectionTag>

          <p className="mt-4 text-black/70 leading-relaxed">
            Choose the Preparation That Fits You Best...
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
            Choose Your Path to Placement Success.
          </h1>

          <p className="mt-4 text-black/70 leading-relaxed">
            Whether you prefer learning individually, with a friend, or as a
            group, we've designed a plan that matches your journey.
          </p>

          <p className="mt-2 text-xs text-black/40 uppercase tracking-wider">
            * Confidence isn't built in the interview room. It's built during
            preparation.
          </p>
        </Reveal>

        {/* ============================= */}
        {/* PRICING CARDS */}
        {/* ============================= */}

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div
                className={
                  "card-lift h-full rounded-2xl p-6 flex flex-col " +
                  (p.highlight
                    ? "bg-[color:var(--color-brand-black)] text-white ring-2 ring-[color:var(--color-brand-yellow)]"
                    : "border border-black/5 bg-white")
                }
              >
                {/* Highlight */}
                {p.highlight && (
                  <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-yellow)]">
                    {p.highlight}
                  </div>
                )}

                {/* Plan Name */}
                <div className="mt-2 text-sm font-semibold opacity-70">
                  {p.name}
                </div>

                {/* Price */}
                <div className="mt-1 text-4xl font-bold">
                  {p.price}
                  <span className="text-sm font-normal opacity-60">
                    {p.cadence}
                  </span>
                </div>

                {/* Tagline */}
                <p className="mt-2 text-sm opacity-70">{p.tagline}</p>

                {/* Main Benefits */}
                <ul className="mt-5 space-y-2 text-sm flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-[color:var(--color-brand-yellow)]"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* VIEW ALL BENEFITS */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan(getPlanKey(p.name))}
                  className={
                    "mt-5 flex w-full items-center justify-center text-sm font-semibold transition-colors " +
                    (p.highlight
                      ? "text-[color:var(--color-brand-yellow)] hover:text-white"
                      : "text-black hover:text-[color:var(--color-brand-yellow)]")
                  }
                >
                  View All Benefits →
                </button>

                {/* CTA */}
                <Link
                  to="/contact"
                  className={
                    "mt-5 text-center rounded-md px-4 py-2.5 text-sm font-semibold " +
                    (p.highlight
                      ? "bg-[color:var(--color-brand-yellow)] text-black hover:bg-[#FFB300]"
                      : "bg-black text-white hover:bg-black/80")
                  }
                >
                  {p.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ============================= */}
        {/* BENEFITS MODAL / POPUP */}
        {/* ============================= */}

        {selectedPlan && selectedPlanData && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm md:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedPlanData.name} plan benefits`}
          >
            {/* Modal Container */}
            <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-[color:var(--color-brand-black)] text-white shadow-2xl ring-1 ring-white/10">
              {/* ============================= */}
              {/* MODAL HEADER */}
              {/* ============================= */}

              <div className="shrink-0 border-b border-white/10 px-5 py-6 pr-16 md:px-8 md:py-7">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan(null)}
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-6 md:top-6"
                  aria-label="Close benefits"
                >
                  <X size={25} strokeWidth={3} />
                </button>

                <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-yellow)]">
                  Complete Benefits
                </p>

                <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                  {selectedPlanData.name} Plan
                </h2>

                <p className="mt-2 text-sm text-white/60 md:text-base">
                  {selectedPlanData.tagline}
                </p>

                <div className="mt-4 text-3xl font-bold text-[color:var(--color-brand-yellow)] md:text-4xl">
                  {selectedPlanData.price}

                  <span className="ml-1 text-sm font-normal text-white/50">
                    {selectedPlanData.cadence}
                  </span>
                </div>
              </div>

              {/* ============================= */}
              {/* BENEFITS CONTENT */}
              {/* ============================= */}

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-7">
                <h3 className="mb-5 text-xl font-bold md:text-2xl">
                  ✨ All Features Included:
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  {PRICING_FEATURES.filter(
                    (feature) => feature[selectedPlan]
                  ).map((feature) => (
                    <div
                      key={feature.feature}
                      className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3 transition hover:bg-white/10"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-black">
                        <Check size={15} strokeWidth={3} />
                      </div>

                      <span className="text-sm leading-relaxed text-white/90">
                        {feature.feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ============================= */}
              {/* MODAL FOOTER */}
              {/* ============================= */}

              <div className="shrink-0 border-t border-white/10 bg-black/20 px-5 py-4 md:px-8 md:py-5">
                <Link
                  to="/contact"
                  onClick={() => setSelectedPlan(null)}
                  className="block w-full rounded-xl bg-[color:var(--color-brand-yellow)] px-5 py-3 text-center font-semibold text-black transition hover:bg-[#FFB300]"
                >
                  {selectedPlanData.cta}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ============================= */}
        {/* WHICH PLAN SECTION */}
        {/* ============================= */}

        <WhichPlanSection />

        {/* ============================= */}
        {/* PRICING FAQ */}
        {/* ============================= */}

        <div className="mt-20 max-w-3xl">
          <SectionTag>Pricing FAQ</SectionTag>

          <h2 className="mt-3 text-2xl md:text-3xl font-bold">
            Common questions
          </h2>

          <div className="mt-6">
            <FaqAccordion items={pricingFaqs} />
          </div>
        </div>
      </section>

      {/* ============================= */}
      {/* CTA BANNER */}
      {/* ============================= */}

      <CTABanner />
    </>
  );
}