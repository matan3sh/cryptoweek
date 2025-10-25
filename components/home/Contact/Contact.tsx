import { fadeInUp, staggerContainer } from '@/components/animations'
import type { ContactFormValues } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
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
    <Container
      as={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <motion.h1 variants={fadeInUp}>Contact</motion.h1>

      <Wrapper
        as={motion.form}
        onSubmit={handleSubmit}
        variants={staggerContainer}
      >
        <Row as={motion.div} variants={fadeInUp}>
          <div style={{ width: '100%' }}>
            <motion.input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleInputChange}
              value={values.firstName}
              required
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
                borderColor: '#667eea',
              }}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.3 }}
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
            <motion.input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
              value={values.lastName}
              required
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
                borderColor: '#667eea',
              }}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.3 }}
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

        <Row as={motion.div} variants={fadeInUp}>
          <div style={{ width: '100%' }}>
            <motion.input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={values.email}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
                borderColor: '#667eea',
              }}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.3 }}
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
            <motion.input
              type="text"
              name="company"
              placeholder="Company"
              onChange={handleInputChange}
              value={values.company}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
                borderColor: '#667eea',
              }}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </Row>

        <Row as={motion.div} variants={fadeInUp}>
          <div style={{ width: '100%' }}>
            <motion.textarea
              rows={12}
              name="message"
              placeholder="Message"
              onChange={handleInputChange}
              value={values.message}
              required
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
                borderColor: '#667eea',
              }}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.3 }}
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

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)',
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.9,
                transition: { duration: 0.3 },
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Success>We&apos;ve got your message!</Success>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)',
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.9,
                transition: { duration: 0.3 },
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            </motion.div>
          )}
        </AnimatePresence>

        <Row as={motion.div} variants={fadeInUp}>
          <motion.button
            className="button"
            type="submit"
            disabled={isSubmitting}
            whileHover={
              !isSubmitting
                ? {
                    scale: 1.05,
                    y: -2,
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                  }
                : {}
            }
            whileTap={
              !isSubmitting
                ? {
                    scale: 0.95,
                    transition: { duration: 0.1 },
                  }
                : {}
            }
            transition={{ duration: 0.3 }}
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </motion.button>
        </Row>
      </Wrapper>
    </Container>
  )
}

export default Contact
