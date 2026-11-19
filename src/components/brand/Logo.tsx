import { cn } from "@/lib/utils";

/** Shared gradient definitions; rendered once in the root layout. */
export function BrandDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }} focusable="false">
      <defs>
        <linearGradient id="aurex-grad" x1="20" y1="4" x2="46" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E4D9FF" />
          <stop offset=".45" stopColor="#9065F8" />
          <stop offset="1" stopColor="#5B2FD6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type MarkProps = {
  className?: string;
  /** gradient (default), or "current" to inherit text colour (monochrome). */
  tone?: "gradient" | "current";
  orbit?: boolean;
  title?: string;
};

/**
 * The AUREX mark: a geometric peak (A) whose counter holds a forward wedge —
 * identity, ascent and momentum in one shape.
 */
export function Mark({ className, tone = "gradient", orbit = false, title }: MarkProps) {
  const fill = tone === "gradient" ? "url(#aurex-grad)" : "currentColor";
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g fill={fill} transform={orbit ? "translate(6.4 6.4) scale(.8)" : undefined}>
        <path d="M32 5 61 59H48.5L32 28 15.5 59H3Z" />
        <path d="M29 43v14l11-7z" />
      </g>
      {orbit && (
        <>
          <ellipse
            cx="32"
            cy="38"
            rx="30"
            ry="8.5"
            transform="rotate(-16 32 38)"
            fill="none"
            stroke={tone === "gradient" ? "#C9B6FF" : "currentColor"}
            strokeOpacity=".7"
            strokeWidth="1.2"
          />
          <circle cx="59" cy="29.6" r="1.8" fill={tone === "gradient" ? "#F5F3FA" : "currentColor"} />
        </>
      )}
    </svg>
  );
}

type LogoProps = { className?: string; tone?: "gradient" | "current"; markClassName?: string };

export function Logo({ className, tone = "gradient", markClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark tone={tone} className={cn("h-8 w-8 shrink-0", markClassName)} />
      <span className="font-display text-[1.06rem] leading-none tracking-[0.04em]">
        <span className="font-bold">AUREX</span>
        <span className={cn("ml-1.5 font-normal tracking-[0.22em]", tone === "gradient" && "text-lavender")}>LABS</span>
      </span>
    </span>
  );
}
