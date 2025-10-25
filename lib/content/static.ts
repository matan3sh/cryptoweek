/**
 * Content Access Layer
 *
 * This module provides a type-safe interface for accessing all application content.
 * Currently reads from /data/index.ts and converts to new content interfaces.
 *
 * Future: Will be replaced with Sanity GROQ queries while maintaining the same API.
 *
 * @module lib/content/static
 */

import {
  about,
  invite,
  ourPartnersData,
  ourSupportersData,
  ourSpeakersData,
  ourTeamData,
  headerLinks,
  featurPartners,
} from '@/data'

import type {
  SiteSettings,
  HomePage,
  Person,
  Company,
  HeroSection,
  ContentSection,
  PartnerSection,
  PeopleSection,
  NavigationLink,
  CompanyLogo,
} from './interfaces'

import {
  legacySectionToContentSection,
  legacyPersonToPerson,
  legacyImageToImageAsset,
  legacyFeaturePartnerToCompanyLogo,
} from './interfaces'

// Import JSON content
import settingsData from '@/content/settings.json'
import homePageData from '@/content/pages/home.json'

// ============================================
// SITE SETTINGS
// ============================================

/**
 * Get site-wide settings and configuration
 * @returns Site settings object
 */
export function getSiteSettings(): SiteSettings {
  const currentYear = new Date().getFullYear()

  return {
    ...settingsData,
    footer: {
      ...settingsData.footer,
      year: currentYear, // Use current year dynamically
    },
  } as SiteSettings
}

/**
 * Get primary call-to-action configuration
 * @returns CTA configuration
 */
export function getPrimaryCta() {
  const settings = getSiteSettings()
  return settings.primaryCta
}

/**
 * Get navigation links
 * @returns Array of navigation links
 */
export function getNavigationLinks(): NavigationLink[] {
  return headerLinks.map((link) => ({
    title: link.title,
    url: link.link,
    openInNewTab: false,
  }))
}

// ============================================
// HOME PAGE CONTENT
// ============================================

/**
 * Get complete home page content structure
 * @returns Home page content
 */
export function getHomePage(): HomePage {
  return {
    hero: getHeroSection(),
    sections: {
      about: getAboutSection(),
      invite: getInviteSection(),
    },
    partners: getPartnersSection(),
    supporters: getSupportersSection(),
    speakers: getSpeakersSection(),
    team: getTeamSection(),
  }
}

/**
 * Get hero section content
 * @returns Hero section configuration
 */
export function getHeroSection(): HeroSection {
  const { hero } = homePageData

  return {
    ...hero,
    featuredPartners: featurPartners.map(legacyFeaturePartnerToCompanyLogo),
  } as HeroSection
}

/**
 * Get about section content
 * @returns About section content
 */
export function getAboutSection(): ContentSection {
  return legacySectionToContentSection(about)
}

/**
 * Get invite section content
 * @returns Invite section content
 */
export function getInviteSection(): ContentSection {
  return legacySectionToContentSection(invite)
}

// ============================================
// PEOPLE (SPEAKERS & TEAM)
// ============================================

/**
 * Get all speakers
 * @returns Array of speaker persons
 */
export function getAllSpeakers(): Person[] {
  return ourSpeakersData.map((speaker, index) =>
    legacyPersonToPerson(speaker, 'speaker', index)
  )
}

/**
 * Get all team members
 * @returns Array of team persons
 */
export function getAllTeamMembers(): Person[] {
  return ourTeamData.map((member, index) =>
    legacyPersonToPerson(member, 'team', index)
  )
}

/**
 * Get featured speakers
 * @returns Array of featured speakers
 */
export function getFeaturedSpeakers(): Person[] {
  const speakers = getAllSpeakers()
  return speakers.slice(0, 6) // First 6 as featured
}

/**
 * Get speaker by ID
 * @param id - Speaker ID
 * @returns Speaker person or undefined
 */
export function getSpeakerById(id: string): Person | undefined {
  const speakers = getAllSpeakers()
  return speakers.find((speaker) => speaker.id === id)
}

/**
 * Get speakers section configuration
 * @returns Speakers section
 */
export function getSpeakersSection(): PeopleSection {
  return {
    title: homePageData.speakers.title,
    identifier: homePageData.speakers.identifier,
    people: getAllSpeakers(),
  }
}

/**
 * Get team section configuration
 * @returns Team section
 */
export function getTeamSection(): PeopleSection {
  return {
    title: homePageData.team.title,
    identifier: homePageData.team.identifier,
    people: getAllTeamMembers(),
  }
}

// ============================================
// COMPANIES (PARTNERS & SUPPORTERS)
// ============================================

/**
 * Get all partners
 * @returns Array of partner companies
 */
export function getAllPartners(): Company[] {
  return ourPartnersData.map((logoUrl, index) => ({
    id: `partner-${index}`,
    name: extractCompanyNameFromUrl(logoUrl),
    logo: legacyImageToImageAsset(logoUrl, 'Partner logo'),
    tier: 'platinum' as const,
    order: index,
  }))
}

/**
 * Get all supporters
 * @returns Array of supporter companies
 */
export function getAllSupporters(): Company[] {
  return ourSupportersData.map((logoUrl, index) => ({
    id: `supporter-${index}`,
    name: extractCompanyNameFromUrl(logoUrl),
    logo: legacyImageToImageAsset(logoUrl, 'Supporter logo'),
    tier: 'supporter' as const,
    order: index,
  }))
}

/**
 * Get partners section configuration
 * @returns Partners section
 */
export function getPartnersSection(): PartnerSection {
  return {
    title: homePageData.partners.title,
    identifier: homePageData.partners.identifier,
    companies: getAllPartners(),
  }
}

/**
 * Get supporters section configuration
 * @returns Supporters section
 */
export function getSupportersSection(): PartnerSection {
  return {
    title: homePageData.supporters.title,
    identifier: homePageData.supporters.identifier,
    companies: getAllSupporters(),
  }
}

/**
 * Get featured partners (for hero section)
 * @returns Array of featured partner logos
 */
export function getFeaturedPartners(): CompanyLogo[] {
  return featurPartners.map(legacyFeaturePartnerToCompanyLogo)
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Extract company name from image URL
 * @param url - Image URL
 * @returns Company name
 */
function extractCompanyNameFromUrl(url: string): string {
  const filename = url.split('/').pop() || ''
  const nameWithoutExtension = filename.replace(/\.[^/.]+$/, '')
  return nameWithoutExtension.replace(/[-_]/g, ' ')
}

// ============================================
// LEGACY COMPATIBILITY EXPORTS
// ============================================

/**
 * Get partner logo URLs (for backwards compatibility with GridSection)
 * @deprecated Use getPartnersSection() instead
 */
export function getPartnerLogoUrls(): string[] {
  return ourPartnersData
}

/**
 * Get supporter logo URLs (for backwards compatibility with GridSection)
 * @deprecated Use getSupportersSection() instead
 */
export function getSupporterLogoUrls(): string[] {
  return ourSupportersData
}

/**
 * Get speaker data (for backwards compatibility with GridText)
 * @deprecated Use getAllSpeakers() instead
 */
export function getLegacySpeakersData() {
  return ourSpeakersData
}

/**
 * Get team data (for backwards compatibility with GridText)
 * @deprecated Use getAllTeamMembers() instead
 */
export function getLegacyTeamData() {
  return ourTeamData
}
