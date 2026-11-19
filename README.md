# AUREX LABS — Studio Website

**Designing the Future. Building What Matters.**

The production website for AUREX LABS, an independent creative technology studio for web development, graphic design, SEO, Android development, UI/UX and brand identity.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · GSAP ScrollTrigger · Framer Motion · Zod · Nodemailer / Resend
- **Rendering:** every page is statically prerendered (SSG). Only `/api/contact` runs on the server.
- **Design:** obsidian `#090A0F`, graphite `#171824`, electric violet `#9065F8`, lavender `#C9B6FF`, pearl `#F5F3FA`. Space Grotesk for headlines, Inter for body text, both self-hosted through `next/font`.

---

## 1. Quick start

Requirements: **Node.js 20.9+** (developed on Node 24) and npm.

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Open http://localhost:3000. In development the contact form uses the `console` email provider, so submissions are printed in the terminal instead of being emailed.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (type-checks and prerenders every page) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js Core Web Vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript only |

---

## 2. Project structure

```
src/
  app/                      Routes (App Router)
    page.tsx                Homepage
    expertise/              Services overview + /expertise/[slug]
    work/                   Filterable gallery + /work/[slug] case studies
    studio/  insights/  contact/  brand/  privacy/  terms/
    api/contact/route.ts    Inquiry endpoint (validation, spam checks, email)
    layout.tsx              Fonts, global metadata, header/footer, Organization JSON-LD
    template.tsx            Page transitions + GSAP scroll controller
    opengraph-image.tsx     Generated social images (also per case study/article)
    robots.ts  sitemap.ts  manifest.ts  icon.svg  apple-icon.tsx
  components/
    brand/      Logo, Mark, floating hero Emblem
    home/       Hero, StudioIntro, ServicesGrid, Process, About, FinalCta
    work/       WorkGallery (filters), ProjectCard, ProjectVisual (illustrated mockups)
    contact/    ContactForm
    layout/     SiteHeader, SiteFooter, PageHeader, LegalPage, ScrollProgress
    motion/     ScrollEffects (GSAP ScrollTrigger)
    ui/         Button, Magnetic, SectionHeading, ServiceIcon, SampleBadge
  content/      ← all editable copy and data
    site.ts  services.ts  projects.ts  insights.ts  process.ts
  lib/          seo.ts, schema.ts (JSON-LD), validation.ts, email.ts, rate-limit.ts, turnstile.ts, og.tsx
public/
  brand/        Logo SVGs: mark, mark + orbit, dark, light, monochrome
  images/       Founder portrait (placeholder)
```

---

## 3. Editing content

All copy lives in `src/content/` as typed TypeScript, so a typo in a field name fails the build rather than breaking a page silently.

| What | Where |
| --- | --- |
| Contact email, WhatsApp, social links | `.env.local` / Vercel env vars (see `.env.example`) |
| Studio name, tagline, description, founder bio | `src/content/site.ts` |
| Services (cards, service pages, form options) | `src/content/services.ts` |
| Projects and case studies | `src/content/projects.ts` |
| Insights articles | `src/content/insights.ts` |
| Process steps | `src/content/process.ts` |
| Legal pages | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |

**Empty values are hidden, never shown as dead links.** If `NEXT_PUBLIC_WHATSAPP_NUMBER` is empty, for example, no WhatsApp button is rendered. Socials work the same way.

### Founder portrait

1. Add a photo to `public/images/`, for example `founder.jpg`. A 4:5 ratio around 1200×1500 works best.
2. Set `NEXT_PUBLIC_FOUNDER_PORTRAIT=/images/founder.jpg` and update `NEXT_PUBLIC_FOUNDER_PORTRAIT_ALT`.
3. Add the founder's profile URLs (`NEXT_PUBLIC_FOUNDER_*`).

The image is served in AVIF/WebP at the right size automatically. To use a remote image URL instead, add its host to `images.remotePatterns` in `next.config.ts`.

### Adding real projects

Every project currently in `projects.ts` is a **clearly labelled sample concept** (`isSample: true`). Each one shows a "Sample project" badge, a disclaimer on the case study, and **design goals** rather than results. Nothing on the site names a client or claims a metric.

To publish authentic work:

