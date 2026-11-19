import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms that apply to using the AUREX LABS website and its content.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" path="/terms" updated="2026-11-19">
      <p>
        These terms apply to your use of the {site.name} website. By using the site you agree to them. Project work is
        governed by a separate written agreement between {site.name} and each client.
      </p>

      <h2>Use of the website</h2>
      <p>
        You may browse and share links to this website for personal and business purposes. You agree not to misuse
        it — for example by attempting to disrupt it, gain unauthorised access, or send spam or automated
        submissions through its forms.
      </p>

      <h2>Content and intellectual property</h2>
      <p>
        Unless stated otherwise, the text, design, graphics, logos and code of this website belong to {site.name}.
        You may not copy or reuse them commercially without permission. Logo files offered on the{" "}
        <Link href="/brand">brand assets</Link> page may be used to refer to {site.name}, without alteration.
      </p>

      <h2>Sample projects</h2>
      <p>
        Projects labelled “Sample project” are studio concepts created to demonstrate our process. They do not
        represent client engagements, and any goals described are design intentions rather than measured results.
      </p>

      <h2>Insights and information</h2>
      <p>
        Articles and other information on this website are provided for general guidance. They are not professional
        advice for your specific situation, and we make no guarantee of particular outcomes, such as search rankings.
      </p>

      <h2>Inquiries</h2>
      <p>
        Sending an inquiry does not create a contract or an obligation for either party. Any engagement begins only
        once a proposal or agreement has been accepted in writing.
      </p>

      <h2>External links</h2>
      <p>This website may link to third-party sites. We are not responsible for their content or practices.</p>

      <h2>Liability</h2>
      <p>
        The website is provided “as is”. To the extent permitted by law, {site.name} is not liable for losses arising
        from use of, or inability to use, this website.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the website after changes means you accept the
        updated terms. Questions? Reach us via the <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
