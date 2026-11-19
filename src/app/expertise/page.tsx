import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Process } from "@/components/home/Process";
import { FinalCta } from "@/components/home/FinalCta";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Expertise — Web, Design, SEO, Android, UI/UX & Brand",
  description:
    "Explore AUREX LABS services: web development, graphic design, SEO & growth, Android development, UI/UX design and brand identity — delivered by one studio.",
  path: "/expertise",
});

export default function ExpertisePage() {
  return (
    <>
      <PageHeader
        eyebrow="Expertise"
        crumbs={[{ name: "Expertise", path: "/expertise" }]}
        title={
          <>
            One Studio. Multiple Disciplines. <span className="text-gradient">Endless Possibilities.</span>
          </>
        }
        lead={
          <p>
            Strategy, design and engineering under one roof. Choose a single discipline or combine them — every
            service shares the same standard of craft, performance and clarity.
          </p>
        }
      />

      <section aria-label="Services" className="pb-12">
        <div className="container-x">
          <ol className="divide-y divide-line border-y border-line">
            {services.map((service, i) => (
              <li key={service.slug} data-reveal className="group grid gap-8 py-12 lg:grid-cols-[0.2fr_1fr_1fr] lg:gap-12 lg:py-16">
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <span className="font-display text-sm text-mist">0{i + 1}</span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line-strong bg-gradient-to-br from-electric/20 to-transparent text-lavender">
                    <ServiceIcon kind={service.icon} className="h-6 w-6" />
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-3xl font-semibold text-pearl sm:text-4xl">
                    <Link href={`/expertise/${service.slug}`} className="transition-colors hover:text-lavender">
                      {service.title}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-mist">{service.summary}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href={`/expertise/${service.slug}`} variant="secondary">
                      Explore {service.title}
                    </ButtonLink>
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex h-11 items-center gap-1.5 px-2 text-sm text-mist transition-colors hover:text-pearl"
                    >
                      Inquire <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <ul className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1" aria-label={`${service.title} deliverables`}>
                  {service.deliverables.slice(0, 5).map((d) => (
                    <li key={d} className="flex gap-3 text-sm leading-relaxed text-pearl/85">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-lavender" />
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Process />
      <FinalCta />
    </>
  );
}
