/**
 * Central, editable site configuration.
 *
 * Public contact and social URLs come from NEXT_PUBLIC_* environment variables
 * (see .env.example). Anything left empty is simply not rendered, so the site
 * never shows a dead link or button.
 */

function clean(value: string | undefined): string {
  return (value ?? "").trim();
}

function digitsOnly(value: string | undefined): string {
  return clean(value).replace(/[^\d]/g, "");
}

export type SocialLink = { label: string; href: string };

function socials(entries: Array<[string, string | undefined]>): SocialLink[] {
  return entries
    .map(([label, href]) => ({ label, href: clean(href) }))
    .filter((entry) => /^https?:\/\//i.test(entry.href));
}

const siteUrl = (clean(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000").replace(/\/+$/, "");

export const site = {
  name: "AUREX LABS",
  legalName: clean(process.env.NEXT_PUBLIC_LEGAL_NAME) || "AUREX LABS",
  tagline: "Designing the Future. Building What Matters.",
  description:
    "AUREX LABS is an independent creative technology studio crafting high-performance websites, distinctive brand identities, intuitive Android applications, UI/UX and SEO-led digital growth.",
  url: siteUrl,
  locale: "en_US",
  keywords: [
    "creative technology studio",
    "web development studio",
    "Next.js development",
    "brand identity design",
    "graphic design",
    "UI/UX design",
    "Android app development",
    "SEO services",
  ],
  contact: {
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    whatsappNumber: digitsOnly(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
    whatsappMessage:
      clean(process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE) ||
      "Hi AUREX LABS, I'd like to discuss a new project.",
  },
  socials: socials([
    ["LinkedIn", process.env.NEXT_PUBLIC_LINKEDIN_URL],
    ["Instagram", process.env.NEXT_PUBLIC_INSTAGRAM_URL],
    ["Behance", process.env.NEXT_PUBLIC_BEHANCE_URL],
    ["Dribbble", process.env.NEXT_PUBLIC_DRIBBBLE_URL],
    ["GitHub", process.env.NEXT_PUBLIC_GITHUB_URL],
    ["X", process.env.NEXT_PUBLIC_X_URL],
  ]),
  founder: {
    name: "Muhammad Hassan Munir",
    role: "Founder & Creative Technologist",
    portrait: clean(process.env.NEXT_PUBLIC_FOUNDER_PORTRAIT) || "/images/founder-portrait.svg",
    portraitAlt:
      clean(process.env.NEXT_PUBLIC_FOUNDER_PORTRAIT_ALT) ||
      "Portrait of Muhammad Hassan Munir, founder of AUREX LABS",
    bio: [
      "Muhammad Hassan Munir is a digital professional working across web development, graphic design, SEO and application development. He founded AUREX LABS to bring those disciplines under one roof, so ideas move from concept to launch without losing clarity between hand-offs.",
      "His work sits where visual craft meets engineering: interfaces that are considered down to the pixel, code that is built to be fast and maintainable, and search foundations that help the right audience find the work.",
    ],
    socials: socials([
      ["LinkedIn", process.env.NEXT_PUBLIC_FOUNDER_LINKEDIN_URL],
      ["GitHub", process.env.NEXT_PUBLIC_FOUNDER_GITHUB_URL],
      ["Behance", process.env.NEXT_PUBLIC_FOUNDER_BEHANCE_URL],
      ["Instagram", process.env.NEXT_PUBLIC_FOUNDER_INSTAGRAM_URL],
      ["X", process.env.NEXT_PUBLIC_FOUNDER_X_URL],
    ]),
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Expertise", href: "/expertise" },
  { label: "Selected Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export function whatsappHref(message: string = site.contact.whatsappMessage): string | null {
  if (!site.contact.whatsappNumber) return null;
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoHref(subject = "New project inquiry"): string | null {
  if (!site.contact.email) return null;
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;
}
