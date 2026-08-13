"use server";

import { leadSchema, type LeadState } from "@/lib/validators";
import { deliverLead } from "@/lib/leads";

export async function submitLead(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  // formData.get() returns null for absent fields; coerce to string|undefined
  // so Zod's .optional() applies.
  const str = (key: string): string | undefined => {
    const value = formData.get(key);
    return typeof value === "string" ? value : undefined;
  };

  const raw = {
    kind: str("kind"),
    name: str("name"),
    email: str("email"),
    phone: str("phone"),
    address: str("address"),
    message: str("message"),
    listing: str("listing"),
    company: str("company"), // honeypot
  };

  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: LeadState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof raw;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    // Honeypot tripped — pretend success, don't reveal.
    if (errors.company) {
      return { ok: true, message: "Thanks — we'll be in touch shortly." };
    }
    return {
      ok: false,
      message: "Please check the highlighted fields and try again.",
      errors,
    };
  }

  const sent = await deliverLead(parsed.data);

  if (!sent) {
    return {
      ok: false,
      message:
        "Sorry — something went wrong sending your message. Please email us directly or call.",
    };
  }

  return {
    ok: true,
    message: "Thanks — your message is on its way. We'll be in touch shortly.",
  };
}
