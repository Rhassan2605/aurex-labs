import { cn } from "@/lib/utils";

export function SampleBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-amber-200/25 bg-amber-200/10 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-amber-100/90",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-200/80" />
      Sample project
    </span>
  );
}
