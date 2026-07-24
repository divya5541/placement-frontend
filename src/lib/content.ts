import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Headphones,
  Layers,
  Linkedin,
  MessageSquare,
  Presentation,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export const BUSINESS = {
  name: "Placement Spark",
  email: "career.placementspark@gmail.com",
  phone: "+91 70576 06291",
  whatsapp: "https://wa.me/917057606291?text=Hi%20Placement%20Spark!%20I%20want%20to%20know%20more%20about%20your%20programs.",
  linkedin: "https://linkedin.com/company/placement-spark",
  instagram: "https://instagram.com/placementspark",
  location: "Mumbai, Maharashtra, India",
  hours: "Mon–Sat, 9 AM – 7 PM IST",
};

export type Program = { icon: LucideIcon; title: string; benefit: string; description: string };
export const PROGRAMS: Program[] = [
  { icon: FileText, title: "Resume Building", benefit: "Get 3x more interview calls", description: "Craft a recruiter-friendly resume that showcases your strengths, projects, and impact in one clean page." },
  { icon: ShieldCheck, title: "ATS Resume Review", benefit: "Pass automated filters", description: "We audit your resume against real ATS rules — keywords, formatting, sections — so it never gets silently rejected." },
  { icon: Linkedin, title: "LinkedIn Optimization", benefit: "Appear in recruiter searches", description: "Rewrite your headline, About, and Experience so recruiters actually find you and reach out first." },
  { icon: MessageSquare, title: "Mock Interviews", benefit: "Crack interviews confidently", description: "1:1 mock sessions with detailed feedback on body language, tone, structure, and content." },
  { icon: Users, title: "Group Discussions", benefit: "Ace campus GD rounds", description: "Practice with real prompts, learn to lead without dominating, and stand out in the top 3." },
  { icon: Layers, title: "Technical Interview Prep", benefit: "Clear technical rounds", description: "Chemical Engineering student passionate about process optimization, sustainable technologies, and industrial innovation." },
  { icon: Presentation, title: "HR Interview Preparation", benefit: "Win HR rounds", description: "Frameworks for the tough behavioural questions, salary talk, and 'why should we hire you'." },
  { icon: Target, title: "Career Guidance", benefit: "Choose the right path", description: "Confused between roles, higher studies, or startups? Get honest, unbiased 1:1 advice." },
  { icon: Rocket, title: "Placement Strategy", benefit: "Maximize offer chances", description: "A personalized plan across companies, roles, timelines, and referrals — so nothing is left to luck." },
];

export type Why = { icon: LucideIcon; title: string; desc: string };
export const WHY_CHOOSE: Why[] = [
  { icon: GraduationCap, title: "Expert Mentors", desc: "Learn from professionals who've been on both sides of the hiring table." },
  { icon: BookOpen, title: "Structured Programs", desc: "Step-by-step curriculum — no random tips, only what actually works." },
  { icon: Award, title: "Real Results", desc: "Focused on outcomes: interview calls, offers, and confidence." },
  { icon: FileText, title: "ATS Resumes", desc: "Every resume tested against real recruiter systems before it ships." },
  { icon: MessageSquare, title: "Mock Interviews", desc: "Live 1:1 practice with detailed, honest feedback." },
  { icon: Headphones, title: "WhatsApp Support", desc: "Reach your mentor between sessions — quick doubts, quick replies." },
];

export const VALUES: Why[] = [
  { icon: Sparkles, title: "Innovation", desc: "We keep evolving our methods with what's actually working in hiring today." },
  { icon: ShieldCheck, title: "Integrity", desc: "Honest advice — even when it isn't what you want to hear." },
  { icon: Users, title: "Student-First", desc: "Every decision is measured against one question: does this help students?" },
  { icon: Target, title: "Results-Driven", desc: "We track outcomes, not vanity metrics." },
  { icon: Briefcase, title: "Accessibility", desc: "Great mentorship shouldn't be locked behind big-city price tags." },
  { icon: Award, title: "Excellence", desc: "We ship real quality — in content, sessions, and support." },
];

