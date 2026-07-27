import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { BUSINESS } from "@/lib/content";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Placement Spark" },
      { name: "description", content: "How Placement Spark collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — Placement Spark" },
      { property: "og:description", content: "How Placement Spark handles your data across mentorship, courses, and placement services." },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 26, 2026"
      intro={
        <p>
          At Placement Spark, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services. 


        </p>
      }
      sections={[
        {
          heading: "1. Information We Collect",
          body: (
            <>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Full name, email address, phone number, and college / university details.</li>
                <li>Course, batch year, area of interest, and career goals shared during enrollment.</li>
                <li>Resumes, LinkedIn profiles, or portfolio links you upload for review.</li>
                <li>Payment-related information processed via our payment partners (we do not store card details).</li>
                <li>Communication history via email, WhatsApp, or contact forms.</li>
                
              </ul>
              <p>We also collect limited technical data such as device type, browser, and pages visited.</p>
            </>
          ),
        },
        {
          heading: "2. How We Use Your Information",
          body: (
            <ul className="list-disc pl-6 space-y-1">
              <li>Deliver mentorship sessions, mock interviews, resume reviews, and course access.</li>
              <li>Personalise career guidance and recommend relevant programs.</li>
              <li>Send batch updates, session reminders, receipts, and important announcements.</li>
              <li>Improve our curriculum, website performance, and support quality.</li>
              <li>Comply with legal obligations and prevent fraud or misuse of our services.</li>
              
            </ul>
            
          ),
        },
        {
          heading: "3. Cookies & Analytics",
          body: (
            <p>
              We use essential cookies to keep you signed in and remember preferences (such as theme).
              We may also use privacy-friendly analytics to understand aggregate traffic patterns. You
              can disable cookies in your browser, though some features may not work as intended.
            </p>
          ),
        },
        {
          heading: "4. Data Security",
          body: (
            <p>
              Your data is stored on secure, access-controlled infrastructure with encryption in
              transit. Only authorised mentors and staff can access student records, strictly for the
              purpose of delivering our services. While no method is 100% secure, we follow industry
              best practices to protect your information.
            </p>
          ),
        },
        {
          heading: "5. Third-Party Services",
          body: (
            <p>
              We rely on trusted providers for hosting, email delivery, payments, video conferencing,
              and analytics. These providers only receive the minimum data required to perform their
              service and are bound by their own privacy commitments. We do not sell your personal
              information to any third party.
            </p>
          ),
        },
        {
          heading: "6. Your Rights",
          body: (
            <ul className="list-disc pl-6 space-y-1">
              <li>Request a copy of the personal data we hold about you.</li>
              <li>Ask us to correct inaccurate information or update your profile.</li>
              <li>Request deletion of your account and associated data, subject to legal retention needs.</li>
              <li>Opt out of non-essential marketing communications at any time.</li>
            </ul>
          ),
        },
        {
          heading: "7. Contact Us",
          body: (
            <p>
              For any privacy-related questions or requests, email{" "}
              <a href={`mailto:${BUSINESS.email}`} className="text-[color:var(--color-brand-black)] underline hover:text-[color:var(--color-brand-yellow)]">
                {BUSINESS.email}
              </a>{" "}
              or call {BUSINESS.phone}.
            </p>
          ),
        },

        {
          heading: "- ABOUT PLACEMENT SPARK",
          body: (
            <p>
                Placement Spark is a career development platform dedicated to helping students become placement-ready through structured mentorship, resume building, interview preparation, communication development, and industry-oriented guidance.
Our mission is to bridge the gap between academic learning and industry expectations by providing practical career support and mentorship.
       
       "Discover Reality. Explore Infinity."

            </p>
          ),
        },


      ]}
    />
  );
}