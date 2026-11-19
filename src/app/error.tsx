"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonClasses } from "@/components/ui/Button";

export default function GlobalSegmentError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80svh] items-center pt-[var(--header-h)]">
      <div className="container-x flex flex-col items-center text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-pearl sm:text-6xl">A small detour.</h1>
        <p className="mt-5 max-w-md text-lg text-mist">An unexpected error occurred while loading this page. Please try again.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button type="button" onClick={reset} className={buttonClasses("primary", "md")}>
            Try again
          </button>
          <Link href="/" className={buttonClasses("secondary", "md")}>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
