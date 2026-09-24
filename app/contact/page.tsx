import type { Metadata } from "next";
import { AmbientBackground } from "@/components/home/background";
import { EditorialLabel } from "@/components/home/label";
import { SiteNav } from "@/components/home/nav";
import { ContactCalendly } from "@/components/contact/contact-calendly";
import { ContactChips } from "@/components/contact/contact-chips";
import { ContactMinimalFooter } from "@/components/contact/contact-footer";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactHeader } from "@/components/contact/contact-header";
import { breadcrumbSchema, JsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Contact TechTrinity — Book a Call or Send a Message" },
  description:
    "Tell us what you'd like to improve or build, or book a free 30-minute workflow review with the TechTrinity team. We aim to reply within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact TechTrinity — Book a Call or Send a Message",
    description:
      "Tell us what you'd like to improve or build, or book a free 30-minute workflow review with the TechTrinity team. We aim to reply within one business day.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <AmbientBackground />
      <SiteNav />
      <main>
        <ContactHeader />

        {/* Stable anchors: #message (form) and #book (scheduler). DOM order is
            form first so mobile reads top-to-bottom like desktop reads left-to-
            right; header jump links and CTAs target either anchor directly. */}
        <div className="mx-auto max-w-[1240px] px-6 pb-20 md:px-12">
          <div className="grid gap-16 md:grid-cols-[55fr_45fr] md:gap-0 md:divide-x md:divide-border">
            <section
              id="message"
              aria-labelledby="message-heading"
              className="scroll-mt-28 md:pr-10 lg:pr-14"
            >
              <h2 id="message-heading" className="mb-6">
                <EditorialLabel tone="primary" className="block">
                  Send a Message
                </EditorialLabel>
              </h2>
              <ContactForm />
            </section>
            <section
              id="book"
              aria-labelledby="book-heading"
              className="scroll-mt-28 md:pl-10 lg:pl-14"
            >
              <h2 id="book-heading" className="mb-6">
                <EditorialLabel tone="primary" className="block">
                  Book a Workflow Review
                </EditorialLabel>
              </h2>
              <p className="mb-7 max-w-[420px] text-[15px] font-light leading-[1.7] text-muted">
                Prefer to talk directly? Book a free 30-minute workflow review.
                No pitch, no pressure — just an honest conversation about the
                process, product, or website you want to improve and whether
                we can help.
              </p>
              <ContactCalendly />
            </section>
          </div>
        </div>

        <ContactChips />
      </main>
      <ContactMinimalFooter />
    </>
  );
}
