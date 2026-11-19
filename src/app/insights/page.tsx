import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/home/FinalCta";
import { insights, readingTime } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Insights — Notes on Web, Brand, Apps & Search",
  description:
    "Practical articles from AUREX LABS on website performance, Core Web Vitals, brand identity systems, Android development and SEO.",
  path: "/insights",
});

export default function InsightsPage() {
  const sorted = [...insights].sort((a, b) => b.published.localeCompare(a.published));
  const [featured, ...rest] = sorted;

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        crumbs={[{ name: "Insights", path: "/insights" }]}
        title={
          <>
            Notes From the <span className="text-gradient">Studio.</span>
          </>
        }
        lead={<p>Clear, practical thinking on building better websites, brands and digital products.</p>}
      />

      <section aria-label="Articles" className="pb-12">
        <div className="container-x grid gap-6">
          {featured && (
            <article data-reveal className="surface group relative overflow-hidden rounded-[2rem] p-8 transition-colors hover:border-lavender/30 sm:p-12">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-electric/25 blur-3xl" />
              <p className="relative text-xs uppercase tracking-[0.18em] text-lavender">
                Latest · {featured.category}
              </p>
              <h2 className="relative mt-5 max-w-3xl font-display text-3xl font-semibold leading-tight text-pearl sm:text-5xl">
                <Link href={`/insights/${featured.slug}`} className="after:absolute after:inset-0 after:content-['']">
                  {featured.title}
                </Link>
              </h2>
              <p className="relative mt-5 max-w-2xl text-lg leading-relaxed text-mist">{featured.excerpt}</p>
              <p className="relative mt-8 flex items-center gap-3 text-sm text-mist">
                <time dateTime={featured.published}>{formatDate(featured.published)}</time>
                <span aria-hidden>·</span>
                {readingTime(featured)} min read
                <ArrowUpRight aria-hidden className="ml-auto h-5 w-5 text-pearl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </p>
            </article>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((insight) => (
              <article key={insight.slug} data-reveal className="surface group relative flex flex-col rounded-3xl p-7 transition-colors hover:border-lavender/30 sm:p-9">
                <p className="text-xs uppercase tracking-[0.18em] text-lavender">{insight.category}</p>
                <h2 className="mt-4 font-display text-2xl font-semibold leading-snug text-pearl">
                  <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {insight.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-mist">{insight.excerpt}</p>
                <p className="mt-8 flex items-center gap-3 text-sm text-mist">
                  <time dateTime={insight.published}>{formatDate(insight.published)}</time>
                  <span aria-hidden>·</span>
                  {readingTime(insight)} min read
                  <ArrowUpRight aria-hidden className="ml-auto h-5 w-5 text-pearl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
