import type { ApiResponse, SendMessageRequest } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

interface ExtendedNextApiRequest extends NextApiRequest {
  body: SendMessageRequest
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Only POST requests are accepted.',
    })
  }

  const { name, email, message } = req.body

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, email, and message are required.',
    })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format.',
    })
  }

  try {
    // Create transporter (configure based on your email service)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Email options
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'contact@cryptoweek.co.il',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
    })
  }
}
