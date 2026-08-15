import { createServerFn } from "@tanstack/react-start";
import {
  registrationSchema,
  contactSchema,
  resourceEmailSchema,
} from "./validation";

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };

    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    // Save registration to Supabase
    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        college: data.college,
        year: data.year,
        course: data.course,
        interests: data.interests,
        message: data.message ?? null,
        source: "registration",
      });

    if (error) {
      console.error("[registration] insert failed", error);
      throw new Error("Could not save submission");
    }

    // Send confirmation email to user
    // and notification email to Placement Spark team.
    await sendSubmissionEmails({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      college: data.college,
      year: data.year,
      course: data.course,
      interests: data.interests,
      message: data.message,
    });

    return { ok: true };
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };

    console.log("[contact]", {
      ...data,
      ts: new Date().toISOString(),
    });

    return { ok: true };
  });

export const captureResourceEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => resourceEmailSchema.parse(data))
  .handler(async ({ data }) => {
    console.log("[resource]", data);

    return { ok: true };
  });

type SubmissionPayload = {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  course: string;
  interests: string[];
  message?: string;
};

async function sendSubmissionEmails(p: SubmissionPayload) {
  const { Resend } = await import("resend");

  // Check API key
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resend = new Resend(apiKey);

  // Team email
  const adminEmail =
    process.env.ADMIN_EMAIL ?? "career.placementspark@gmail.com";

  // Sender email
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!fromEmail) {
    throw new Error("RESEND_FROM_EMAIL is not configured");
  }

  console.log("[registration] Starting email sending...");
  console.log("[registration] User email:", p.email);
  console.log("[registration] FROM_EMAIL:", fromEmail);
  console.log("[registration] ADMIN_EMAIL:", adminEmail);
  console.log(
    "[registration] API_KEY exists:",
    !!process.env.RESEND_API_KEY
  );

  // =====================================================
  // 1. SEND CONFIRMATION EMAIL TO USER
  // =====================================================

  const userResult = await resend.emails.send({
  from: fromEmail,
  to: p.email,
  subject: "Registration Confirmed — Placement Spark",
  html: `
    <div style="margin:0; padding:0; background-color:#f6f7fb; font-family:Arial, Helvetica, sans-serif; color:#222;">

      <div style="max-width:650px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.08);">

        <!-- Header -->
        <div style="padding:25px 30px; text-align:center; background:#ffffff; border-bottom:1px solid #eeeeee;">
          <h1 style="margin:0; color:#6d28d9; font-size:28px;">
            Placement Spark 🚀
          </h1>

          <p style="margin:8px 0 0; color:#777; font-size:13px;">
            Discover Reality. Explore Infinity.
          </p>
        </div>

        <!-- Content -->
        <div style="padding:35px 35px 25px;">

          <h2 style="margin-top:0; color:#222;">
            Registration Confirmed! 🎉
          </h2>

          <p>
            Hello <strong>${p.fullName}</strong>,
          </p>

          <p>
            Thank you for registering with
            <strong>Placement Spark</strong>.
            We have successfully received your registration.
          </p>

        

          <!-- Highlight Box -->
          <div style="margin:25px 0; padding:18px 20px; background:#f5f3ff; border-left:4px solid #7c3aed; border-radius:6px;">
            <p style="margin:0; color:#4c1d95;">
              <strong>What happens next?</strong>
            </p>

            <p style="margin:8px 0 0; color:#555;">
              Our mentor/team will get in touch with you shortly.
              <strong>shortly</strong>.
            </p>
          </div>

          <p>
            Please feel free to connect with us if you have any questions
            or need any assistance.
          </p>

          <p style="margin-top:30px;">
            Keep learning, keep preparing, and keep growing! 🚀
          </p>

          <table
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="margin:0; padding:0;"
>
  <tr>
    <td
      style="
        font-family:Arial, Helvetica, sans-serif;
        font-size:14px;
        line-height:22px;
        color:#333333;
        padding:0;
      "
    >
      Regards,<br />

      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="margin:5px 0 0 0; padding:0;"
      >
        <tr>

          <!-- LOGO -->
          <td
            style="
              padding:0 8px 0 0;
              vertical-align:middle;
            "
          >
            <img
              src="https://placementspark.com/YOUR-LOGO-FILENAME.png"
              alt="Placement Spark"
              width="28"
              height="28"
              style="
                display:block;
                width:28px;
                height:28px;
                border:0;
                outline:none;
                text-decoration:none;
              "
            />
          </td>

          <!-- BRAND NAME -->
          <td
            style="
              padding:0;
              vertical-align:middle;
              font-family:Arial, Helvetica, sans-serif;
              font-size:16px;
              line-height:22px;
              font-weight:bold;
            "
          >
            <span style="color:#111827;">
              Placement
            </span>
            <span style="color:#facc15;">
              Spark
            </span>
            <span style="color:#facc15;">
              🚀
            </span>
          </td>

        </tr>
      </table>
    </td>
  </tr>
</table>

        </div>

        <!-- Divider -->
        <div style="height:1px; background:#eeeeee;"></div>

        <!-- Footer -->
        <div style="padding:25px 30px; text-align:center; background:#fafafa;">

          <p style="margin:0 0 8px; font-size:16px; font-weight:bold; color:#6d28d9;">
            Placement Spark 🚀
          </p>

          <p style="margin:0 0 15px; font-size:13px; color:#666;">
            Discover Reality. Explore Infinity.
          </p>

          <p style="margin:5px 0; font-size:13px; color:#555;">
            Helping students become Placement-Ready.
          </p>

          <p style="margin:15px 0 5px; font-size:13px;">
  🌐
  <a
    href="https://www.placementspark.com/"
    style="color:#6d28d9; text-decoration:none;"
  >
    www.placementspark.com
  </a>
</p>

          <p style="margin:5px 0; font-size:13px;">
            📧
            <a
              href="mailto:career.placementspark@gmail.com"
              style="color:#6d28d9; text-decoration:none;"
            >
              career.placementspark@gmail.com
            </a>
          </p>

          <p style="margin:5px 0; font-size:13px; color:#555;">
            📱 +91 7057606291
          </p>

          <p style="margin:18px 0 8px; font-size:12px; color:#777;">
            Services • Resume Building • LinkedIn Optimization • Mock Interviews
            • Career Mentorship • Placement Readiness
          </p>

          <p style="margin:12px 0 0; font-size:12px; color:#777;">
            Preparing Students. Building Professionals. Creating Futures.
          </p>

        </div>

      </div>

    </div>
  `,
});

