import Head from 'next/head'
import { useCallback, useState } from 'react'

import {
  Contact,
  Feature,
  GridSection,
  GridText,
  Section,
} from '@/components/home'
import { Footer, Header } from '@/components/layout'

import {
  about,
  invite,
  ourPartnersData,
  ourSpeakersData,
  ourSupportersData,
  ourTeamData,
} from '@/data'
import { sendMessage } from '@/services'
import type { ContactFormValues } from '@/types'

const Home: React.FC = () => {
  const [sentSuccess, setSentSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const sendContact = useCallback(async (values: ContactFormValues) => {
    setIsSubmitting(true)
    setError('')

    try {
      await sendMessage({
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        company: values.company,
        message: values.message,
      })
      setSentSuccess(true)
      setTimeout(() => {
        setSentSuccess(false)
      }, 3000)
    } catch (err) {
      setError('Failed to send message. Please try again.')
      console.error('Send contact error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Cryptoweek.co.il - Calling Israel&apos;s Top Crypto Talents</title>
        <meta
          name="description"
          content="Join global crypto leaders, VC firms and promising blockchain companies unveiling the future trends from the world&apos;s top Crypto Week!"
        />
        <meta
          name="keywords"
          content="crypto bitcoin, ethereum, revolut, kraken, visa, circle"
        />
      </Head>
      <Header />
      <Feature />
      <GridSection
        data={ourPartnersData}
        title="Our Partners"
        link="Partners"
      />
      <GridSection
        data={ourSupportersData}
        title="Supporters"
        link="Supporters"
      />
      <Section data={about} />
      <GridText title="Our Speakers" data={ourSpeakersData} link="Speakers" />
      <Section data={invite} />
      <GridText title="Our Team" data={ourTeamData} link="Team" />
      <Contact
        onSubmit={sendContact}
        success={sentSuccess}
        error={error}
        isSubmitting={isSubmitting}
      />
      <Footer />
    </>
  )
}

export default Home
