import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { insights } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url("/expertise"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/work"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/studio"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: url("/insights"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/brand"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: url("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
  return [
    ...staticRoutes,
    ...services.map((s) => ({ url: url(`/expertise/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...projects.map((p) => ({ url: url(`/work/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: p.isSample ? 0.5 : 0.7 })),
    ...insights.map((i) => ({ url: url(`/insights/${i.slug}`), lastModified: new Date(i.updated ?? i.published), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
