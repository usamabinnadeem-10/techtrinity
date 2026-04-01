'use client'

import { useEffect } from 'react'

interface CalendlyEmbedProps {
  url: string
}

export function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <div
        className="calendly-inline-widget"
        style={{ minWidth: '320px', height: '700px', width: '100%' }}
        data-url={`${url}?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=1A1A18`}
      />
    </div>
  )
}
