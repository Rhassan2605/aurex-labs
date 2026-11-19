import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

const disciplines = ["Web Development", "Graphic Design", "SEO", "Application Development"];

export function About({ showStudioLink = true }: { showStudioLink?: boolean }) {
  const { founder } = site;
  const isSvg = founder.portrait.endsWith(".svg");

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(144,101,248,0.35),transparent_65%)] blur-2xl" />
          <figure data-mask-reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-graphite">
            <div data-parallax="0.08" className="scale-[1.08]">
              <Image
                src={founder.portrait}
                alt={founder.portraitAlt}
                width={800}
                height={1000}
                sizes="(min-width: 1024px) 40vw, 90vw"
                unoptimized={isSvg}
                className="aspect-[4/5] h-auto w-full object-cover"
              />
            </div>
            <figcaption className="glass absolute inset-x-4 bottom-4 rounded-2xl px-5 py-4">
              <p className="font-display text-lg font-semibold text-pearl">{founder.name}</p>
              <p className="text-sm text-mist">{founder.role}</p>
            </figcaption>
          </figure>
        </div>

        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About the Studio"
            title={
              <>
                Independent Thinking. <span className="text-gradient">Multidisciplinary Execution.</span>
              </>
            }
          />
          <div data-reveal className="mt-8 space-y-5 text-base leading-relaxed text-mist sm:text-lg">
            <p>
              AUREX LABS is an independent studio. That means direct access to the person shaping your project, honest
              advice about what you actually need, and decisions made for your goals rather than for a sales target.
            </p>
            {founder.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <ul data-reveal className="mt-8 flex flex-wrap gap-2" aria-label="Founder disciplines">
            {disciplines.map((d) => (
              <li key={d} className="rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-1.5 text-sm text-pearl/90">
                {d}
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {showStudioLink && (
              <ButtonLink href="/studio" variant="secondary">
                More about the studio
              </ButtonLink>
            )}
            {founder.socials.length > 0 && (
              <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label={`${founder.name} on social media`}>
                {founder.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="group inline-flex items-center gap-1 text-sm text-mist transition-colors hover:text-pearl"
                    >
                      {s.label}
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