console.log("[registration] User email result:", userResult);
  // Check if Resend returned an error
  if (userResult.error) {
    console.error(
      "[registration] User email failed:",
      userResult.error
    );

    throw new Error(
      `User email failed: ${userResult.error.message}`
    );
  }

  console.log(
    "[registration] User confirmation email sent successfully:",
    userResult.data?.id
  );

  // =====================================================
  // 2. SEND NEW REGISTRATION EMAIL TO TEAM
  // =====================================================

  const teamResult = await resend.emails.send({
    from: fromEmail,
    to: adminEmail,
    subject: `New Registration — ${p.fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto;">

        <h2>🎉 New Registration Received</h2>

        <p>
          <strong>Name:</strong> ${p.fullName}
        </p>

        <p>
          <strong>Email:</strong> ${p.email}
        </p>

        <p>
          <strong>Phone:</strong> ${p.phone}
        </p>

        <p>
          <strong>College:</strong> ${p.college}
        </p>

        <p>
          <strong>Year:</strong> ${p.year}
        </p>

        <p>
          <strong>Course:</strong> ${p.course}
        </p>

        <p>
          <strong>Interests:</strong>
          ${p.interests.join(", ")}
        </p>

        <p>
          <strong>Message:</strong>
          ${p.message || "Not provided"}
        </p>

        <hr />

        <p>
          <strong>Source:</strong>
          Placement Spark Website
        </p>

      </div>
    `,
  });

  console.log("[registration] Team email result:", teamResult);

  // Check if Resend returned an error
  if (teamResult.error) {
    console.error(
      "[registration] Team email failed:",
      teamResult.error
    );

    throw new Error(
      `Team email failed: ${teamResult.error.message}`
    );
  }

  console.log(
    "[registration] Team notification email sent successfully:",
    teamResult.data?.id
  );

  console.log("[registration] Both emails sent successfully!");

  return {
    userEmailId: userResult.data?.id,
    teamEmailId: teamResult.data?.id,
  };
}