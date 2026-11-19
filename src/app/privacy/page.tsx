import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How AUREX LABS collects, uses and protects information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const email = site.contact.email;
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="2026-11-19">
      <p>
        This policy explains what information {site.name} (“we”, “us”) collects when you use this website, why we
        collect it and the choices you have. We collect as little personal information as possible.
      </p>

      <h2>Information you give us</h2>
      <p>When you send an inquiry through our contact form we receive:</p>
      <ul>
        <li>your name and email address;</li>
        <li>optional details such as company name, service of interest, budget range and timeline;</li>
        <li>the message you write.</li>
      </ul>
      <p>
        To protect the form from abuse we also process your IP address and browser user-agent at the moment of
        submission. These are used for rate limiting and spam prevention and are included in the inquiry email we
        receive.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>to reply to your inquiry and discuss a potential project;</li>
        <li>to prevent spam and misuse of the website;</li>
        <li>to meet legal obligations where applicable.</li>
      </ul>
      <p>We do not sell your information and we do not use it for unsolicited marketing.</p>

      <h2>Service providers</h2>
      <p>
        Inquiries are delivered to our inbox through an email delivery provider, and the website is hosted by a
        cloud hosting provider that may keep standard server logs. If spam protection by Cloudflare Turnstile is
        enabled on the form, Cloudflare processes limited technical data to verify that a person — not a bot — is
        submitting. These providers process data on our behalf and under their own security commitments.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This website does not set advertising or tracking cookies. If we add analytics in the future, we will update
        this policy and, where required, ask for your consent first.
      </p>

      <h2>Retention</h2>
      <p>
        We keep inquiry emails only as long as needed to respond and manage any resulting project, and delete them
        when they are no longer required.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct or delete your personal information,
        or to object to how it is used. To make a request,{" "}
        {email ? (
          <>
            email <a href={`mailto:${email}`}>{email}</a>
          </>
        ) : (
          <>
            contact us through the <Link href="/contact">contact page</Link>
          </>
        )}
        .
      </p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time. The date at the top of this page shows the latest revision.</p>
    </LegalPage>
  );
}
