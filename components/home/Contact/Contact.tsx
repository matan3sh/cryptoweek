'use client'
import { fadeInUp, staggerContainer } from '@/components/animations'
import type { ContactFormValues } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Container, Row, Success, Wrapper } from './styles'

interface ContactProps {
  onSubmit: (values: ContactFormValues) => void
  success: boolean
}

const Contact: React.FC<ContactProps> = ({ onSubmit, success }) => {
  const [values, setValues] = useState<ContactFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValues({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      message: '',
    })
    onSubmit(values)
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
          <motion.input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleInputChange}
            value={values.firstName}
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
          <motion.input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
            value={values.lastName}
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
        </Row>

        <Row as={motion.div} variants={fadeInUp}>
          <motion.input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={values.email}
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
        </Row>

        <Row as={motion.div} variants={fadeInUp}>
          <motion.textarea
            rows={12}
            name="message"
            placeholder="Message"
            onChange={handleInputChange}
            value={values.message}
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
              <Success>We've got your message!</Success>
            </motion.div>
          )}
        </AnimatePresence>

        <Row as={motion.div} variants={fadeInUp}>
          <motion.button
            className="button"
            type="submit"
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
            transition={{ duration: 0.3 }}
          >
            Send
          </motion.button>
        </Row>
      </Wrapper>
    </Container>
  )
}

export default Contact
