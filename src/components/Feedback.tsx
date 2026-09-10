import React, { useEffect, useState } from "react";
import { X, Maximize2, MessageSquareQuote, Sparkles } from "lucide-react";

// Add your student feedback screenshots here.
// Put the images inside: src/assets/feedback/
const FEEDBACKS = [
  {
    id: 1,
    image: "/feedback/fb1.jpeg",
    name: "Student Feedback",
    category: "Resume Review",
    description: "Feedback from a student after resume and career guidance.",
  },
  {
    id: 2,
    image: "/feedback/fb2.jpeg",
    name: "Student Feedback",
    category: "Career Guidance",
    description: "A student's experience with our career guidance session.",
  },
  {
    id: 3,
    image: "/feedback/fb3.jpeg",
    name: "Student Feedback",
    category: "Mock Interview",
    description: "Feedback received after interview preparation.",
  },
  {
    id: 4,
    image: "/feedback/fb4.jpeg",
    name: "Student Feedback",
    category: "Placement Preparation",
    description: "Student feedback about the overall placement preparation.",
  },
  {
    id: 5,
    image: "/feedback/fb5.jpeg",
    name: "Student Feedback",
    category: "Resume & ATS",
    description: "Feedback about resume optimization and ATS preparation.",
  },
  {
    id: 6,
    image: "/feedback/fb6.jpeg",
    name: "Student Feedback",
    category: "Career Support",
    description: "Feedback from a student who received personalized support.",
  },

  {
    id: 6,
    image: "/feedback/fb6.jpeg",
    name: "Student Feedback",
    category: "Career Support",
    description: "Feedback from a student who received personalized support.",
  },

  {
    id: 6,
    image: "/feedback/fb6.jpeg",
    name: "Student Feedback",
    category: "Career Support",
    description: "Feedback from a student who received personalized support.",
  },

  {
    id: 6,
    image: "/feedback/fb6.jpeg",
    name: "Student Feedback",
    category: "Career Support",
    description: "Feedback from a student who received personalized support.",
  },

  {
    id: 6,
    image: "/feedback/fb6.jpeg",
    name: "Student Feedback",
    category: "Career Support",
    description: "Feedback from a student who received personalized support.",
  },

  {
    id: 6,
    image: "/feedback/fb6.jpeg",
    name: "Student Feedback",
    category: "Career Support",
    description: "Feedback from a student who received personalized support.",
  },

  {
    id: 6,
    image: "/feedback/fb6.jpeg",
    name: "Student Feedback",
    category: "Career Support",
    description: "Feedback from a student who received personalized support.",
  },

  
];

const Feedback: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  // Close modal using Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[color:var(--color-brand-dark)] text-white">
      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[color:var(--color-brand-yellow)]/10 blur-3xl" />
          <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="container-x relative py-20 md:py-28 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--color-brand-yellow)]/10 border border-[color:var(--color-brand-yellow)]/20">
            <MessageSquareQuote
              className="h-7 w-7 text-[color:var(--color-brand-yellow)]"
              aria-hidden="true"
            />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand-yellow)]">
            Student Feedback
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">
            Real Feedback.
            <span className="block text-[color:var(--color-brand-yellow)]">
              Real Experiences.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            Don't just take our word for it. Explore genuine feedback from
            students who have experienced Placement Spark's career guidance
            and placement preparation.
          </p>
        </div>
      </section>

      {/* =========================================================
          FEEDBACK GALLERY
      ========================================================= */}
      <section className="container-x pb-20 md:pb-28">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-brand-yellow)]">
              Student Voices
            </p>

            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
              What Students Say
            </h2>
          </div>

          <p className="max-w-md text-sm text-white/60 md:text-right">
            Real conversations and feedback shared by students during their
            Placement Spark journey.
          </p>
        </div>

        {FEEDBACKS.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEEDBACKS.map((feedback) => (
              <article
                key={feedback.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-brand-yellow)]/30 hover:bg-white/[0.06]"
              >
                {/* Image */}
                <button
                  type="button"
                  onClick={() => setSelectedImage(feedback.image)}
                  className="relative block w-full cursor-zoom-in overflow-hidden bg-black/20 text-left"
                  aria-label={`View ${feedback.category} feedback`}
                >
                  <img
                    src={feedback.image}
                    alt={`${feedback.category} student feedback`}
                    loading="lazy"
                    className="h-auto max-h-[520px] min-h-[260px] w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/40">
                    <div className="flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-lg transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <Maximize2 className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                </button>

                {/* Card information */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[color:var(--color-brand-yellow)]/10 px-3 py-1 text-xs font-semibold text-[color:var(--color-brand-yellow)]">
                      {feedback.category}
                    </span>

                    <span className="text-xs text-white/40">
                      #{String(feedback.id).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {feedback.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {feedback.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
            <MessageSquareQuote className="mx-auto h-10 w-10 text-white/30" />

            <h3 className="mt-4 text-lg font-semibold">
              Student feedback coming soon
            </h3>

            <p className="mt-2 text-sm text-white/50">
              We're collecting experiences from our students.
            </p>
          </div>
        )}
      </section>

      {/* =========================================================
          TRUST / MESSAGE SECTION
      ========================================================= */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="container-x py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Sparkles
              className="mx-auto h-8 w-8 text-[color:var(--color-brand-yellow)]"
              aria-hidden="true"
            />

            <h2 className="mt-5 font-display text-2xl font-bold md:text-4xl">
              Your Feedback Matters
            </h2>

            <p className="mt-4 text-base leading-7 text-white/65 md:text-lg">
              Every student's journey helps us improve. We believe in
              transparent guidance, practical preparation, and creating real
              value for students.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA SECTION
      ========================================================= */}
      <section className="container-x py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-[color:var(--color-brand-yellow)]/20 bg-[color:var(--color-brand-yellow)]/[0.06] px-6 py-12 text-center md:px-12 md:py-16">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[color:var(--color-brand-yellow)]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand-yellow)]">
              Your Turn
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold md:text-5xl">
              Ready to build your career with confidence?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/65 md:text-base">
              Get personalized guidance for your resume, interviews,
              LinkedIn, skills, and placement strategy.
            </p>

            <a
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-[color:var(--color-brand-yellow)] px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:opacity-90"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          IMAGE MODAL
      ========================================================= */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Student feedback image"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close image"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Image */}
          <div
            className="relative flex max-h-[92vh] max-w-[95vw] items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Student feedback enlarged"
              className="max-h-[92vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Feedback;

