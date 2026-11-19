"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/content/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

export function WorkGallery({ projects, headingLevel = "h3" }: { projects: Project[]; headingLevel?: "h2" | "h3" }) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();

  const available = useMemo(
    () => projectCategories.filter((c) => projects.some((p) => p.category === c)),
    [projects],
  );
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const filters: Filter[] = ["All", ...available];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none]">
        <LayoutGroup id="work-filter">
          {filters.map((f) => {
            const active = f === filter;
            const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative shrink-0 rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                  active ? "border-transparent text-white" : "border-line-strong text-mist hover:text-pearl",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="work-filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(135deg,#a684ff,#9065f8_50%,#6c3ef0)]"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {f}
                <span className={cn("ml-1.5 text-xs", active ? "text-white/80" : "text-mist/70")}>{count}</span>
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {filter === "All" ? "" : ` in ${filter}`}.
      </p>

      <motion.ul layout={!reduce} className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, clipPath: "inset(10% 6% 10% 6% round 24px)" }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 0px)" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : (i % 2) * 0.08 }}
              className={cn(i % 2 === 1 && "md:mt-20")}
            >
              <ProjectCard project={project} headingLevel={headingLevel} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
