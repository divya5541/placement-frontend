import { createFileRoute, Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { VALUES, BUSINESS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionTag } from "@/components/SectionTag";
import { CTABanner } from "@/components/CTABanner";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Placement Spark" },
      { name: "description", content: "Our story, mission, values, and the team behind Placement Spark." },
      { property: "og:title", content: "About — Placement Spark" },
      { property: "og:description", content: "The mentors and mission behind Placement Spark." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const TEAM = [
  { name: "Placeholder Mentor 1", role: "Founder & Lead Mentor", initial: "P" },
  { name: "Placeholder Mentor 2", role: "Interview Coach", initial: "M" },
  { name: "Placeholder Mentor 3", role: "Career Strategist", initial: "S" },
];

const MILESTONES = [
  { year: "2023", text: "Idea born from mentoring juniors informally." },
  { year: "2024", text: "First cohort — resumes, mocks, and offers." },
  { year: "2025", text: "Nine core programs, students across India." },
  { year: "2026", text: "Building the most trusted student career ecosystem." },
];

function AboutPage() {
  return (
    <>
      <section className="container-x pt-14 md:pt-20 grid gap-10 md:grid-cols-2 md:items-center">
        <Reveal>
          <SectionTag>About us</SectionTag>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">Built for students who deserve better prep.</h1>
          <p className="mt-5 text-black/70 leading-relaxed">
            {BUSINESS.name} started with a simple observation: placement prep in India is either too expensive, too generic, or too disconnected from what recruiters actually want. We built the alternative — structured, honest mentorship you can afford.
          </p>
          <p className="mt-3 text-black/70 leading-relaxed">
            A note from the founder: "I remember the confusion of my own placement season. This is the version I wish I'd had."
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-[color:var(--color-brand-yellow-light)] p-8">
            <h3 className="font-semibold mb-4">Milestones</h3>
            <ol className="space-y-4">
              {MILESTONES.map((m) => (
                <li key={m.year} className="flex gap-4">
                  <span className="font-bold text-[color:var(--color-brand-black)] w-14 shrink-0">{m.year}</span>
                  <span className="text-sm text-black/70">{m.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <section className="container-x mt-20 grid gap-8 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl bg-[color:var(--color-brand-black)] text-white p-8">
            <SectionTag>Vision</SectionTag>
            <p className="mt-4 text-lg leading-relaxed">To become India's most trusted placement preparation ecosystem for students.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl bg-[color:var(--color-brand-grey-light)] p-8">
            <SectionTag>Mission</SectionTag>
            <p className="mt-4 text-lg leading-relaxed text-black/80">To empower students with the guidance, skills, mentorship, and opportunities needed to build careers they're proud of — going beyond placement to build career-ready professionals.</p>
          </div>
        </Reveal>
      </section>

      <section className="container-x mt-24">
        <Reveal className="max-w-2xl">
          <SectionTag>Core values</SectionTag>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">What we stand for.</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="card-lift h-full rounded-2xl border border-black/5 bg-white p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--color-brand-yellow-light)]"><v.icon size={22} /></div>
                <h3 className="mt-4 font-semibold text-lg">{v.title}</h3>
                <p className="mt-1.5 text-sm text-black/60 leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* <section className="container-x mt-24">
        <Reveal className="max-w-2xl">
          <SectionTag>The team</SectionTag>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Mentors who've been where you are.</h2>
          <p className="mt-2 text-xs text-black/40 uppercase tracking-wider">* Placeholder team profiles.</p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div className="card-lift text-center rounded-2xl bg-white border border-black/5 p-6">
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[color:var(--color-brand-yellow)] to-[color:var(--color-brand-yellow-medium)] text-3xl font-bold">{t.initial}</div>
                <h3 className="mt-4 font-semibold">{t.name}</h3>
                <p className="text-sm text-black/60">{t.role}</p>
                <a href={BUSINESS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="mt-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:bg-black hover:text-white transition"><Linkedin size={16} /></a>
              </div>
            </Reveal>
          ))}
        </div>
      </section> */}

      <CTABanner />
    </>
  );
}
