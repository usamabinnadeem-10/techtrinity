import Script from "next/script";

const GA_MEASUREMENT_ID = "G-Z337R58187";

/**
 * Loads gtag.js (`lazyOnload`) and runs `config`. Consent state and the
 * dataLayer/gtag bootstrap are owned by `ConsentModeInit`, which runs
 * `beforeInteractive` (so the consent DEFAULT is set before this tag loads).
 * The guard below is idempotent and never resets consent — it only protects
 * against `ConsentModeInit` being absent.
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
          window.gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
