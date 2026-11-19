import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "split";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, lead, as: Tag = "h2", align = "left", className, id }: Props) {
  return (
    <div className={cn("grid gap-6", align === "split" && "lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16", className)}>
      <div data-reveal>
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-gradient-to-r from-electric to-transparent" />
          {eyebrow}
        </p>
        <Tag
          id={id}
          className="font-display text-[2.15rem] font-semibold leading-[1.04] text-pearl sm:text-5xl lg:text-[3.6rem]"
        >
          {title}
        </Tag>
      </div>
      {lead && (
        <div data-reveal className="max-w-xl text-base leading-relaxed text-mist sm:text-lg">
          {lead}
        </div>
      )}
    </div>
  );
}
