import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact TechTrinity — Book a Discovery Call",
  description:
    "Book a free 30-minute discovery call with TechTrinity or send us a message. We respond to all enquiries within 24 hours.",
  openGraph: {
    title: "Contact TechTrinity",
    description:
      "Book a free 30-minute discovery call or send us a message.",
    url: "https://techtrinity.ai/contact",
    siteName: "TechTrinity",
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact TechTrinity",
  url: "https://techtrinity.ai/contact",
  description: "Book a discovery call or send a message to TechTrinity.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />

      <script type="application/ld+json">
        {JSON.stringify(contactPageJsonLd)}
      </script>

      <section className="border-b border-border">
        <Container className="py-14">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            — Get in touch
          </p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight text-fg">
            <span className="font-serif italic text-muted">Let&apos;s talk</span>{" "}
            about your project.
          </h1>
          <p className="mt-4 max-w-xl font-sans text-sm font-light text-muted">
            We respond to all enquiries within 24 hours. For faster turnaround,
            book a call directly below.
          </p>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-12">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
            Book a discovery call
          </p>
          <p className="mb-8 font-sans text-sm font-light text-muted">
            Free 30-minute call. No commitment. Pick a time that works for you.
          </p>
          <CalendlyEmbed
            url={
              process.env.NEXT_PUBLIC_CALENDLY_URL ??
              "https://calendly.com/usamabinnadeem10/meet-with-usama"
            }
          />
        </Container>
      </section>

      <section>
        <Container className="py-12">
          <p className="font-serif text-2xl text-fg">Not ready for a call?</p>
          <p className="mt-2 mb-10 font-sans text-sm font-light text-muted">
            Send us a message instead and we will get back to you within 24
            hours.
          </p>
          <ContactForm />
        </Container>
      </section>

      <Footer />
    </>
  );
}
