import { z } from "zod";

export const leadKinds = ["appraisal", "contact", "enquiry"] as const;
export type LeadKind = (typeof leadKinds)[number];

/** Human-readable label for each lead type, used in the payload and email subject. */
export const leadKindLabel: Record<LeadKind, string> = {
  appraisal: "Free appraisal request",
  contact: "Website enquiry",
  enquiry: "Listing enquiry",
};

/** Answers to the appraisal form's optional "When are you thinking of selling?". */
export const sellingTimeframes = [
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "More than 12 months",
  "Not sure yet",
] as const;

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

/**
 * Contact requirements differ by lead type (client request, appraisal page):
 *  - appraisal: phone and property address are required, email is optional
 *    ("if they have one"); address required per the 23 Sep 2026 SEO email.
 *  - contact / enquiry: email is required, phone optional — unchanged.
 * Both are enforced in the refinement below rather than on the base fields.
 */
export const leadSchema = z
  .object({
    kind: z.enum(leadKinds),
    name: z.string().trim().min(2, "Please enter your name.").max(100),
    email: optionalText(200),
    phone: optionalText(30),
    // Appraisal-specific (optional otherwise)
    address: optionalText(200),
    timeframe: z.enum(sellingTimeframes).optional().or(z.literal("")),
    message: optionalText(2000),
    // Context for enquiries
    listing: optionalText(200),
    // Honeypot — must be empty
    company: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.email && !z.string().email().safeParse(data.email).success) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Please enter a valid email address.",
      });
    }

    if (data.kind === "appraisal") {
      if (!data.phone) {
        ctx.addIssue({
          code: "custom",
          path: ["phone"],
          message: "Please enter a phone number so we can arrange a time.",
        });
      }
      if (!data.address) {
        ctx.addIssue({
          code: "custom",
          path: ["address"],
          message: "Please enter the address you'd like appraised.",
        });
      }
      return;
    }

    if (!data.email) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Please enter your email address.",
      });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<keyof LeadInput, string>>;
};
