import { CookieSettingsLink } from "@/components/analytics/cookie-settings-link";

/**
 * Scaffolded privacy / cookie policy copy. Placeholder wording for the site
 * owner to refine later; the structure and the cookie-settings control are real.
 */
export function PrivacyContent() {
  return (
    <article className="mx-auto max-w-[760px] px-6 py-24 md:px-12">
      <h1 className="font-display text-4xl font-bold tracking-[-0.03em]">
        Privacy &amp; Cookie Policy
      </h1>
      <p className="mt-6 text-[15px] leading-[1.7] text-muted-foreground">
        This page describes how TechTrinity handles your information. This is
        placeholder copy to be refined by the site owner.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold tracking-[-0.02em]">
        Cookies &amp; Analytics
      </h2>
      <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground">
        We use Google Analytics to understand how visitors use our site. Analytics
        cookies are not stored until you accept them. Until you choose, analytics
        runs in a cookieless, anonymous mode and no analytics cookies are written.
      </p>
      <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground">
        You can change your choice at any time:{" "}
        <CookieSettingsLink />.
      </p>
    </article>
  );
}
