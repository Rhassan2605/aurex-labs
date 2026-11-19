import { CodeXml, Gem, LayoutTemplate, PenTool, Smartphone, TrendingUp, type LucideProps } from "lucide-react";
import type { ServiceIcon as Kind } from "@/content/services";

const icons = {
  web: CodeXml,
  graphic: PenTool,
  seo: TrendingUp,
  android: Smartphone,
  uiux: LayoutTemplate,
  brand: Gem,
} as const;

export function ServiceIcon({ kind, ...props }: { kind: Kind } & LucideProps) {
  const Icon = icons[kind];
  return <Icon aria-hidden strokeWidth={1.6} {...props} />;
}
