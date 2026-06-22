import Script from "next/script";

const GA_MEASUREMENT_ID = "G-Z337R58187";

/**
 * Loads the Google Analytics (gtag.js) tag for all routes.
 * Uses next/script with the default `afterInteractive` strategy so the
 * tag loads early without blocking hydration.
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
