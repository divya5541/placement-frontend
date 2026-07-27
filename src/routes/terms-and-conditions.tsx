import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { BUSINESS } from "@/lib/content";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Placement Spark" },
      { name: "description", content: "The terms governing your use of Placement Spark mentorship, courses, and placement services." },
      { property: "og:title", content: "Terms & Conditions — Placement Spark" },
      { property: "og:description", content: "Read the rules and responsibilities for using Placement Spark services." },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "/terms-and-conditions" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="July 26, 2026"
      intro={
        <p>
          These Terms & Conditions ("Terms") govern your access to and use of Placement Spark's
          website, mentorship programs, online courses, mock interviews, resume reviews, and
          placement-related services (collectively, the "Services"). By enrolling in or using any of
          our Services, you agree to be bound by these Terms.
        </p>
      }
      sections={[
        {
          heading: "1. Acceptance of Terms",
          body: (
            <p>
              By creating an account, purchasing a program, or otherwise using our Services, you
              confirm that you have read, understood, and accepted these Terms. If you do not agree,
              please do not use the Services.
            </p>
          ),
        },
        {
          heading: "2. Eligibility",
          body: (
            <p>
              Our Services are intended for students and early-career professionals aged 16 and
              above. If you are under 18, you confirm that a parent or legal guardian has reviewed
              and consented to these Terms on your behalf.
            </p>
          ),
        },
        {
          heading: "3. User Responsibilities",
          body: (
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate, current, and complete information during registration.</li>
              <li>Attend scheduled mentorship sessions and mock interviews on time.</li>
              <li>Use course materials only for personal learning; do not redistribute or resell.</li>
              <li>Communicate respectfully with mentors, staff, and fellow students.</li>
              <li>Keep your login credentials confidential and notify us of any unauthorised use.</li>
            </ul>
          ),
        },
        {
          heading: "4. Payments",
          body: (
            <p>
              Program fees are displayed on the Pricing page and are payable in advance unless
              otherwise agreed. All payments are processed by third-party payment gateways. Prices
              may be revised from time to time; changes will not affect programs you have already
              purchased.
            </p>
          ),
        },
        {
          heading: "5. Intellectual Property",
          body: (
            <p>
              All content on this website and within our programs — including course modules,
              recordings, templates, worksheets, and branding — is the intellectual property of
              Placement Spark and is protected by applicable copyright and trademark laws. You may
              not copy, reproduce, or share our material without prior written consent.
            </p>
          ),
        },
        {
          heading: "6. Limitation of Liability",
          body: (
            <p>
              Placement Spark provides mentorship, guidance, and preparation resources; we do not
              guarantee a specific job offer, package, or placement outcome. To the maximum extent
              permitted by law, our total liability arising out of or related to the Services shall
              not exceed the amount you paid for the specific program in question.
            </p>
          ),
        },
        {
          heading: "7. Termination",
          body: (
            <p>
              We may suspend or terminate access to the Services if you violate these Terms, engage
              in disruptive behaviour, or misuse our content. You may discontinue using the Services
              at any time, subject to our Refund Policy.
            </p>
          ),
        },
        {
          heading: "8. Governing Law",
          body: (
            <p>
              These Terms are governed by the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of the courts located in Mumbai, Maharashtra.
            </p>
          ),
        },
        {
          heading: "9. Contact",
          body: (
            <p>
              For questions about these Terms, contact us at{" "}
              <a href={`mailto:${BUSINESS.email}`} className="underline hover:text-[color:var(--color-brand-yellow)]">
                {BUSINESS.email}
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}