import { Youtube } from "@/components/brand/social-icons";

/**
 * Privacy-enhanced YouTube embed. Accepts any YouTube URL shape the client is
 * likely to paste (watch, share, Shorts, embed, live) and renders nothing for
 * URLs it can't parse rather than a broken iframe.
 */
export function videoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (!/(^|\.)((youtube(-nocookie)?\.com)|(youtu\.be))$/.test(u.hostname)) return null;
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("/")[0] || null;
    const v = u.searchParams.get("v");
    if (v) return v;
    const match = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{6,})/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

/**
 * The channel URL with YouTube's subscribe prompt appended, so the button
 * opens the channel with the confirmation dialog rather than a bare page.
 */
export function subscribeHref(channelUrl: string): string {
  try {
    const u = new URL(channelUrl);
    u.searchParams.set("sub_confirmation", "1");
    return u.toString();
  } catch {
    return channelUrl;
  }
}

export function VideoEmbed({
  url,
  title,
  className,
  subscribeUrl,
}: {
  url: string;
  title: string;
  className?: string;
  /**
   * Team Toner's YouTube channel (Site settings → Social). When set, a
   * permanent "Subscribe" button sits under the player — YouTube's own
   * end-screen subscribe prompts don't render in embedded players, which is
   * what the client noticed (email, 15 Sep 2026).
   */
  subscribeUrl?: string;
}) {
  const id = videoId(url);
  if (!id) return null;
  return (
    <div className={className}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="aspect-video w-full rounded-2xl border border-border bg-night"
      />
      {subscribeUrl ? (
        <div className="mt-4 flex justify-center">
          <a
            href={subscribeHref(subscribeUrl)}
            target="_blank"
            rel="noopener"
            data-track="youtube_subscribe_click"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-[#FF0000] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#d90000]"
          >
            <Youtube className="size-5" />
            Subscribe to Team Toner on YouTube
          </a>
        </div>
      ) : null}
    </div>
  );
}
