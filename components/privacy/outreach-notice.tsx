import {
  OUTREACH_CONTROLLER_LEGAL_NAME,
  OUTREACH_PROCESSORS,
  POLICY_META,
} from "@/lib/legal/policy-meta";
import { PolicySection } from "@/components/privacy/policy-section";

function PrivacyMail() {
  return (
    <a
      href={`mailto:${POLICY_META.contactEmail}`}
      className="text-foreground underline underline-offset-2 transition-colors hover:text-primary"
    >
      {POLICY_META.contactEmail}
    </a>
  );
}

/**
 * UK GDPR Article 14 notice for the outbound business-development campaign:
 * the disclosure owed to people whose business contact details we obtained from
 * a source other than them. Deliberately a self-contained section — the rest of
 * the policy speaks to site visitors, whose data, processors and rights differ.
 */
export function OutreachNotice() {
  return (
    <PolicySection title="Individuals we contact for business development">
      <p className="italic">
        This section applies if we have contacted you — or may contact you — by
        email about our services using business contact details we obtained from a
        source other than you. It is separate from the website-visitor and cookie
        information above, and from the visitor-facing rights and processors
        described there.
      </p>

      <p>
        <strong>Who we are (controller).</strong> TechTrinity is a trading name of{" "}
        <strong>{OUTREACH_CONTROLLER_LEGAL_NAME}</strong>, a company registered in
        Wyoming, USA, which is the data controller for the processing described in
        this section. You can contact us in writing at {POLICY_META.postalAddress},
        or by email at <PrivacyMail />.
      </p>

      <p>
        <strong>What this covers.</strong> How we handle the business contact
        details of people we approach by email about our services, where we have
        obtained those details from a source other than you directly (this is the
        information required by Article 14 of the UK GDPR).
      </p>

      <p>
        <strong>The personal data we hold.</strong> Business contact information
        only: your name, job title, employer / company name, business email
        address, and publicly available information about your company. We do not
        seek or hold special-category data.
      </p>

      <p>
        <strong>Where we get it (source of the data).</strong> We obtain business
        contact details from publicly available and business sources — company
        websites, business and trade directories, professional networking profiles,
        and trade-association listings — or we infer a business email address from
        a known company email pattern. <strong>We do not buy or rent marketing
        lists.</strong> For each contact, we record where and when the detail was
        sourced.
      </p>

      <p>
        <strong>Why we use it, and our lawful basis.</strong> We use your business
        contact details to send you a relevant, role-appropriate business message
        about our services (business-to-business direct marketing). Our lawful basis
        under UK GDPR is <strong>Article 6(1)(f), legitimate interests</strong> —
        specifically our interest in offering relevant services to businesses likely
        to benefit from them. We have carried out and documented a Legitimate
        Interests Assessment weighing this against your rights, and we rely on
        ordinary Article 6(1)(f) with the balancing test applied (not the
        &ldquo;recognised legitimate interest&rdquo; basis). Where the
        electronic-marketing rules apply, we also rely on the corporate-subscriber
        provisions of the Privacy and Electronic Communications Regulations (
        <strong>PECR regulation 22</strong>): we contact organisations at work
        addresses and do not market to sole traders or other non-corporate
        individuals on this basis.
      </p>

      <p>
        <strong>Who sees it (recipients).</strong> Your details are handled by us
        and by the service providers who run our email infrastructure and contact
        verification, each acting under contract on our behalf:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px]">
          <thead>
            <tr>
              {["Provider", "What it does"].map((col) => (
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
            {OUTREACH_PROCESSORS.map((processor) => (
              <tr key={processor.name} className="align-top">
                <td className="border-b border-border/60 px-3 py-2 text-foreground">
                  {processor.name}
                </td>
                <td className="border-b border-border/60 px-3 py-2">
                  {processor.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>We do not sell your data.</p>

      {/* TODO(blocker): the solicitor is to supply the specific UK->US *controller*
          transfer safeguard (UK extension to the EU-US Data Privacy Framework, or
          the IDTA / SCCs). Distinct from the processor-transfer sentence in "Who
          else processes your data" above. */}
      <p>
        <strong>International transfers.</strong> We are a US-registered company, so
        your details may be processed outside the UK, in the United States. Any such
        transfer is made under appropriate safeguards.
      </p>

      {/* TODO(confirm): retention periods track LIA v3 §5, which marks them as
          proposed defaults pending solicitor / formation-service confirmation. */}
      <p>
        <strong>How long we keep it.</strong> We keep your details only as long as
        we need them for the purpose above. In practice: if we research a contact
        but never begin outreach, we delete that record within about six months; if
        you do not respond, we delete or anonymise your details within about six
        months of our last email; while we are in active contact, we keep your
        details for that exchange and a short period afterwards. If you object or
        ask us to stop, we suppress your details promptly and keep only the minimum
        record needed to make sure we do not contact you again. We keep our own
        accountability records (such as our Legitimate Interests Assessment and the
        record of where a contact was sourced) for up to six years.
      </p>

      <p>
        <strong>Your right to object, and your other rights.</strong> You have an{" "}
        <strong>
          absolute right to object to our use of your data for direct marketing. If
          you object, we will stop immediately
        </strong>{" "}
        — one clear request is enough, and we will suppress your details across all
        our mailboxes. You also have the right to access the data we hold about you,
        and to ask us to correct, erase, or restrict it. To exercise any of these,
        email <PrivacyMail />.
      </p>

      <p>
        <strong>Complaints.</strong> If you are unhappy with how we have handled
        your personal data, please tell us at <PrivacyMail />.{" "}
        <strong>We will acknowledge your complaint within 30 days</strong> and work
        to resolve it without undue delay, keeping you informed. You also have the
        right to complain to the UK&apos;s data-protection regulator, the{" "}
        <strong>Information Commissioner&apos;s Office (ICO)</strong> —{" "}
        <a
          href="https://ico.org.uk"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-primary"
        >
          ico.org.uk
        </a>
        , helpline 0303 123 1113 — though we would welcome the chance to put things
        right first.
      </p>
    </PolicySection>
  );
}
