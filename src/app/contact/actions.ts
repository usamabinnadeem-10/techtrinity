'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string
  const budget = formData.get('budget') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return {
      status: 'error',
      message: 'Name, email, and message are required.'
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      status: 'error',
      message: 'Please enter a valid email address.'
    }
  }

  try {
    await resend.emails.send({
      from: 'TechTrinity Contact <contact@techtrinity.ai>',
      to: 'usama@techtrinity.ai',
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` — ${company}` : ''}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Budget: ${budget || 'Not provided'}
Message:
${message}
      `.trim()
    })

    return {
      status: 'success',
      message: "Message received. We'll be in touch within 24 hours."
    }
  } catch {
    return {
      status: 'error',
      message: 'Something went wrong. Please try emailing us directly at usama@techtrinity.ai'
    }
  }
}
