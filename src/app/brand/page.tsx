import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Logo, Mark } from "@/components/brand/Logo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Brand Assets — Logo, Colour & Typography",
  description:
    "AUREX LABS brand assets: the geometric A mark, logo variants for dark, light and monochrome use, colour palette and typography.",
  path: "/brand",
});

const palette = [
  { name: "Obsidian", hex: "#090A0F", role: "Primary background", text: "text-pearl" },
  { name: "Graphite", hex: "#171824", role: "Surfaces & cards", text: "text-pearl" },
  { name: "Electric Violet", hex: "#9065F8", role: "Primary accent", text: "text-white" },
  { name: "Lavender", hex: "#C9B6FF", role: "Secondary accent", text: "text-obsidian" },
  { name: "Pearl", hex: "#F5F3FA", role: "Text & light surfaces", text: "text-obsidian" },
];

const downloads = [
  { label: "Mark (gradient)", href: "/brand/aurex-mark.svg" },
  { label: "Mark with orbit", href: "/brand/aurex-mark-orbit.svg" },
  { label: "Logo — dark backgrounds", href: "/brand/aurex-logo-dark.svg" },
  { label: "Logo — light backgrounds", href: "/brand/aurex-logo-light.svg" },
  { label: "Logo — monochrome", href: "/brand/aurex-logo-mono.svg" },
];

export default function BrandPage() {
  return (
    <>
      <PageHeader
        eyebrow="Brand Assets"
        crumbs={[{ name: "Brand Assets", path: "/brand" }]}
        title={
          <>
            A Mark Built on <span className="text-gradient">Forward Motion.</span>
          </>
        }
        lead={
          <p>
            The AUREX mark is a geometric peak — the letter A — whose open counter holds a forward-pointing wedge.
            Identity, ascent and momentum in a single, scalable shape. An optional orbit adds the studio&apos;s sense of
            exploration.
          </p>
        }
      />

      <section aria-labelledby="variants-title" className="py-12 sm:py-16">
        <div className="container-x">
          <h2 id="variants-title" className="eyebrow">Logo variants</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <figure data-reveal className="flex aspect-[4/3] flex-col justify-between rounded-3xl border border-line bg-obsidian p-7">
              <figcaption className="text-xs uppercase tracking-[0.18em] text-mist">Dark</figcaption>
              <Logo className="self-center scale-125" />
              <span />
            </figure>
            <figure data-reveal className="flex aspect-[4/3] flex-col justify-between rounded-3xl border border-line bg-pearl p-7 text-obsidian">
              <figcaption className="text-xs uppercase tracking-[0.18em] text-obsidian/60">Light</figcaption>
              <span className="inline-flex items-center gap-2.5 self-center scale-125">
                <Mark tone="current" className="h-8 w-8 text-electric-deep" />
                <span className="font-display text-[1.06rem] leading-none tracking-[0.04em]">
                  <span className="font-bold">AUREX</span>
                  <span className="ml-1.5 font-normal tracking-[0.22em] text-electric-deep">LABS</span>
                </span>
              </span>
              <span />
            </figure>
            <figure data-reveal className="flex aspect-[4/3] flex-col justify-between rounded-3xl border border-line bg-electric p-7 text-white">
              <figcaption className="text-xs uppercase tracking-[0.18em] text-white/70">Monochrome</figcaption>
              <Logo tone="current" className="self-center scale-125" />
              <span />
            </figure>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Mark", node: <Mark className="h-20 w-20" /> },
              { label: "Mark with orbit", node: <Mark orbit className="h-24 w-24" /> },
              { label: "Mono mark", node: <Mark tone="current" className="h-20 w-20 text-pearl" /> },
            ].map((m) => (
              <figure key={m.label} data-reveal className="surface flex flex-col items-center gap-6 rounded-3xl p-8">
                <div className="flex h-24 items-center">{m.node}</div>
                <figcaption className="text-xs uppercase tracking-[0.18em] text-mist">{m.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="palette-title" className="py-12 sm:py-16">
        <div className="container-x">
          <h2 id="palette-title" className="eyebrow">Colour palette</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {palette.map((c) => (
              <li key={c.hex} data-reveal className="overflow-hidden rounded-3xl border border-line">
                <div className={`flex aspect-[4/3] items-end p-5 font-display text-sm ${c.text}`} style={{ background: c.hex }}>
                  {c.hex}
                </div>
                <div className="p-5">
                  <p className="font-display font-semibold text-pearl">{c.name}</p>
                  <p className="text-sm text-mist">{c.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="type-title" className="py-12 sm:py-16">
        <div className="container-x grid gap-4 md:grid-cols-2">
          <h2 id="type-title" className="sr-only">Typography</h2>
          <div data-reveal className="surface rounded-3xl p-8 sm:p-10">
            <p className="eyebrow">Headlines</p>
            <p className="mt-6 font-display text-7xl font-bold text-pearl">Aa</p>
            <p className="mt-4 font-display text-2xl text-pearl">Space Grotesk</p>
            <p className="mt-2 text-mist">Geometric, technical and confident. Used for headings, numerals and the wordmark.</p>
          </div>
          <div data-reveal className="surface rounded-3xl p-8 sm:p-10">
            <p className="eyebrow">Body</p>
            <p className="mt-6 text-7xl font-semibold text-pearl">Aa</p>
            <p className="mt-4 text-2xl text-pearl">Inter</p>
            <p className="mt-2 text-mist">Highly legible at every size. Used for body copy, interface text and data.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="downloads-title" className="py-12 sm:py-16">
        <div className="container-x">
          <h2 id="downloads-title" className="eyebrow">Downloads (SVG)</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {downloads.map((d) => (
              <li key={d.href}>
                <a
                  href={d.href}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm text-pearl transition-colors hover:border-lavender/50 hover:bg-white/[0.04]"
                >
                  <Download aria-hidden className="h-4 w-4 text-lavender" />
                  {d.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-sm text-mist">
            Keep clear space around the mark equal to the height of its forward wedge. Do not stretch, recolour outside
            the palette or place the gradient mark on busy imagery.
          </p>
        </div>
      </section>
    </>
  );
}
