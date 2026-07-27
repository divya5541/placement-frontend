import { useEffect, useState } from "react";
import { CalendarClock, ArrowRight, Flame } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Next cohort start date — update as needed
const TARGET = new Date("2026-08-08T09:00:00+05:30").getTime();

function diff(target: number) {
  const now = Date.now();
  const d = Math.max(0, target - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
    done: d === 0,
  };
}

export function CourseCountdown() {
  const [t, setT] = useState(() => diff(TARGET));
  useEffect(() => {
    const id = setInterval(() => setT(diff(TARGET)), 1000);
    return () => clearInterval(id);
  }, []);

  const cells: Array<[string, number]> = [
    ["D", t.days],
    ["H", t.hours],
    ["M", t.minutes],
    ["S", t.seconds],
  ];

  return (
    <section className="relative border-b border-black/5 dark:border-white/10 bg-[color:var(--color-brand-yellow-light)] dark:bg-[color:var(--color-brand-black)] overflow-hidden transition-colors duration-300">
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-[color:var(--color-brand-yellow)]/30 dark:bg-[color:var(--color-brand-yellow)]/15 blur-3xl pointer-events-none" />
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-[color:var(--color-brand-yellow)]/20 dark:bg-[color:var(--color-brand-yellow)]/10 blur-3xl pointer-events-none" />
      <div className="container-x relative py-2 md:py-2.5 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center h-8 w-8 rounded-lg bg-[color:var(--color-brand-yellow)] text-black shrink-0 shadow-sm">
            <Flame size={16} />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-brand-black)]/70 dark:text-[color:var(--color-brand-yellow)]/80 font-semibold">
              <CalendarClock size={11} /> Next Course
            </div>
            <div className="text-xs md:text-sm font-semibold leading-tight text-[color:var(--color-brand-black)] dark:text-white">
              Placement Accelerator starts <span className="text-[color:var(--color-brand-yellow)]">Aug 08, 2026</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-1 md:gap-1.5">
            {cells.map(([label, val]) => (
              <div
                key={label}
                className="min-w-[34px] md:min-w-[40px] rounded-lg bg-white/70 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 px-1 py-1 text-center backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white dark:hover:bg-white/10"
              >
                <div className="font-display text-sm md:text-base font-bold leading-none tabular-nums text-[color:var(--color-brand-black)] dark:text-white">
                  {String(val).padStart(2, "0")}
                </div>
                <div className="mt-0.5 text-[8px] md:text-[9px] uppercase tracking-wider text-black/50 dark:text-white/50">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-1 rounded-md bg-[color:var(--color-brand-yellow)] text-black px-2.5 py-1.5 text-xs font-semibold hover:brightness-95 transition whitespace-nowrap shadow-sm"
          >
            Join next <span className="hidden sm:inline">batch</span> <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
