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
          We want every student to feel confident about joining Placement Spark. This Refund Policy
          explains when you are eligible for a refund, what services are non-refundable, and how to
          raise a request.
        </p>
      }
      sections={[
        {
          heading: "1. Eligibility for Refunds",
          body: (
            <ul className="list-disc pl-6 space-y-1">
              <li>Refund requests must be raised within 7 days of purchase.</li>
              <li>You must not have consumed more than 20% of the program (sessions attended, modules unlocked, or reviews delivered).</li>
              <li>Refunds are calculated on the paid program value, excluding taxes and payment gateway charges.</li>
            </ul>
          ),
        },
        {
          heading: "2. Non-Refundable Services",
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
          heading: "3. Refund Request Process",
          body: (
            <ol className="list-decimal pl-6 space-y-1">
              <li>
                Email{" "}
                <a href={`mailto:${BUSINESS.email}`} className="underline hover:text-[color:var(--color-brand-yellow)]">
                  {BUSINESS.email}
                </a>{" "}
                with the subject "Refund Request — [Your Name]".
              </li>
              <li>Include your registered email, program name, order ID, and reason for the request.</li>
              <li>Our team will acknowledge your request within 2 business days.</li>
            </ol>
          ),
        },
        {
          heading: "4. Processing Time",
          body: (
            <p>
              Approved refunds are processed within 7–10 business days to the original payment
              method. Depending on your bank or card issuer, the amount may take an additional 3–5
              business days to reflect in your account.
            </p>
          ),
        },
        {
          heading: "5. Exceptions",
          body: (
            <p>
              In case of duplicate payments, technical errors, or program cancellation by Placement
              Spark, a full refund will be issued regardless of the timelines above. Custom
              corporate or institutional engagements are governed by their individual agreements.
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