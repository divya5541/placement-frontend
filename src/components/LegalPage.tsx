import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export type LegalSection = {
  heading: string;
  body: ReactNode;
};

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main className="container-x pt-28 pb-20 max-w-3xl">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-brand-black)] hover:text-[color:var(--color-brand-yellow)] transition"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 className="mt-6 font-display text-3xl md:text-5xl font-bold text-[color:var(--color-brand-black)]">
        {title}
      </h1>
      <p className="mt-3 text-sm text-black/60">
        <span className="font-semibold">Last Updated:</span> {updated}
      </p>
      <div className="mt-6 text-black/75 leading-relaxed">{intro}</div>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl md:text-2xl font-semibold text-[color:var(--color-brand-black)]">
              {s.heading}
            </h2>
            <div className="mt-3 text-black/75 leading-relaxed space-y-3">{s.body}</div>
          </section>
        ))}
      </div>
      <div className="mt-14 rounded-2xl border border-black/5 bg-[color:var(--color-brand-yellow-light)] p-6 text-center">
        <p className="text-sm text-black/70">
          Have questions about this policy? Reach us anytime.
        </p>
        <Link to="/contact" className="btn-primary mt-4 inline-flex">
          Contact Us
        </Link>
      </div>
    </main>
  );
}