import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const milestones = [
  {
    year: "2023",
    title: "The Beginning",
    description:
      "Mentoring juniors and understanding placement challenges.",
    side: "left",
    icon: "🌱",
  },
  {
    year: "2024",
    title: "Foundation",
    description: "Launched structured placement mentorship.",
    side: "right",
    icon: "💡",
  },
  {
    year: "2025",
    title: "Growth",
    description: "Expanded into a complete placement platform.",
    side: "left",
    icon: "🚀",
  },
  {
    year: "2026",
    title: "Ecosystem",
    description: "Built a growing community of students and mentors.",
    side: "right",
    icon: "🤝",
  },
  {
    year: "2027",
    title: "1,000+ Students",
    description: "Expanding across engineering colleges.",
    side: "left",
    icon: "📈",
  },
  {
    year: "2028",
    title: "50+ Colleges",
    description: "Building strategic academic partnerships.",
    side: "right",
    icon: "🏫",
  },
  {
    year: "2029",
    title: "Career Community",
    description: "Connecting students with mentors and recruiters.",
    side: "left",
    icon: "👥",
  },
  {
    year: "2030",
    title: "10,000+ Students",
    description: "Empowering careers across India.",
    side: "right",
    icon: "🏆",
  },
];

const particles = [
  { left: "8%", top: "12%", delay: 0 },
  { left: "18%", top: "38%", delay: 0.7 },
  { left: "82%", top: "15%", delay: 1.2 },
  { left: "90%", top: "45%", delay: 1.8 },
  { left: "12%", top: "72%", delay: 2.3 },
  { left: "78%", top: "70%", delay: 0.4 },
  { left: "50%", top: "10%", delay: 1.5 },
  { left: "55%", top: "85%", delay: 2.8 },
];

