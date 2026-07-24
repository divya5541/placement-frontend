import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionTag } from "@/components/SectionTag";
import { BUSINESS } from "@/lib/content";
import { registrationSchema } from "@/lib/validation";
import { submitRegistration } from "@/lib/forms.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Register / Contact — Placement Spark" },
      { name: "description", content: "Register for a free session or contact Placement Spark. Fast reply on WhatsApp." },
      { property: "og:title", content: "Register — Placement Spark" },
      { property: "og:description", content: "Register for free mentorship and career guidance." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const YEARS = ["1st Year", "2nd Year", "3rd Year", "Final Year", "Graduate"] as const;
const COURSES = ["Engineering", "chemical Engineer", "Other"] as const;
const INTERESTS = ["Resume", "Interviews", "LinkedIn", "Career"] as const;

function ContactPage() {
  const register = useServerFn(submitRegistration);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", college: "",
    year: "Final Year" as (typeof YEARS)[number],
    course: "Engineering" as (typeof COURSES)[number],
    interests: [] as string[],
    message: "", consent: false, website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const toggleInterest = (i: string) => {
    setForm((f) => ({ ...f, interests: f.interests.includes(i) ? f.interests.filter((x) => x !== i) : [...f.interests, i] }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = registrationSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((iss) => { errs[iss.path[0] as string] = iss.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setState("loading");
    try {
      await register({ data: parsed.data });
      setState("success");
    } catch { setState("error"); }
  };

  const field = "w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-yellow)] transition";

  return (
    <>
      <section className="container-x pt-14 md:pt-20 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <SectionTag>Get started</SectionTag>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">Register free — a mentor will reach out.</h1>
            <p className="mt-4 text-black/70 leading-relaxed">Fill this out in under 2 minutes. We'll get in touch within 24 hours.</p>
          </Reveal>

          {state === "success" ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-2xl bg-[color:var(--color-brand-yellow-light)] border border-[color:var(--color-brand-yellow)] p-8 text-center">
              <CheckCircle2 size={48} className="mx-auto text-[color:var(--color-brand-black)]" />
              <h2 className="mt-4 text-2xl font-bold">You're in!</h2>
              <p className="mt-2 text-black/70">A mentor will reach out within 24 hours. Meanwhile, feel free to WhatsApp us.</p>
              <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="btn-whatsapp mt-5">Chat on WhatsApp</a>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="mt-8 grid gap-4 sm:grid-cols-2">
              <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-black/70">Full Name *</label>
                <input required className={field + " mt-1"} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-black/70">Email *</label>
                <input required type="email" className={field + " mt-1"} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-black/70">Phone (+91) *</label>
                <input required inputMode="numeric" maxLength={10} className={field + " mt-1"} placeholder="10-digit number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })} />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-black/70">College / University *</label>
                <input required className={field + " mt-1"} value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} />
                {errors.college && <p className="text-xs text-red-600 mt-1">{errors.college}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-black/70">Year of Study *</label>
                <select className={field + " mt-1"} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value as (typeof YEARS)[number] })}>
                  {YEARS.map((y) => <option key={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-black/70">Course *</label>
                <select className={field + " mt-1"} value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value as (typeof COURSES)[number] })}>
                  {COURSES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-black/70">Areas of Interest * (pick one or more)</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {INTERESTS.map((i) => {
                    const on = form.interests.includes(i);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleInterest(i)}
                        className={"rounded-full px-4 py-1.5 text-sm border transition " + (on ? "bg-[color:var(--color-brand-black)] text-white border-black" : "bg-white border-black/15 hover:border-black")}
                      >{i}</button>
                    );
                  })}
                </div>
                {errors.interests && <p className="text-xs text-red-600 mt-1">{errors.interests}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-black/70">Message (optional)</label>
                <textarea maxLength={500} rows={4} className={field + " mt-1"} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <div className="text-[10px] text-black/40 mt-1 text-right">{form.message.length}/500</div>
              </div>

              <div className="sm:col-span-2 flex items-start gap-2">
                <input id="consent" type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" />
                <label htmlFor="consent" className="text-xs text-black/70">I agree to be contacted by Placement Spark about programs and career guidance. *</label>
              </div>
              {errors.consent && <p className="text-xs text-red-600 -mt-3">{errors.consent}</p>}

              <div className="sm:col-span-2 flex flex-wrap gap-3 items-center">
                <button disabled={state === "loading"} className="btn-primary">{state === "loading" ? "Submitting..." : "Register Free"}</button>
                <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="btn-whatsapp">WhatsApp instead</a>
                {state === "error" && <span className="text-xs text-red-600">Something went wrong. Please try again.</span>}
              </div>
            </form>
          )}
        </div>

        <Reveal delay={0.1}>
          <aside className="rounded-3xl bg-[color:var(--color-brand-black)] text-white p-8 sticky top-24">
            <h2 className="text-xl font-bold">Reach us directly</h2>
            <p className="mt-2 text-sm text-white/70">Prefer talking? Here's every way to reach us.</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3"><Mail size={18} className="mt-0.5 text-[color:var(--color-brand-yellow)]" /><a href={`mailto:${BUSINESS.email}`} className="hover:underline break-all">{BUSINESS.email}</a></li>
              <li className="flex gap-3"><Phone size={18} className="mt-0.5 text-[color:var(--color-brand-yellow)]" /><a href={`tel:${BUSINESS.phone.replace(/\s/g,"")}`} className="hover:underline">{BUSINESS.phone}</a></li>
              <li className="flex gap-3"><MapPin size={18} className="mt-0.5 text-[color:var(--color-brand-yellow)]" /><span>{BUSINESS.location}</span></li>
            </ul>
            <div className="mt-6 flex gap-2">
              <a href={BUSINESS.linkedin} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-md border border-white/15 hover:bg-[color:var(--color-brand-yellow)] hover:text-black transition"><Linkedin size={18} /></a>
              <a href={BUSINESS.instagram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-md border border-white/15 hover:bg-[color:var(--color-brand-yellow)] hover:text-black transition"><Instagram size={18} /></a>
            </div>
            <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="btn-whatsapp mt-6 w-full">Chat on WhatsApp</a>
            <p className="mt-4 text-xs text-white/50">{BUSINESS.hours}</p>
          </aside>
        </Reveal>
      </section>
    </>
  );
}
