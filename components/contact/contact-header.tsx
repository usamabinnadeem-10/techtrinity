import { EditorialLabel } from "@/components/home/label";

export function ContactHeader() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pt-32 pb-14 md:px-12 md:pt-40 md:pb-20">
      <div className="hero-rise-sm mx-auto max-w-[640px] text-center [animation-delay:0.1s]">
        <EditorialLabel>Let&apos;s Build</EditorialLabel>
        <h1 className="mt-4 font-display text-[clamp(44px,6vw,84px)] font-black leading-[0.96] tracking-[-0.04em]">
          Start a <em className="italic text-primary">conversation.</em>
        </h1>
        <p className="mx-auto mt-7 max-w-[480px] text-[16px] font-light leading-[1.7] text-muted">
          Tell us what is slowing your operation down. We&apos;ll review it and
          get back to you within one business day. Or skip the form and book a
          workflow review directly.
        </p>
      </div>
    </section>
  );
}
