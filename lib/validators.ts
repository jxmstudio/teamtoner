import { z } from "zod";

export const leadKinds = ["appraisal", "contact", "enquiry"] as const;
export type LeadKind = (typeof leadKinds)[number];

export const leadSchema = z.object({
  kind: z.enum(leadKinds),
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal("")),
  // Appraisal-specific (optional otherwise)
  address: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // Context for enquiries
  listing: z.string().trim().max(200).optional().or(z.literal("")),
  // Honeypot — must be empty
  company: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<keyof LeadInput, string>>;
};
