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
  getSiteSettings,
  getNavigationLinks,
  getPartnerLogoUrls,
  getSupporterLogoUrls,
  getLegacySpeakersData,
  getLegacyTeamData,
} from '@/lib/content'
import { sendMessage } from '@/services'
import type { ContactFormValues, HomePage, SiteSettings, NavigationLink } from '@/types'
import type { GetStaticProps } from 'next'

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 40px 0 40px;

  @media screen and (max-width: 1024px) {
    max-width: 100%;
    padding: 110px 30px 0 30px;
  }

  @media screen and (max-width: 768px) {
    padding: 100px 20px 20px 20px;
  }

  @media screen and (max-width: 480px) {
    padding: 90px 12px 20px 12px;
  }
`

interface HomeProps {
  settings: SiteSettings
  navLinks: NavigationLink[]
  homePage: HomePage
  partnersData: string[]
  supportersData: string[]
  speakersData: Array<{ name: string; role: string; image: string }>
  teamData: Array<{ name: string; role: string; image: string }>
}

const Home: React.FC<HomeProps> = ({
  settings,
  navLinks,
  homePage,
  partnersData,
  supportersData,
  speakersData,
  teamData,
}) => {
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
      <SEO settings={settings} />
      <WebsiteStructuredData settings={settings} />
      <SkipToContent />
      <Header settings={settings} navLinks={navLinks} />
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
      <Footer settings={settings} />
    </>
  )
}

// Fetch data from Sanity at build time
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const settings = await getSiteSettings()
  const navLinks = await getNavigationLinks()
  const homePage = await getHomePage()
  const partnersData = await getPartnerLogoUrls()
  const supportersData = await getSupporterLogoUrls()
  const speakersData = await getLegacySpeakersData()
  const teamData = await getLegacyTeamData()

  return {
    props: {
      settings,
      navLinks,
      homePage,
      partnersData,
      supportersData,
      speakersData,
      teamData,
    },
    // Revalidate every hour (ISR)
    revalidate: 3600,
  }
}

export default Home
