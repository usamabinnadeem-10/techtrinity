type Faq = {
  readonly q: string;
  readonly a: string;
};

type ServiceFaqProps = {
  readonly faqs: readonly Faq[];
};

export function ServiceFaq({ faqs }: ServiceFaqProps) {
  return (
    <section className="border-b border-border py-12">
      <h2 className="font-serif text-2xl text-fg">
        Frequently asked questions
      </h2>

      <dl className="mt-6">
        {faqs.map((faq, index) => (
          <div
            key={faq.q}
            className={`py-6${index < faqs.length - 1 ? " border-b border-border" : ""}`}
          >
            <dt className="font-sans text-sm font-medium text-fg">{faq.q}</dt>
            <dd className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">
              {faq.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
