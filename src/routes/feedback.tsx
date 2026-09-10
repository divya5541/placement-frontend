import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Sparkles,
  Star,
  X,
  ZoomIn,
} from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/Reveal";
import { SectionTag } from "@/components/SectionTag";
import { CTABanner } from "@/components/CTABanner";

import feedback1 from "@/assets/Feedback/fb1.jpeg";
import feedback2 from "@/assets/Feedback/fb2.jpeg";
import feedback3 from "@/assets/Feedback/fb3.jpeg";
import feedback4 from "@/assets/Feedback/fb4.jpeg";
import feedback5 from "@/assets/Feedback/fb5.jpeg";
import feedback6 from "@/assets/Feedback/fb6.jpeg";
import feedback7 from "@/assets/Feedback/fb7.jpeg";
import feedback8 from "@/assets/Feedback/fb8.jpeg";
import feedback9 from "@/assets/Feedback/fb9.jpeg";
import feedback10 from "@/assets/Feedback/fb10.jpeg";
import feedback11 from "@/assets/Feedback/fb11.jpeg";
import feedback12 from "@/assets/Feedback/fb12.jpeg";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      {
        title: "Student Feedback — Placement Spark",
      },
      {
        name: "description",
        content:
          "See real student feedback and experiences shared with Placement Spark.",
      },
      {
        property: "og:title",
        content: "Student Feedback — Placement Spark",
      },
      {
        property: "og:description",
        content:
          "Real feedback and experiences shared by Placement Spark students.",
      },
      {
        property: "og:url",
        content: "/feedback",
      },
    ],
    links: [{ rel: "canonical", href: "/feedback" }],
  }),
  component: FeedbackPage,
});

/* =========================================================
   FEEDBACK IMAGES
========================================================= */

const FEEDBACK_IMAGES = [
  { id: 1, image: feedback1 },
  { id: 2, image: feedback2 },
  { id: 3, image: feedback3 },
  { id: 4, image: feedback4 },
  { id: 5, image: feedback5 },
  { id: 6, image: feedback6 },
  { id: 7, image: feedback7 },
  { id: 8, image: feedback8 },
  { id: 9, image: feedback9 },
  { id: 10, image: feedback10 },
  { id: 11, image: feedback11 },
  { id: 12, image: feedback12 },
];

/* =========================================================
   PAGE
========================================================= */

function FeedbackPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closePreview = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0
        ? FEEDBACK_IMAGES.length - 1
        : selectedIndex - 1,
    );
  };

  const showNext = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === FEEDBACK_IMAGES.length - 1
        ? 0
        : selectedIndex + 1,
    );
  };

  return (
    <>
      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="container-x pt-12 md:pt-20">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold shadow-sm">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[color:var(--color-brand-yellow)]">
              <MessageCircle size={14} />
            </span>

            Student Stories
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Real Students.
            <br />

            <span className="relative inline-block">
              Real Experiences.
              <span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-[color:var(--color-brand-yellow)] opacity-70" />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-black/60 md:text-base">
            Every message tells a story. Explore genuine feedback shared by
            students who experienced Placement Spark during their placement
            journey.
          </p>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand-yellow-light)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-brand-black)]">
            <Heart size={16} fill="currentColor" />
            Your feedback inspires us.
          </div>
        </Reveal>

        {/* =====================================================
            MINI STATS
        ====================================================== */}

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
            <div className="border-r border-black/5 px-3 py-5 text-center md:px-6">
              <div className="text-2xl font-bold md:text-3xl">12+</div>
              <p className="mt-1 text-[11px] font-medium text-black/50 md:text-xs">
                Student Messages
              </p>
            </div>

            <div className="border-r border-black/5 px-3 py-5 text-center md:px-6">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold md:text-3xl">
                <Star
                  size={20}
                  fill="currentColor"
                  className="text-[color:var(--color-brand-yellow)]"
                />
                5.0
              </div>

              <p className="mt-1 text-[11px] font-medium text-black/50 md:text-xs">
                Student Love
              </p>
            </div>

            <div className="px-3 py-5 text-center md:px-6">
              <div className="text-2xl font-bold md:text-3xl">100%</div>
              <p className="mt-1 text-[11px] font-medium text-black/50 md:text-xs">
                Real Feedback
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =========================================================
          FEATURED FEEDBACK
      ========================================================== */}

      <section className="container-x mt-16 md:mt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
            {/* Yellow decorative corner */}

            <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-[color:var(--color-brand-yellow-light)] opacity-70" />

            <div className="relative grid items-center gap-10 p-6 md:grid-cols-[280px_1fr] md:p-10 lg:grid-cols-[300px_1fr]">
              {/* SMALL FEATURED IMAGE */}

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(0)}
                  className="group relative overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02] p-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative flex h-[340px] w-[230px] items-center justify-center overflow-hidden rounded-xl bg-white md:h-[360px] md:w-[240px]">
                    <img
                      src={FEEDBACK_IMAGES[0].image}
                      alt="Featured student WhatsApp feedback"
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                    />

                    {/* Zoom badge */}

                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-1.5 text-[10px] font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <ZoomIn size={12} />
                      View
                    </div>
                  </div>
                </button>
              </div>

              {/* FEATURED TEXT */}

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand-yellow-light)] px-3 py-1.5 text-xs font-bold">
                  <Sparkles size={14} />
                  Featured Feedback
                </div>

                <h2 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">
                  What our students
                  <br />

                  <span className="text-black/45">
                    have to say.
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-black/60 md:text-base">
                  From resume preparation and interview guidance to placement
                  support, our students share their experiences directly with
                  us.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-xs font-semibold">
                    Real Students
                  </span>

                  <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-xs font-semibold">
                    Real Messages
                  </span>

                  <span className="rounded-full bg-[color:var(--color-brand-yellow-light)] px-3 py-1.5 text-xs font-semibold">
                    WhatsApp Feedback
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedIndex(0)}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[color:var(--color-brand-black)] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <MessageCircle size={16} />
                  View Full Feedback
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =========================================================
          GALLERY HEADING
      ========================================================== */}

      <section className="container-x mt-20 md:mt-28">
        <Reveal className="text-center">
          <SectionTag>From Our Students</SectionTag>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Messages that make us smile.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-black/55">
            A collection of genuine feedback shared by students through
            WhatsApp.
          </p>
        </Reveal>

        {/* =====================================================
            SMALL PROFESSIONAL CARDS
        ====================================================== */}

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {FEEDBACK_IMAGES.map((feedback, index) => (
            <Reveal
              key={feedback.id}
              delay={index * 0.04}
              className="h-full"
            >
              <article className="group h-full rounded-2xl border border-black/5 bg-white p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black/10 hover:shadow-xl">
                {/* Card header */}

                <div className="flex items-center justify-between px-2 py-2">
                  <div className="flex items-center gap-2">
                    <div className="grid h-7 w-7 place-items-center rounded-full bg-[color:var(--color-brand-black)] text-[color:var(--color-brand-yellow)]">
                      <MessageCircle size={13} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold leading-none">
                        Student
                      </p>

                      <p className="mt-0.5 text-[9px] text-black/40">
                        Feedback
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-black/[0.04] px-2 py-1 text-[9px] font-bold text-black/45">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* SMALL IMAGE CONTAINER */}

                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="relative mx-auto block w-full overflow-hidden rounded-xl border border-black/5 bg-[#f8f8f8] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-yellow)]"
                >
                  <div className="flex h-[270px] items-center justify-center p-3 sm:h-[300px] md:h-[320px]">
                    <img
                      src={feedback.image}
                      alt={`Student feedback ${index + 1}`}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                  </div>

                  {/* Hover overlay */}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black shadow-lg">
                      <ZoomIn size={14} />
                      View Full
                    </span>
                  </div>
                </button>

                {/* Card footer */}

                <div className="flex items-center justify-between px-2 pb-1 pt-3">
                  <div className="flex items-center gap-1 text-[10px] font-medium text-black/40">
                    <Heart
                      size={12}
                      className="text-[color:var(--color-brand-yellow)]"
                      fill="currentColor"
                    />
                    Student Experience
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className="text-[10px] font-bold text-black transition-colors hover:text-black/50"
                  >
                    Open →
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* =========================================================
          TRUST SECTION
      ========================================================== */}

      <section className="container-x mt-20 md:mt-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[color:var(--color-brand-black)] px-6 py-12 text-center text-white md:px-12 md:py-16">
            {/* Decorative circles */}

            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 -left-16 h-48 w-48 rounded-full border border-white/10" />

            <div className="relative">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[color:var(--color-brand-yellow)] text-[color:var(--color-brand-black)] shadow-lg">
                <Heart size={24} fill="currentColor" />
              </div>

              <h2 className="mt-6 text-2xl font-bold md:text-3xl">
                Every message matters.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">
                Your feedback helps us understand what students need and
                motivates us to continuously improve the Placement Spark
                experience.
              </p>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80">
                <Star
                  size={14}
                  fill="currentColor"
                  className="text-[color:var(--color-brand-yellow)]"
                />
                Thank you for trusting Placement Spark
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}

      <CTABanner />

      {/* =========================================================
          FULLSCREEN IMAGE PREVIEW
      ========================================================== */}

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
          aria-label="Student feedback preview"
        >
          {/* Close */}

          <button
            type="button"
            onClick={closePreview}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow-xl transition hover:scale-105 md:right-7 md:top-7"
            aria-label="Close preview"
          >
            <X size={21} />
          </button>

          {/* Previous */}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrevious();
            }}
            className="absolute left-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow-xl transition hover:scale-105 md:left-7 md:h-12 md:w-12"
            aria-label="Previous feedback"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Main image */}

          <div
            className="relative flex max-h-[88vh] max-w-[82vw] items-center justify-center rounded-2xl bg-white/5 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={FEEDBACK_IMAGES[selectedIndex].image}
              alt={`Student feedback ${selectedIndex + 1}`}
              className="max-h-[84vh] max-w-[78vw] rounded-xl object-contain shadow-2xl"
            />
          </div>

          {/* Next */}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow-xl transition hover:scale-105 md:right-7 md:h-12 md:w-12"
            aria-label="Next feedback"
          >
            <ChevronRight size={22} />
          </button>

          {/* Counter */}

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black shadow-lg">
            {selectedIndex + 1} / {FEEDBACK_IMAGES.length}
          </div>
        </div>
      )}
    </>
  );
}

