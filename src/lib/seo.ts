import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the root title template ("%s — AUREX LABS"). Default true. */
  template?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/** Builds unique, canonical metadata for a page. */
export function pageMetadata({
  title,
  description,
  path,
  template = true,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const fullTitle = template ? `${title} — ${site.name}` : title;
  return {
    title: template ? title : { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: site.locale,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
