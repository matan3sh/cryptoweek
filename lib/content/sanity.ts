/**
 * Sanity Content Access Layer
 *
 * This module provides the same API as static.ts but fetches from Sanity.
 * Drop-in replacement - just change your imports from './static' to './sanity'
 *
 * @module lib/content/sanity
 */

import {sanityClientWithToken} from '@/lib/sanity/client'
import {
  SITE_SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  ALL_SPEAKERS_QUERY,
  ALL_TEAM_QUERY,
  ALL_PARTNERS_QUERY,
  ALL_SUPPORTERS_QUERY,
} from '@/lib/sanity/queries'

// Use the token-based client (no CDN) for server-side fetching
// This ensures we always get fresh content during ISR builds
const sanityClient = sanityClientWithToken

import type {
  SiteSettings,
  HomePage,
  Person,
  Company,
  NavigationLink,
  CallToAction,
} from './interfaces'

// ============================================
// HELPERS
// ============================================

// ============================================
// SANITY RESPONSE TYPES
// ============================================

interface SanityImageAsset {
  _id: string
  url: string
  metadata?: {
    dimensions?: {
      width: number
      height: number
    }
    lqip?: string
  }
}

interface SanityImage {
  asset?: SanityImageAsset
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

interface SanityPerson {
  _id: string
  name: string
  role: string
  type: 'speaker' | 'team'
  company?: string
  image?: SanityImage
  bio?: string
  socialLinks?: Array<{
    platform: string
    url: string
    handle?: string
  }>
  featured?: boolean
  order?: number
}

interface SanityCompany {
  _id: string
  name: string
  logo?: SanityImage
  website?: string
  tier?: 'platinum' | 'gold' | 'silver' | 'supporter'
  featured?: boolean
  order?: number
}

interface SanityCompanyLogo {
  name: string
  logo?: SanityImage
  displayWidth?: string
  displayHeight?: string
}

/**
 * Transform Sanity image to ImageAsset format
 */
function transformSanityImage(sanityImage?: SanityImage) {
  if (!sanityImage?.asset) return undefined

  return {
    src: sanityImage.asset.url,
    alt: sanityImage.alt || '',
    width: sanityImage.asset.metadata?.dimensions?.width,
    height: sanityImage.asset.metadata?.dimensions?.height,
    blurDataUrl: sanityImage.asset.metadata?.lqip,
  }
}

// ============================================
// SITE SETTINGS
// ============================================

/**
 * Get site-wide settings and configuration from Sanity
 * @returns Site settings object
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityClient.fetch(SITE_SETTINGS_QUERY)

  if (!data) {
    throw new Error('Site settings not found in Sanity')
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords || [],
    seo: {
      siteUrl: data.seo.siteUrl,
      siteName: data.seo.siteName,
      locale: data.seo.locale,
      ogImage: {
        url: data.seo.ogImage?.image?.asset?.url || '',
        width: data.seo.ogImage?.width || 1200,
        height: data.seo.ogImage?.height || 630,
        alt: data.seo.ogImage?.image?.alt || '',
      },
      twitterHandle: data.seo.twitterHandle || null,
    },
    logo: {
      text: data.logo.text,
      url: data.logo.image?.asset?.url || null,
    },
    footer: {
      copyrightText: data.footer.copyrightText,
      year: data.footer.year,
      email: data.footer.email,
    },
    primaryCta: data.primaryCta,
    eventUrl: data.eventUrl || null,
    navigation: data.navigation || [],
    contactSection: data.contactSection,
  }
}

/**
 * Get primary call-to-action configuration
 */
export async function getPrimaryCta(): Promise<CallToAction> {
  const settings = await getSiteSettings()
  return settings.primaryCta
}

/**
 * Get navigation links
 */
export async function getNavigationLinks(): Promise<NavigationLink[]> {
  const settings = await getSiteSettings()
  return settings.navigation
}

// ============================================
// HOME PAGE CONTENT
// ============================================

/**
 * Get complete home page content structure from Sanity
 * @returns Home page content
 */
export async function getHomePage(): Promise<HomePage> {
  const data = await sanityClient.fetch(HOME_PAGE_QUERY)

  if (!data) {
    throw new Error('Home page not found in Sanity')
  }

  return {
    hero: {
      headline: data.hero.headline,
      title: data.hero.title,
      titleHighlight: data.hero.titleHighlight,
      subtitle: data.hero.subtitle,
      description: data.hero.description,
      backgroundImage: data.hero.backgroundImage?.asset?.url || null,
      heroImage: transformSanityImage(data.hero.heroImage) ?? null,
      cta: data.hero.cta,
      featuredPartners: (data.hero.featuredPartners || []).map((partner: SanityCompanyLogo) => ({
        name: partner.name,
        logo: transformSanityImage(partner.logo) || { src: '', alt: '' },
        displayWidth: partner.displayWidth,
        displayHeight: partner.displayHeight,
      })),
    },
    sections: {
      about: {
        title: data.aboutSection.title,
        subtitle: data.aboutSection.subtitle,
        theme: data.aboutSection.theme,
        // Use static background images, not from Sanity
        backgroundImage: '/static/images/about/bg.png',
      },
      invite: {
        title: data.inviteSection.title,
        subtitle: data.inviteSection.subtitle,
        theme: data.inviteSection.theme,
        // Use static background images, not from Sanity
        backgroundImage: '/static/images/invite/bg.png',
      },
    },
    partners: {
      title: data.partnersTitle,
      identifier: 'Partners',
      companies: data.partners || [],
    },
    supporters: {
      title: data.supportersTitle,
      identifier: 'Supporters',
      companies: data.supporters || [],
    },
    speakers: {
      title: data.speakersTitle,
      identifier: 'Speakers',
      people: data.speakers || [],
    },
    team: {
      title: data.teamTitle,
      identifier: 'Team',
      people: data.team || [],
    },
  }
}

// ============================================
// COLLECTIONS
// ============================================

/**
 * Get all speakers from Sanity
 */
export async function getAllSpeakers(): Promise<Person[]> {
  const speakers: SanityPerson[] = await sanityClient.fetch(ALL_SPEAKERS_QUERY)
  return (speakers || []).map((speaker) => ({
    id: speaker._id,
    name: speaker.name,
    role: speaker.role,
    company: speaker.company,
    image: transformSanityImage(speaker.image) || { src: '', alt: '' },
    bio: speaker.bio,
    socialLinks: (speaker.socialLinks || []) as any,
    featured: speaker.featured,
    order: speaker.order,
    type: 'speaker' as const,
  }))
}

/**
 * Get all team members from Sanity
 */
export async function getAllTeamMembers(): Promise<Person[]> {
  const team: SanityPerson[] = await sanityClient.fetch(ALL_TEAM_QUERY)
  return (team || []).map((member) => ({
    id: member._id,
    name: member.name,
    role: member.role,
    company: member.company,
    image: transformSanityImage(member.image) || { src: '', alt: '' },
    bio: member.bio,
    socialLinks: (member.socialLinks || []) as any,
    featured: member.featured,
    order: member.order,
    type: 'team' as const,
  }))
}

/**
 * Get all partners from Sanity
 */
export async function getAllPartners(): Promise<Company[]> {
  const partners: SanityCompany[] = await sanityClient.fetch(ALL_PARTNERS_QUERY)
  return (partners || []).map((partner) => ({
    id: partner._id,
    name: partner.name,
    logo: transformSanityImage(partner.logo) || { src: '', alt: '' },
    website: partner.website,
    tier: partner.tier,
    featured: partner.featured,
    order: partner.order,
  }))
}

/**
 * Get all supporters from Sanity
 */
export async function getAllSupporters(): Promise<Company[]> {
  const supporters: SanityCompany[] = await sanityClient.fetch(ALL_SUPPORTERS_QUERY)
  return (supporters || []).map((supporter) => ({
    id: supporter._id,
    name: supporter.name,
    logo: transformSanityImage(supporter.logo) || { src: '', alt: '' },
    website: supporter.website,
    tier: supporter.tier,
    featured: supporter.featured,
    order: supporter.order,
  }))
}

// ============================================
// LEGACY COMPATIBILITY (for components still using old format)
// ============================================

/**
 * Get speakers in legacy format
 * @deprecated Use getAllSpeakers() instead
 */
export async function getLegacySpeakersData() {
  const speakers = await getAllSpeakers()
  return speakers.map((speaker) => ({
    name: speaker.name,
    role: speaker.role,
    image: speaker.image?.src || '',
  }))
}

/**
 * Get team in legacy format
 * @deprecated Use getAllTeamMembers() instead
 */
export async function getLegacyTeamData() {
  const team = await getAllTeamMembers()
  return team.map((member) => ({
    name: member.name,
    role: member.role,
    image: member.image?.src || '',
  }))
}

/**
 * Get partner logo URLs only
 * @deprecated Use getAllPartners() instead
 */
export async function getPartnerLogoUrls(): Promise<string[]> {
  const partners = await getAllPartners()
  return partners.map((p) => p.logo?.src).filter(Boolean) as string[]
}

/**
 * Get supporter logo URLs only
 * @deprecated Use getAllSupporters() instead
 */
export async function getSupporterLogoUrls(): Promise<string[]> {
  const supporters = await getAllSupporters()
  return supporters.map((s) => s.logo?.src).filter(Boolean) as string[]
}
