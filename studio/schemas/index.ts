// Import Object Types
import imageAsset from './objects/imageAsset'
import seoMetadata from './objects/seoMetadata'
import callToAction from './objects/callToAction'
import navigationLink from './objects/navigationLink'
import socialLink from './objects/socialLink'
import contentSection from './objects/contentSection'
import companyLogo from './objects/companyLogo'
import heroSection from './objects/heroSection'

// Import Document Types
import person from './documents/person'
import company from './documents/company'
import siteSettings from './documents/siteSettings'
import homePage from './documents/homePage'

// Export all schemas
// Order: Object types first, then document types
export const schemaTypes = [
  // Object types (used by documents)
  imageAsset,
  seoMetadata,
  callToAction,
  navigationLink,
  socialLink,
  contentSection,
  companyLogo,
  heroSection,

  // Document types (main content)
  person,
  company,
  siteSettings,
  homePage,
]
