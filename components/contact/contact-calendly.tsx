"use client";

import Script from "next/script";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/techtrinity/discovery";

const EMBED_URL = `${CALENDLY_URL}?hide_event_type_details=0&hide_gdpr_banner=1&background_color=0f0f0f&text_color=ede9e1&primary_color=b8ff57`;

export function ContactCalendly() {
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div
          className="calendly-inline-widget"
          data-url={EMBED_URL}
          style={{ minWidth: "320px", height: "640px" }}
        />
      </div>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
