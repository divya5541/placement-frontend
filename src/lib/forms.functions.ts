import { createServerFn } from "@tanstack/react-start";
import { registrationSchema, contactSchema, resourceEmailSchema } from "./validation";

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
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
    // Fire-and-forget emails; do not block user response on email delivery.
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
    console.log("[contact]", { ...data, ts: new Date().toISOString() });
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

  const resend = new Resend(process.env.RESEND_API_KEY);

  const adminEmail =
    process.env.ADMIN_EMAIL ?? "career.placementspark@gmail.com";

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  await Promise.all([
    // Email 1: Registration confirmation to the user
    resend.emails.send({
      from: fromEmail,
      to: p.email,
      subject: "Registration Confirmed — Placement Spark",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto;">
          <h2>Registration Confirmed! 🎉</h2>

          <p>Hi ${p.fullName},</p>

          <p>
            Thank you for registering with <strong>Placement Spark</strong>.
            We have successfully received your registration.
          </p>

          <p>
            Our mentor will get in touch with you within 24 hours.
          </p>

          <p>
            Regards,<br />
            <strong>Placement Spark Team</strong>
          </p>
        </div>
      `,
      
    }),
    

    // Email 2: New registration notification to the team
    resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Registration — ${p.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto;">
          <h2>🎉 New Registration Received</h2>

          <p><strong>Name:</strong> ${p.fullName}</p>
          <p><strong>Email:</strong> ${p.email}</p>
          <p><strong>Phone:</strong> ${p.phone}</p>
          <p><strong>College:</strong> ${p.college}</p>
          <p><strong>Year:</strong> ${p.year}</p>
          <p><strong>Course:</strong> ${p.course}</p>
          <p><strong>Interests:</strong> ${p.interests.join(", ")}</p>
          <p><strong>Message:</strong> ${p.message || "Not provided"}</p>

          <hr />

          <p>
            <strong>Source:</strong> Placement Spark Website
          </p>
        </div>
      `,
    }),
  ]);
}