1. Export screenshots (desktop around 2400×1500, mobile around 780×1600) to `public/work/<slug>/`.
2. Add or replace an entry:

```ts
{
  slug: "client-website-redesign",
  title: "Client Website Redesign",
  category: "Websites",
  isSample: false,
  images: [
    { src: "/work/client-website-redesign/desktop.jpg", alt: "Homepage of …", width: 2400, height: 1500 },
    { src: "/work/client-website-redesign/mobile.jpg",  alt: "Mobile view of …", width: 780, height: 1600 },
  ],
  outcomes: ["Only verified, client-approved results"],
  // …summary, stack, challenge, solution, etc.
}
```

The first image becomes the cover and the second appears in the phone frame. Remove the sample entries once you have enough real work. If no samples remain, the sample notices disappear automatically.

### Adding an article

Add an object to `insights.ts`. The body is a list of blocks (`p`, `h2`, `ul`, `quote`). The page, metadata, OG image, Article JSON-LD and sitemap entry are generated for it.

---

## 4. Contact form

**Flow:** client-side Zod validation, then `POST /api/contact`, which runs these checks in order:

1. same-origin check (blocks cross-site posts)
2. body size limit
3. **honeypot** field (bots are silently accepted and dropped)
4. **time trap**: submissions under 3 seconds are silently dropped
5. **rate limit**: 5 per 10 minutes per IP (in-memory, per instance)
6. optional **Cloudflare Turnstile** verification
7. the same Zod schema again on the server
8. email delivery

The UI covers loading, success, field-error and failure states. All are announced to screen readers, and failure messages offer the email or WhatsApp fallback when those are configured.

### Choose an email provider

**Resend** (recommended):

1. Create an account at resend.com, add your domain and add the DNS records it shows (SPF/DKIM).
2. Set:
   ```
   EMAIL_PROVIDER=resend
   RESEND_API_KEY=re_...
   CONTACT_TO_EMAIL=you@yourdomain.com
   CONTACT_FROM_EMAIL=AUREX LABS <hello@yourdomain.com>
   ```

**SMTP** (Google Workspace, Zoho, Brevo, Postmark…):

```
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...            # use an app password where the provider offers one
CONTACT_TO_EMAIL=you@yourdomain.com
CONTACT_FROM_EMAIL=AUREX LABS <hello@yourdomain.com>
```

If no provider is configured in production, the API returns a friendly 503 and the form points visitors to email or WhatsApp. It never fails silently. The sender's address is set as **Reply-To**, so you can answer inquiries straight from your inbox.

### Optional: Cloudflare Turnstile

