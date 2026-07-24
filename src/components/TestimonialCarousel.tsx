import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/content";

export function TestimonialCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);
  const prev = () => setI((n) => (n - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setI((n) => (n + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[i];
  return (
    <div className="relative rounded-3xl bg-[color:var(--color-brand-yellow-light)] p-8 md:p-12 overflow-hidden">
      <Quote className="absolute top-6 right-6 text-[color:var(--color-brand-yellow)] opacity-40" size={64} />
      <div className="relative min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="text-lg md:text-xl leading-relaxed text-black/85 max-w-3xl"
          >
            "{t.quote}"
            <footer className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--color-brand-black)] text-[color:var(--color-brand-yellow)] font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-black/60">{t.college}</div>
              </div>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-1.5">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={"h-2 rounded-full transition-all " + (idx === i ? "w-8 bg-black" : "w-2 bg-black/25")}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full bg-white hover:bg-black hover:text-white transition"><ChevronLeft size={18} /></button>
          <button onClick={next} aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full bg-white hover:bg-black hover:text-white transition"><ChevronRight size={18} /></button>
        </div>
      </div>
      <p className="mt-3 text-[10px] text-black/40 uppercase tracking-wider">* Placeholder student stories.</p>
    </div>
  );
}
