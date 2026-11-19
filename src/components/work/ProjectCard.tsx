import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { cn } from "@/lib/utils";

export function ProjectMedia({ project, priority = false, sizes }: { project: Project; priority?: boolean; sizes?: string }) {
  const cover = project.cover;
  if (cover) {
    return (
      <Image
        src={cover.src}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <ProjectVisual kind={project.visual} accent={project.accent} title={project.title} uid={project.slug} className="h-full w-full" />
  );
}

export function ProjectCard({ project, className, headingLevel = "h3" }: { project: Project; className?: string; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className={cn("group relative", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-graphite">
        <div className="h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          <ProjectMedia project={project} sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-80" />
        {project.isSample ? (
          <SampleBadge className="absolute left-4 top-4 backdrop-blur" />
        ) : (
          !project.cover && (
            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-obsidian/60 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-pearl/80 backdrop-blur">
              Illustration
            </span>
          )
        )}
        <span
          aria-hidden
          className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-obsidian/50 text-pearl backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:border-lavender/60 group-hover:bg-electric"
        >
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-lavender">
            {project.category}
            {project.client && !project.title.startsWith(project.client) && <span className="text-mist"> · {project.client}</span>}
          </p>
          <Heading className="mt-2 font-display text-xl font-semibold text-pearl sm:text-2xl">
            <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {project.title}
            </Link>
          </Heading>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">{project.summary}</p>
        </div>
      </div>
    </article>
  );
}
