import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-display font-medium tracking-tight transition-[background,color,border-color,box-shadow] duration-300 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#a684ff_0%,#9065f8_45%,#6c3ef0_100%)] text-white shadow-[0_10px_40px_-10px_rgba(144,101,248,0.75),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_14px_50px_-8px_rgba(144,101,248,0.95),inset_0_1px_0_rgba(255,255,255,0.3)]",
  secondary: "border border-line-strong bg-white/[0.03] text-pearl hover:border-lavender/50 hover:bg-white/[0.06]",
  ghost: "text-pearl hover:text-lavender",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: "arrow" | "external" | "none";
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = "arrow",
  magnetic = true,
  className,
  ariaLabel,
}: ButtonLinkProps) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" && (
        <Icon aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </>
  );
  const link = external ? (
    <a
      href={href}
      aria-label={ariaLabel}
      className={buttonClasses(variant, size, className)}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  ) : (
    <Link href={href} aria-label={ariaLabel} className={buttonClasses(variant, size, className)}>
      {content}
    </Link>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
