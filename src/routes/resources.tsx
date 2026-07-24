import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, ListChecks, Map, X, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionTag } from "@/components/SectionTag";
import { CTABanner } from "@/components/CTABanner";
import { captureResourceEmail } from "@/lib/forms.functions";
import { useServerFn } from "@tanstack/react-start";
import { resourceEmailSchema } from "@/lib/validation";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Free Resources — Placement Spark" },
      { name: "description", content: "Free downloadable resume template, interview checklist, and placement roadmap for Indian students." },
      { property: "og:title", content: "Free Resources — Placement Spark" },
      { property: "og:description", content: "Career resources to help you get placement-ready." },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

const RESOURCES = [
  { icon: FileText, title: "Resume Template", desc: "A recruiter-friendly, ATS-safe resume template you can customize in 15 minutes." },
  { icon: ListChecks, title: "Interview Checklist", desc: "The exact checklist we use with students the day before an interview." },
  { icon: Map, title: "Placement Roadmap", desc: "A month-by-month plan from 1st year to your first offer." },
];

const TIPS = [
  "Rewrite one resume bullet per day — measurable, action-first.",
  "Practice mock interviews out loud. Silent prep doesn't count.",
  "Message 3 seniors on LinkedIn every week. Referrals are underrated.",
  "Track applications in a sheet. Momentum matters more than motivation.",
];

function ResourcesPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const capture = useServerFn(captureResourceEmail);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = resourceEmailSchema.safeParse({ email, resource: open ?? "" });
    if (!parsed.success) { setError(parsed.error.issues[0].message); return; }
    setSubmitting(true);
    try {
      await capture({ data: parsed.data });
      setDone(true);
    } catch { setError("Something went wrong. Please try again."); }
    finally { setSubmitting(false); }
  };

  const close = () => { setOpen(null); setEmail(""); setDone(false); setError(null); };

  return (
    <>
      <section className="container-x pt-14 md:pt-20">
        <Reveal className="max-w-3xl">
          <SectionTag>Free resources</SectionTag>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">Career tools, free to use.</h1>
          <p className="mt-4 text-black/70 leading-relaxed">Drop your email and grab the resource. We'll send a copy so you can revisit it later.</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {RESOURCES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="card-lift h-full rounded-2xl border border-black/5 bg-white p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--color-brand-yellow-light)]"><r.icon size={22} /></div>
                <h3 className="mt-4 font-semibold text-lg">{r.title}</h3>
                <p className="mt-1.5 text-sm text-black/60 leading-relaxed">{r.desc}</p>
                <button onClick={() => setOpen(r.title)} className="btn-primary mt-5 text-sm w-full"><Download size={16} /> Get it free</button>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-[color:var(--color-brand-grey-light)] p-8 md:p-12">
          <SectionTag>Quick tips</SectionTag>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold">Small habits, real progress.</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {TIPS.map((t) => (
              <li key={t} className="flex gap-2 text-black/75"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[color:var(--color-brand-yellow)]" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={close} aria-label="Close" className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full hover:bg-black/5"><X size={18} /></button>
              {done ? (
                <div className="text-center py-6">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[color:var(--color-brand-yellow)]"><CheckCircle2 size={28} /></div>
                  <h3 className="mt-4 text-xl font-bold">Check your inbox</h3>
                  <p className="mt-2 text-sm text-black/60">We'll send "{open}" to <span className="font-semibold">{email}</span>.</p>
                  <button onClick={close} className="btn-secondary mt-6">Close</button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold">Download "{open}"</h3>
                  <p className="mt-1 text-sm text-black/60">Enter your email — we'll send it right over.</p>
                  <form onSubmit={submit} className="mt-5 space-y-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@college.edu"
                      className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-yellow)]"
                    />
                    {error && <p className="text-xs text-red-600">{error}</p>}
                    <button disabled={submitting} className="btn-primary w-full text-sm">
                      {submitting ? "Sending..." : (<><Download size={16} /> Send me the download</>)}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTABanner />
    </>
  );
}