Create a widget in the Cloudflare dashboard (Turnstile → Add site) and set both `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. The widget appears in the form automatically.

> The in-memory rate limit is per server instance. For high traffic, use Turnstile, or swap `src/lib/rate-limit.ts` for a shared store such as Upstash Redis.

---

## 5. Motion and performance

- **GSAP ScrollTrigger** (`components/motion/ScrollEffects.tsx`) drives declarative attributes: `data-reveal` (batched fade-up), `data-mask-reveal` (clip-path image reveal) and `data-parallax="0.15"` (subtle parallax). The **process timeline** (`home/Process.tsx`) scrubs its progress line and lights up each step.
- **Framer Motion** handles the UI: nav active pill, mobile menu, filter pill and gallery layout animations, form states, scroll-progress bar, magnetic buttons, the emblem's pointer tilt and page transitions.
- **The hero entrance is pure CSS.** The headline is server-rendered and visible before JavaScript loads, which protects LCP. The page transition only plays on client-side navigation, never on first load.
- **`prefers-reduced-motion`** turns off reveals, parallax, the timeline scrub, the emblem orbit and tilt, magnetic pull and transitions. Content is always visible.
- Magnetic buttons and tilt only activate for fine pointers (`hover: hover and pointer: fine`). There is no custom cursor and no loading screen.
- If the animation script never runs, CSS reveals all content after 2.5 seconds.
- Measured on the local production build: FCP/LCP ≈ 0.44s, CLS 0.

---

## 6. SEO

- Unique `<title>`, description and canonical URL on every page (`lib/seo.ts`)
- `robots.txt`, `sitemap.xml` (24 URLs) and a web manifest
- Generated Open Graph images: site-wide, plus one per case study and per article
- JSON-LD: Organization + WebSite (all pages), Person (Studio), Service (service pages), CreativeWork (case studies), Article (insights), BreadcrumbList (all inner pages)
- One `<h1>` per page, semantic landmarks, descriptive alt text, server-rendered text
- **No invented** testimonials, addresses, ratings or metrics. Structured data includes only true facts.

Set `NEXT_PUBLIC_SITE_URL` to your real domain before the production build. All absolute URLs derive from it.

---

## 7. Responsive testing checklist

Layouts are mobile-first. Before each release, test at:

| Width | Device class |
| --- | --- |
| 360–390 px | Small and standard phones (menu, stacked cards, vertical timeline) |
| 768 px | Tablet portrait (2-column cards and gallery) |
| 1024 px | Small laptop (desktop nav, horizontal timeline) |
| 1440 px+ | Desktop |

Check that:

- there is no horizontal scroll
- the mobile menu traps focus, closes with Esc and unlocks scroll
- filters work by keyboard
- form errors are announced
- the reduced-motion OS setting is respected

Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion" helps with the last one.

Lighthouse: run it in an incognito window against `npm run build && npm start`, not the dev server.

---

## 8. Deploy: GitHub, then Vercel

### Push to GitHub

```bash
git init
```

```bash
git add . && git commit -m "Initial AUREX LABS site"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/<your-account>/aurex-labs.git
```

```bash
git push -u origin main
```

`.env.local` is git-ignored. Never commit secrets.

### Import into Vercel

1. Go to vercel.com → **Add New → Project** and import the GitHub repository. Vercel detects Next.js automatically, so the default build settings are correct.
2. Under **Environment Variables**, add the values from `.env.example`. At minimum set `NEXT_PUBLIC_SITE_URL`, the email provider variables, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.
3. Click **Deploy**. Every push to `main` redeploys, and pull requests get preview URLs.

Changing a `NEXT_PUBLIC_*` variable requires a redeploy, because those values are embedded at build time.

### Custom domain

1. In Vercel go to **Project → Settings → Domains → Add**, enter `yourdomain.com`, then also add `www.yourdomain.com`.
2. At your domain registrar, create the DNS records Vercel shows. Typically:
   - apex `@` → **A** record → `76.76.21.21`
   - `www` → **CNAME** → `cname.vercel-dns.com`

   Always use the exact values Vercel displays, as they can change.
3. Choose one primary host (for example `www`) and set the other to redirect to it. HTTPS certificates are issued automatically.
4. Set `NEXT_PUBLIC_SITE_URL` to the primary host (for example `https://www.yourdomain.com`) and redeploy.

---

## 9. Google Search Console

1. Open search.google.com/search-console → **Add property**.
2. **Domain property** (recommended): enter `yourdomain.com` and add the TXT record Google gives you at your registrar. This covers every subdomain and protocol.
   **Or URL-prefix property:** choose the HTML tag method, copy the `content="…"` value into `GOOGLE_SITE_VERIFICATION` on Vercel, redeploy, then click **Verify**.
3. Go to **Sitemaps** and submit `sitemap.xml`. Your full URL will be `https://www.yourdomain.com/sitemap.xml`.
4. Use **URL Inspection** on the homepage, then **Request indexing**.
5. Over the following weeks, monitor **Pages** (indexing), **Core Web Vitals** and **Enhancements**. You can validate structured data at search.google.com/test/rich-results.

---

## 10. Brand assets

The geometric "A" mark is a peak with a forward-pointing wedge in its counter, with an optional orbit. SVGs are in `public/brand/` and on the `/brand` page.

The static logo SVGs reference the Space Grotesk font. For print or third-party use, open them in Illustrator or Figma, apply Space Grotesk and **convert the text to outlines**.

---

## 11. Notes

- The privacy policy and terms are a sensible, honest starting point that reflects how this site actually handles data. Have them reviewed for your jurisdiction before relying on them.
- Accessibility: there is a skip link, visible focus rings, labelled controls, `aria-current` navigation, live regions for filters and form status, and AA-contrast text on dark surfaces.
