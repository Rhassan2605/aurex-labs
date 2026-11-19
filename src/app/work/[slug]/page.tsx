import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Info, Target } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/home/FinalCta";
import { ProjectMedia } from "@/components/work/ProjectCard";
import { ProjectPhoneVisual } from "@/components/work/ProjectVisual";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { projectSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.isSample ? `${project.title} (Sample Concept)` : `${project.title} — Case Study`,
    description: project.metaDescription,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const showResponsive = project.isSample || Boolean(project.mobile);
  const solutionHeading = project.challenge ? "The solution" : "What we delivered";

  const facts: { term: string; value: string }[] = [
    ...(project.client ? [{ term: "Client", value: project.client }] : [{ term: "Discipline", value: project.category }]),
    { term: "Services", value: project.services.join(", ") },
    ...(project.stack?.length ? [{ term: "Stack", value: project.stack.slice(0, 3).join(", ") }] : []),
  ];

  return (
    <>
      <PageHeader
        eyebrow={project.category}
        crumbs={[
          { name: "Selected Work", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` },
        ]}
        title={project.title}
        lead={<p>{project.summary}</p>}
      >
        <div className="flex flex-col gap-8">
          {project.isSample && <SampleBadge className="self-start" />}
          {project.liveUrl && (
            <div>
              <ButtonLink href={project.liveUrl} icon="external" variant="secondary">
                {project.liveLabel ?? "View live project"}
              </ButtonLink>
            </div>
          )}
          <dl className={`grid gap-6 border-t border-line pt-8 ${facts.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {facts.map((f) => (
              <div key={f.term}>
                <dt className="eyebrow text-[0.68rem]">{f.term}</dt>
                <dd className="mt-2 text-pearl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PageHeader>

      {/* Hero visual with masked reveal */}
      <section aria-label="Project preview" className="pb-8">
        <div className="container-x">
          <div data-mask-reveal className="overflow-hidden rounded-[2rem] border border-line bg-graphite">
            <div className="aspect-[16/10] w-full">
              <ProjectMedia project={project} priority sizes="(min-width: 1280px) 1200px, 100vw" />
            </div>
          </div>
          {!project.cover && (
            <p className="mt-3 text-xs text-mist">
              {project.isSample
                ? "Illustrated concept visual. Screens are representative, not a live product."
                : "Illustration — project screenshots will be added soon."}
            </p>
          )}
        </div>
      </section>

      <section aria-labelledby="overview-title" className="py-16 sm:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div data-reveal>
            <h2 id="overview-title" className="eyebrow">Overview</h2>
            <p className="mt-5 font-display text-2xl leading-snug text-pearl sm:text-3xl">{project.overview}</p>
            {project.credit && <p className="mt-6 text-sm leading-relaxed text-mist">{project.credit}</p>}
          </div>
          <div className="grid content-start gap-12">
            {project.challenge && (
              <div data-reveal>
                <h2 className="font-display text-2xl font-semibold text-pearl">The challenge</h2>
                <p className="mt-4 text-lg leading-relaxed text-mist">{project.challenge}</p>
              </div>
            )}
            {project.solution?.length ? (
              <div data-reveal>
                <h2 className="font-display text-2xl font-semibold text-pearl">{solutionHeading}</h2>
                <ul className="mt-5 grid gap-4">
                  {project.solution.map((s) => (
                    <li key={s.slice(0, 24)} className="flex gap-3 text-lg leading-relaxed text-mist">
                      <Check aria-hidden className="mt-1.5 h-4 w-4 shrink-0 text-lavender" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {project.metrics?.length ? (
        <section aria-labelledby="metrics-title" className="py-12 sm:py-16">
          <div className="container-x">
            <h2 id="metrics-title" className="eyebrow">Results</h2>
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
              {project.metrics.map((m) => (
                <div key={m.label} data-reveal className="flex flex-col-reverse bg-obsidian p-7 sm:p-9">
                  <dt className="mt-3 text-sm text-mist">{m.label}</dt>
                  <dd className="font-display text-5xl font-semibold text-gradient sm:text-6xl">{m.value}</dd>
                </div>
              ))}
            </dl>
            {project.metricsNote && <p className="mt-3 text-xs text-mist">{project.metricsNote}</p>}
          </div>
        </section>
      ) : null}

      {project.gallery?.length ? (
        <section aria-labelledby="gallery-title" className="py-16 sm:py-24">
          <div className="container-x">
            <h2 id="gallery-title" data-reveal className="font-display text-3xl font-semibold text-pearl sm:text-4xl">
              The work
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {project.gallery.map((img) => (
                <li key={img.src} data-reveal className="overflow-hidden rounded-2xl border border-line bg-graphite">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="h-auto w-full"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Responsive showcase */}
      {showResponsive && (
        <section aria-labelledby="responsive-title" className="py-16 sm:py-24">
          <div className="container-x">
            <h2 id="responsive-title" data-reveal className="font-display text-3xl font-semibold text-pearl sm:text-4xl">
              Designed for every screen
            </h2>
            <p data-reveal className="mt-4 max-w-xl text-mist">
              Layouts adapt fluidly from phones up to large desktop displays.
            </p>
            <div className="mt-12 grid items-end gap-6 md:grid-cols-[1fr_auto]">
              <figure data-reveal className="overflow-hidden rounded-3xl border border-line bg-graphite">
                <div className="aspect-[16/10]">
                  <ProjectMedia project={project} sizes="(min-width: 768px) 70vw, 100vw" />
                </div>
                <figcaption className="border-t border-line px-5 py-3 text-xs text-mist">Desktop</figcaption>
              </figure>
              <figure data-reveal className="mx-auto w-[min(260px,70vw)] md:w-[240px]">
                <div className="overflow-hidden rounded-[2.2rem] border-[6px] border-[#07080c] bg-graphite shadow-[0_30px_80px_-30px_rgba(144,101,248,0.6)] ring-1 ring-line">
                  {project.mobile ? (
                    <div className="aspect-[390/800] overflow-hidden">
                      <Image
                        src={project.mobile.src}
                        alt={project.mobile.alt}
                        width={project.mobile.width}
                        height={project.mobile.height}
                        sizes="260px"
                        className="h-auto w-full"
                      />
                    </div>
                  ) : (
                    <ProjectPhoneVisual kind={project.visual} accent={project.accent} title={project.title} className="h-auto w-full" />
                  )}
                </div>
                <figcaption className="mt-3 text-center text-xs text-mist">Mobile</figcaption>
              </figure>
            </div>
          </div>
        </section>
      )}

      {(project.stack?.length || project.outcomes?.length) && (
        <section aria-label="Stack and outcomes" className="py-16 sm:py-24">
          <div className={`container-x grid gap-6 ${project.stack?.length && project.outcomes?.length ? "lg:grid-cols-2" : ""}`}>
            {project.stack?.length ? (
              <div data-reveal className="surface rounded-3xl p-7 sm:p-10">
                <h2 className="eyebrow">Tech stack &amp; tools</h2>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <li key={t} className="rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-1.5 text-sm text-pearl/90">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {project.outcomes?.length ? (
              <div data-reveal className="surface rounded-3xl p-7 sm:p-10">
                <h2 className="eyebrow">{project.isSample ? "Design goals" : "Outcomes"}</h2>
                <ul className="mt-6 grid gap-4">
                  {project.outcomes.map((o) => (
                    <li key={o} className="flex gap-3 text-pearl/90">
                      <Target aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-lavender" />
                      {o}
                    </li>
                  ))}
                </ul>
                {project.isSample && (
                  <p className="mt-8 flex gap-2.5 rounded-xl border border-amber-200/20 bg-amber-200/[0.06] p-4 text-sm leading-relaxed text-amber-50/90">
                    <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" />
                    This is a sample concept. The goals above describe what the concept is designed to achieve — they are
                    not measured client results.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </section>
      )}

      <nav aria-label="More projects" className="py-12">
        <div className="container-x grid gap-4 sm:grid-cols-2">
          <Link href={`/work/${prev.slug}`} className="surface group rounded-3xl p-7 transition-colors hover:border-lavender/30">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-mist">
              <ArrowLeft aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Previous
            </span>
            <span className="mt-3 block font-display text-xl font-semibold text-pearl">{prev.title}</span>
          </Link>
          <Link href={`/work/${next.slug}`} className="surface group rounded-3xl p-7 text-right transition-colors hover:border-lavender/30">
            <span className="flex items-center justify-end gap-2 text-xs uppercase tracking-[0.18em] text-mist">
              Next <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-3 block font-display text-xl font-semibold text-pearl">{next.title}</span>
          </Link>
        </div>
      </nav>

      <FinalCta />
      <JsonLd data={projectSchema(project)} />
    </>
  );
}
