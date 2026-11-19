/**
 * Editable project / case-study content.
 *
 * IMPORTANT: Every project below is a clearly labelled SAMPLE concept created to
 * demonstrate the studio's process and presentation. They are not client work
 * and contain no client names or results. Replace them with authentic projects
 * (set `isSample: false`, add real `images`, real `outcomes`) as work is
 * published. See README → "Adding real projects".
 */

export const projectCategories = [
  "Websites",
  "Android Apps",
  "UI/UX",
  "Branding",
  "Graphic Design",
  "SEO",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/** Built-in illustrated visual used until real screenshots are supplied. */
export type ProjectVisual = "site" | "app" | "dashboard" | "brand" | "campaign" | "seo";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** True for demonstration concepts. Shown as a visible label everywhere. */
  isSample: boolean;
  summary: string;
  metaDescription: string;
  /** Illustrated fallback visual + accent colour. */
  visual: ProjectVisual;
  accent: string;
  /** Optional real screenshots. The first is used as the cover. */
  images?: ProjectImage[];
  services: string[];
  stack: string[];
  overview: string;
  challenge: string;
  solution: string[];
  /**
   * For samples: the goals the concept is designed around (not results).
   * For real projects: verified outcomes only.
   */
  outcomes: string[];
};

export const projects: Project[] = [
  {
    slug: "architecture-studio-website",
    title: "Architecture Studio Website",
    category: "Websites",
    isSample: true,
    summary: "An editorial, image-led website concept for an architecture practice.",
    metaDescription:
      "Sample concept: an editorial, high-performance website for an architecture practice, designed and built with Next.js.",
    visual: "site",
    accent: "#9065F8",
    services: ["Web Development", "UI/UX Design"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Headless CMS", "Vercel"],
    overview:
      "A concept website for a mid-sized architecture practice that wants its portfolio to feel like a printed monograph while still loading instantly on a phone.",
    challenge:
      "Architecture portfolios are image-heavy, which usually means slow pages, layout shift and poor search visibility. The practice also needs to publish new projects without a developer.",
    solution: [
      "An editorial grid with generous whitespace and large, art-directed imagery served in modern formats with explicit dimensions to prevent layout shift.",
      "A headless CMS model where each project has structured fields — location type, scope, gallery, credits — so publishing stays consistent.",
      "Server-rendered project pages with unique metadata and structured data for every entry.",
    ],
    outcomes: [
      "Target: Largest Contentful Paint under 2.5s on mobile",
      "Target: zero layout shift on gallery pages",
      "Goal: new projects publishable by non-technical staff in minutes",
    ],
  },
  {
    slug: "focus-habit-android-app",
    title: "Focus & Habit Android App",
    category: "Android Apps",
    isSample: true,
    summary: "A calm, offline-first productivity app concept built with Jetpack Compose.",
    metaDescription:
      "Sample concept: a native Android habit and focus app designed with Material 3 and built with Kotlin and Jetpack Compose.",
    visual: "app",
    accent: "#B18CFF",
    services: ["Android Development", "UI/UX Design"],
    stack: ["Kotlin", "Jetpack Compose", "Room", "WorkManager", "Material 3"],
    overview:
      "A concept for a focus timer and habit tracker that keeps people consistent without the noise of social feeds or aggressive notifications.",
    challenge:
      "Productivity apps often overwhelm users with features. The concept needed to stay simple, work fully offline and respect battery life.",
    solution: [
      "A three-tab structure — Today, Focus, Progress — with one primary action per screen.",
      "Offline-first storage with Room and background reminders scheduled via WorkManager.",
      "A restrained Material 3 theme with dynamic colour and large, accessible touch targets.",
    ],
    outcomes: [
      "Goal: complete core actions in two taps or fewer",
      "Goal: full functionality without a network connection",
      "Goal: meet Android accessibility guidelines for contrast and touch targets",
    ],
  },
  {
    slug: "saas-analytics-dashboard",
    title: "SaaS Analytics Dashboard",
    category: "UI/UX",
    isSample: true,
    summary: "A data-dense dashboard concept that stays readable at a glance.",
    metaDescription:
      "Sample concept: UI/UX design for a SaaS analytics dashboard with a scalable component library and accessible data visualisation.",
    visual: "dashboard",
    accent: "#7C5CFF",
    services: ["UI/UX Design", "Web Development"],
    stack: ["Figma", "Design tokens", "React", "TypeScript"],
    overview:
      "A concept interface for a subscription analytics product, designed to surface what changed and why without forcing users to dig through tables.",
    challenge:
      "Dashboards accumulate charts until nothing stands out. The concept had to prioritise key signals, support dark and light themes and scale to new modules.",
    solution: [
      "A summary layer of key metrics with clear deltas, followed by drill-down views on demand.",
      "A token-based component library covering charts, tables, filters and empty states.",
      "Colour-blind-safe chart palettes and keyboard-navigable data tables.",
    ],
    outcomes: [
      "Goal: answer the top three user questions from the first screen",
      "Goal: one component library shared by design and engineering",
      "Goal: WCAG AA contrast across both themes",
    ],
  },
  {
    slug: "specialty-coffee-brand-identity",
    title: "Specialty Coffee Brand Identity",
    category: "Branding",
    isSample: true,
    summary: "A warm, modern identity system concept for an independent roastery.",
    metaDescription:
      "Sample concept: a complete brand identity for an independent specialty coffee roastery — logo, colour, typography, packaging and guidelines.",
    visual: "brand",
    accent: "#C9B6FF",
    services: ["Brand Identity", "Graphic Design"],
    stack: ["Adobe Illustrator", "Figma", "Adobe InDesign"],
    overview:
      "A concept identity for a small-batch roastery that wants to stand apart from both rustic craft clichés and cold corporate chains.",
    challenge:
      "The identity had to work on a tiny coffee bag label, a storefront sign and an Instagram story — while remaining instantly recognisable.",
    solution: [
      "A geometric monogram derived from the shape of a coffee bean and the roastery's initial.",
      "A flexible colour system where each origin gets its own accent within a fixed neutral palette.",
      "Packaging templates and a concise guideline document for consistent production.",
    ],
    outcomes: [
      "Goal: legible mark at 16px and on a 2m sign",
      "Goal: packaging system extendable to new origins without redesign",
      "Goal: guidelines usable by external printers and freelancers",
    ],
  },
  {
    slug: "music-festival-campaign",
    title: "Music Festival Campaign Graphics",
    category: "Graphic Design",
    isSample: true,
    summary: "A bold, kinetic campaign concept across posters, social and wayfinding.",
    metaDescription:
      "Sample concept: graphic design campaign for an electronic music festival — posters, social media templates and on-site wayfinding.",
    visual: "campaign",
    accent: "#A27BFF",
    services: ["Graphic Design", "Brand Identity"],
    stack: ["Adobe Illustrator", "Adobe Photoshop", "After Effects", "Figma"],
    overview:
      "A concept campaign for an electronic music festival, built around a modular typographic system that can be remixed for every artist and announcement.",
    challenge:
      "Festival campaigns need dozens of assets in weeks. Each must feel fresh while remaining unmistakably part of the same event.",
    solution: [
      "A modular grid and variable type system that generates posters, stories and banners from one master layout.",
      "A restrained palette of obsidian and electric violet with high-contrast typography for legibility at distance.",
      "Motion guidelines for short social loops exported from the same system.",
    ],
    outcomes: [
      "Goal: produce a new artist announcement from template in under an hour",
      "Goal: consistent look across print, social and on-site signage",
      "Goal: legible wayfinding at night and at distance",
    ],
  },
  {
    slug: "clinic-local-seo-foundation",
    title: "Clinic Local SEO Foundation",
    category: "SEO",
    isSample: true,
    summary: "A technical and local SEO blueprint concept for a multi-service clinic.",
    metaDescription:
      "Sample concept: technical SEO, structured data and local search blueprint for a multi-service healthcare clinic website.",
    visual: "seo",
    accent: "#8F6BFF",
    services: ["SEO & Growth", "Web Development"],
    stack: ["Google Search Console", "Schema.org", "Next.js", "PageSpeed Insights"],
    overview:
      "A concept SEO blueprint for a clinic whose services are strong but whose website is hard for search engines — and patients — to navigate.",
    challenge:
      "One long services page, missing metadata, slow mobile pages and no structured data meant the clinic was invisible for specific treatment searches.",
    solution: [
      "An information architecture with a dedicated, well-linked page for each service and location.",
      "MedicalClinic and FAQ structured data, unique titles and descriptions for every page.",
      "Mobile performance fixes and a Search Console monitoring routine.",
    ],
    outcomes: [
      "Goal: every service indexable with its own page and metadata",
      "Goal: valid structured data in Google's Rich Results Test",
      "Goal: pass Core Web Vitals on mobile",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
