import type { Metadata } from "next";
import { Mark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center pt-[var(--header-h)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_40%,rgba(144,101,248,0.18),transparent_70%)]" />
      <div className="container-x flex flex-col items-center text-center">
        <Mark className="h-16 w-16 animate-float" />
        <p className="eyebrow mt-10">Error 404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-pearl sm:text-7xl">Off the map.</h1>
        <p className="mt-5 max-w-md text-lg text-mist">
          The page you&apos;re looking for has moved or never existed. Let&apos;s get you back on course.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            Explore our work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
