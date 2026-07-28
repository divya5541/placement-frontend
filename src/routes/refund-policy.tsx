import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { BUSINESS } from "@/lib/content";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Placement Spark" },
      { name: "description", content: "Refund eligibility, process, and timelines for Placement Spark programs." },
      { property: "og:title", content: "Refund Policy — Placement Spark" },
      { property: "og:description", content: "Understand when and how refunds are issued for Placement Spark services." },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "/refund-policy" }],
  }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="July 26, 2026"
      intro={
        <p>
          At Placement Spark, we are committed to providing quality mentorship and career guidance.
Please read our refund policy carefully before enrolling.
        </p>
      }
      sections={[
        {
          heading: "1. Program Registration",
          body: (
            <p>Your seat is confirmed only after successful payment.</p>
          ),
        },
        {
          heading: "2. Refund Eligibility",
          body: (
            <ul className="list-disc pl-6 space-y-1">
              <li>One-off mock interviews, resume reviews, or LinkedIn audits already delivered.</li>
              <li>Downloadable resources, templates, and recorded content once accessed.</li>
              <li>Discounted, promotional, or scholarship-based enrollments (unless expressly stated).</li>
              <li>Missed sessions where prior rescheduling notice was not given.</li>
            </ul>
          ),
        },
        {
          heading: "3. Non-Refundable Situations",
          body: (
            <ol className="list-decimal pl-6 space-y-1">
              <p>Fees are generally non-refundable after enrollment if:</p>

              <li>The student chooses not to attend sessions.</li>
              <li>The student withdraws voluntarily.</li>
              <li>The student is unable to attend due to personal reasons.</li>
              <li>The student has already received learning materials or attended sessions.</li>
            </ol>
          ),
        },
        {
          heading: "4. Exceptional Cases",
          body: (
            <p>
              Placement Spark may review genuine exceptional cases at its sole discretion.
            </p>
          ),
        },
        {
          heading: "5. Refund Processing",
          body: (
            <p>
              If approved, refunds will normally be processed to the original payment method within 7–10 business days.
            </p>
          ),
        },
        {
          heading: "6. Contact Information",
          body: (
            <p>
              For any refund-related queries, reach out to{" "}
              <a href={`mailto:${BUSINESS.email}`} className="underline hover:text-[color:var(--color-brand-yellow)]">
                {BUSINESS.email}
              </a>{" "}
              or call {BUSINESS.phone}.
            </p>
          ),
        },
      ]}
    />
  );
}