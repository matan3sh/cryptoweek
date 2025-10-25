/**
 * Unified Content Layer with Feature Flag
 *
 * This module provides a single API for content access that can toggle between
 * Sanity CMS and static JSON files based on the NEXT_PUBLIC_USE_SANITY env var.
 *
 * Usage:
 * - Set NEXT_PUBLIC_USE_SANITY=true to use Sanity CMS
 * - Set NEXT_PUBLIC_USE_SANITY=false to use static JSON files
 *
 * @module lib/content
 */

import * as staticContent from './static'
import * as sanityContent from './sanity'

// Feature flag: Check if we should use Sanity
const useSanity = process.env.NEXT_PUBLIC_USE_SANITY === 'true'

// Log which content source is being used (helpful for debugging)
if (typeof window === 'undefined') {
  // Server-side only logging
  console.log(`📦 Content Source: ${useSanity ? 'Sanity CMS' : 'Static JSON'}`)
}

// Export the appropriate content layer based on feature flag
// This allows us to switch between Sanity and static content seamlessly

export const getSiteSettings = useSanity
  ? sanityContent.getSiteSettings
  : staticContent.getSiteSettings

export const getPrimaryCta = useSanity
  ? sanityContent.getPrimaryCta
  : staticContent.getPrimaryCta

export const getNavigationLinks = useSanity
  ? sanityContent.getNavigationLinks
  : staticContent.getNavigationLinks

export const getHomePage = useSanity
  ? sanityContent.getHomePage
  : staticContent.getHomePage

export const getAllSpeakers = useSanity
  ? sanityContent.getAllSpeakers
  : staticContent.getAllSpeakers

export const getAllTeamMembers = useSanity
  ? sanityContent.getAllTeamMembers
  : staticContent.getAllTeamMembers

export const getAllPartners = useSanity
  ? sanityContent.getAllPartners
  : staticContent.getAllPartners

export const getAllSupporters = useSanity
  ? sanityContent.getAllSupporters
  : staticContent.getAllSupporters

export const getLegacySpeakersData = useSanity
  ? sanityContent.getLegacySpeakersData
  : staticContent.getLegacySpeakersData

export const getLegacyTeamData = useSanity
  ? sanityContent.getLegacyTeamData
  : staticContent.getLegacyTeamData

export const getPartnerLogoUrls = useSanity
  ? sanityContent.getPartnerLogoUrls
  : staticContent.getPartnerLogoUrls

export const getSupporterLogoUrls = useSanity
  ? sanityContent.getSupporterLogoUrls
  : staticContent.getSupporterLogoUrls

// Re-export types
export type {
  SiteSettings,
  HomePage,
  Person,
  Company,
  NavigationLink,
  CallToAction,
} from './interfaces'
