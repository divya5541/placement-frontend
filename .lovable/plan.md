
# Placement Spark — Full Marketing Site

Your brief specifies Next.js, but this Lovable project runs on **TanStack Start** (React 19 + TypeScript + Tailwind v4 + Vite). It's the same React + file-based routing + API routes model, so I'll build the entire spec on TanStack Start with identical structure, functionality, and visual polish. If you specifically need Next.js App Router, tell me and I'll stop — otherwise I'll proceed.

## Scope (all pages, fully built)

- `/` Home — hero (animated), about snippet, 6-card Why Choose Us, Student Journey timeline, horizontal Programs carousel, pricing teaser, testimonial carousel, FAQ snippet, CTA banner
- `/about` — story, vision/mission, 6 core values, team (3 placeholder cards)
- `/programs` — all 9 programs grid with CTAs
- `/pricing` — 4 plans + full feature comparison table + pricing FAQ
- `/resources` — 3 downloadables with email-gated modal
- `/faq` — searchable, categorized accordion (30+ Q&A, I'll write on-brand content matching the categories)
- `/contact` — full registration form with client + server validation, WhatsApp CTA, contact block
- `/blog` — static "coming soon" shell
- Custom 404

Global: sticky animated navbar, footer, floating WhatsApp button.

## Design system

- Tailwind v4 tokens in `src/styles.css`: primary yellow `#FFC107`, black `#1A1A1A`, greys, yellow-light/medium, WhatsApp green
- Fonts loaded via `<link>` in `__root.tsx`: Poppins (headings) + Inter (body)
- Button variants: primary (yellow), secondary (black), ghost, whatsapp — with hover/active/focus transitions
- Framer Motion for scroll-reveal, hero animation, page transitions, counters, accordion, carousel

## Backend

- TanStack server functions for `/api/register` and `/api/contact` with Zod validation
- Data stored in-memory + logged (no Lovable Cloud enabled yet). I'll leave a clearly commented hook so you can wire Resend/Cloud later. If you want persistence + email now, say "enable Cloud + Resend" and I'll add both.
- Client-side Zod validation, honeypot field for spam (reCAPTCHA needs a key from you — I'll stub with honeypot + rate note)

## SEO

- Per-route `head()` with title, description, og:*, twitter:card
- FAQPage + Organization JSON-LD
- `sitemap.xml` server route + `robots.txt`
- Semantic HTML, alt text, keyboard focus states

## Structure

```
src/
  routes/  __root.tsx, index.tsx, about.tsx, programs.tsx, pricing.tsx,
           resources.tsx, faq.tsx, contact.tsx, blog.tsx, sitemap[.]xml.ts
  components/  Navbar, Footer, Hero, WhyChooseUs, StudentJourney,
               ProgramCard, PricingTable, TestimonialCarousel, FaqAccordion,
               RegistrationForm, WhatsAppFab, CTABanner, ResourceCard, ...
  lib/  content.ts (programs, plans, faqs, testimonials), validation.ts,
        register.functions.ts, contact.functions.ts
  styles.css (design tokens, animations)
public/ favicon, robots.txt, placeholder PDFs
```

## Images

Hero + about + program illustrations generated via `imagegen` in a consistent flat-illustration style (yellow/black brand palette). No generic stock.

## Notes / trade-offs

- **Next.js → TanStack Start**: same capabilities, different file conventions. Say the word if you want me to stop.
- **Form persistence + admin email**: stubbed unless you enable Cloud + Resend now.
- **reCAPTCHA**: honeypot only unless you provide a site key.
- **Testimonials, team, pricing amounts**: clearly marked placeholder.

Confirm and I'll build it end-to-end.
