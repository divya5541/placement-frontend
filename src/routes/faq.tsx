import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FAQS } from "@/lib/content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/Reveal";
import { SectionTag } from "@/components/SectionTag";
import { CTABanner } from "@/components/CTABanner";

export const Route = createFileRoute("/faq")({
  head: () => {
    const all = FAQS.flatMap((c) => c.items);
    return {
      meta: [
        { title: "FAQ — Placement Spark" },
        { name: "description", content: "Answers to common questions about programs, pricing, mentors, and more." },
        { property: "og:title", content: "FAQ — Placement Spark" },
        { property: "og:description", content: "Everything students ask us, answered." },
        { property: "og:url", content: "/faq" },
      ],
      links: [{ rel: "canonical", href: "/faq" }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: all.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }),
      }],
    };
  },
  component: FaqPage,
});

function FaqPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return FAQS;
    return FAQS.map((c) => ({
      ...c,
      items: c.items.filter((i) => i.q.toLowerCase().includes(term) || i.a.toLowerCase().includes(term)),
    })).filter((c) => c.items.length > 0);
  }, [q]);

  return (
    <>
      <section className="container-x pt-14 md:pt-20">
        <Reveal className="max-w-3xl">
          <SectionTag>FAQ</SectionTag>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">Questions, answered.</h1>
          <p className="mt-4 text-black/70 leading-relaxed">Search below or browse by category.</p>
        </Reveal>
        <div className="mt-8 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full rounded-md border border-black/15 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-yellow)]"
          />
        </div>
        <div className="mt-10 space-y-12">
          {filtered.length === 0 && (
            <p className="text-black/50">No questions match "{q}". Try a different word or reach out on WhatsApp.</p>
          )}
          {filtered.map((c) => (
            <Reveal key={c.category}>
              <h2 className="text-xl font-semibold mb-4">{c.category}</h2>
              <FaqAccordion items={c.items} defaultOpen={null} />
            </Reveal>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
