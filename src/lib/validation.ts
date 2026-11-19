import { z } from "zod";
import { services } from "@/content/services";

export const serviceOptions = [...services.map((s) => s.title), "Not sure yet"] as const;

export const budgetOptions = [
  "Prefer to discuss",
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
] as const;

export const timelineOptions = ["Flexible", "Within 1 month", "1 – 3 months", "3+ months"] as const;

/** Shared by the client form and the server route handler. */
export const contactSchema = z.object({
  name: z
    .string({ error: "Please enter your name." })
    .trim()
    .min(2, { error: "Please enter your name." })
    .max(80, { error: "Name is too long." }),
  email: z
    .string({ error: "Please enter your email." })
    .trim()
    .min(1, { error: "Please enter your email." })
    .max(160, { error: "Email is too long." })
    .pipe(z.email({ error: "Please enter a valid email address." })),
  company: z.string().trim().max(120, { error: "Company name is too long." }).optional().default(""),
  service: z.enum(serviceOptions, { error: "Please choose a service." }),
  budget: z.enum(budgetOptions).optional().default("Prefer to discuss"),
  timeline: z.enum(timelineOptions).optional().default("Flexible"),
  message: z
    .string({ error: "Please tell us about your project." })
    .trim()
    .min(20, { error: "Please add a little more detail (at least 20 characters)." })
    .max(4000, { error: "Message is too long (4,000 characters max)." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type FieldErrors = Partial<Record<ContactField, string>>;

export function fieldErrorsFrom(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
