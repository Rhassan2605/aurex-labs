import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StudioIntro } from "@/components/home/StudioIntro";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Process } from "@/components/home/Process";
import { About } from "@/components/home/About";
import { FinalCta } from "@/components/home/FinalCta";
import { WorkGallery } from "@/components/work/WorkGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Creative Technology Studio for Web, Brand, Apps & SEO`,
  description: site.description,
  path: "/",
  template: false,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <StudioIntro />
      <ServicesGrid />

      <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            id="work-title"
            eyebrow="Selected Work"
            align="split"
            title={
              <>
                Crafted With Purpose. <span className="text-gradient">Built to Make an Impact.</span>
              </>
            }
            lead={
              <p>
                A look at how we approach different kinds of work. The projects shown are clearly labelled sample
                concepts that demonstrate our process — real client case studies will be published here as they are
                approved.
              </p>
            }
          />
          <div className="mt-14">
            <WorkGallery projects={projects} />
          </div>
          <div data-reveal className="mt-16 flex justify-center">
            <ButtonLink href="/work" variant="secondary" size="lg">
              View all work
            </ButtonLink>
          </div>
        </div>
      </section>

      <Process />
      <About />
      <FinalCta />
    </>
  );
}
