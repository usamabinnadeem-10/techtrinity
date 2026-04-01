'use client'

import { useActionState } from 'react'
import { submitContactForm, type ContactFormState } from '@/app/contact/actions'

const initialState: ContactFormState = {
  status: 'idle',
  message: ''
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initialState)

  if (state.status === 'success') {
    return (
      <div className="py-12 border border-border p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
          Message sent
        </p>
        <p className="font-serif text-2xl text-fg">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="font-mono text-xs uppercase tracking-widest text-muted"
          >
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="bg-bg border border-border text-fg font-sans text-sm px-4 py-3 outline-none focus:border-fg transition-colors placeholder:text-muted"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-mono text-xs uppercase tracking-widest text-muted"
          >
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="bg-bg border border-border text-fg font-sans text-sm px-4 py-3 outline-none focus:border-fg transition-colors placeholder:text-muted"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="company"
            className="font-mono text-xs uppercase tracking-widest text-muted"
          >
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Your company (optional)"
            className="bg-bg border border-border text-fg font-sans text-sm px-4 py-3 outline-none focus:border-fg transition-colors placeholder:text-muted"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="budget"
            className="font-mono text-xs uppercase tracking-widest text-muted"
          >
            Budget range
          </label>
          <select
            id="budget"
            name="budget"
            className="bg-bg border border-border text-fg font-sans text-sm px-4 py-3 outline-none focus:border-fg transition-colors"
          >
            <option value="">Select a range (optional)</option>
            <option value="Under $5k">Under $5k</option>
            <option value="$5k–$15k">$5k – $15k</option>
            <option value="$15k–$30k">$15k – $30k</option>
            <option value="$30k–$50k">$30k – $50k</option>
            <option value="$50k+">$50k+</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project — what are you building, what's your timeline, and where are you stuck?"
          className="bg-bg border border-border text-fg font-sans text-sm px-4 py-3 outline-none focus:border-fg transition-colors placeholder:text-muted resize-none"
        />
      </div>

      {state.status === 'error' && (
        <p className="font-mono text-xs text-red-600">{state.message}</p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="bg-fg text-bg font-mono text-xs uppercase tracking-widest px-8 py-3 disabled:opacity-50 transition-opacity"
        >
          {pending ? 'Sending...' : 'Send message →'}
        </button>
      </div>
    </form>
  )
}
