/**
 * Editable project / case-study content.
 *
 * Real projects (`isSample: false`) use only facts confirmed by the studio.
 * Entries with `isSample: true` are clearly labelled demonstration concepts —
 * not client work — and show design goals rather than results. Remove them as
 * more authentic work is published. See README → "Adding real projects".
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
  /** Client or organisation name (real projects). */
  client?: string;
  /** Optional note on who delivered the work and in what capacity. */
  credit?: string;
  /** Public link to the live work. */
  liveUrl?: string;
  liveLabel?: string;
  summary: string;
  metaDescription: string;
  /** Illustrated fallback visual + accent colour, used when no cover image exists. */
  visual: ProjectVisual;
  accent: string;
  /** Real screenshots. `cover` is 16:10, `mobile` is a phone-width capture. */
  cover?: ProjectImage;
  mobile?: ProjectImage;
  /** Additional images, e.g. social posts, shown in a gallery grid. */
  gallery?: ProjectImage[];
  services: string[];
  stack?: string[];
  overview: string;
  challenge?: string;
  solution?: string[];
  /** Key figures for real projects — only verified, client-approved numbers. */
  metrics?: { value: string; label: string }[];
  metricsNote?: string;
  /**
   * For samples: the goals the concept is designed around (not results).
   * For real projects: verified outcomes only.
   */
  outcomes?: string[];
};

const euroCarsCredit =
  "Delivered by founder Muhammad Hassan Munir in his role as IT Manager at Euro Cars London (June 2025 – present).";

const post = (file: string, alt: string): ProjectImage => ({
  src: `/work/euro-cars-london-social-media/${file}.webp`,
  alt,
  width: 1080,
  height: 1350,
});

