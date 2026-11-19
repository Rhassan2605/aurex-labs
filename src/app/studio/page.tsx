import type { Metadata } from "next";
import { Eye, Gauge, HeartHandshake, Layers } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { About } from "@/components/home/About";
import { StudioIntro } from "@/components/home/StudioIntro";
import { Process } from "@/components/home/Process";
import { FinalCta } from "@/components/home/FinalCta";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { personSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Studio — Independent Creative Technology Studio",
  description: `Meet AUREX LABS, an independent creative technology studio founded by ${site.founder.name}, working across web development, graphic design, SEO and application development.`,
  path: "/studio",
});

const principles = [
  { icon: Eye, title: "Clarity over noise", text: "Every page, screen and asset should make one thing obvious. We remove what does not serve the goal." },
  { icon: Gauge, title: "Performance is design", text: "Speed, accessibility and stability are part of the experience, so we design and build against real budgets." },
  { icon: Layers, title: "Systems that scale", text: "Brands, interfaces and codebases are built as systems your team can extend with confidence." },
  { icon: HeartHandshake, title: "Honest partnership", text: "Straight answers, transparent scope and no inflated promises — about timelines, rankings or results." },
];

export default function StudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Studio"
        crumbs={[{ name: "Studio", path: "/studio" }]}
        title={
          <>
            Designing the Future. <span className="text-gradient">Building What Matters.</span>
          </>
        }
        lead={
          <p>
            AUREX LABS is an independent creative technology studio. We combine visual craft, strategic thinking and
            modern engineering to create digital work that is distinctive, useful and built to last.
          </p>
        }
      />

      <About showStudioLink={false} />
      <StudioIntro />

      <section aria-labelledby="principles-title" className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading id="principles-title" eyebrow="Principles" title="What guides every project" />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2">
            {principles.map(({ icon: Icon, title, text }) => (
              <li key={title} data-reveal className="surface rounded-3xl p-7 sm:p-9">
                <Icon aria-hidden className="h-6 w-6 text-lavender" strokeWidth={1.6} />
                <h3 className="mt-6 font-display text-2xl font-semibold text-pearl">{title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Process />
      <FinalCta />
      <JsonLd data={personSchema()} />
    </>
  );
}
