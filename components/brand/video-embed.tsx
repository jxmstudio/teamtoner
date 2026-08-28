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

export function VideoEmbed({ url, title, className }: { url: string; title: string; className?: string }) {
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
    </div>
  );
}