function MilestoneCard({
  milestone,
  index,
  visible,
}: {
  milestone: (typeof milestones)[0];
  index: number;
  visible: boolean;
}) {
  const isLeft = milestone.side === "left";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isLeft ? -100 : 100,
        scale: 0.9,
      }}
      animate={
        visible
          ? {
              opacity: 1,
              x: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.7,
        delay: 0.45 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute hidden lg:block ${
        isLeft ? "left-[2%]" : "right-[2%]"
      }`}
      style={{
        top: `${80 + index * 105}px`,
        width: "34%",
      }}
    >
      <motion.div
        whileHover={{
          y: -8,
          scale: 1.03,
        }}
        transition={{ duration: 0.25 }}
        className="group relative cursor-pointer"
      >
        {/* Connector */}
        <div
          className={`absolute top-1/2 h-[2px] w-20 ${
            isLeft
              ? "right-[-80px] bg-gradient-to-r from-purple-400 to-transparent"
              : "left-[-80px] bg-gradient-to-l from-purple-400 to-transparent"
          }`}
        />

        <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/85 p-5 shadow-[0_15px_45px_rgba(80,40,140,0.12)] backdrop-blur-md transition-all duration-300 group-hover:border-purple-300 group-hover:shadow-[0_20px_60px_rgba(120,70,220,0.25)]">
          {/* Hover glow */}
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-300/20 blur-2xl transition-all duration-500 group-hover:bg-purple-400/40" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-500 text-2xl shadow-lg shadow-purple-500/20">
              {milestone.icon}
            </div>

            <div>
              <div className="mb-1 inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                {milestone.year}
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                {milestone.title}
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                {milestone.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Milestones() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white via-purple-50/40 to-white" />

      {/* Soft background glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-40 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-300/30 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
            <span className="animate-pulse">✦</span>
            Our Journey
          </div>

          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Milestones
          </h2>

          <p className="mt-4 text-lg text-slate-500 sm:text-xl">
            A small{" "}
            <span className="font-bold text-purple-600">spark.</span>{" "}
            A growing{" "}
            <span className="font-bold text-purple-600">
              ecosystem.
            </span>
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            From mentoring a few juniors to building a growing placement
            community — every year represents another step towards empowering
            students across India.
          </p>
        </motion.div>

        {/* TREE CONTAINER */}
        <div className="relative min-h-[900px] overflow-hidden rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6 shadow-[0_25px_100px_rgba(80,50,150,0.12)] sm:p-10 lg:min-h-[1050px]">
          {/* Floating particles */}
          {particles.map((particle, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={
                isInView
                  ? {
                      opacity: [0, 1, 0],
                      y: [0, -20, -40],
                    }
                  : {}
              }
              transition={{
                duration: 3,
                delay: particle.delay,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="absolute z-10 h-1.5 w-1.5 rounded-full bg-purple-400"
              style={{
                left: particle.left,
                top: particle.top,
              }}
            />
          ))}

          {/* Desktop Tree */}
          <div className="relative mx-auto hidden h-[980px] max-w-6xl lg:block">
            {/* Ground glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {}
              }
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-10 left-1/2 h-32 w-[420px] -translate-x-1/2 rounded-full bg-purple-300/30 blur-3xl"
            />

            {/* SVG Tree */}
            <svg
              viewBox="0 0 700 1000"
              className="absolute left-1/2 top-0 h-full w-[500px] -translate-x-1/2 overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Main trunk */}
              <motion.path
                d="M350 920 C350 820 345 700 355 590 C365 470 355 340 350 220 C345 150 350 90 350 40"
                stroke="#704214"
                strokeWidth="45"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />

              {/* Left branches */}
              <motion.path
                d="M355 650 C300 610 240 570 155 540"
                stroke="#704214"
                strokeWidth="25"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.3, delay: 0.8 }}
              />

              <motion.path
                d="M355 530 C300 480 245 410 170 360"
                stroke="#704214"
                strokeWidth="22"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.3, delay: 1.1 }}
              />

              <motion.path
                d="M350 390 C300 330 255 270 210 210"
                stroke="#704214"
                strokeWidth="18"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 1.4 }}
              />

              {/* Right branches */}
              <motion.path
                d="M350 700 C410 650 475 610 550 580"
                stroke="#704214"
                strokeWidth="25"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.3, delay: 0.9 }}
              />

              <motion.path
                d="M355 550 C420 500 475 445 535 400"
                stroke="#704214"
                strokeWidth="22"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.3, delay: 1.2 }}
              />

              <motion.path
                d="M350 390 C405 330 450 270 490 200"
                stroke="#704214"
                strokeWidth="18"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 1.5 }}
              />

              {/* Top branch */}
              <motion.path
                d="M350 220 C350 150 350 100 350 40"
                stroke="#704214"
                strokeWidth="15"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 1.7 }}
              />

              {/* Glowing milestone points */}
              {[
                [350, 820],
                [355, 700],
                [355, 590],
                [355, 470],
                [350, 390],
                [350, 300],
                [350, 210],
                [350, 100],
              ].map(([cx, cy], index) => (
                <motion.g
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  transition={{
                    delay: 1.5 + index * 0.15,
                    duration: 0.5,
                  }}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r="18"
                    fill="#8B5CF6"
                    opacity="0.18"
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r="7"
                    fill="#FACC15"
                  />
                </motion.g>
              ))}

              {/* Leaves */}
              {[
                [240, 500],
                [205, 420],
                [190, 300],
                [270, 250],
                [445, 520],
                [485, 390],
                [505, 275],
                [410, 220],
                [315, 150],
                [390, 120],
              ].map(([x, y], index) => (
                <motion.ellipse
                  key={index}
                  cx={x}
                  cy={y}
                  rx="18"
                  ry="35"
                  fill="#65A30D"
                  initial={{
                    opacity: 0,
                    scale: 0,
                    rotate: -30,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 0.9,
                          scale: 1,
                          rotate: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    delay: 2 + index * 0.12,
                  }}
                  style={{
                    transformOrigin: `${x}px ${y}px`,
                  }}
                />
              ))}
            </svg>

            {/* Milestone Cards */}
            {milestones.map((milestone, index) => (
              <MilestoneCard
                key={milestone.year}
                milestone={milestone}
                index={index}
                visible={isInView}
              />
            ))}

            {/* Tree label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2.4, duration: 0.7 }}
              className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 rotate-[-3deg]"
            >
              <div className="rounded-xl border-4 border-amber-700/40 bg-gradient-to-br from-amber-700 to-amber-900 px-7 py-3 text-center shadow-xl">
                <div className="text-lg font-black text-white">
                  Placement
                </div>
                <div className="text-sm font-semibold text-amber-200">
                  Spark ✦
                </div>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 2.8, duration: 1 }}
              className="absolute bottom-6 right-8 max-w-xs text-right text-sm italic text-purple-500"
            >
              “Growing together,
              <br />
              shaping futures.”
            </motion.p>
          </div>

          {/* MOBILE TIMELINE */}
          <div className="relative lg:hidden">
            {/* Vertical tree line */}
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute left-7 top-5 w-[3px] origin-top bg-gradient-to-b from-green-400 via-purple-500 to-indigo-500"
            />

            <div className="space-y-7">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{
                    opacity: 0,
                    x: -40,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          x: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.25 + index * 0.15,
                  }}
                  className="relative flex gap-5"
                >
                  {/* Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      delay: 0.35 + index * 0.15,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-purple-600 to-indigo-500 text-xl shadow-lg shadow-purple-400/30"
                  >
                    {milestone.icon}
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      x: 5,
                    }}
                    className="flex-1 rounded-2xl border border-purple-100 bg-white/90 p-5 shadow-lg shadow-purple-100/50 backdrop-blur"
                  >
                    <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                      {milestone.year}
                    </span>

                    <h3 className="mt-2 text-lg font-bold text-slate-900">
                      {milestone.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {milestone.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 2.5, duration: 0.7 }}
              className="mt-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center text-white shadow-xl"
            >
              <div className="text-lg font-bold">
                Placement Spark ✦
              </div>
              <p className="mt-2 text-sm text-purple-100">
                Growing together, shaping futures.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}