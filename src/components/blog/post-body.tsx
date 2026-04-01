'use client'

import * as runtime from 'react/jsx-runtime'

interface PostBodyProps {
  body: string
}

export function PostBody({ body }: PostBodyProps) {
  const fn = new Function(body)
  const mod = fn({ ...runtime })
  const Component = mod?.default

  if (!Component) return null

  return (
    <div className="prose-content">
      <Component />
    </div>
  )
}