"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { ScrollEffects } from "@/components/motion/ScrollEffects";

// The first render (server + hydration) must not hide content, so the page
// transition only plays on client-side navigations after the first load.
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animate = hasNavigated && !reduce;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
      <ScrollEffects />
    </motion.div>
  );
}
