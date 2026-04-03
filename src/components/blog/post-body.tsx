import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { PortableTextBlock } from 'next-sanity'
import { codeToHtml } from 'shiki'

interface CodeBlock {
  _type: 'codeBlock'
  _key: string
  code: string
  language?: string
}

interface PostBodyProps {
  body: (PortableTextBlock | CodeBlock)[]
}

function isCodeBlock(block: PortableTextBlock | CodeBlock): block is CodeBlock {
  return block._type === 'codeBlock'
}

export async function PostBody({ body }: PostBodyProps) {
  if (!body) return null

  const highlightedBlocks = new Map<string, string>()

  for (const block of body) {
    if (isCodeBlock(block)) {
      const html = await codeToHtml(block.code, {
        lang: block.language || 'plaintext',
        theme: 'github-light',
        transformers: [
          {
            pre(node) {
              delete node.properties.style
            },
          },
        ],
      })
      highlightedBlocks.set(block._key, html)
    }
  }

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
      codeBlock: ({ value }) => {
        const html = highlightedBlocks.get(value._key)
        if (html) {
          return <div dangerouslySetInnerHTML={{ __html: html }} />
        }
        return (
          <pre>
            <code>{value.code}</code>
          </pre>
        )
      },
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

  return (
    <div className="prose-content">
      <PortableText value={body} components={components} />
    </div>
  )
}
