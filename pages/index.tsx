import { useCallback, useState } from 'react'

import {
  Contact,
  Feature,
  GridSection,
  GridText,
  Section,
} from '@/components/home'
import { Footer, Header } from '@/components/layout'
import { SEO, WebsiteStructuredData } from '@/components/SEO'
import { SkipToContent } from '@/components/SkipToContent'

import {
  getHomePage,
  getPartnerLogoUrls,
  getSupporterLogoUrls,
  getLegacySpeakersData,
  getLegacyTeamData,
} from '@/lib/content/static'
import { sendMessage } from '@/services'
import type { ContactFormValues } from '@/types'

const Home: React.FC = () => {
  const [sentSuccess, setSentSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Load content from content layer
  const homePage = getHomePage()
  const partnersData = getPartnerLogoUrls()
  const supportersData = getSupporterLogoUrls()
  const speakersData = getLegacySpeakersData()
  const teamData = getLegacyTeamData()

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
      <SEO />
      <WebsiteStructuredData />
      <SkipToContent />
      <Header />
      <main id="main-content">
        <Feature />
        <GridSection
          data={partnersData}
          title={homePage.partners.title}
          link={homePage.partners.identifier}
        />
        <GridSection
          data={supportersData}
          title={homePage.supporters.title}
          link={homePage.supporters.identifier}
        />
        <Section data={homePage.sections.about} />
        <GridText
          title={homePage.speakers.title}
          data={speakersData}
          link={homePage.speakers.identifier}
        />
        <Section data={homePage.sections.invite} />
        <GridText
          title={homePage.team.title}
          data={teamData}
          link={homePage.team.identifier}
        />
        <Contact
          onSubmit={sendContact}
          success={sentSuccess}
          error={error}
          isSubmitting={isSubmitting}
        />
      </main>
      <Footer />
    </>
  )
}

export default Home
