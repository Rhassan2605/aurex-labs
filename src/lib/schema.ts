import { site } from "@/content/site";
import type { Service } from "@/content/services";
import type { Project } from "@/content/projects";
import type { Insight } from "@/content/insights";
import { absoluteUrl } from "@/lib/utils";

/** JSON-LD builders. Only facts that are true are included — no addresses, ratings or invented metrics. */

const orgId = `${site.url}/#organization`;
const personId = `${site.url}/#founder`;

export function organizationSchema() {
  const sameAs = site.socials.map((s) => s.href);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        url: site.url,
        logo: absoluteUrl("/brand/aurex-mark.svg"),
        slogan: site.tagline,
        description: site.description,
        founder: { "@id": personId },
        knowsAbout: ["Web development", "Graphic design", "Search engine optimization", "Android app development", "UI/UX design", "Brand identity"],
        ...(site.contact.email ? { email: site.contact.email } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
    ],
  };
}

export function personSchema() {
  const sameAs = site.founder.socials.map((s) => s.href);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.founder.name,
    jobTitle: site.founder.role,
    worksFor: { "@id": orgId },
    image: absoluteUrl(site.founder.portrait),
    knowsAbout: ["Web development", "Graphic design", "SEO", "Application development"],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: absoluteUrl(`/expertise/${service.slug}`),
    provider: { "@id": orgId },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} deliverables`,
      itemListElement: service.deliverables.map((d) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: d } })),
    },
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.isSample ? `${project.title} (sample concept)` : project.title,
    description: project.metaDescription,
    url: absoluteUrl(`/work/${project.slug}`),
    creator: { "@id": orgId },
    genre: project.category,
    keywords: project.stack.join(", "),
    ...(project.images?.[0] ? { image: absoluteUrl(project.images[0].src) } : {}),
  };
}

export function articleSchema(insight: Insight) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.published,
    dateModified: insight.updated ?? insight.published,
    url: absoluteUrl(`/insights/${insight.slug}`),
    mainEntityOfPage: absoluteUrl(`/insights/${insight.slug}`),
    author: { "@type": "Person", "@id": personId, name: site.founder.name },
    publisher: { "@id": orgId },
    articleSection: insight.category,
    image: absoluteUrl(`/insights/${insight.slug}/opengraph-image`),
  };
}
