/**
 * Editable Insights articles. Body content is an ordered list of blocks so it
 * can be server-rendered without a CMS or MDX dependency.
 */

export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  updated?: string;
  body: InsightBlock[];
};

export const insights: Insight[] = [
  {
    slug: "what-a-fast-website-means-core-web-vitals",
    title: "What a “Fast Website” Actually Means: A Practical Guide to Core Web Vitals",
    excerpt:
      "Speed is not a feeling — Google measures it with three specific metrics. Here is what they are, the thresholds that matter and the fixes that move them.",
    category: "Web Development",
    published: "2026-11-02",
    body: [
      { type: "p", text: "When clients ask for a fast website, they usually mean one that feels instant. Google turns that feeling into three measurable signals called Core Web Vitals, collected from real visitors using Chrome. They are part of how page experience is assessed, and more importantly they track closely with whether people stay or leave." },
      { type: "h2", text: "The three metrics" },
      { type: "ul", items: [
        "Largest Contentful Paint (LCP) — how long the main content takes to appear. Aim for 2.5 seconds or less.",
        "Interaction to Next Paint (INP) — how quickly the page responds to taps, clicks and key presses. Aim for 200 milliseconds or less.",
        "Cumulative Layout Shift (CLS) — how much the layout jumps while loading. Aim for 0.1 or less.",
      ] },
      { type: "p", text: "Google evaluates these at the 75th percentile of page loads, so a page passes only when most real visits — including those on mid-range phones and patchy connections — meet the target." },
      { type: "h2", text: "Fixes that make the biggest difference" },
      { type: "ul", items: [
        "Serve images in modern formats such as AVIF or WebP, at the size they are displayed, with explicit width and height.",
        "Self-host fonts, preload only what is needed above the fold and use font-display swap.",
        "Render important text on the server so it is visible before JavaScript runs.",
        "Ship less JavaScript: load heavy widgets only when they are needed and avoid third-party scripts you cannot justify.",
        "Reserve space for anything that loads late — embeds, banners, ads — so content never jumps.",
      ] },
      { type: "h2", text: "Measure, then optimise" },
      { type: "p", text: "Lab tools such as Lighthouse are useful for debugging, but field data is what counts. Check the Core Web Vitals report in Google Search Console and PageSpeed Insights for real-user data, fix the worst page templates first, and re-check after each release." },
      { type: "quote", text: "Performance is a feature your visitors notice in the first second — and every second after." },
    ],
  },
  {
    slug: "brand-identity-is-a-system-not-a-logo",
    title: "Brand Identity Is a System, Not a Logo",
    excerpt:
      "A logo is one part of a brand. The parts around it — colour, type, imagery, tone and rules — are what make a business recognisable everywhere.",
    category: "Brand Identity",
    published: "2026-10-14",
    body: [
      { type: "p", text: "Many businesses start a rebrand by asking for a new logo. It is understandable: the logo is the most visible piece. But people rarely recognise a brand from its logo alone. They recognise the colour on a shelf, the rhythm of a social feed, the tone of an email. Those things come from a system." },
      { type: "h2", text: "What a complete identity includes" },
      { type: "ul", items: [
        "Strategy — who the brand is for, what it stands for and how it differs.",
        "Logo suite — primary mark, wordmark, icon and versions for light, dark and single-colour use.",
        "Colour — a defined palette with accessible combinations for text and backgrounds.",
        "Typography — typefaces and a scale for headings, body text and data.",
        "Visual language — imagery style, iconography, illustration, layout grids and motion.",
        "Guidelines — practical rules and examples so anyone can apply the brand correctly.",
      ] },
      { type: "h2", text: "Why systems scale" },
      { type: "p", text: "A system makes good decisions repeatable. When a new campaign, product or page is needed, the team is not starting from a blank canvas; they are combining parts that already work together. That is what produces consistency without making every asset look identical." },
      { type: "h2", text: "Test the identity in real places" },
      { type: "p", text: "Before an identity is finalised, put it where it will actually live: a favicon at 16 pixels, a mobile app icon, a dark-mode interface, a printed card and a social story. Any weakness shows up quickly, and fixing it at this stage costs far less than after launch." },
    ],
  },
  {
    slug: "native-android-or-cross-platform",
    title: "Native Android or Cross-Platform? How to Choose for Your First App",
    excerpt:
      "Kotlin with Jetpack Compose, Flutter or React Native — the right choice depends on your audience, features and team, not on trends.",
    category: "Android Development",
    published: "2026-09-22",
    body: [
      { type: "p", text: "One of the first decisions in any app project is how to build it. Native Android development uses Kotlin and Jetpack Compose. Cross-platform frameworks such as Flutter and React Native let one codebase target both Android and iOS. Each is a good choice in the right situation." },
      { type: "h2", text: "When native Android makes sense" },
      { type: "ul", items: [
        "Your audience is mostly on Android, or you want to launch there first.",
        "The app relies on device features such as background work, sensors, Bluetooth or deep system integration.",
        "Performance, battery use and a fully platform-consistent feel are priorities.",
        "You want direct access to new Android APIs as soon as they are released.",
      ] },
      { type: "h2", text: "When cross-platform makes sense" },
      { type: "ul", items: [
        "You need both Android and iOS at launch with a limited budget.",
        "The app is mostly forms, content and standard interface patterns.",
        "Your team already works in JavaScript or Dart.",
      ] },
      { type: "h2", text: "Questions to ask before deciding" },
      { type: "p", text: "Who are your users and which devices do they use? Which features are essential for version one? Who will maintain the app after launch? Answering these honestly usually makes the technical choice obvious, and it keeps the first release focused on what users need." },
      { type: "quote", text: "Choose the technology that serves the product — not the other way round." },
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}

export function readingTime(insight: Insight): number {
  const words = insight.body
    .map((block) => (block.type === "ul" ? block.items.join(" ") : block.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
