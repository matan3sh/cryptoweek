/**
 * Content Type Interfaces
 *
 * These interfaces define the structure of all content in the application.
 * They are designed to be easily convertible to Sanity.io schema types in the future.
 *
 * @see /docs/SANITY_MIGRATION.md for migration instructions (to be created)
 */

// ============================================
// CORE CONTENT TYPES
// ============================================

/**
 * SEO metadata configuration
 */
export interface SeoMetadata {
  siteUrl: string
  siteName: string
  locale: string
  ogImage: {
    url: string
    width: number
    height: number
    alt: string
  }
  twitterHandle?: string
}

/**
 * Site-wide settings and configuration
 */
export interface SiteSettings {
  title: string
  description: string
  keywords: string[]
  seo: SeoMetadata
  logo: {
    text: string
    url?: string
  }
  footer: {
    copyrightText: string
    year: number
    email: string
  }
  primaryCta: CallToAction
  eventUrl: string
  navigation: NavigationLink[]
}

/**
 * Call-to-action button configuration
 */
export interface CallToAction {
  text: string
  url: string
  openInNewTab?: boolean
  style?: 'primary' | 'secondary' | 'outline'
}

/**
 * Navigation link
 */
export interface NavigationLink {
  title: string
  url: string
  openInNewTab?: boolean
}

// ============================================
// PAGE CONTENT TYPES
// ============================================

/**
 * Home page complete content structure
 */
export interface HomePage {
  hero: HeroSection
  sections: {
    about: ContentSection
    invite: ContentSection
  }
  partners: PartnerSection
  supporters: PartnerSection
  speakers: PeopleSection
  team: PeopleSection
}

/**
 * Hero section at the top of the home page
 */
export interface HeroSection {
  headline: string
  title: string
  titleHighlight: string // The part of title to highlight (e.g., "Week")
  subtitle: string
  description: string
  backgroundImage?: string
  heroImage?: ImageAsset
  cta: CallToAction
  featuredPartners: CompanyLogo[]
}

/**
 * Text content section with background
 */
export interface ContentSection {
  title: string
  subtitle: string
  theme: 'light' | 'dark' // Semantic theme instead of raw color values
  backgroundImage?: string
  // Raw color kept for backwards compatibility, will be deprecated after Sanity migration
  _legacyColor?: string
}

/**
 * Section containing company logos/partners
 */
export interface PartnerSection {
  title: string
  identifier: string // Used for anchor links (e.g., "Partners", "Supporters")
  companies: Company[]
}

/**
 * Section containing people (speakers or team members)
 */
export interface PeopleSection {
  title: string
  identifier: string // Used for anchor links (e.g., "Speakers", "Team")
  people: Person[]
}

// ============================================
// ENTITY TYPES (Collections)
// ============================================

/**
 * A person (speaker or team member)
 */
export interface Person {
  id: string // Unique identifier
  name: string
  role: string
  company?: string
  image: ImageAsset
  bio?: string
  socialLinks?: SocialLink[]
  featured?: boolean
  order?: number
  type: 'speaker' | 'team' // Discriminator for different person types
}

/**
 * Company/Partner/Supporter information
 */
export interface Company {
  id: string
  name: string
  logo: ImageAsset
  website?: string
  tier?: 'platinum' | 'gold' | 'silver' | 'supporter'
  featured?: boolean
  order?: number
}

/**
 * Company logo with display dimensions
 */
export interface CompanyLogo {
  name: string
  logo: ImageAsset
  displayWidth?: string
  displayHeight?: string
}

// ============================================
// REUSABLE OBJECT TYPES
// ============================================

/**
 * Image asset with metadata
 */
export interface ImageAsset {
  src: string
  alt: string
  width?: number
  height?: number
  blurDataUrl?: string // For Next.js blur placeholder
  // Future Sanity fields
  _sanityAsset?: {
    _ref: string
    _type: 'reference'
  }
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

/**
 * Social media link
 */
export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'github' | 'website'
  url: string
  handle?: string
}

// ============================================
// LEGACY TYPE MAPPINGS (For Backwards Compatibility)
// ============================================

/**
 * Legacy section data structure
 * @deprecated Use ContentSection instead
 */
export interface LegacySectionData {
  title: string
  subtitle: string
  color: string
  bg: string
}

/**
 * Legacy speaker data structure
 * @deprecated Use Person with type='speaker' instead
 */
export interface LegacySpeakerData {
  name: string
  image: string
  role: string
}

/**
 * Legacy team member structure
 * @deprecated Use Person with type='team' instead
 */
export interface LegacyTeamMember {
  name: string
  image: string
  role: string
}

/**
 * Legacy header link structure
 * @deprecated Use NavigationLink instead
 */
export interface LegacyHeaderLink {
  title: string
  link: string
}

/**
 * Legacy feature partner structure
 * @deprecated Use CompanyLogo instead
 */
export interface LegacyFeaturePartner {
  name: string
  height: string
  width: string
}

// ============================================
// HELPER FUNCTIONS FOR MIGRATION
// ============================================

/**
 * Converts legacy section data to new ContentSection format
 */
export function legacySectionToContentSection(
  legacy: LegacySectionData
): ContentSection {
  return {
    title: legacy.title,
    subtitle: legacy.subtitle,
    theme: legacy.color === '#fff' ? 'light' : 'dark',
    backgroundImage: legacy.bg,
    _legacyColor: legacy.color,
  }
}

/**
 * Converts legacy speaker/team data to Person format
 */
export function legacyPersonToPerson(
  legacy: LegacySpeakerData | LegacyTeamMember,
  type: 'speaker' | 'team',
  index: number
): Person {
  return {
    id: `${type}-${legacy.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: legacy.name,
    role: legacy.role,
    image: {
      src: legacy.image,
      alt: `${legacy.name} - ${legacy.role}`,
    },
    type,
    order: index,
  }
}

/**
 * Converts legacy image URL to ImageAsset
 */
export function legacyImageToImageAsset(
  src: string,
  alt: string = ''
): ImageAsset {
  return {
    src,
    alt,
  }
}

/**
 * Converts legacy feature partner to CompanyLogo
 */
export function legacyFeaturePartnerToCompanyLogo(
  partner: LegacyFeaturePartner
): CompanyLogo {
  return {
    name: partner.name,
    logo: {
      src: `/static/images/feature/partners/${partner.name}.png`,
      alt: `${partner.name} logo`,
      width: parseInt(partner.width),
      height: parseInt(partner.height),
    },
    displayWidth: partner.width,
    displayHeight: partner.height,
  }
}
