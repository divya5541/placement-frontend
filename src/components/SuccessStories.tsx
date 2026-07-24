import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionTag } from "@/components/SectionTag";
import std1 from "../assets/Vishal.png";
import std2 from "../assets/Shashank.png";
import std3 from "../assets/mansi.png";
import std4 from "../assets/gite.png";
import std5 from "../assets/Nirbhay Photo.png";
import std6 from "../assets/Mayuri.png";


type Story = {
  name: string;
  company: string;
  role: string;
  quote: string;
  image: string;
};

const STORIES: Story[] = [
 {
    name: "Vishal Wagh",
    company: "Adani",
    role: "Graduate Engineer Trainee",
    image: std1,
    quote:
      "PlacementSpark mentors guided me throughout my interview preparation and helped me gain confidence to crack the interview.",
  },
  {
    name: "Shashank Oja",
    company: "Thermax",
    role: "Graduate Engineer Trainee",
    image: std2,
    quote:
      "The mock interviews and one-to-one mentorship helped me understand the interview process and prepare effectively.",
  },
  {
    name: "Manasi Joshi",
    company: "Worley",
    role: "Graduate Engineer Trainee",
    image: std3,
    quote:
      "PlacementSpark gave me the right direction, confidence and interview guidance that helped me secure my placement.",
  },
  {
    name: "Prathmesh Gite",
    company: "Keva Frengrances",
    role: "Graduate Engineer Trainee",
    image: std4,
    quote:
      "The structured roadmap and regular mentor feedback improved my confidence throughout the placement journey.",
  },
  {
    name: "Nirbhay Kore",
    company: "Finepac Structures Pvt.Ltd",
    role: "Graduate Engineer Trainee",
    image: std5,
    quote:
      "PlacementSpark helped me prepare with confidence through interview practice and continuous mentor support.",
  },
  {
    name: "Mayuri Raut",
    company: "Thermax",
    role: "Graduate Engineer Trainee",
    image: std6,
    quote:
      "The interview preparation sessions and resume guidance played an important role in my placement journey.",
  },
];

function StoryCard({ story }: { story: Story }) {
  return (
    <div className="group relative w-[300px] sm:w-[320px] md:w-[340px] shrink-0 select-none">
      <div className="card-lift h-full rounded-3xl border border-black/5 bg-white p-6 md:p-7 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)] transition-all">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="h-20 w-20 overflow-hidden rounded-full ring-4 ring-[color:var(--color-brand-yellow)]/40">
              <img
                src={story.image}
                alt={story.name}
                className="h-full w-full object-cover object-top"
              />
            </div>

            <div className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-[color:var(--color-brand-yellow)] text-[color:var(--color-brand-black)] ring-2 ring-white">
              <CheckCircle2 size={16} />
            </div>
          </div>

          <h3 className="mt-4 font-semibold text-lg">{story.name}</h3>

          <div className="mt-0.5 text-xs uppercase tracking-wider text-black/50">
            {story.role} ·{" "}
            <span className="font-semibold text-[color:var(--color-brand-black)]">
              {story.company}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-black/70 min-h-[72px]">
            "{story.quote}"
          </p>

          <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-brand-yellow-light)] px-3 py-1.5 text-xs font-semibold text-[color:var(--color-brand-black)]">
            <span>✅</span> Placed at{" "}
            <span className="text-[color:var(--color-brand-yellow)] font-bold [-webkit-text-stroke:0.4px_var(--color-brand-black)]">
              {story.company}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SuccessStories() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const dragRef = useRef<{ dragging: boolean; startX: number; startOffset: number }>(
    { dragging: false, startX: 0, startOffset: 0 },
  );

  const loop = useMemo(() => [...STORIES, ...STORIES], []);

  // Activate when in viewport
  useEffect(() => {
    const el = trackRef.current?.parentElement;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Measure half-track width (one copy) for seamless wrap
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!active) return;
    let last = performance.now();
    const speed = 40; // px/sec
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused && !dragRef.current.dragging) {
        offsetRef.current += speed * dt;
      }
      const half = halfWidthRef.current;
      if (half > 0) {
        if (offsetRef.current >= half) offsetRef.current -= half;
        if (offsetRef.current < 0) offsetRef.current += half;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, paused]);

  // Pointer drag / swipe
  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startOffset: offsetRef.current,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    offsetRef.current = dragRef.current.startOffset - dx;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current.dragging = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="container-x mt-24"
    >
      <Reveal className="max-w-2xl">
        <SectionTag>Success Stories</SectionTag>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold">
          Success Stories <span aria-hidden>🚀</span>
        </h2>
        <p className="mt-3 text-black/70 leading-relaxed">
          Real students. Real transformations. Real job offers. Join our growing community of successful placements.
        </p>
      </Reveal>

      <div
        className="mt-10 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-5 md:gap-6 will-change-transform cursor-grab active:cursor-grabbing touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {loop.map((s, i) => (
            <StoryCard key={`${s.name}-${i}`} story={s} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}