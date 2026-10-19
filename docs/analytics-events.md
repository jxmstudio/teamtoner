# GA4 events — teamtoner.co.nz

The site sends five GA4 events. Mark all five as **key events** in GA4
(Admin → Data display → Events → toggle "Mark as key event"). They appear in
the Events list once each has fired at least once; to see them sooner, use
Admin → DebugView while testing on the live site.

| Event | Fires when | Parameters |
| --- | --- | --- |
| `appraisal_form_submit` | An appraisal request is delivered (the `/appraisal` page and every `/appraisal/<area>` page). Fires after the server confirms the lead was sent — not on the button click, and never for spam caught by the honeypot. | `page_path`, `form_kind` = `appraisal` |
| `contact_form_submit` | A contact-page message or a listing enquiry is delivered (same rules as above). | `page_path`, `form_kind` = `contact` or `enquiry`, `listing` (the property address, for listing enquiries) |
| `phone_click` | Any `tel:` link is tapped or clicked — header, footer, appraisal and contact pages, area pages, About-page agent cards. Listing pages carry the header and footer numbers. | `page_path`, `link_url`, `link_text` |
| `email_click` | Any `mailto:` link is clicked (footer, contact page, privacy/terms text). | `page_path`, `link_url`, `link_text` |
| `youtube_subscribe_click` | The "Subscribe on YouTube" button under a property or home-page video is clicked. | `page_path`, `link_url`, `link_text` |

`page_path` is the page the visitor was on, so Report 2 can break enquiries
down by page and, with GA4's session source, by where the visitor came from.
To report on `form_kind`, `listing` or `link_text`, register them as
event-scoped custom dimensions (Admin → Data display → Custom definitions).

## How it's switched on

- gtag loads from the `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable
  (`G-XXXXXXXXXX`), set in Vercel → Project → Settings → Environment
  Variables, Production only. Changing it needs a redeploy.
- With the variable unset (local development, preview deployments) neither
  gtag nor any event loads or fires. Nothing loads inside `/studio` either.
- On 19 Oct 2026 production was already loading gtag with `G-16VMEX23C5`.
  If the GA4 property being set up for Allan is a different one, replace the
  value in Vercel with the new measurement ID and redeploy.

## Changes from Month 1

Month 1 sent a single `generate_lead` event with `form_kind`. It is replaced
by `appraisal_form_submit` and `contact_form_submit`, so appraisal requests
can be counted on their own. If `generate_lead` was marked as a key event,
leave it for historical data; it will no longer receive new hits.

## Where the code lives

- `lib/analytics.ts` — event names (`ANALYTICS_EVENTS`), `trackEvent()`,
  the form-to-event mapping and the `tel:`/`mailto:` classifier.
- `components/analytics.tsx` — loads gtag and tracks every `tel:`, `mailto:`
  and YouTube-subscribe click site-wide with one listener.
- `components/forms/lead-form.tsx` — fires the form events after the server
  confirms delivery.
