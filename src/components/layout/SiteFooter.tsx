import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { nav, site, mailtoHref, whatsappHref } from "@/content/site";
import { services } from "@/content/services";

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Brand Assets", href: "/brand" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  const mail = mailtoHref();
  const wa = whatsappHref();

  return (
    <footer className="relative mt-24 border-t border-line bg-[radial-gradient(80%_60%_at_50%_0%,rgba(144,101,248,0.10),transparent)]">
      <div className="container-x grid gap-14 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10 lg:py-20">
        <div className="max-w-sm">
          <Link href="/" aria-label="AUREX LABS — home" className="inline-block rounded-md">
            <Logo />
          </Link>
          <p className="mt-5 font-display text-lg leading-snug text-pearl">{site.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            An independent creative technology studio for web development, graphic design, SEO, Android apps, UI/UX
            and brand identity.
          </p>
          {(mail || wa) && (
            <ul className="mt-6 space-y-2 text-sm">
              {mail && (
                <li>
                  <a href={mail} className="text-pearl underline-offset-4 hover:text-lavender hover:underline">
                    {site.contact.email}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pearl underline-offset-4 hover:text-lavender hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>

        <FooterColumn title="Expertise">
          {services.map((s) => (
            <li key={s.slug}>
              <FooterLink href={`/expertise/${s.slug}`}>{s.title}</FooterLink>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Navigate">
          {nav.map((item) => (
            <li key={item.href}>
              <FooterLink href={item.href}>{item.label}</FooterLink>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={site.socials.length ? "Follow" : "Studio"}>
          {site.socials.length > 0
            ? site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-mist transition-colors hover:text-pearl"
                  >
                    {s.label}
                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5 opacity-60 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))
            : [
                <li key="start">
                  <FooterLink href="/contact">Start a project</FooterLink>
                </li>,
                <li key="studio">
                  <FooterLink href="/studio">About the founder</FooterLink>
                </li>,
              ]}
        </FooterColumn>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-pearl">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-5 text-[0.7rem]">{title}</h2>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-mist transition-colors hover:text-pearl">
      {children}
    </Link>
  );
}
