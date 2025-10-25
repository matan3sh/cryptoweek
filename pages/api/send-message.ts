import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClientWithToken } from '@/lib/sanity/client'

// Rate limiting storage (in-memory - simple solution)
// For production, consider using Redis or Vercel KV
const submissionTracker = new Map<string, { count: number; firstSubmission: number }>()

// Clean up old entries every hour
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000
  for (const [ip, data] of submissionTracker.entries()) {
    if (data.firstSubmission < oneHourAgo) {
      submissionTracker.delete(ip)
    }
  }
}, 60 * 60 * 1000)

// Submission time tracker to detect bots (too fast = bot)
const submissionTimeTracker = new Map<string, number>()

interface ContactSubmissionBody {
  firstName: string
  lastName: string
  email: string
  company?: string
  message: string
  honeypot?: string // Hidden field to catch bots
  _formStartTime?: number // Track how long user took to fill form
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const body = req.body as ContactSubmissionBody
    const { firstName, lastName, email, company, message, honeypot, _formStartTime } = body

    // Get IP address
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
                req.socket.remoteAddress ||
                'unknown'

    // 1. HONEYPOT CHECK - Bots fill hidden fields
    if (honeypot && honeypot.trim() !== '') {
      console.log(`[SPAM] Honeypot triggered from IP: ${ip}`)

      // Save as spam in Sanity
      await sanityClientWithToken.create({
        _type: 'contactSubmission',
        firstName: firstName || 'Unknown',
        lastName: lastName || 'Bot',
        email: email || 'spam@detected.com',
        company,
        message: message || 'Honeypot triggered',
        submittedAt: new Date().toISOString(),
        ipAddress: ip,
        userAgent: req.headers['user-agent'] || 'Unknown',
        status: 'spam',
      })

      // Return success to fool the bot
      return res.status(200).json({ message: 'Message sent successfully' })
    }

    // 2. TIME-BASED VALIDATION - Humans need at least 3 seconds to fill form
    if (_formStartTime) {
      const timeTaken = Date.now() - _formStartTime
      if (timeTaken < 3000) {
        console.log(`[SPAM] Form filled too fast (${timeTaken}ms) from IP: ${ip}`)

        await sanityClientWithToken.create({
          _type: 'contactSubmission',
          firstName,
          lastName,
          email,
          company,
          message,
          submittedAt: new Date().toISOString(),
          ipAddress: ip,
          userAgent: req.headers['user-agent'] || 'Unknown',
          status: 'spam',
        })

        return res.status(200).json({ message: 'Message sent successfully' })
      }
    }

    // 3. RATE LIMITING - Max 3 submissions per hour per IP
    const tracker = submissionTracker.get(ip)
    const now = Date.now()

    if (tracker) {
      const oneHourAgo = now - 60 * 60 * 1000

      // Reset if it's been more than an hour
      if (tracker.firstSubmission < oneHourAgo) {
        submissionTracker.set(ip, { count: 1, firstSubmission: now })
      } else if (tracker.count >= 3) {
        console.log(`[SPAM] Rate limit exceeded from IP: ${ip}`)
        return res.status(429).json({
          message: 'Too many requests. Please try again later.'
        })
      } else {
        tracker.count++
      }
    } else {
      submissionTracker.set(ip, { count: 1, firstSubmission: now })
    }

    // 4. VALIDATE REQUIRED FIELDS
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // 5. VALIDATE EMAIL FORMAT
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' })
    }

    // 6. VALIDATE LENGTHS
    if (firstName.length > 50 || lastName.length > 50) {
      return res.status(400).json({ message: 'Name too long' })
    }

    if (email.length > 100) {
      return res.status(400).json({ message: 'Email too long' })
    }

    if (message.length > 2000) {
      return res.status(400).json({ message: 'Message too long' })
    }

    // 7. SAVE TO SANITY
    const submission = await sanityClientWithToken.create({
      _type: 'contactSubmission',
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || undefined,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      ipAddress: ip,
      userAgent: req.headers['user-agent'] || 'Unknown',
      status: 'new',
    })

    console.log(`[SUCCESS] Contact submission saved: ${submission._id} from ${email}`)

    return res.status(200).json({
      message: 'Message sent successfully',
      submissionId: submission._id
    })

  } catch (error) {
    console.error('[ERROR] Failed to save contact submission:', error)
    return res.status(500).json({
      message: 'Failed to send message. Please try again.'
    })
  }
}
