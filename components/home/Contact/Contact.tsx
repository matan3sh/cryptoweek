import type { ContactFormValues } from '@/types'
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
    <Container>
      <h1>Contact</h1>
      <Wrapper onSubmit={handleSubmit}>
        <Row>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleInputChange}
            value={values.firstName}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
            value={values.lastName}
          />
        </Row>
        <Row>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={values.email}
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            onChange={handleInputChange}
            value={values.company}
          />
        </Row>
        <Row>
          <textarea
            rows={12}
            name="message"
            placeholder="Message"
            onChange={handleInputChange}
            value={values.message}
          />
        </Row>
        {success && <Success>We've got your message!</Success>}
        <Row>
          <button className="button" type="submit">
            Send
          </button>
        </Row>
      </Wrapper>
    </Container>
  )
}

export default Contact
