import { Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { mailtoHref, site, whatsappHref } from "@/content/site";

export function FinalCta({
  headingLevel = "h2",
  title,
}: {
  headingLevel?: "h1" | "h2";
  title?: React.ReactNode;
}) {
  const Heading = headingLevel;
  const wa = whatsappHref();
  const mail = mailtoHref();

  return (
    <section id="contact" aria-labelledby="cta-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-[linear-gradient(160deg,rgba(31,32,48,0.85),rgba(13,14,21,0.9))] p-6 sm:p-10 lg:p-16">
          <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(144,101,248,0.35),transparent_65%)] blur-2xl" />
          <Mark className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 opacity-[0.06]" />

          <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p data-reveal className="eyebrow flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-gradient-to-r from-electric to-transparent" />
                Start a Project
              </p>
              <Heading
                id="cta-title"
                data-reveal
                className="mt-5 font-display text-[2.1rem] font-semibold leading-[1.05] text-pearl sm:text-5xl lg:text-[3.3rem]"
              >
                {title ?? (
                  <>
                    Your Next Big Idea Deserves an <span className="text-gradient">Exceptional Digital Experience.</span>
                  </>
                )}
              </Heading>
              <p data-reveal className="mt-6 max-w-md text-base leading-relaxed text-mist sm:text-lg">
                Tell us where you are and where you want to be. You&apos;ll get a considered reply with next steps — no
                obligation, no sales scripts.
              </p>

              {(wa || mail) && (
                <div data-reveal className="mt-10 grid gap-3 sm:max-w-sm">
                  {wa && (
                    <ButtonLink href={wa} variant="secondary" icon="external" magnetic={false} className="w-full justify-between">
                      <span className="inline-flex items-center gap-2.5">
                        <MessageCircle aria-hidden className="h-4 w-4 text-lavender" />
                        Chat on WhatsApp
                      </span>
                    </ButtonLink>
                  )}
                  {mail && (
                    <ButtonLink href={mail} variant="secondary" icon="external" magnetic={false} className="w-full justify-between">
                      <span className="inline-flex items-center gap-2.5">
                        <Mail aria-hidden className="h-4 w-4 text-lavender" />
                        {site.contact.email}
                      </span>
                    </ButtonLink>
                  )}
                </div>
              )}
            </div>

            <div data-reveal>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