export const projects: Project[] = [
  {
    slug: "el-celler-de-can-roca-website",
    title: "El Celler de Can Roca",
    category: "Websites",
    isSample: false,
    client: "El Celler de Can Roca",
    liveUrl: "https://cellercanroca.com/",
    liveLabel: "Visit cellercanroca.com",
    summary: "Design and development of the WordPress website for El Celler de Can Roca in Girona, Spain.",
    metaDescription:
      "Case study: design and development of the multilingual WordPress website for El Celler de Can Roca and the Roca family's venues in Girona.",
    visual: "site",
    accent: "#E8892B",
    cover: {
      src: "/work/el-celler-de-can-roca-website/desktop.webp",
      alt: "El Celler de Can Roca website homepage showing the restaurant and the Roca family's venues in an image-led grid",
      width: 2400,
      height: 1500,
    },
    mobile: {
      src: "/work/el-celler-de-can-roca-website/mobile.webp",
      alt: "El Celler de Can Roca website on a mobile screen",
      width: 780,
      height: 1688,
    },
    services: ["Web Development"],
    stack: ["WordPress"],
    overview:
      "The website brings El Celler de Can Roca together with the Roca family's related venues — including Esperit Roca, Hotel Esperit Roca and Restaurant Fontané — in a calm, image-led layout.",
    solution: [
      "A clean, editorial grid with a card for each venue, linking to its own website and reservations.",
      "Content available in four languages: Catalan, Spanish, English and French.",
      "Built on WordPress so the team can keep venues and content up to date.",
    ],
  },
  {
    slug: "euro-cars-london-seo",
    title: "Euro Cars London — SEO & Site Health",
    category: "SEO",
    isSample: false,
    client: "Euro Cars London",
    credit: euroCarsCredit,
    liveUrl: "https://www.eurocars.london/",
    liveLabel: "Visit eurocars.london",
    summary: "Technical SEO for the rebuild of a London chauffeur company's website, followed by a site-wide health clean-up.",
    metaDescription:
      "Case study: technical SEO and site health for Euro Cars London — 200+ pages audited, new landing pages, duplicate content fixed and 99/100 mobile PageSpeed.",
    visual: "seo",
    accent: "#413C98",
    cover: {
      src: "/work/euro-cars-london-seo/desktop.webp",
      alt: "Euro Cars London website homepage with the chauffeur booking form",
      width: 2400,
      height: 1500,
    },
    mobile: {
      src: "/work/euro-cars-london-seo/mobile.webp",
      alt: "Euro Cars London website on a mobile screen",
      width: 780,
      height: 1688,
    },
    services: ["SEO & Growth", "Web Development"],
    stack: ["WordPress", "Elementor", "Google Search Console", "PageSpeed Insights", "cPanel"],
    overview:
      "Euro Cars London is a Mercedes-Benz chauffeur company offering airport, hotel, intercity and event transfers. Our founder led technical SEO for the website rebuild and the clean-up that followed.",
    challenge:
      "The site had duplicate content, inconsistent fleet details across pages and spam backlinks, and the rebuild needed a structure that could be found for specific airport, hotel and inter-city searches.",
    solution: [
      "Audited more than 200 pages and planned the new site structure together with the developer.",
      "Planned and launched dedicated airport, hotel and inter-city landing pages.",
      "Fixed duplicate content and incorrect fleet details site-wide, and merged duplicate blog posts with 301 redirects.",
      "Cleaned up spam backlinks and monitored indexing in Google Search Console.",
    ],
    metrics: [
      { value: "99", label: "Mobile PageSpeed score" },
      { value: "95%", label: "Site health" },
      { value: "0", label: "Crawl errors" },
      { value: "200+", label: "Pages audited" },
    ],
    metricsNote: "Figures from PageSpeed Insights and site-audit reports at the time of the work.",
  },
  {
    slug: "euro-cars-london-social-media",
    title: "Euro Cars London — Social Media Design",
    category: "Graphic Design",
    isSample: false,
    client: "Euro Cars London",
    credit: euroCarsCredit,
    liveUrl: "https://www.instagram.com/eurocarslondon_/",
    liveLabel: "View on Instagram",
    summary: "A branded Instagram and Facebook post series for a London chauffeur company — airport transfers, reviews, fleet and seasonal campaigns.",
    metaDescription:
      "Case study: branded Instagram and Facebook post design for Euro Cars London — airport transfers, reviews and UK event campaigns.",
    visual: "campaign",
    accent: "#D4AF37",
    cover: {
      src: "/work/euro-cars-london-social-media/cover.webp",
      alt: "Four Euro Cars London social media posts: airport transfers, Twickenham match day, Google reviews and Black Friday",
      width: 2400,
      height: 1500,
    },
    gallery: [
      post("1-airport-transfers", "Euro Cars London post: London airport transfers at a fixed price"),
      post("2-reviews", "Euro Cars London post: 5.0 rating from 545+ Google reviews"),
      post("3-why-choose-us", "Euro Cars London post: why choose Euro Cars London"),
      post("4-christmas", "Euro Cars London post: Christmas season chauffeur bookings"),
      post("1-twickenham", "Euro Cars London post: match day at Twickenham"),
      post("2-winter-wonderland", "Euro Cars London post: Winter Wonderland in Hyde Park"),
      post("3-nights-out", "Euro Cars London post: London nights out"),
      post("4-black-friday", "Euro Cars London post: Black Friday shopping trips"),
    ],
    services: ["Graphic Design"],
    stack: ["Canva", "Instagram", "Meta Business Suite"],
    overview:
      "A weekly series of on-brand social posts for Euro Cars London, designed so every post carries the logo, the Mercedes-Benz fleet, a clear message and direct booking details.",
    challenge:
      "Posting needed to restart with a consistent, recognisable look — and every post had to make it easy for people to get in touch and book.",
    solution: [
      "A post system where every design includes the logo, the fleet, a short quote, call and WhatsApp details and a QR code.",
      "Engagement hooks such as “Comment QUOTE” to turn views into conversations.",
      "Two visual directions: a light navy-and-red style based on the website, and a premium black-and-gold style for UK event campaigns.",
      "Posts scheduled across Instagram and the Facebook page for UK evening hours.",
    ],
  },
  {
    slug: "corvit-systems-sahiwal",
    title: "Corvit Systems Sahiwal",
    category: "Websites",
    isSample: false,
    client: "Corvit Systems Sahiwal",
    summary: "Website, SEO, branding and social media graphics for Corvit Systems Sahiwal, an IT training institute.",
    metaDescription:
      "Project: website development, SEO, brand identity and social media graphics for Corvit Systems Sahiwal, an IT training institute.",
    visual: "site",
    accent: "#5B8CFF",
    services: ["Web Development", "SEO & Growth", "Brand Identity", "Graphic Design"],
    overview:
      "An end-to-end digital presence for Corvit Systems Sahiwal: the website, search visibility, brand assets and graphics for social media.",
    solution: [
      "Website design and development",
      "Search engine optimisation",
      "Brand identity and logo work",
      "Graphics for social media",
    ],
  },
  {
    slug: "sams-education-system",
    title: "Sams Education System",
    category: "Websites",
    isSample: false,
    client: "Sams Education System",
    summary: "Website, SEO and social media graphics for Sams Education System, an education provider.",
    metaDescription: "Project: website development, SEO and social media graphics for Sams Education System.",
    visual: "site",
    accent: "#3FB68B",
    services: ["Web Development", "SEO & Growth", "Graphic Design"],
    overview: "A website, search foundations and social media graphics for Sams Education System.",
    solution: ["Website design and development", "Search engine optimisation", "Graphics for social media"],
  },
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
