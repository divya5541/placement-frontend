import { Link } from "@tanstack/react-router";
import { BUSINESS } from "@/lib/content";

export function CTABanner() {
  return (
    <section className="container-x mt-24">
      <div className="relative overflow-hidden rounded-3xl bg-[color:var(--color-brand-black)] text-white p-8 md:p-14">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[color:var(--color-brand-yellow)]/20 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Placement-Ready?</h2>
            <p className="mt-2 text-white/70 max-w-lg">Start with a free resume review and a mentor call. No commitment.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">Register Free</Link>
            <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="btn-whatsapp">WhatsApp Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
