import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PROGRAMS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionTag } from "@/components/SectionTag";
import { CTABanner } from "@/components/CTABanner";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Placement Spark" },
      { name: "description", content: "Nine focused programs: resume, ATS, LinkedIn, mock interviews, GDs, technical prep, HR prep, career guidance, and placement strategy." },
      { property: "og:title", content: "Programs — Placement Spark" },
      { property: "og:description", content: "Every service we offer to make you placement-ready." },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <>
      <section className="container-x pt-14 md:pt-20">
        <Reveal className="max-w-3xl">
          <SectionTag>Your Placement Success Toolkit</SectionTag>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">One Platform. Every Step of Your Placement Journey.</h1>
          <p className="mt-4 text-black/70 leading-relaxed">Master every stage of your placement journey with expert mentorship, practical guidance, and industry-focused preparation.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <article className="card-lift h-full rounded-2xl border border-black/5 bg-white p-6 flex flex-col">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--color-brand-black)] text-[color:var(--color-brand-yellow)]"><p.icon size={22} /></div>
                <h2 className="mt-4 text-lg font-semibold">{p.title}</h2>
                <div className="mt-1 inline-block text-xs font-semibold text-[color:var(--color-brand-black)] bg-[color:var(--color-brand-yellow-light)] px-2 py-0.5 rounded-full w-fit">{p.benefit}</div>
                <p className="mt-3 text-sm text-black/60 leading-relaxed flex-1">{p.description}</p>
                <Link to="/contact" className="btn-primary mt-5 text-sm">Enroll Now <ArrowRight size={16} /></Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
