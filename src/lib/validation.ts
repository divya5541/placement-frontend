import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  college: z.string().trim().min(2, "Please enter your college").max(120),
  year: z.enum(["1st Year", "2nd Year", "3rd Year", "Final Year", "Graduate"]),
  course: z.enum(["Engineering", "Chemical Engineer ", "Other"]),
  interests: z.array(z.string()).min(1, "Pick at least one area"),
  message: z.string().trim().max(500).optional().default(""),
  consent: z.literal(true, { message: "Please accept the privacy consent" }),
  website: z.string().max(0).optional().default(""),
});
export type RegistrationInput = z.infer<typeof registrationSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(5, "Tell us a little more").max(1000),
  website: z.string().max(0).optional().default(""),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const resourceEmailSchema = z.object({
  email: z.string().trim().email().max(160),
  resource: z.string().min(1).max(80),
});
