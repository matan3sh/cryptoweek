/**
 * GROQ Queries for Sanity Content
 *
 * All queries for fetching content from Sanity CMS
 * https://www.sanity.io/docs/groq
 */

import {groq} from 'next-sanity'

// ============================================
// FRAGMENTS (Reusable query parts)
// ============================================

const imageAssetFragment = groq`
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions {
        width,
        height
      }
    }
  },
  alt,
  hotspot,
  crop
`

const callToActionFragment = groq`
  text,
  url,
  openInNewTab,
  style
`

const navigationLinkFragment = groq`
  title,
  url,
  openInNewTab
`

const socialLinkFragment = groq`
  platform,
  url,
  handle
`

const contentSectionFragment = groq`
  title,
  subtitle,
  theme,
  backgroundImage {
    ${imageAssetFragment}
  }
`

const companyLogoFragment = groq`
  name,
  logo {
    ${imageAssetFragment}
  },
  displayWidth,
  displayHeight
`

const contactSectionFragment = groq`
  title,
  fieldLabels {
    firstName,
    lastName,
    email,
    company,
    message
  },
  buttonText {
    default,
    submitting
  },
  messages {
    success,
    error,
    rateLimitError
  },
  validationMessages {
    firstNameRequired,
    lastNameRequired,
    emailRequired,
    emailInvalid,
    messageRequired
  }
`

// ============================================
// SITE SETTINGS QUERIES
// ============================================

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    keywords,
    seo {
      siteUrl,
      siteName,
      locale,
      ogImage {
        image {
          ${imageAssetFragment}
        },
        width,
        height
      },
      twitterHandle
    },
    logo {
      text,
      image {
        ${imageAssetFragment}
      }
    },
    footer {
      copyrightText,
      year,
      email
    },
    primaryCta {
      ${callToActionFragment}
    },
    eventUrl,
    navigation[] {
      ${navigationLinkFragment}
    },
    contactSection {
      ${contactSectionFragment}
    }
  }
`

// ============================================
// HOME PAGE QUERIES
// ============================================

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    _id,
    hero {
      headline,
      title,
      titleHighlight,
      subtitle,
      description,
      backgroundImage {
        ${imageAssetFragment}
      },
      heroImage {
        ${imageAssetFragment}
      },
      cta {
        ${callToActionFragment}
      },
      featuredPartners[] {
        ${companyLogoFragment}
      }
    },
    aboutSection {
      ${contentSectionFragment}
    },
    inviteSection {
      ${contentSectionFragment}
    },
    partnersTitle,
    partners[]-> {
      _id,
      name,
      logo {
        ${imageAssetFragment}
      },
      website,
      tier,
      description,
      featured,
      order
    },
    supportersTitle,
    supporters[]-> {
      _id,
      name,
      logo {
        ${imageAssetFragment}
      },
      website,
      tier,
      description,
      featured,
      order
    },
    speakersTitle,
    speakers[]-> {
      _id,
      name,
      role,
      type,
      company,
      image {
        ${imageAssetFragment}
      },
      bio,
      socialLinks[] {
        ${socialLinkFragment}
      },
      featured,
      order
    },
    teamTitle,
    team[]-> {
      _id,
      name,
      role,
      type,
      company,
      image {
        ${imageAssetFragment}
      },
      bio,
      socialLinks[] {
        ${socialLinkFragment}
      },
      featured,
      order
    }
  }
`

// ============================================
// PERSON QUERIES
// ============================================

// Get all speakers
export const ALL_SPEAKERS_QUERY = groq`
  *[_type == "person" && type == "speaker"] | order(order asc) {
    _id,
    name,
    role,
    type,
    company,
    image {
      ${imageAssetFragment}
    },
    bio,
    socialLinks[] {
      ${socialLinkFragment}
    },
    featured,
    order
  }
`

// Get all team members
export const ALL_TEAM_QUERY = groq`
  *[_type == "person" && type == "team"] | order(order asc) {
    _id,
    name,
    role,
    type,
    company,
    image {
      ${imageAssetFragment}
    },
    bio,
    socialLinks[] {
      ${socialLinkFragment}
    },
    featured,
    order
  }
`

// Get a single person by ID
export const PERSON_BY_ID_QUERY = groq`
  *[_type == "person" && _id == $id][0] {
    _id,
    name,
    role,
    type,
    company,
    image {
      ${imageAssetFragment}
    },
    bio,
    socialLinks[] {
      ${socialLinkFragment}
    },
    featured,
    order
  }
`

// ============================================
// COMPANY QUERIES
// ============================================

// Get all partners (platinum/gold/silver)
export const ALL_PARTNERS_QUERY = groq`
  *[_type == "company" && tier in ["platinum", "gold", "silver"]] | order(order asc) {
    _id,
    name,
    logo {
      ${imageAssetFragment}
    },
    website,
    tier,
    description,
    featured,
    order
  }
`

// Get all supporters
export const ALL_SUPPORTERS_QUERY = groq`
  *[_type == "company" && tier == "supporter"] | order(order asc) {
    _id,
    name,
    logo {
      ${imageAssetFragment}
    },
    website,
    tier,
    description,
    featured,
    order
  }
`

// Get a single company by ID
export const COMPANY_BY_ID_QUERY = groq`
  *[_type == "company" && _id == $id][0] {
    _id,
    name,
    logo {
      ${imageAssetFragment}
    },
    website,
    tier,
    description,
    featured,
    order
  }
`

// ============================================
// UTILITY QUERIES
// ============================================

// Get document counts (useful for debugging)
export const DOCUMENT_COUNTS_QUERY = groq`
  {
    "speakers": count(*[_type == "person" && type == "speaker"]),
    "team": count(*[_type == "person" && type == "team"]),
    "partners": count(*[_type == "company" && tier in ["platinum", "gold", "silver"]]),
    "supporters": count(*[_type == "company" && tier == "supporter"]),
    "siteSettings": count(*[_type == "siteSettings"]),
    "homePage": count(*[_type == "homePage"])
  }
`
