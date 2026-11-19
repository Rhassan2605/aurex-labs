"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Page-level GSAP ScrollTrigger controller. Mounted per route (in template.tsx)
 * and wires declarative attributes:
 *   data-reveal          → fade/rise in when entering the viewport (batched)
 *   data-mask-reveal     → clip-path mask opening for imagery
 *   data-parallax="0.15" → subtle vertical parallax while the section scrolls
 * Everything is skipped under prefers-reduced-motion (CSS shows content).
 */
export function ScrollEffects() {
  useGSAP(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      // Anything already scrolled past (e.g. restored scroll) is shown immediately.
      reveals
        .filter((el) => el.getBoundingClientRect().bottom < 0)
        .forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));

      ScrollTrigger.batch(
        reveals.filter((el) => el.getBoundingClientRect().bottom >= 0),
        {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-mask-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(18% 8% 18% 8% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number.parseFloat(el.dataset.parallax || "0.15");
        gsap.fromTo(
          el,
          { yPercent: speed * 50 },
          {
            yPercent: -speed * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });
    });

    root.classList.add("reveal-ready");

    // Content height changes (filters, images, fonts) shift trigger positions;
    // keep ScrollTrigger in sync without listening to every scroll.
    let timer: ReturnType<typeof setTimeout> | undefined;
    let lastHeight = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastHeight) < 2) return;
      lastHeight = h;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      clearTimeout(timer);
      mm.revert();
    };
  });

  return null;
}
