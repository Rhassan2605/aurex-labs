import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { getInsight, insights, readingTime, type InsightBlock } from "@/content/insights";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return pageMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${insight.slug}`,
    type: "article",
    publishedTime: insight.published,
    modifiedTime: insight.updated ?? insight.published,
  });
}

function Block({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-14 font-display text-2xl font-semibold text-pearl sm:text-3xl">{block.text}</h2>;
    case "ul":
      return (
        <ul className="mt-6 grid gap-3">
          {block.items.map((item) => (
            <li key={item.slice(0, 30)} className="relative pl-6 text-lg leading-relaxed text-pearl/80 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-electric">
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-12 border-l-2 border-electric pl-6 font-display text-2xl leading-snug text-pearl sm:text-3xl">
          {block.text}
        </blockquote>
      );
    default:
      return <p className="mt-6 text-lg leading-[1.8] text-pearl/80">{block.text}</p>;
  }
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  const more = insights.filter((i) => i.slug !== insight.slug).slice(0, 2);
  const isSvg = site.founder.portrait.endsWith(".svg");

  return (
    <>
      <PageHeader
        eyebrow={insight.category}
        crumbs={[
          { name: "Insights", path: "/insights" },
          { name: insight.title, path: `/insights/${insight.slug}` },
        ]}
        title={insight.title}
        lead={<p>{insight.excerpt}</p>}
      >
        <div className="flex items-center gap-4">
          <Image
            src={site.founder.portrait}
            alt=""
            width={48}
            height={48}
            unoptimized={isSvg}
            className="h-12 w-12 rounded-full border border-line-strong object-cover"
          />
          <div className="text-sm">
            <p className="text-pearl">{site.founder.name}</p>
            <p className="text-mist">
              <time dateTime={insight.published}>{formatDate(insight.published)}</time> · {readingTime(insight)} min read
            </p>
          </div>
        </div>
      </PageHeader>

      <article className="pb-16">
        <div className="container-x">
          <div className="mx-auto max-w-[44rem] border-t border-line pt-6">
            {insight.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
            <div className="mt-16 border-t border-line pt-8">
              <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-pearl">
                <ArrowLeft aria-hidden className="h-4 w-4" /> All insights
              </Link>
            </div>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="py-12">
          <div className="container-x">
            <h2 id="more-title" className="eyebrow">Keep reading</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {more.map((m) => (
                <li key={m.slug}>
                  <Link href={`/insights/${m.slug}`} className="surface block h-full rounded-3xl p-7 transition-colors hover:border-lavender/30">
                    <span className="text-xs uppercase tracking-[0.18em] text-lavender">{m.category}</span>
                    <span className="mt-3 block font-display text-xl font-semibold leading-snug text-pearl">{m.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta />
      <JsonLd data={articleSchema(insight)} />
    </>
  );
}
