import "server-only";

import { sendLead } from "@/lib/email";
import { leadKindLabel, type LeadInput } from "@/lib/validators";

/*
 * Lead delivery via JXM Forms.
 *
 * Leads POST to the JXM Forms backend, which stores them and emails them on.
 * This runs inside the `submitLead` server action, so the API key never
 * reaches the browser — JXM Forms keys are publishable by design, but there's
 * no reason to ship one when we don't have to.
 *
 * If JXM Forms is unreachable or errors, we fall back to sending the lead
 * directly via Resend (lib/email.ts) so a backend outage can't silently lose a
 * real enquiry. Remove the fallback once JXM Forms is confirmed stable.
 */

const JXM_FORMS_ENDPOINT =
  "https://jxm-forms.vercel.app/api/submit/teamtoner";

// Overridable via env so the key can be rotated without a code change.
const JXM_FORMS_KEY =
  process.env.JXM_FORMS_API_KEY ?? "Ows51_Es4VG8wmPqLyImnQQnTJ8_l1CR";

export async function deliverLead(lead: LeadInput): Promise<boolean> {
  // Built field by field so the `company` honeypot is never forwarded.
  const payload: Record<string, string> = {
    type: leadKindLabel[lead.kind],
    name: lead.name,
  };
  // Only send fields the visitor actually filled in.
  for (const key of ["email", "phone", "address", "listing", "message"] as const) {
    const value = lead[key];
    if (value) payload[key] = value;
  }

  // Appraisal leads can be phone-only, so "email" is not guaranteed. JXM Forms
  // uses it as the Reply-To — without it, replying to the notification won't
  // reach the seller and the phone number is the only way back to them.
  if (!payload.email) {
    payload.no_reply_to_contact_by_phone = lead.phone ?? "";
  }

  try {
    const res = await fetch(JXM_FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": JXM_FORMS_KEY,
      },
      body: JSON.stringify(payload),
      // Don't let a slow backend hang the visitor's submit.
      signal: AbortSignal.timeout(10_000),
    });

    if (res.ok) return true;
    console.error(
      `[lead] JXM Forms responded ${res.status}; falling back to email.`
    );
  } catch (err) {
    console.error("[lead] JXM Forms request failed; falling back to email:", err);
  }

  return sendLead(lead);
}
