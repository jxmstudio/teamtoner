import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import type { LeadInput } from "@/lib/validators";

/*
 * Email delivery for lead forms.
 *
 * Set these env vars in Vercel to enable real sending (see .env.example):
 *   RESEND_API_KEY   — from resend.com
 *   LEAD_FROM_EMAIL  — a verified sender, e.g. "Team Toner <hello@teamtoner.co.nz>"
 * Leads route to siteConfig.contact.email (thetoners@arizto.co.nz).
 *
 * If RESEND_API_KEY is not set, we log the lead to the server console and still
 * return success, so forms are testable before the mail account is connected.
 */

const kindLabel: Record<LeadInput["kind"], string> = {
  appraisal: "Free appraisal request",
  contact: "Website enquiry",
  enquiry: "Listing enquiry",
};

export async function sendLead(lead: LeadInput): Promise<boolean> {
  const subject = `${kindLabel[lead.kind]} — ${lead.name}`;
  const lines = [
    `Type: ${kindLabel[lead.kind]}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.address ? `Property address: ${lead.address}` : null,
    lead.listing ? `Regarding listing: ${lead.listing}` : null,
    lead.message ? `\nMessage:\n${lead.message}` : null,
  ].filter(Boolean);
  const text = lines.join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !from) {
    // Not configured yet — log so it's testable in dev.
    console.info("[lead] (email not configured, logging only)\n" + text);
    return true;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: siteConfig.contact.email,
      replyTo: lead.email,
      subject,
      text,
    });
    if (error) {
      console.error("[lead] Resend error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead] send failed:", err);
    return false;
  }
}
