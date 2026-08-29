<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Team Toner — project conventions

Stack: Next.js 16 (App Router, RSC) · React 19 · Tailwind v4 · shadcn/ui **base-nova style (Base UI, `@base-ui/react`)** · Sanity CMS · Vercel.

**shadcn is Base UI, not Radix.** This changes two things vs. what you may expect:
- There is **no `asChild`**. To change the rendered element of a shadcn primitive (Trigger, Close, etc.), pass the **`render` prop**: `<SheetTrigger render={<Button ... />}>…</SheetTrigger>`.
- The Base UI `Button` expects a **native `<button>`** (`nativeButton: true`). Do **not** `render` a Button as a link/anchor. For a link styled as a button, use `ButtonLink` (`components/ui/button-link.tsx`), which applies `buttonVariants` to a `next/link`. For `tel:`/`mailto:` use a plain `<a className={buttonVariants(...)}>` or the shared teal class.

**Other conventions:**
- `lucide-react` has **removed brand icons** (Facebook/Instagram/YouTube). Use the inline SVGs already in `site-footer.tsx`.
- `params`/`searchParams` in pages are **async** (`Promise`). Use route helpers: `export default async function Page(props: PageProps<'/route'>) { const { slug } = await props.params }`.
- Design tokens live in `app/globals.css` `:root` (Arizto brand palette). Brand colours are utilities: `bg-night`, `text-teal`, `border-petrol`, `bg-gold`, `text-teal-foreground`. Re-skin by editing hex values there only.
- Central content/config: `lib/site.ts` (`siteConfig`, `mainNav`). `TODO(client)` marks values awaiting Allan & Karen's sign-off.
- **CMS:** Sanity studio embedded at `/studio` (`sanity.config.ts`, schemas in `sanity/schemaTypes/`). All client-editable content is CMS-driven through `lib/data.ts` (async getters, Sanity-first with fixture fallback while `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset/empty): listings, videos, testimonials, guides, suburbs, plus the `siteSettings` singleton (merged over `siteConfig` via `getSiteConfig()`) and per-page `page*` copy singletons (merged over `lib/content/page-copy.ts` via `getHomeCopy()` etc.) — render client-editable values through `await getSiteConfig()`, never `siteConfig` directly. The root layout exports `revalidate = 60` so studio edits reach every page. The header/footer are hidden on `/studio` by `components/hide-on-studio.tsx`. See README "Sanity CMS" for setup.
- Layout primitives: `components/brand/primitives.tsx` (`Container`, `Section`, `SectionHeading`, `Eyebrow`).
- Dev server: `npm run dev` (default port 3000 may be taken by another project — use `-- -p 3100`).
