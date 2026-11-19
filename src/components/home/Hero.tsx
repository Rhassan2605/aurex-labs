import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Emblem } from "@/components/brand/Emblem";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/content/services";

const headline = ["We", "Create", "Digital", "Experiences", "That", "Define"];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-[calc(var(--header-h)+3.5rem)] lg:pb-24"
    >
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_35%,rgba(144,101,248,0.22),transparent_70%),radial-gradient(40%_40%_at_10%_90%,rgba(91,47,214,0.16),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(70%_60%_at_60%_40%,#000_30%,transparent_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-obsidian" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div>
          <p className="rise mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-1.5 text-xs text-pearl/90 backdrop-blur" style={{ ["--i" as string]: 0 }}>
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lavender" />
            </span>
            Independent Creative Technology Studio
          </p>

          <h1
            id="hero-title"
            className="font-display text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.035em] text-pearl sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]"
          >
            {headline.map((word, i) => (
              <span key={word} className="rise mr-[0.22em] inline-block" style={{ ["--i" as string]: i + 1 }}>
                {word}
              </span>
            ))}
            <span className="rise inline-block text-gradient" style={{ ["--i" as string]: headline.length + 1 }}>
              Tomorrow.
            </span>
          </h1>

          <p
            className="rise mt-7 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
            style={{ ["--i" as string]: headline.length + 3 }}
          >
            An independent creative technology studio crafting powerful websites, distinctive brands, intuitive
            applications and meaningful digital growth.
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ ["--i" as string]: headline.length + 4 }}>
            <ButtonLink href="/contact" size="lg">
              Start a Project
            </ButtonLink>
            <ButtonLink href="/work" size="lg" variant="secondary">
              Explore Our Work
            </ButtonLink>
          </div>

          <ul
            aria-label="Disciplines"
            className="rise mt-12 flex flex-wrap gap-2"
            style={{ ["--i" as string]: headline.length + 5 }}
          >
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/expertise/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-xs text-mist transition-colors hover:border-lavender/40 hover:text-pearl"
                >
                  <ServiceIcon kind={s.icon} className="h-3.5 w-3.5 text-lavender" />
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative" data-parallax="0.18">
          <Emblem />
        </div>
      </div>

      <a
        href="#studio-intro"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-mist transition-colors hover:text-pearl md:flex"
      >
        Scroll to explore
        <ArrowDown aria-hidden className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
