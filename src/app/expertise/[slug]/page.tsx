import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/home/FinalCta";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getService, services } from "@/content/services";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: `${service.title} Services`, description: service.metaDescription, path: `/expertise/${service.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = projects.filter((p) => p.services.includes(service.title)).slice(0, 2);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow={service.title}
        crumbs={[
          { name: "Expertise", path: "/expertise" },
          { name: service.title, path: `/expertise/${service.slug}` },
        ]}
        title={service.headline}
        lead={<p>{service.summary}</p>}
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={`/contact?service=${encodeURIComponent(service.title)}`} size="lg">
            Discuss your project
          </ButtonLink>
          <ButtonLink href="/work" size="lg" variant="secondary">
            See selected work
          </ButtonLink>
        </div>
      </PageHeader>

      <section aria-labelledby="overview-title" className="py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div data-reveal>
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line-strong bg-gradient-to-br from-electric/25 to-transparent text-lavender">
              <ServiceIcon kind={service.icon} className="h-7 w-7" />
            </span>
            <h2 id="overview-title" className="mt-8 font-display text-3xl font-semibold text-pearl sm:text-4xl">
              What this service covers
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-mist">
              {service.intro.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </div>
          <div data-reveal className="surface rounded-3xl p-7 sm:p-10">
            <h3 className="eyebrow">What&apos;s included</h3>
            <ul className="mt-6 grid gap-4">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 border-b border-line pb-4 text-pearl/90 last:border-0 last:pb-0">
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-lavender" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading id="approach-title" eyebrow="Approach" title="How we approach it" />
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {service.approach.map((a, i) => (
              <li key={a.title} data-reveal className="surface rounded-3xl p-7 sm:p-8">
                <span className="font-display text-sm text-lavender">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-pearl">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{a.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div data-reveal className="surface rounded-3xl p-7 sm:p-8">
              <h3 className="eyebrow">Tools &amp; technology</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.tools.map((t) => (
                  <li key={t} className="rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-1.5 text-sm text-pearl/90">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal className="surface rounded-3xl p-7 sm:p-8">
              <h3 className="eyebrow">A great fit for</h3>
              <ul className="mt-5 grid gap-3">
                {service.idealFor.map((t) => (
                  <li key={t} className="flex gap-3 text-pearl/90">
                    <ArrowRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-lavender" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="py-16 sm:py-24">
          <div className="container-x">
            <SectionHeading id="related-title" eyebrow="Related work" title="Concepts in this discipline" />
            <ul className="mt-12 grid gap-10 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug} data-reveal>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="other-title" className="py-16">
        <div className="container-x">
          <h2 id="other-title" className="eyebrow">Other disciplines</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/expertise/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-mist transition-colors hover:border-lavender/50 hover:text-pearl"
                >
                  <ServiceIcon kind={s.icon} className="h-4 w-4 text-lavender" />
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Ready to talk about <span className="text-gradient">{service.title}?</span>
          </>
        }
      />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
