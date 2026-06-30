import { CookieSettingsLink } from "@/components/analytics/cookie-settings-link";
import { CookieTable } from "@/components/privacy/cookie-table";
import { PolicyHeader } from "@/components/privacy/policy-header";
import { PolicySection } from "@/components/privacy/policy-section";
import { POLICY_META, PROCESSORS } from "@/lib/legal/policy-meta";

/**
 * Full GDPR / UK-PECR-grade privacy & cookie policy, plain-language voice.
 * Composes the data-driven cookie inventory and processors list so the page
 * cannot drift from the site's actual tracking surface.
 */
export function PrivacyContent() {
  return (
    <article className="mx-auto max-w-[760px] px-6 py-24 md:px-12">
      <PolicyHeader title="Privacy & Cookie Policy" lastUpdated={POLICY_META.lastUpdated} />

      <PolicySection title="The short version">
        <p>
          We keep this simple. {POLICY_META.controllerName} uses one analytics tool
          (Google Analytics) and one embedded scheduler (Calendly), and both stay
          off until you say yes. We don&apos;t advertise to you, we don&apos;t sell
          your data, and we don&apos;t load tracking in the background. To change
          your mind anytime, use the <CookieSettingsLink /> link at the bottom of
          any page.
        </p>
      </PolicySection>

      <PolicySection title="Who we are">
        <p>
          This site is operated by <strong>{POLICY_META.controllerName}</strong>{" "}
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;), the data controller for the
          information described here. Contact:{" "}
          <a
            href={`mailto:${POLICY_META.contactEmail}`}
            className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
          >
            {POLICY_META.contactEmail}
          </a>
          . Postal address available on request. A real person reads privacy email.
        </p>
      </PolicySection>

      <PolicySection title="What this policy covers">
        <p>
          How we handle your information when you visit this site, send an enquiry,
          or book a call. It does not cover third-party sites we link to (LinkedIn,
          GitHub), which have their own policies.
        </p>
      </PolicySection>

      <PolicySection title="Information we collect">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <em>When you contact us.</em> The contact form asks for your name,
            email, and a short message, plus optional details (company, role,
            business type, tools you use, urgency, and which workflow you want help
            with). On submit, that&apos;s sent to us as an email through our
            provider Resend, and used only to read and reply.
          </li>
          <li>
            <em>When you book a call.</em> Our scheduler Calendly collects what you
            enter to book (name, email, chosen time) on its own platform. The
            scheduler does not load until you allow it (see Cookies).
          </li>
          <li>
            <em>When you allow analytics.</em> Google Analytics collects anonymous
            usage info — pages viewed, rough location, device/browser — to show us
            what&apos;s useful. No name, no advertising.
          </li>
          <li>
            <em>Automatically, to run the site.</em> Our host Vercel processes
            standard technical info in server logs (IP, browser type) to serve
            pages securely. Normal for any website.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Why we're allowed to use it (legal basis)">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <em>Answering enquiries / scheduling</em> — legitimate interest in
            responding, and steps taken at your request before any agreement.
          </li>
          <li>
            <em>Analytics and the embedded scheduler</em> — your consent,
            withdrawable anytime.
          </li>
          <li>
            <em>Running and securing the site (server logs)</em> — legitimate
            interest in a safe, working website.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Who else processes your data">
        <p>
          We don&apos;t sell or rent your information. We share it only with the
          providers that make the site work, each acting on our behalf:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr>
                {["Provider", "What it does", "Policy"].map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="border-b border-border px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROCESSORS.map((processor) => (
                <tr key={processor.name} className="align-top">
                  <td className="border-b border-border/60 px-3 py-2 text-foreground">
                    {processor.name}
                  </td>
                  <td className="border-b border-border/60 px-3 py-2">
                    {processor.role}
                  </td>
                  <td className="border-b border-border/60 px-3 py-2">
                    <a
                      href={processor.policyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2 transition-colors hover:text-primary"
                    >
                      Policy
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          These providers are US-based. Where data is transferred there, it&apos;s
          protected by appropriate safeguards — the EU-US / UK Data Privacy
          Framework and/or Standard Contractual Clauses.
        </p>
      </PolicySection>

      <PolicySection title="How long we keep it">
        <p>
          We don&apos;t run our own database of visitor information. Enquiries you
          send us live as email in our inbox, and we keep them only as long as we
          need to respond and handle any follow-up, after which we delete them.
          Everything else — analytics, scheduling, hosting logs — is held by the
          providers above under their own retention periods.
        </p>
      </PolicySection>

      <PolicySection title="Your rights">
        <p>
          Depending on where you live (including the UK and EU under the GDPR), you
          can: access what we hold; ask us to correct or delete it; restrict or
          object to its use; request a copy to take elsewhere; withdraw consent for
          analytics or the scheduler anytime; and complain to a data protection
          authority (UK: the ICO; EU: your local authority). To exercise these,
          email{" "}
          <a
            href={`mailto:${POLICY_META.contactEmail}`}
            className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
          >
            {POLICY_META.contactEmail}
          </a>
          . To withdraw cookie consent, use <CookieSettingsLink /> — no email needed.
        </p>
      </PolicySection>

      <PolicySection title="Cookies & similar technologies">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <em>What they are.</em> Cookies are small files a site stores in your
            browser; some sites also use related storage (like &ldquo;local
            storage&rdquo;). We use as little as possible.
          </li>
          <li>
            <em>Off by default.</em> On arrival, nothing optional runs. Analytics
            and the Calendly scheduler are off until you choose. We use Google
            Consent Mode, so Google Analytics starts in a privacy-preserving mode
            and writes no analytics cookies unless you accept. Your choice is
            remembered under <code>tt-cookie-consent</code>.
          </li>
          <li>
            <em>Your choice, anytime.</em> The banner lets you Accept or Reject.
            Change it whenever via the <CookieSettingsLink /> link, or by clearing{" "}
            <code>tt-cookie-consent</code>.
          </li>
        </ul>

        <p className="font-medium text-foreground">The categories we use:</p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong>Strictly necessary</strong> — your cookie choice itself, so we
            can honour it. No consent needed, because without it we couldn&apos;t
            remember that you said no.
          </li>
          <li>
            <strong>Analytics</strong> <em>(consent)</em> — Google Analytics. Only
            set after you accept.
          </li>
          <li>
            <strong>Functional / embedded tools</strong> <em>(consent)</em> — the
            Calendly scheduler on Contact. Loads (and sets Calendly&apos;s cookies)
            only after you accept, or when you click to load it directly.
          </li>
        </ul>

        <p className="font-medium text-foreground">The full list:</p>
        <CookieTable />

        <p className="font-medium text-foreground">
          What we deliberately don&apos;t do:
        </p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong>No advertising cookies.</strong> Ad storage and ad
            personalisation are switched off in our setup, always.
          </li>
          <li>
            <strong>No third-party fonts loading.</strong> Fonts are built into the
            site itself, so Google never sees your visit and no font cookies are set.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Changes to this policy">
        <p>
          If we add a tool or change cookie use, we update this page and the
          &ldquo;Last updated&rdquo; date. Changes needing fresh consent reset the
          banner so you can choose again.
        </p>
      </PolicySection>

      <PolicySection title="Contact">
        <p>
          Questions about this policy or your data? Email{" "}
          <a
            href={`mailto:${POLICY_META.contactEmail}`}
            className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
          >
            {POLICY_META.contactEmail}
          </a>
          .
        </p>
      </PolicySection>
    </article>
  );
}
