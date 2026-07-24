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
    void sendSubmissionEmails({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      college: data.college,
      year: data.year,
      course: data.course,
      interests: data.interests,
      message: data.message,
    }).catch((e) => console.error("[registration] email failed", e));
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
  // Uses Lovable-managed email. Requires an active email domain + scaffolded
  // transactional templates; until then this no-ops so submissions still save.
  try {
    // Dynamic string keeps TypeScript from erroring before the templates are scaffolded.
    const specifier = "@/lib/email-templates/send-email";
    const mod = await import(/* @vite-ignore */ specifier).catch(() => null);
    if (!mod) return;
    const send = (mod as { sendTemplateEmail?: Function }).sendTemplateEmail;
    if (typeof send !== "function") return;
    const adminEmail = process.env.ADMIN_EMAIL ?? "career.placementspark@gmail.com";
    await Promise.all([
      send("contact-confirmation", p.email, { templateData: { name: p.fullName } }),
      send("contact-admin-notification", adminEmail, { templateData: p }),
    ]);
  } catch (e) {
    console.error("[email] failed", e);
  }
}
