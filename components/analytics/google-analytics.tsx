import Script from "next/script";

const GA_MEASUREMENT_ID = "G-Z337R58187";

/**
 * Loads the Google Analytics (gtag.js) tag for all routes.
 *
 * Uses the `lazyOnload` strategy so the ~155 KiB gtag.js bundle is fetched
 * during browser idle time (after the `load` event) instead of competing with
 * hydration. Analytics is not needed for first paint, so deferring it keeps the
 * third-party script off the critical loading window — improving mobile TBT and
 * cutting it from PageSpeed's "Reduce unused JavaScript" budget. The initial
 * pageview still registers once the script flushes the queued `dataLayer`
 * commands at idle.
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
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
