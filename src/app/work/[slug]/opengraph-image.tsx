import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { getProject, projects } from "@/content/projects";

export const alt = "AUREX LABS project";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project?.isSample ? `Sample concept · ${project.category}` : (project?.category ?? "Selected Work"),
    title: project?.title ?? "Selected Work",
  });
}
