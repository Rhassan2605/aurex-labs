/**
 * Editable service content. Each entry powers the homepage card,
 * the /expertise overview and its own /expertise/[slug] page.
 */

export type ServiceIcon = "web" | "graphic" | "seo" | "android" | "uiux" | "brand";

export type Service = {
  slug: string;
  title: string;
  icon: ServiceIcon;
  /** One-line card description. */
  summary: string;
  /** Meta description for the service page (≤ 160 chars). */
  metaDescription: string;
  /** Opening statement on the service page. */
  headline: string;
  intro: string[];
  deliverables: string[];
  approach: { title: string; text: string }[];
  tools: string[];
  idealFor: string[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    icon: "web",
    summary:
      "Fast, secure and accessible websites and web apps, engineered on modern frameworks and built to convert.",
    metaDescription:
      "Custom website and web application development with Next.js, React and TypeScript — fast, accessible, SEO-ready and easy to maintain.",
    headline: "Websites engineered for speed, clarity and growth.",
    intro: [
      "We design and build marketing websites, content platforms and web applications with modern frameworks such as Next.js, React and TypeScript. Every build is server-rendered where it matters, responsive from the smallest phone upward and tuned for Core Web Vitals.",
      "You get clean, documented code, a structure your team can edit, and a deployment pipeline that makes future changes safe and quick.",
    ],
    deliverables: [
      "Marketing and company websites",
      "Landing pages for campaigns and launches",
      "Web applications and client portals",
      "Headless CMS integration",
      "Performance, accessibility and technical SEO optimisation",
      "Hosting, deployment and analytics setup",
    ],
    approach: [
      { title: "Architecture first", text: "We map content, routes and data before writing code, so the site scales without rewrites." },
      { title: "Performance budget", text: "Images, fonts and scripts are planned against Core Web Vitals targets from day one." },
      { title: "Accessible by default", text: "Semantic HTML, keyboard support and sufficient contrast are part of the build, not an afterthought." },
    ],
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Vercel"],
    idealFor: ["New businesses launching online", "Brands outgrowing a template site", "Teams needing a custom web tool"],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    icon: "graphic",
    summary:
      "Considered visual communication — social, print, campaign and presentation design that stays on-brand.",
    metaDescription:
      "Graphic design for social media, campaigns, print, packaging and presentations — consistent, on-brand visuals that communicate clearly.",
    headline: "Visuals that communicate before a word is read.",
    intro: [
      "Graphic design is how a brand shows up day to day. We create social media assets, campaign visuals, print collateral, packaging and presentation decks that feel unmistakably yours.",
      "Assets are delivered in the right formats and sizes for every channel, with editable source files and templates so your team can keep producing on-brand work.",
    ],
    deliverables: [
      "Social media post and story systems",
      "Campaign and advertising creatives",
      "Brochures, flyers and print collateral",
      "Packaging and label design",
      "Pitch decks and presentations",
      "Editable templates for in-house use",
    ],
    approach: [
      { title: "Message before style", text: "We start with what each piece needs to say and to whom, then design the hierarchy around it." },
      { title: "Systemised output", text: "Grids, type scales and reusable templates keep every asset consistent across channels." },
      { title: "Production ready", text: "Correct colour profiles, bleed and export formats for screen and print." },
    ],
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Adobe InDesign", "Canva templates"],
    idealFor: ["Brands with an active social presence", "Product and campaign launches", "Businesses needing print materials"],
  },
  {
    slug: "seo-growth",
    title: "SEO & Growth",
    icon: "seo",
    summary:
      "Technical SEO, content structure and search visibility that help the right audience find you.",
    metaDescription:
      "Technical SEO audits, on-page optimisation, structured data, local SEO and content strategy to improve organic search visibility.",
    headline: "Be found by the people already looking for you.",
    intro: [
      "Good SEO starts with a site search engines can crawl, understand and trust. We audit and fix technical foundations — indexing, performance, structured data and internal linking — then align content with what your audience actually searches for.",
      "We work transparently with Google Search Console and analytics, and we never promise rankings: we focus on the work that measurably improves visibility over time.",
    ],
    deliverables: [
      "Technical SEO audit and fixes",
      "Keyword and search intent research",
      "On-page optimisation and metadata",
      "Structured data (JSON-LD) implementation",
      "Local SEO and Google Business Profile guidance",
      "Search Console and analytics setup with reporting",
    ],
    approach: [
      { title: "Foundations first", text: "Crawlability, indexing and page speed are fixed before content is scaled." },
      { title: "Intent-led content", text: "Pages are planned around real search intent, not keyword stuffing." },
      { title: "Honest measurement", text: "Progress is tracked with Search Console data, reported clearly and without inflated claims." },
    ],
    tools: ["Google Search Console", "Google Analytics 4", "PageSpeed Insights", "Schema.org", "Screaming Frog"],
    idealFor: ["Sites with good offers but little traffic", "Local businesses", "New sites planning content"],
  },
  {
    slug: "android-development",
    title: "Android Development",
    icon: "android",
    summary:
      "Native Android applications built with Kotlin and Jetpack Compose — reliable, fast and Play Store ready.",
    metaDescription:
      "Native Android app development with Kotlin and Jetpack Compose — from prototype and UI design to Google Play release and ongoing updates.",
    headline: "Android apps people keep on their home screen.",
    intro: [
      "We build native Android applications with Kotlin and Jetpack Compose, following Google's recommended architecture so apps stay responsive, testable and easy to extend.",
      "From the first prototype to Google Play submission, we handle interface design, API integration, offline behaviour, notifications and release management.",
    ],
    deliverables: [
      "Native Android apps in Kotlin",
      "Jetpack Compose interfaces",
      "API, authentication and backend integration",
      "Offline storage and sync",
      "Push notifications and analytics",
      "Google Play listing and release support",
    ],
    approach: [
      { title: "Prototype early", text: "Clickable prototypes validate flows before engineering time is committed." },
      { title: "Modern architecture", text: "Clean, layered code with Compose, ViewModels and coroutines for long-term maintainability." },
      { title: "Release discipline", text: "Testing on real devices and staged rollouts on Google Play to launch with confidence." },
    ],
    tools: ["Kotlin", "Jetpack Compose", "Android Studio", "Firebase", "Room", "Retrofit"],
    idealFor: ["Startups validating a mobile product", "Businesses extending services to mobile", "Internal team tools"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: "uiux",
    summary:
      "Research-informed interfaces and design systems that feel intuitive and move people to act.",
    metaDescription:
      "UI/UX design for websites, web apps and mobile apps — user flows, wireframes, high-fidelity interfaces, prototypes and design systems in Figma.",
    headline: "Interfaces that feel obvious — because they were designed to.",
    intro: [
      "We design digital products around the people who use them. That means understanding goals and friction first, mapping clear flows, then crafting interfaces with a strong visual hierarchy and consistent components.",
      "Everything is prototyped in Figma, tested with real tasks and handed over as a documented design system developers can build from precisely.",
    ],
    deliverables: [
      "User flows and information architecture",
      "Wireframes and interactive prototypes",
      "High-fidelity UI for web and mobile",
      "Design systems and component libraries",
      "Usability review of existing products",
      "Developer-ready handoff",
    ],
    approach: [
      { title: "Understand the task", text: "We define what users need to accomplish and remove everything that gets in the way." },
      { title: "Systems over screens", text: "Reusable components and tokens keep large products consistent and fast to extend." },
      { title: "Validate with prototypes", text: "Interactive prototypes surface problems while they are still cheap to fix." },
    ],
    tools: ["Figma", "FigJam", "Framer", "Maze", "Design tokens"],
    idealFor: ["SaaS and dashboard products", "Apps being redesigned", "Teams needing a design system"],
  },
  {
    slug: "brand-identity",
    title: "Brand Identity",
    icon: "brand",
    summary:
      "Distinctive brand systems — strategy, logo, typography, colour and guidelines that scale everywhere.",
    metaDescription:
      "Brand identity design — positioning, logo design, colour, typography, visual language and brand guidelines for consistent use across every touchpoint.",
    headline: "A brand is a system. We design the whole system.",
    intro: [
      "A strong identity is more than a logo. We define how your brand looks, sounds and behaves — from positioning and naming support to logo, colour, typography, imagery and motion principles.",
      "The result is a coherent visual language and practical guidelines, so every website, post and printed piece reinforces the same recognisable brand.",
    ],
    deliverables: [
      "Brand discovery and positioning",
      "Logo and logo variations",
      "Colour palette and typography system",
      "Iconography and visual language",
      "Brand guidelines document",
      "Stationery and core brand applications",
    ],
    approach: [
      { title: "Strategy before symbols", text: "We clarify audience, personality and differentiation before sketching a single mark." },
      { title: "Built to flex", text: "Identities are tested across sizes, media and light or dark backgrounds." },
      { title: "Guidelines people use", text: "Clear, visual rules that make consistency easy for your team and partners." },
    ],
    tools: ["Adobe Illustrator", "Figma", "Adobe InDesign", "After Effects"],
    idealFor: ["New ventures", "Businesses repositioning or rebranding", "Brands with inconsistent visuals"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
