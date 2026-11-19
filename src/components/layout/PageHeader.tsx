import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

type Crumb = { name: string; path: string };

export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
  className?: string;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className={cn("relative isolate overflow-hidden pb-14 pt-[calc(var(--header-h)+3.5rem)] sm:pb-20 sm:pt-[calc(var(--header-h)+5rem)]", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_80%_0%,rgba(144,101,248,0.22),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(60%_70%_at_70%_0%,#000_20%,transparent_75%)]" />
      </div>
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="rise mb-8" style={{ ["--i" as string]: 0 }}>
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-mist">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight aria-hidden className="h-3 w-3 opacity-60" />}
                {i === all.length - 1 ? (
                  <span aria-current="page" className="text-pearl/90">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="transition-colors hover:text-pearl">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow rise mb-5 flex items-center gap-3" style={{ ["--i" as string]: 1 }}>
          <span aria-hidden className="h-px w-8 bg-gradient-to-r from-electric to-transparent" />
          {eyebrow}
        </p>
        <h1
          className="rise max-w-4xl font-display text-[2.5rem] font-semibold leading-[1.03] tracking-[-0.03em] text-pearl sm:text-6xl lg:text-7xl"
          style={{ ["--i" as string]: 2 }}
        >
          {title}
        </h1>
        {lead && (
          <div className="rise mt-7 max-w-2xl text-base leading-relaxed text-mist sm:text-lg" style={{ ["--i" as string]: 3 }}>
            {lead}
          </div>
        )}
        {children && (
          <div className="rise mt-10" style={{ ["--i" as string]: 4 }}>
            {children}
          </div>
        )}
      </div>
      <JsonLd data={breadcrumbSchema(all)} />
    </section>
  );
}
