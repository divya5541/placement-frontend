import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { PROGRAMS, WHY_CHOOSE, JOURNEY, PLANS, FAQS, BUSINESS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionTag } from "@/components/SectionTag";
import { SuccessStories } from "@/components/SuccessStories";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CTABanner } from "@/components/CTABanner";
import { Counter } from "@/components/Counter";
import { CourseCountdown } from "@/components/CountDownC";
import heroImage from "@/assets/hero.png";
import shirtImage from "@/assets/shirt.png";
import { CompanyLogoSlider } from "@/components/CompanyLogoSlider";

import {
  FileText,
  BadgeCheck,
  Linkedin,
  Mic,
} from "lucide-react";


export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <CourseCountdown />
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FFF8E1] via-white to-white" />
        <div className="absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-[color:var(--color-brand-yellow)]/40 blur-3xl" />
        <div className="container-x pt-16 pb-20 md:pt-24 md:pb-28 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <SectionTag>📍 Based in Mumbai | Serving Students Across India</SectionTag>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Become <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-1 h-3 md:h-4 bg-[color:var(--color-brand-yellow)]/70 -z-10" />
                Placement-Ready
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 text-lg text-black/70 max-w-lg"
            >
              Crack placements with structured mentorship, ATS-optimized resume building, mock interviews, and industry guidance—designed to help engineering students become interview-ready with confidence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Link to="/contact" className="btn-primary">Register Free <ArrowRight size={18} /></Link>
              <Link to="/programs" className="btn-secondary">View Programs</Link>
            </motion.div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black/60">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[color:var(--color-brand-yellow)]" /> 1:1 mentors</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[color:var(--color-brand-yellow)]" /> Real interview prep</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[color:var(--color-brand-yellow)]" /> ATS Resume Review</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[color:var(--color-brand-yellow)]" /> WhatsApp Support</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[color:var(--color-brand-yellow)]" /> Mock Interviews</span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1">
              <img
                src={heroImage}
                alt="Placement Spark students celebrating job offers"
                width={1408}
                height={1104}
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-4 left-4 right-4 flex items-center gap-4 rounded-2xl bg-white/95 dark:bg-black/80 backdrop-blur p-4 shadow-xl"
              >
                <Sparkles className="text-[color:var(--color-brand-yellow)] shrink-0" size={22} />
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <div className="text-xl font-bold"><Counter to={500} suffix="+" /></div>
                    <div className="text-[10px] text-black/60 dark:text-white/60 uppercase tracking-wider">Students</div>
                  </div>
                  <div className="h-8 w-px bg-black/20 dark:bg-white/20" />
                  <div>
                    <div className="text-xl font-bold"><Counter to={9} /></div>
                    <div className="text-[10px] text-black/60 dark:text-white/60 uppercase tracking-wider">Programs</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="container-x mt-16 md:mt-24 grid gap-10 md:grid-cols-2 md:items-center">
        <Reveal>
          <SectionTag>About</SectionTag>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Your degree gets you shortlisted. Your preparation gets you selected</h2>
          <p className="mt-4 text-black/70 leading-relaxed">
            {BUSINESS.name} was built from a simple observation: brilliant students often don't get the placements they deserve because the prep system around them is broken. We fix that with mentorship, structure, and honest feedback — not hype.
          </p>
          <Link to="/about" className="btn-ghost mt-6">Read our story</Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-[color:var(--color-brand-grey-light)] p-8 grid grid-cols-2 gap-4">
            {[
              { k: "1:1", v: "Mentor sessions" },
              { k: "6+", v: "Week programs" },
              { k: "9", v: "Core services" },
              { k: "24h", v: "Response time" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-white p-5">
                <div className="text-3xl font-bold">{s.k}</div>
                <div className="text-xs text-black/60 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* WHY CHOOSE */}
      <section className="container-x mt-24">
        <Reveal className="max-w-2xl">
          <SectionTag>Why Placement Spark</SectionTag>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Everything you need to land the offer.</h2>
          <p className="mt-4 text-black/70 leading-relaxed">
           Talent deserves opportunity. We help students bridge the gap between campus learning and industry expectations.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className="card-lift h-full rounded-2xl border border-black/5 bg-white p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--color-brand-yellow-light)] text-[color:var(--color-brand-black)]">
                  <w.icon size={22} />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{w.title}</h3>
                <p className="mt-1.5 text-sm text-black/60 leading-relaxed">{w.desc}</p>
              </div>
              
            </Reveal>
          ))}
        </div>
      </section>

      {/* JOURNEY */}
      <section className="container-x mt-24">
        <Reveal className="max-w-2xl">
          <SectionTag>Student Journey</SectionTag>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">From confusion to offer, step by step.</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEY.map((j, i) => (
            <Reveal key={j.step} delay={i * 0.05}>
              <div className="card-lift relative h-full rounded-2xl bg-[color:var(--color-brand-grey-light)] p-6">
                <div className="text-4xl font-bold text-[color:var(--color-brand-yellow)]">{j.step}</div>
                <h3 className="mt-2 font-semibold">{j.title}</h3>
                <p className="mt-1 text-sm text-black/60 leading-relaxed">{j.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="container-x mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal className="max-w-2xl">
            <SectionTag>Programs</SectionTag>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">One Platform. Every Step of Your Placement Journey.</h2>
            <p className="mt-4 text-black/70 leading-relaxed">Master every stage of your placement journey with expert mentorship, practical guidance, and industry-focused preparation.</p>
          </Reveal>
          <Link to="/programs" className="btn-ghost">View all programs <ArrowRight size={18} /></Link>
        </div>
        <div className="mt-8 -mx-5 md:mx-0">
          <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-5 md:px-0 pb-2">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04} className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-auto">
                <div className="card-lift h-full rounded-2xl border border-black/5 bg-white p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--color-brand-black)] text-[color:var(--color-brand-yellow)]">
                    <p.icon size={22} />
                  </div>
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-black/60">{p.benefit}</p>
                  <Link to="/programs" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-black hover:gap-2 transition-all">
                    Explore <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="container-x mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal className="max-w-2xl">
            <SectionTag>Pricing</SectionTag>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Choose Your Path to Placement Success.</h2>
            <p className="mt-4 text-black/70 leading-relaxed">Whether you learn solo, with a buddy, or as a squad — there's a plan for your journey.</p>
          </Reveal>
          <Link to="/pricing" className="btn-ghost">View all plans <ArrowRight size={18} /></Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div className={"card-lift h-full rounded-2xl p-6 " + (p.highlight ? "bg-[color:var(--color-brand-black)] text-white" : "border border-black/5 bg-white")}>
                {p.highlight && <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-yellow)]">{p.highlight}</div>}
                <div className="mt-2 text-sm font-semibold opacity-70">{p.name}</div>
                <div className="mt-1 text-3xl font-bold">{p.price}<span className="text-sm font-normal opacity-60">{p.cadence}</span></div>
                <p className="mt-2 text-sm opacity-70">{p.tagline}</p>
                <Link to="/pricing" className={"mt-5 block text-center rounded-md px-4 py-2 text-sm font-semibold " + (p.highlight ? "bg-[color:var(--color-brand-yellow)] text-black" : "bg-black text-white")}>{p.cta}</Link>
              </div>
              
            </Reveal>
            
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black/60">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[color:var(--color-brand-yellow)]" /> ✔ No Hidden Fees</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[color:var(--color-brand-yellow)]" /> ✔ Flexible Learning</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[color:var(--color-brand-yellow)]" /> ✔ Lifetime Resource Access</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[color:var(--color-brand-yellow)]" /> ✔ Quality mentorship</span>
            </div>

      </section>

      {/* MERCH / BRAND SHOWCASE */}
      <section className="container-x mt-24">
        <Reveal className="max-w-2xl">
          <SectionTag>Wear the spark</SectionTag>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Learn. Build. Innovate.</h2>
          <p className="mt-3 text-black/70 leading-relaxed">
            Join a thriving community of Chemical Engineering students and mentors. Access expert guidance, study resources, practical learning, and collaborative discussions—all in one place.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="group relative rounded-3xl overflow-hidden bg-[color:var(--color-brand-yellow-light)] ring-1 ring-black/5 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.35)]">
              <img
                src={shirtImage}
                alt="Placement Spark signature t-shirt"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-1"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5">
              <h3 className="text-2xl md:text-3xl font-bold">Empowering Future Chemical Engineers</h3>
              <p className="text-black/70 leading-relaxed">
                Master core concepts, connect with experienced mentors, solve real-world engineering problems, and prepare for academic and career success.
              </p>
              <ul className="space-y-2 text-sm text-black/75">
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[color:var(--color-brand-yellow)]" /> Expert Mentorship🧪 </li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[color:var(--color-brand-yellow)]" /> Quality Study Material📚 </li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[color:var(--color-brand-yellow)]" />Industry Insights</li>
              </ul>
              <Link to="/contact" className="btn-primary">Become Placement Ready<ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <SuccessStories />

      <CompanyLogoSlider />

      {/* FAQ SNIPPET */}
      <section className="container-x mt-24">
        <Reveal className="max-w-2xl">
          <SectionTag>FAQ</SectionTag>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Answers to what students ask most.</h2>
        </Reveal>
        <div className="mt-8 max-w-3xl">
          <FaqAccordion items={FAQS[0].items.slice(0, 3)} />
          <Link to="/faq" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all">
            See all questions <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
