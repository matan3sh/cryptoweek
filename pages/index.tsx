import { useCallback, useState } from 'react'
import styled from 'styled-components'

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

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 40px 0 40px;

  @media screen and (max-width: 1024px) {
    max-width: 100%;
    padding: 110px 30px 0 30px;
  }

  @media screen and (max-width: 768px) {
    padding: 100px 20px 0 20px;
  }

  @media screen and (max-width: 480px) {
    padding: 90px 12px 0 12px;
  }
`

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
      <MainContainer id="main-content">
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
      </MainContainer>
      <Footer />
    </>
  )
}

export default Home
