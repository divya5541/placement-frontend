import { User, Users, Rocket, Check } from "lucide-react";
import { Reveal } from "./Reveal";

const plans = [
  {
    title: "Solo",
    icon: User,
    color: "border border-black/5 bg-white",
    iconColor: "text-blue-600",
    points: [
      "You prefer learning independently",
      "Flexible schedule",
      "Personal accountability",
    ],
  },
  {
    title: "Buddy",
    icon: Users,
    badge: "⭐ Most Popular",
    color: "border border-black/5 bg-white",
    iconColor: "text-yellow-600",
    points: [
      "You have one serious friend",
      "Want accountability",
      "Like learning together",
    ],
  },
  {
    title: "Squad",
    icon: Rocket,
    color: "border border-black/5 bg-white",
    iconColor: "text-green-600",
    points: [
      "College group",
      "Friends preparing together",
      "Maximum savings",
    ],
  },
];

export function WhichPlanSection() {
  return (
    <section className="mt-16">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[color:var(--color-brand-black)]">
            Which Plan Fits You?
          </h2>

          <p className="mt-2 text-muted-foreground">
            Find the perfect learning style in seconds.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => {
          const Icon = plan.icon;

          return (
            <Reveal key={plan.title} delay={index * 0.08}>
              <div
                className={`relative h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.25)] ${plan.color}`}
              >
                {plan.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-black">
                    {plan.badge}
                  </span>
                )}

                <div className="w-12 h-12 rounded-xl bg-[color:var(--color-brand-yellow-light)] flex items-center justify-center">
                  <Icon className="h-6 w-6 text-[color:var(--color-brand-black)]" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[color:var(--color-brand-black)]">
                  {plan.title}
                </h3>

                <p className="mt-2 text-sm font-semibold">
                  Perfect if...
                </p>

                <ul className="mt-4 space-y-3">
                  {plan.points.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-black/70 leading-relaxed"
                    >
                      <Check
  size={16}
  className="mt-0.5 shrink-0 text-[color:var(--color-brand-yellow)]"
/>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <>
        <div className="mt-10 rounded-2xl bg-[color:var(--color-brand-black)] px-8 py-8 text-center">
          <h3 className="text-2xl font-bold text-white">
            💬 Still unsure?
          </h3>

          <p className="mt-3 text-white/70 leading-relaxed">
            Talk to our mentor and we'll help you choose the best plan.
          </p>

          <a
            href="/contact"
            className="mt-5 inline-flex rounded-lg bg-[color:var(--color-brand-yellow)] px-6 py-3 font-semibold text-black transition hover:bg-[#FFB300]"
          >
            📞 Talk to a Mentor
          </a>
        </div>
      </>
    </section>
  );
}