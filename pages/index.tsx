import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

import { Feature } from '@/components/home'
import { Footer, Header } from '@/components/layout'
import { SEO, WebsiteStructuredData } from '@/components/SEO'
import { SkipToContent } from '@/components/SkipToContent'
import FeatureBoundary from '@/components/FeatureBoundary'

// Lazy load below-the-fold components for better performance
const GridSection = dynamic(() => import('@/components/home/GridSection/GridSection'), {
  loading: () => <div style={{ minHeight: '400px' }} />,
})
const Section = dynamic(() => import('@/components/home/Section/Section'), {
  loading: () => <div style={{ minHeight: '300px' }} />,
})
const GridText = dynamic(() => import('@/components/home/GridText/GridText'), {
  loading: () => <div style={{ minHeight: '600px' }} />,
})
const Contact = dynamic(() => import('@/components/home/Contact/Contact'), {
  loading: () => <div style={{ minHeight: '500px' }} />,
})

import {
  getHomePage,
  getSiteSettings,
  getNavigationLinks,
  getPartnerLogoUrls,
  getSupporterLogoUrls,
  getLegacySpeakersData,
  getLegacyTeamData,
} from '@/lib/content'
import type { ContactSubmissionData } from '@/types'
import type { HomePage, SiteSettings, NavigationLink } from '@/lib/content/interfaces'
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

  const sendContact = useCallback(async (values: ContactSubmissionData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to send message')
      }

      setSentSuccess(true)
      setTimeout(() => {
        setSentSuccess(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
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
        <FeatureBoundary featureName="hero section">
          <Feature hero={homePage.hero} />
        </FeatureBoundary>

        <FeatureBoundary featureName="partners section">
          <GridSection
            data={partnersData}
            title={homePage.partners.title}
            link={homePage.partners.identifier}
          />
        </FeatureBoundary>

        <FeatureBoundary featureName="supporters section">
          <GridSection
            data={supportersData}
            title={homePage.supporters.title}
            link={homePage.supporters.identifier}
          />
        </FeatureBoundary>

        <FeatureBoundary featureName="about section">
          <Section data={homePage.sections.about} />
        </FeatureBoundary>

        <FeatureBoundary featureName="speakers section">
          <GridText
            title={homePage.speakers.title}
            data={speakersData}
            link={homePage.speakers.identifier}
          />
        </FeatureBoundary>

        <FeatureBoundary featureName="invite section">
          <Section data={homePage.sections.invite} />
        </FeatureBoundary>

        <FeatureBoundary featureName="team section">
          <GridText
            title={homePage.team.title}
            data={teamData}
            link={homePage.team.identifier}
          />
        </FeatureBoundary>

        <FeatureBoundary featureName="contact form">
          <Contact
            config={settings.contactSection}
            onSubmit={sendContact}
            success={sentSuccess}
            error={error}
            isSubmitting={isSubmitting}
          />
        </FeatureBoundary>
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
