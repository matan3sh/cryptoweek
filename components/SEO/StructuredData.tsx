import Head from 'next/head'
import { getSiteSettings } from '@/lib/content/static'

interface EventStructuredDataProps {
  eventName: string
  startDate: string
  endDate: string
  location?: {
    name: string
    address?: string
  }
  description: string
  image: string
  url: string
  organizer?: {
    name: string
    url: string
  }
}

interface OrganizationStructuredDataProps {
  name: string
  url: string
  logo: string
  sameAs?: string[] // Social media profiles
  contactPoint?: {
    email: string
    contactType: string
  }
}

/**
 * Event Structured Data Component
 * Adds JSON-LD schema for events to improve SEO and enable rich snippets
 */
export const EventStructuredData: React.FC<EventStructuredDataProps> = ({
  eventName,
  startDate,
  endDate,
  location,
  description,
  image,
  url,
  organizer,
}) => {
  const settings = getSiteSettings()
  const fullImageUrl = image.startsWith('http')
    ? image
    : `${settings.seo.siteUrl}${image}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: eventName,
    startDate,
    endDate,
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: location
      ? {
          '@type': 'Place',
          name: location.name,
          address: location.address
            ? {
                '@type': 'PostalAddress',
                addressLocality: location.address,
              }
            : undefined,
        }
      : undefined,
    image: [fullImageUrl],
    description,
    url,
    organizer: organizer
      ? {
          '@type': 'Organization',
          name: organizer.name,
          url: organizer.url,
        }
      : undefined,
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  )
}

/**
 * Organization Structured Data Component
 * Adds JSON-LD schema for organizations to improve SEO
 */
export const OrganizationStructuredData: React.FC<
  OrganizationStructuredDataProps
> = ({ name, url, logo, sameAs, contactPoint }) => {
  const settings = getSiteSettings()
  const fullLogoUrl = logo.startsWith('http')
    ? logo
    : `${settings.seo.siteUrl}${logo}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: fullLogoUrl,
    sameAs,
    contactPoint: contactPoint
      ? {
          '@type': 'ContactPoint',
          email: contactPoint.email,
          contactType: contactPoint.contactType,
        }
      : undefined,
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  )
}

/**
 * Website Structured Data Component
 * Adds basic website schema
 */
export const WebsiteStructuredData: React.FC = () => {
  const settings = getSiteSettings()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.seo.siteName,
    url: settings.seo.siteUrl,
    description: settings.description,
    publisher: {
      '@type': 'Organization',
      name: settings.seo.siteName,
    },
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  )
}
