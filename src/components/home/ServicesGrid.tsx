import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/content/services";

export function ServicesGrid({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="expertise" aria-labelledby="services-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_20%_40%,rgba(144,101,248,0.10),transparent)]" />
      <div className="container-x">
        <SectionHeading
          id="services-title"
          as={headingLevel}
          eyebrow="Expertise"
          align="split"
          title={
            <>
              One Studio. Multiple Disciplines. <span className="text-gradient">Endless Possibilities.</span>
            </>
          }
          lead={
            <p>
              Six connected disciplines, one consistent standard. Engage us for a single service or bring them together
              for a launch where brand, design and technology move as one.
            </p>
          }
        />

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {services.map((service, i) => (
            <li
              key={service.slug}
              data-reveal
              className="surface group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-lavender/30 sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-electric/25 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />
              <div className="flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line-strong bg-gradient-to-br from-electric/20 to-transparent text-lavender">
                  <ServiceIcon kind={service.icon} className="h-6 w-6" />
                </span>
                <span className="font-display text-sm text-mist/70">0{i + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-semibold text-pearl">
                <Link href={`/expertise/${service.slug}`} className="after:absolute after:inset-0 after:content-['']">
                  {service.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-mist">{service.summary}</p>
              <div className="mt-8 flex items-center justify-between border-t border-line pt-5 text-sm">
                <span className="inline-flex items-center gap-1.5 text-pearl transition-colors group-hover:text-lavender">
                  Explore service
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="relative z-10 inline-flex items-center gap-1 rounded-full border border-line-strong px-3 py-1.5 text-xs text-pearl transition-colors hover:border-lavender/60 hover:bg-electric/15"
                  aria-label={`Inquire about ${service.title}`}
                >
                  Inquire
                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
