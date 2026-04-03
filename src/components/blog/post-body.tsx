import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { PortableTextBlock } from 'next-sanity'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null

      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).auto('format').url()}
            alt={value.alt || ''}
            width={800}
            height={450}
            className="w-full"
          />
          {value.caption && (
            <figcaption className="font-sans text-xs text-muted mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    codeBlock: ({ value }) => (
      <pre>
        <code className={value.language ? `language-${value.language}` : undefined}>
          {value.code}
        </code>
      </pre>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const isExternal = value?.href && !value.href.startsWith('/')
      return (
        <a
          href={value?.href}
          rel={isExternal ? 'noreferrer noopener' : undefined}
          target={isExternal ? '_blank' : undefined}
        >
          {children}
        </a>
      )
    },
  },
}

interface PostBodyProps {
  body: PortableTextBlock[]
}

export function PostBody({ body }: PostBodyProps) {
  if (!body) return null

  return (
    <div className="prose-content">
      <PortableText value={body} components={components} />
    </div>
  )
}
