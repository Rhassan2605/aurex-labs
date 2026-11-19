import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { mailtoHref, site, whatsappHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Start a Project",
  description:
    "Start a project with AUREX LABS. Tell us about your website, brand, app, UI/UX or SEO needs and get a considered reply with clear next steps.",
  path: "/contact",
});

const steps = [
  { title: "We read your brief", text: "Every inquiry is reviewed personally — not by an auto-responder." },
  { title: "A short call", text: "We discuss goals, scope and timing to confirm we are the right fit." },
  { title: "A clear proposal", text: "You receive a written plan with scope, timeline and investment." },
];

export default function ContactPage() {
  const wa = whatsappHref();
  const mail = mailtoHref();
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        crumbs={[{ name: "Contact", path: "/contact" }]}
        title={
          <>
            Your Next Big Idea Deserves an <span className="text-gradient">Exceptional Digital Experience.</span>
          </>
        }
        lead={<p>Share a few details below. The more context you give, the more useful our first reply will be.</p>}
      />

      <section aria-label="Contact form" className="pb-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <div className="surface rounded-[2rem] p-6 sm:p-10">
            <ContactForm idPrefix="contact-page" />
          </div>

          <aside className="grid content-start gap-6" aria-label="What happens next">
            <div className="surface rounded-[2rem] p-7 sm:p-9">
              <h2 className="eyebrow">What happens next</h2>
              <ol className="mt-6 grid gap-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong font-display text-xs text-lavender">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-pearl">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-mist">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {(wa || mail) && (
              <div className="surface rounded-[2rem] p-7 sm:p-9">
                <h2 className="eyebrow">Prefer to talk directly?</h2>
                <div className="mt-6 grid gap-3">
                  {wa && (
                    <ButtonLink href={wa} variant="secondary" icon="external" magnetic={false} className="w-full justify-between">
                      <span className="inline-flex items-center gap-2.5">
                        <MessageCircle aria-hidden className="h-4 w-4 text-lavender" /> Chat on WhatsApp
                      </span>
                    </ButtonLink>
                  )}
                  {mail && (
                    <ButtonLink href={mail} variant="secondary" icon="external" magnetic={false} className="w-full justify-between">
                      <span className="inline-flex items-center gap-2.5">
                        <Mail aria-hidden className="h-4 w-4 text-lavender" /> {site.contact.email}
                      </span>
                    </ButtonLink>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
