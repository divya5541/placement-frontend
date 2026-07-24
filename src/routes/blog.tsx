import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionTag } from "@/components/SectionTag";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Placement Spark" },
      { name: "description", content: "Honest career articles, coming soon." },
      { property: "og:title", content: "Blog — Placement Spark" },
      { property: "og:description", content: "Career articles, launching soon." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <section className="container-x pt-20 md:pt-28 pb-24">
      <Reveal className="max-w-2xl">
        <SectionTag>Blog</SectionTag>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">Coming soon.</h1>
        <p className="mt-4 text-black/70 leading-relaxed">Honest, practical articles on placements, careers, and student life. No listicles. No hype.</p>
        <div className="mt-8 rounded-3xl bg-[color:var(--color-brand-yellow-light)] p-8 flex items-start gap-4">
          <Sparkles className="shrink-0 text-[color:var(--color-brand-black)]" />
          <div>
            <h2 className="font-semibold">Want early access?</h2>
            <p className="text-sm text-black/70 mt-1">Register for the free trial — we'll send new articles to you first.</p>
            <Link to="/contact" className="btn-primary mt-4 text-sm">Register Free</Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
