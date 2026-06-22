import type { Metadata } from "next";
import { AmbientBackground } from "@/components/home/background";
import { EditorialLabel } from "@/components/home/label";
import { SiteNav } from "@/components/home/nav";
import { ContactCalendly } from "@/components/contact/contact-calendly";
import { ContactChips } from "@/components/contact/contact-chips";
import { ContactMinimalFooter } from "@/components/contact/contact-footer";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactHeader } from "@/components/contact/contact-header";

export const metadata: Metadata = {
  title: { absolute: "Talk to TechTrinity About Your Operations Workflow" },
  description:
    "Tell us what is slowing your operation down, or book a 30-minute workflow review with the TechTrinity team.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Talk to TechTrinity About Your Operations Workflow",
    description:
      "Tell us what is slowing your operation down, or book a 30-minute workflow review with the TechTrinity team.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main>
        <ContactHeader />

        <section className="mx-auto max-w-[1240px] px-6 pb-20 md:px-12">
          <div className="grid gap-12 md:gap-0 md:grid-cols-[55fr_45fr] md:divide-x md:divide-border">
            <div className="order-2 md:order-1 md:pr-10 lg:pr-14">
              <EditorialLabel tone="primary" className="mb-6 block">
                Send a Message
              </EditorialLabel>
              <ContactForm />
            </div>
            <div className="order-1 md:order-2 md:pl-10 lg:pl-14">
              <EditorialLabel tone="primary" className="mb-6 block">
                Book a Workflow Review
              </EditorialLabel>
              <p className="mb-7 max-w-[420px] text-[15px] font-light leading-[1.7] text-muted">
                Prefer to talk directly? Book a free 30-minute workflow review.
                No pitch, no pressure — just an honest conversation about how
                your stock, orders, warehouse, purchasing, or reporting process
                works today and whether we can help.
              </p>
              <ContactCalendly />
            </div>
          </div>
        </section>

        <ContactChips />
      </main>
      <ContactMinimalFooter />
    </>
  );
}
