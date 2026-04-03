import type { FaqItem } from '@/lib/blog'

interface PostFaqProps {
  faq: FaqItem[] | null
}

export function PostFaq({ faq }: PostFaqProps) {
  if (!faq || faq.length === 0) return null

  return (
    <section className="border-t border-border pt-10 mt-10">
      <h2 className="font-serif text-2xl text-fg mb-6">
        Frequently Asked Questions
      </h2>
      <dl>
        {faq.map((item) => (
          <div key={item._key} className="border-b border-border py-6">
            <dt className="font-sans text-sm font-medium text-fg">
              {item.question}
            </dt>
            <dd className="font-sans text-sm text-muted font-light leading-relaxed mt-2">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