export const JOURNEY = [
  { step: "01", title: "Register free", desc: "Tell us about you and your goals in under 2 minutes." },
  { step: "02", title: "Discovery call", desc: "A mentor understands where you are and where you want to be." },
  { step: "03", title: "Personal plan", desc: "You get a placement plan tailored to your college, course, and timeline." },
  { step: "04", title: "Build & practice", desc: "Resume, LinkedIn, mocks, GDs — one focused week at a time." },
  { step: "05", title: "Apply & interview", desc: "Targeted applications, referrals, and real interview prep." },
  { step: "06", title: "Offer in hand", desc: "Confident interviews, aligned negotiation, and a role you're proud of." },
];

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  highlight?: string;
  features: string[];
  cta: string;
};
export const PLANS: Plan[] = [
  { name: "Free Trial", price: "FREE", cadence: "", tagline: "See what we do, no strings attached.", features: ["1 Resume review", "1 Career guidance session", "WhatsApp community access"], cta: "Start Free" },
  { name: "Solo", price: "₹2250", cadence: "/Student", tagline: "For serious individual prep.", features: ["Everything in Free", "Full resume + ATS + LinkedIn", "2 Mock interviews / month", "WhatsApp mentor support"], cta: "Get Started" },
  { name: "Buddy", price: "₹2050", cadence: "/Student", tagline: "Prep with a friend, save more.", highlight: "10% off per student", features: ["Everything in Solo", "4 Mock interviews / month", "Priority scheduling", "10% per-student discount"], cta: "Get Started" },
  { name: "Squad", price: "₹1950", cadence: "/Student", tagline: "Best per-student value for teams of 4+.", highlight: "Best value", features: ["Everything in Buddy", "Group GD training", "Referral discount", "Dedicated squad mentor"], cta: "Get Started" },
];

export const PRICING_FEATURES: { feature: string; free: boolean; solo: boolean; buddy: boolean; squad: boolean }[] = [
  { feature: "Resume Building", free: true, solo: true, buddy: true, squad: true },
  { feature: "ATS Review", free: false, solo: true, buddy: true, squad: true },
  { feature: "LinkedIn Optimization", free: false, solo: true, buddy: true, squad: true },
  { feature: "Mock Interviews (HR)", free: false, solo: true, buddy: true, squad: true },
  { feature: "Technical Interview Prep", free: false, solo: true, buddy: true, squad: true },
  { feature: "Group Discussion Training", free: false, solo: false, buddy: true, squad: true },
  { feature: "Career Guidance Sessions", free: true, solo: true, buddy: true, squad: true },
  { feature: "Placement Strategy", free: false, solo: true, buddy: true, squad: true },
  { feature: "WhatsApp Mentor Support", free: false, solo: true, buddy: true, squad: true },
  { feature: "Priority Mentor Access", free: false, solo: false, buddy: true, squad: true },
  { feature: "Referral Discount", free: false, solo: false, buddy: false, squad: true },
];

export type Testimonial = { name: string; college: string; quote: string };
// Placeholder testimonials — replace with real student stories.
export const TESTIMONIALS: Testimonial[] = [
  { name: "Aditi Sharma", college: "VJTI, Mumbai", quote: "My resume finally started getting responses. The mock interviews made me realize where I was actually losing points." },
  { name: "Rohan Mehta", college: "SPIT, Mumbai", quote: "The clarity I got from the career session alone was worth it. Landed my first internship within a month." },
  { name: "Sneha Iyer", college: "NMIMS, chemical engineer ", quote: "Structured, honest, and no fluff. My LinkedIn started getting recruiter DMs in week two." },
  { name: "Karan Patel", college: "DJ Sanghvi", quote: "The WhatsApp support meant I never felt stuck. Small doubts got answered fast." },
];

