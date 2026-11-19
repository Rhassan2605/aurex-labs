import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { getInsight, insights } from "@/content/insights";

export const alt = "AUREX LABS insight article";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  return renderOgImage({ eyebrow: `Insights · ${insight?.category ?? ""}`, title: insight?.title ?? "Insights", footer: "AUREX LABS · Insights" });
}
