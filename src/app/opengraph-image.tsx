import { renderOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "AUREX LABS — independent creative technology studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Creative Technology Studio", title: "We Create Digital Experiences That Define Tomorrow." });
}
