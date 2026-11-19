"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Floating glass "A" emblem for the hero. Pure CSS/SVG (no WebGL) so it is
 * light on the main thread; tilts toward fine pointers, floats otherwise.
 */
export function Emblem() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 90, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 90, damping: 16 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches || reduce) return;
    // Defer enabling to avoid a synchronous setState in the effect body.
    const id = requestAnimationFrame(() => setFine(true));
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("pointermove", onMove);
    };
  }, [mx, my, reduce]);

  return (
    <div ref={ref} aria-hidden className="relative mx-auto aspect-square w-full max-w-[540px] [perspective:1200px]">
      {/* Glow */}
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(144,101,248,0.55),rgba(91,47,214,0.18)_45%,transparent_70%)] blur-2xl animate-glow" />

      <div className="absolute inset-0 animate-float">
        <motion.div
          className="absolute inset-[17%] [transform-style:preserve-3d]"
          style={fine ? { rotateX: rx, rotateY: ry } : { rotateX: 8, rotateY: -18 }}
        >
          {/* Depth layer */}
          <div className="absolute inset-0 translate-x-3 translate-y-4 rounded-[30%] bg-[linear-gradient(140deg,#2a1d63,#0f0d1d)] opacity-90 [transform:translateZ(-40px)]" />
          {/* Glass face */}
          <div className="absolute inset-0 overflow-hidden rounded-[30%] border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(144,101,248,0.10)_40%,rgba(17,14,36,0.55))] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-20px_60px_rgba(91,47,214,0.35),0_40px_120px_-30px_rgba(144,101,248,0.7)] backdrop-blur-md">
            <div className="absolute -left-1/4 -top-1/2 h-full w-[150%] rotate-[-20deg] bg-gradient-to-b from-white/25 to-transparent opacity-60" />
            <svg viewBox="0 0 64 64" className="absolute inset-[22%] drop-shadow-[0_8px_30px_rgba(144,101,248,0.8)]">
              <defs>
                <linearGradient id="emblem-a" x1="18" y1="4" x2="46" y2="62" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F5F0FF" />
                  <stop offset=".4" stopColor="#B99BFF" />
                  <stop offset="1" stopColor="#6A3DF0" />
                </linearGradient>
              </defs>
              <g fill="url(#emblem-a)">
                <path d="M32 5 61 59H48.5L32 28 15.5 59H3Z" />
                <path d="M29 43v14l11-7z" />
              </g>
            </svg>
          </div>
        </motion.div>

        {/* Orbit */}
        <svg viewBox="0 0 540 540" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="orbit-stroke" x1="0" x2="1">
              <stop stopColor="#C9B6FF" stopOpacity="0" />
              <stop offset=".35" stopColor="#C9B6FF" stopOpacity=".75" />
              <stop offset=".7" stopColor="#9065F8" stopOpacity=".9" />
              <stop offset="1" stopColor="#9065F8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <g transform="rotate(-18 270 270)">
            <ellipse cx="270" cy="290" rx="262" ry="70" fill="none" stroke="url(#orbit-stroke)" strokeWidth="1.4" />
            <ellipse cx="270" cy="290" rx="226" ry="54" fill="none" stroke="#C9B6FF" strokeOpacity=".12" strokeWidth="1" />
            {!reduce && (
              <circle r="4.5" fill="#F5F3FA">
                <animateMotion dur="16s" repeatCount="indefinite" path="M8 290a262 70 0 1 0 524 0a262 70 0 1 0-524 0" />
              </circle>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
