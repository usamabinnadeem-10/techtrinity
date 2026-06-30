import Script from "next/script";
import { consentInitScript } from "@/lib/consent";

/**
 * Sets the Google Consent Mode v2 DEFAULT before gtag.js runs. Uses
 * `beforeInteractive` so it is injected into <head> and executed ahead of any
 * first-party code or the deferred analytics tag. Per Next.js App Router rules
 * this must be rendered from `app/layout.tsx`.
 */
export function ConsentModeInit() {
  return (
    <Script id="consent-mode-init" strategy="beforeInteractive">
      {consentInitScript()}
    </Script>
  );
}
