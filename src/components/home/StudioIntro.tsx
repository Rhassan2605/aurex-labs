import { Compass, Lightbulb, Blocks } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars = [
  {
    icon: Lightbulb,
    title: "Creativity",
    text: "Original visual thinking — typography, colour, motion and composition that make a brand feel unmistakably its own.",
  },
  {
    icon: Compass,
    title: "Strategy",
    text: "Every decision is tied to a goal: who you need to reach, what they need to understand and what should happen next.",
  },
  {
    icon: Blocks,
    title: "Technology",
    text: "Modern, well-engineered builds — fast, accessible, search-ready and maintainable long after launch.",
  },
];

export function StudioIntro() {
  return (
    <section id="studio-intro" aria-labelledby="studio-intro-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="studio-intro-title"
          eyebrow="The Studio"
          align="split"
          title={
            <>
              Not Just Digital. <span className="text-gradient">Distinctively Different.</span>
            </>
          }
          lead={
            <p>
              Most digital work is split between agencies that design and teams that build. AUREX LABS works at the
              intersection of creativity, strategy and technology — so the idea, the experience and the engineering are
              shaped together, by people who understand all three.
            </p>
          }
        />

        <div className="mt-16 grid items-center gap-12 lg:mt-20 lg:grid-cols-[0.9fr_1.1fr]">
          <figure data-reveal className="relative mx-auto w-full max-w-md" aria-label="Creativity, strategy and technology overlap at the centre">
            <svg viewBox="0 0 400 380" className="w-full" role="img" aria-labelledby="venn-title">
              <title id="venn-title">Venn diagram: creativity, strategy and technology meet at AUREX LABS</title>
              <defs>
                <radialGradient id="venn-core" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#C9B6FF" stopOpacity=".9" />
                  <stop offset="1" stopColor="#9065F8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g fill="rgba(144,101,248,0.08)" stroke="rgba(201,182,255,0.45)" strokeWidth="1.2">
                <circle cx="200" cy="135" r="110" />
                <circle cx="135" cy="245" r="110" />
                <circle cx="265" cy="245" r="110" />
              </g>
              <circle cx="200" cy="208" r="44" fill="url(#venn-core)" />
              <g fill="#F5F3FA" fontSize="15" fontFamily="var(--font-display)" textAnchor="middle" letterSpacing="2">
                <text x="200" y="88">CREATIVITY</text>
                <text x="105" y="300">STRATEGY</text>
                <text x="295" y="300">TECHNOLOGY</text>
              </g>
              <text x="200" y="214" textAnchor="middle" fill="#090A0F" fontSize="13" fontWeight="700" fontFamily="var(--font-display)" letterSpacing="1.5">
                AUREX
              </text>
            </svg>
          </figure>

          <ul className="grid gap-4">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                data-reveal
                className="surface group flex gap-5 rounded-2xl p-6 transition-colors duration-500 hover:border-lavender/25 sm:p-7"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-electric/10 text-lavender">
                  <Icon aria-hidden className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="flex items-baseline gap-3 font-display text-xl font-semibold text-pearl">
                    <span className="text-xs font-normal text-mist">0{i + 1}</span>
                    {title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-mist">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
