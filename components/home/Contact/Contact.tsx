import type { ContactFormValues } from '@/types'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Container, Row, Success, Wrapper } from './styles'

interface ContactProps {
  onSubmit: (values: ContactFormValues) => Promise<void>
  success: boolean
  error?: string
  isSubmitting?: boolean
}

const Contact: React.FC<ContactProps> = ({
  onSubmit,
  success,
  error,
  isSubmitting = false,
}) => {
  const [values, setValues] = useState<ContactFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<ContactFormValues>>({})

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormValues]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormValues> = {}

    // First name validation
    if (!values.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    // Last name validation
    if (!values.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    // Email validation
    if (!values.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Message validation
    if (!values.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return // Don't submit if validation fails
    }

    await onSubmit(values)

    // Only clear form if submission was successful
    if (!error) {
      setValues({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: '',
      })
      setErrors({})
    }
  }

  return (
    <Container>
      <h1>Contact</h1>

      <Wrapper as="form" onSubmit={handleSubmit}>
        <Row>
          <div style={{ width: '100%' }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleInputChange}
              value={values.firstName}
              required
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            />
            {errors.firstName && (
              <span
                id="firstName-error"
                style={{
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  marginTop: '0.25rem',
                  display: 'block',
                }}
              >
                {errors.firstName}
              </span>
            )}
          </div>
          <div style={{ width: '100%' }}>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
              value={values.lastName}
              required
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            />
            {errors.lastName && (
              <span
                id="lastName-error"
                style={{
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  marginTop: '0.25rem',
                  display: 'block',
                }}
              >
                {errors.lastName}
              </span>
            )}
          </div>
        </Row>

        <Row>
          <div style={{ width: '100%' }}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={values.email}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span
                id="email-error"
                style={{
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  marginTop: '0.25rem',
                  display: 'block',
                }}
              >
                {errors.email}
              </span>
            )}
          </div>
          <div style={{ width: '100%' }}>
            <input
              type="text"
              name="company"
              placeholder="Company"
              onChange={handleInputChange}
              value={values.company}
            />
          </div>
        </Row>

        <Row>
          <div style={{ width: '100%' }}>
            <textarea
              rows={12}
              name="message"
              placeholder="Message"
              onChange={handleInputChange}
              value={values.message}
              required
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <span
                id="message-error"
                style={{
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  marginTop: '0.25rem',
                  display: 'block',
                }}
              >
                {errors.message}
              </span>
            )}
          </div>
        </Row>

        {success && <Success>We&apos;ve got your message!</Success>}
        {error && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <Row>
          <button
            className="button"
            type="submit"
            disabled={isSubmitting}
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </Row>
      </Wrapper>
    </Container>
  )
}

export default Contact
