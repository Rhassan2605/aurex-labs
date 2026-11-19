import type { ReactNode } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatDate } from "@/lib/utils";

export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        crumbs={[{ name: title, path }]}
        title={title}
        lead={
          <p>
            Last updated <time dateTime={updated}>{formatDate(updated)}</time>
          </p>
        }
      />
      <section className="pb-16">
        <div className="container-x">
          <div className="mx-auto max-w-[44rem] border-t border-line pt-4 text-pearl/80 [&_a]:text-lavender [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-pearl [&_li]:mt-2 [&_p]:mt-5 [&_p]:leading-[1.8] [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