export type FaqItem = { q: string; a: string };
export type FaqCategory = { category: string; items: FaqItem[] };
export const FAQS: FaqCategory[] = [
  {
    category: "About Placement Spark",
    items: [
      { q: "What is Placement Spark?", a: "Placement Spark is a student-focused career development platform based in Mumbai. We help engineering, chemical engineer , and fresh graduates become placement-ready through mentorship, resume building, interview prep, and career guidance." },
      { q: "Who is Placement Spark for?", a: "Chemical Engineering students and fresh graduates who want structured, honest guidance for placements and early careers." },
      { q: "Where are you based?", a: "We're based in Mumbai, but all our programs are delivered online, so you can join from anywhere in India." },
      { q: "How is Placement Spark different?", a: "We focus on outcomes, not fluff. Every session is 1:1 or small-group, taught by mentors who've actually hired and been hired." },
    ],
  },
  {
    category: "Eligibility & Programs",
    items: [
      { q: "Which years of study can join?", a: "Anyone from 1st year to final year, plus recent graduates. Earlier is better — you get more time to build." },
      { q: "Do you support non-tech students?", a: "Yes. chemical Engineer and other disciplines are welcome. We tailor the program to your target roles." },
      { q: "Can I pick individual programs?", a: "Absolutely. You can start with Resume Building or Mock Interviews on their own, or combine them under a plan." },
      { q: "How long does a program take?", a: "Most programs run over 2–6 weeks. Placement strategy plans span your active placement season." },
    ],
  },
  {
    category: "Pricing & Registration",
    items: [
      { q: "Is there really a free trial?", a: "Yes. You get a real resume review and a career guidance session at no cost, so you can decide before paying anything." },
      { q: "How do I register?", a: "Fill out the registration form on our Contact page, or WhatsApp us. A mentor will reach out within 24 hours." },
      { q: "Do you offer refunds?", a: "If you're not satisfied after your first paid session, tell us — we'll make it right." },
      { q: "Do you offer group discounts?", a: "Yes. Buddy plans get 10% off per student and Squad plans offer the best per-student value." },
    ],
  },
  {
    category: "Mentors & Support",
    items: [
      { q: "Who are the mentors?", a: "Working professionals and senior campus veterans who've been on both sides of hiring at product, service, and consulting firms." },
      { q: "How do sessions happen?", a: "1:1 video calls, scheduled at times that fit your college timetable." },
      { q: "Can I message my mentor between sessions?", a: "On paid plans, yes — via WhatsApp during our support hours (Mon–Sat, 9 AM – 7 PM IST)." },
    ],
  },
  {
    category: "Resume & LinkedIn",
    items: [
      { q: "What does the resume service include?", a: "Structure, content, keywords, and formatting — plus a full ATS audit so it isn't silently rejected." },
      { q: "Do you use templates?", a: "We start from clean, recruiter-tested layouts and personalize heavily. No copy-paste template feeling." },
      { q: "How long does a LinkedIn revamp take?", a: "Usually one focused session plus 2–3 days of iteration. You'll see profile views climb within a week." },
    ],
  },
  {
    category: "Technical & Career",
    items: [
      { q: "Do you cover DSA?", a: "Yes — plus core CS, system design basics for freshers, and role-specific topics like SQL, Excel, or case interviews." },
      { q: "I'm confused about my career direction. Can you help?", a: "That's exactly what our Career Guidance program is for. We start from your interests and constraints, not a template." },
      { q: "Do you help with off-campus roles?", a: "Yes. Our Placement Strategy plan covers off-campus applications, referrals, and interview cadence." },
    ],
  },
  {
    category: "Future Features",
    items: [
      { q: "Do you have a blog?", a: "It's on the way. We'll publish honest, practical career articles — no listicles." },
      { q: "Will there be a dashboard?", a: "Yes. A student dashboard, progress tracking, and community features are on our roadmap." },
      { q: "Do you plan to offer paid placement drives?", a: "We're exploring curated hiring events for students who complete our programs." },
    ],
  },
];
