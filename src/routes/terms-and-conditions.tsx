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
              By accessing or using our services, you agree to be bound by these Terms and Conditions. If you do not
agree with any part of these terms, you may not access or use our services.
            </p>
          ),
        },
        {
          heading: "2. Program Duration",
          body: (
            <p>
              The program is tentatively scheduled to run for five (5) weeks. Placement Spark reserves the right to
modify the schedule or duration based on operational requirements or participant needs. Any changes will
be communicated in advance.
            </p>
          ),
        },
        {
          heading: "3. Interview Schedule Compliance",
          body: (
            <p>
              Participants are expected to adhere to the interview schedule and timelines as communicated by the
Placement Spark team. Failure to attend scheduled sessions may result in limited access to program
benefits or removal from specific activities.
            </p>
          ),
        },
        {
          heading: "4.  Placement Disclaimer",
          body: (
            <p>
              Placement Spark provides training, guidance, and mentorship to support candidates in their placement
journey. However, no job placement or employment guarantee is offered or implied. Outcomes depend on
individual effort, performance, and external factors beyond our control.
            </p>
          ),
        },
        {
          heading: "5. Fee and Refund Policy",
          body: (
            <p>
             Upon successful registration, the program fee is strictly non-refundable, regardless of circumstances
including withdrawal, non-participation, or dissatisfaction. Participants are advised to review all program
details prior to enrollment.
            </p>
          ),
        },
        {
          heading: "6. Code of Conduct and Disciplinary Action",
          body: (
            <p>
              Placement Spark maintains a professional and inclusive learning environment. The organization reserves
the right to terminate participation for any candidate found engaging in misconduct, disruptive behavior, or
repeated non-compliance with program guidelines. Such decisions are final and non-negotiable.
            </p>
          ),
        },
        {
          heading: "7.  Intellectual Property",
          body: (
            <p>
              All content and materials available on our services, including but not limited to text, graphics, logos,
images, and software, are the property of Placement spark or its licensors and are protected by copyright,
trademark, and other intellectual property laws.
            </p>
          ),
        },
        {
          heading: "8. Changes to Terms and Conditions",
          body: (
            <p>
              We reserve the right to update or modify these Terms and Conditions at any time without prior notice.
Your continued use of our services after any such changes constitutes your acceptance of the new Terms
and Conditions.
            </p>
          ),
        },
        
      ]}
    />
  );
}