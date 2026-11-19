import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { WorkGallery } from "@/components/work/WorkGallery";
import { FinalCta } from "@/components/home/FinalCta";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Selected Work — Websites, Apps, Brands & UI/UX",
  description:
    "Browse AUREX LABS project concepts across websites, Android apps, UI/UX, branding, graphic design and SEO — with case studies covering challenge, solution and stack.",
  path: "/work",
});

export default function WorkPage() {
  const hasSamples = projects.some((p) => p.isSample);
  return (
    <>
      <PageHeader
        eyebrow="Selected Work"
        crumbs={[{ name: "Selected Work", path: "/work" }]}
        title={
          <>
            Crafted With Purpose. <span className="text-gradient">Built to Make an Impact.</span>
          </>
        }
        lead={<p>Filter by discipline and open any project for the full case study — the challenge, our thinking, the stack and the goals behind it.</p>}
      >
        {hasSamples && (
          <p className="flex max-w-2xl gap-3 rounded-2xl border border-amber-200/20 bg-amber-200/[0.06] p-4 text-sm leading-relaxed text-amber-50/90">
            <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" />
            <span>
              Projects marked <strong className="font-semibold">Sample project</strong> are studio concepts created to
              demonstrate our process. They are not client engagements and show design goals rather than measured
              results.
            </span>
          </p>
        )}
      </PageHeader>

      <section aria-label="Project gallery" className="pb-12">
        <div className="container-x">
          <WorkGallery projects={projects} headingLevel="h2" />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
