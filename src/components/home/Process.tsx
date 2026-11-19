"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { processSteps } from "@/content/process";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const list = root.current?.querySelector<HTMLElement>("[data-timeline]");
      const fill = root.current?.querySelector<HTMLElement>("[data-timeline-fill]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root.current);
      if (!list || !fill) return;

      const mm = gsap.matchMedia();
      mm.add(
        { isLg: "(min-width: 1024px)", reduce: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const { isLg, reduce } = ctx.conditions as { isLg: boolean; reduce: boolean };
          if (reduce) {
            gsap.set(fill, { scaleX: 1, scaleY: 1 });
            steps.forEach((s) => (s.dataset.active = "true"));
            return;
          }
          const axis = isLg ? "scaleX" : "scaleY";
          gsap.set(fill, isLg ? { scaleX: 0, scaleY: 1, transformOrigin: "0% 50%" } : { scaleY: 0, scaleX: 1, transformOrigin: "50% 0%" });
          gsap.to(fill, {
            [axis]: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: isLg ? "top 78%" : "top 72%",
              end: isLg ? "bottom 50%" : "bottom 62%",
              scrub: 0.5,
              onUpdate: (self) => {
                steps.forEach((s, i) => {
                  const threshold = i / Math.max(1, steps.length - 1);
                  s.dataset.active = String(self.progress >= threshold * 0.985);
                });
              },
            },
          });
          gsap.from(steps, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: { trigger: list, start: "top 85%", once: true },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="process" aria-labelledby="process-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="process-title"
          eyebrow="Process"
          align="split"
          title={
            <>
              A Clear Path From <span className="text-gradient">Idea to Impact.</span>
            </>
          }
          lead={
            <p>
              Five focused stages keep every project transparent and on track. You always know what is happening, what
              comes next and what we need from you.
            </p>
          }
        />

        <div data-timeline className="relative mt-16 lg:mt-24">
          {/* Track */}
          <div aria-hidden className="absolute bottom-6 left-[19px] top-2 w-px bg-line-strong lg:bottom-auto lg:left-0 lg:right-0 lg:top-[19px] lg:h-px lg:w-auto">
            <div
              data-timeline-fill
              className="absolute inset-0 bg-gradient-to-b from-lavender via-electric to-electric-deep shadow-[0_0_18px_rgba(144,101,248,0.8)] lg:bg-gradient-to-r"
            />
          </div>

          <ol className="relative grid gap-12 lg:grid-cols-5 lg:gap-6">
            {processSteps.map((step) => (
              <li key={step.number} data-step data-active="false" className="group relative pl-16 lg:pl-0 lg:pt-20">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-obsidian font-display text-xs text-mist transition-all duration-500 group-data-[active=true]:border-transparent group-data-[active=true]:bg-electric group-data-[active=true]:text-white group-data-[active=true]:shadow-[0_0_0_6px_rgba(144,101,248,0.18),0_0_30px_rgba(144,101,248,0.7)]"
                >
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-semibold text-pearl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{step.text}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${step.title} outputs`}>
                  {step.outputs.map((o) => (
                    <li key={o} className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] text-mist transition-colors duration-500 group-data-[active=true]:border-lavender/25 group-data-[active=true]:text-pearl/90">
                      {o}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
