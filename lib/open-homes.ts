import type { OpenHome } from "@/lib/content/types";

/**
 * Open-home times are entered in the studio (in the agent's local NZ time)
 * and stored by Sanity as UTC. The site renders on Vercel in UTC, so every
 * display goes through this fixed time zone rather than the server's.
 */
const NZ = "Pacific/Auckland";

// en-US gives three-letter months ("Sep"); en-NZ produces "Sept" and commas.
const dayFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: NZ,
  weekday: "long",
  day: "numeric",
  month: "short",
});

const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: NZ,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const part = (parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) =>
  parts.find((p) => p.type === type)?.value ?? "";

/** "Sunday 6 Sep" */
function day(date: Date): string {
  const parts = dayFormat.formatToParts(date);
  return `${part(parts, "weekday")} ${part(parts, "day")} ${part(parts, "month")}`;
}

/** "12:00 pm" */
function time(date: Date): string {
  const parts = timeFormat.formatToParts(date);
  return `${part(parts, "hour")}:${part(parts, "minute")} ${part(parts, "dayPeriod").toLowerCase()}`;
}

/** "Sunday 6 Sep 12:00 pm to 12:30 pm" (end date shown only if it differs). */
export function formatOpenHome({ start, end }: OpenHome): string {
  const from = new Date(start);
  const to = new Date(end);
  const sameDay = day(from) === day(to);
  return `${day(from)} ${time(from)} to ${sameDay ? "" : `${day(to)} `}${time(to)}`;
}
