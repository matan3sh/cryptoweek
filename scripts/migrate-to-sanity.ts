/**
 * Migration Script: JSON to Sanity
 *
 * This script migrates all existing JSON content to Sanity CMS
 * Run with: npx tsx scripts/migrate-to-sanity.ts
 */

import 'dotenv/config'
import {createClient} from '@sanity/client'
import path from 'path'
import {readFileSync} from 'fs'

// Import existing data
const settingsData = JSON.parse(
  readFileSync(path.join(process.cwd(), 'content/settings.json'), 'utf-8')
)
const homePageData = JSON.parse(
  readFileSync(path.join(process.cwd(), 'content/pages/home.json'), 'utf-8')
)

// Import speaker/team data from data/index.ts
// Note: You'll need to run this after building the TypeScript
import {
  ourSpeakersData,
  ourTeamData,
  ourPartnersData,
  ourSupportersData,
} from '../data'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-25',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

// Helper: Extract company name from image path
function extractCompanyName(imagePath: string): string {
  const filename = path.basename(imagePath, path.extname(imagePath))
  // Clean up the filename: remove special chars, split on common delimiters
  return filename
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\./g, ' ')
    .trim()
}

// Helper: Create a slug from name
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Step 1: Migrate Speakers (Person documents with type: 'speaker')
async function migrateSpeakers() {
  console.log('\n📢 Migrating Speakers...')
  const speakers = []

  for (let i = 0; i < ourSpeakersData.length; i++) {
    const speaker = ourSpeakersData[i]
    const doc = {
      _type: 'person',
      _id: `person-speaker-${createSlug(speaker.name)}`,
      name: speaker.name,
      role: speaker.role,
      type: 'speaker',
      image: {
        _type: 'imageAsset',
        asset: {
          _type: 'reference',
          _ref: `image-${createSlug(speaker.name)}`, // Placeholder - will need actual upload
        },
        alt: `${speaker.name} - ${speaker.role}`,
      },
      order: i,
      featured: false,
    }

    try {
      await client.createOrReplace(doc)
      speakers.push(doc._id)
      console.log(`  ✅ ${speaker.name}`)
    } catch (error) {
      console.error(`  ❌ Failed: ${speaker.name}`, error)
    }
  }

  console.log(`\n✅ Migrated ${speakers.length}/${ourSpeakersData.length} speakers`)
  return speakers
}

// Step 2: Migrate Team Members (Person documents with type: 'team')
async function migrateTeam() {
  console.log('\n👥 Migrating Team Members...')
  const team = []

  for (let i = 0; i < ourTeamData.length; i++) {
    const member = ourTeamData[i]
    const doc = {
      _type: 'person',
      _id: `person-team-${createSlug(member.name)}`,
      name: member.name,
      role: member.role,
      type: 'team',
      image: {
        _type: 'imageAsset',
        asset: {
          _type: 'reference',
          _ref: `image-${createSlug(member.name)}`, // Placeholder
        },
        alt: `${member.name} - ${member.role}`,
      },
      order: i,
      featured: false,
    }

    try {
      await client.createOrReplace(doc)
      team.push(doc._id)
      console.log(`  ✅ ${member.name}`)
    } catch (error) {
      console.error(`  ❌ Failed: ${member.name}`, error)
    }
  }

  console.log(`\n✅ Migrated ${team.length}/${ourTeamData.length} team members`)
  return team
}

// Step 3: Migrate Partners (Company documents with tier: 'platinum')
async function migratePartners() {
  console.log('\n🤝 Migrating Partners...')
  const partners = []

  for (let i = 0; i < ourPartnersData.length; i++) {
    const imagePath = ourPartnersData[i]
    const companyName = extractCompanyName(imagePath)

    const doc = {
      _type: 'company',
      _id: `company-partner-${createSlug(companyName)}`,
      name: companyName,
      logo: {
        _type: 'imageAsset',
        asset: {
          _type: 'reference',
          _ref: `image-${createSlug(companyName)}`, // Placeholder
        },
        alt: `${companyName} logo`,
      },
      tier: 'platinum',
      order: i,
      featured: i < 4, // First 4 are featured
    }

    try {
      await client.createOrReplace(doc)
      partners.push(doc._id)
      console.log(`  ✅ ${companyName}`)
    } catch (error) {
      console.error(`  ❌ Failed: ${companyName}`, error)
    }
  }

  console.log(`\n✅ Migrated ${partners.length}/${ourPartnersData.length} partners`)
  return partners
}

// Step 4: Migrate Supporters (Company documents with tier: 'supporter')
async function migrateSupporters() {
  console.log('\n💪 Migrating Supporters...')
  const supporters = []

  for (let i = 0; i < ourSupportersData.length; i++) {
    const imagePath = ourSupportersData[i]
    const companyName = extractCompanyName(imagePath)

    const doc = {
      _type: 'company',
      _id: `company-supporter-${createSlug(companyName)}`,
      name: companyName,
      logo: {
        _type: 'imageAsset',
        asset: {
          _type: 'reference',
          _ref: `image-${createSlug(companyName)}`, // Placeholder
        },
        alt: `${companyName} logo`,
      },
      tier: 'supporter',
      order: i,
      featured: false,
    }

    try {
      await client.createOrReplace(doc)
      supporters.push(doc._id)
      console.log(`  ✅ ${companyName}`)
    } catch (error) {
      console.error(`  ❌ Failed: ${companyName}`, error)
    }
  }

  console.log(`\n✅ Migrated ${supporters.length}/${ourSupportersData.length} supporters`)
  return supporters
}

// Step 5: Migrate Site Settings (Singleton)
async function migrateSiteSettings() {
  console.log('\n⚙️  Migrating Site Settings...')

  const doc = {
    _type: 'siteSettings',
    _id: 'siteSettings', // Singleton ID
    title: settingsData.title,
    description: settingsData.description,
    keywords: settingsData.keywords,
    seo: {
      _type: 'seoMetadata',
      siteUrl: settingsData.seo.siteUrl,
      siteName: settingsData.seo.siteName,
      locale: settingsData.seo.locale,
      ogImage: {
        image: {
          _type: 'imageAsset',
          asset: {
            _type: 'reference',
            _ref: 'image-og-default', // Placeholder
          },
          alt: settingsData.seo.ogImage.alt,
        },
        width: settingsData.seo.ogImage.width,
        height: settingsData.seo.ogImage.height,
      },
      twitterHandle: settingsData.seo.twitterHandle,
    },
    logo: {
      text: settingsData.logo.text,
    },
    footer: {
      copyrightText: settingsData.footer.copyrightText,
      year: settingsData.footer.year,
      email: settingsData.footer.email,
    },
    primaryCta: {
      _type: 'callToAction',
      text: settingsData.primaryCta.text,
      url: settingsData.primaryCta.url,
      openInNewTab: settingsData.primaryCta.openInNewTab,
      style: settingsData.primaryCta.style,
    },
    eventUrl: settingsData.eventUrl,
    navigation: settingsData.navigation.map((link: any) => ({
      _type: 'navigationLink',
      _key: createSlug(link.title),
      title: link.title,
      url: link.url,
      openInNewTab: link.openInNewTab || false,
    })),
  }

  try {
    await client.createOrReplace(doc)
    console.log('  ✅ Site Settings migrated')
    return doc._id
  } catch (error) {
    console.error('  ❌ Failed to migrate Site Settings', error)
    throw error
  }
}

// Step 6: Migrate Home Page (Singleton)
async function migrateHomePage(speakerIds: string[], teamIds: string[], partnerIds: string[], supporterIds: string[]) {
  console.log('\n🏠 Migrating Home Page...')

  const doc = {
    _type: 'homePage',
    _id: 'homePage', // Singleton ID
    hero: {
      _type: 'heroSection',
      headline: homePageData.hero.headline,
      title: homePageData.hero.title,
      titleHighlight: homePageData.hero.titleHighlight,
      subtitle: homePageData.hero.subtitle,
      description: homePageData.hero.description,
      heroImage: homePageData.hero.heroImage ? {
        _type: 'imageAsset',
        asset: {
          _type: 'reference',
          _ref: 'image-hero', // Placeholder
        },
        alt: homePageData.hero.heroImage.alt,
      } : undefined,
      cta: {
        _type: 'callToAction',
        text: homePageData.hero.cta.text,
        url: homePageData.hero.cta.url,
        openInNewTab: homePageData.hero.cta.openInNewTab,
        style: homePageData.hero.cta.style,
      },
      featuredPartners: homePageData.hero.featuredPartners.map((partner: any, i: number) => ({
        _type: 'companyLogo',
        _key: createSlug(partner.name),
        name: partner.name,
        logo: {
          _type: 'imageAsset',
          asset: {
            _type: 'reference',
            _ref: `image-${createSlug(partner.name)}`, // Placeholder
          },
          alt: partner.logo.alt,
        },
        displayWidth: partner.displayWidth,
        displayHeight: partner.displayHeight,
      })),
    },
    aboutSection: {
      _type: 'contentSection',
      title: homePageData.sections.about.title,
      subtitle: homePageData.sections.about.subtitle,
      theme: homePageData.sections.about.theme,
      backgroundImage: homePageData.sections.about.backgroundImage ? {
        _type: 'imageAsset',
        asset: {
          _type: 'reference',
          _ref: 'image-about-bg', // Placeholder
        },
        alt: 'About section background',
      } : undefined,
    },
    inviteSection: {
      _type: 'contentSection',
      title: homePageData.sections.invite.title,
      subtitle: homePageData.sections.invite.subtitle,
      theme: homePageData.sections.invite.theme,
      backgroundImage: homePageData.sections.invite.backgroundImage ? {
        _type: 'imageAsset',
        asset: {
          _type: 'reference',
          _ref: 'image-invite-bg', // Placeholder
        },
        alt: 'Invite section background',
      } : undefined,
    },
    partnersTitle: homePageData.partners?.title || 'Our Partners',
    partners: partnerIds.map(id => ({
      _type: 'reference',
      _ref: id,
      _key: id,
    })),
    supportersTitle: homePageData.supporters?.title || 'Supporters',
    supporters: supporterIds.map(id => ({
      _type: 'reference',
      _ref: id,
      _key: id,
    })),
    speakersTitle: homePageData.speakers?.title || 'Our Speakers',
    speakers: speakerIds.map(id => ({
      _type: 'reference',
      _ref: id,
      _key: id,
    })),
    teamTitle: homePageData.team?.title || 'Our Team',
    team: teamIds.map(id => ({
      _type: 'reference',
      _ref: id,
      _key: id,
    })),
  }

  try {
    await client.createOrReplace(doc)
    console.log('  ✅ Home Page migrated')
    return doc._id
  } catch (error) {
    console.error('  ❌ Failed to migrate Home Page', error)
    throw error
  }
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting Sanity Migration...')
  console.log('================================\n')

  try {
    // Step 1-4: Migrate all documents
    const speakerIds = await migrateSpeakers()
    const teamIds = await migrateTeam()
    const partnerIds = await migratePartners()
    const supporterIds = await migrateSupporters()

    // Step 5: Migrate site settings
    await migrateSiteSettings()

    // Step 6: Migrate home page with references
    await migrateHomePage(speakerIds, teamIds, partnerIds, supporterIds)

    console.log('\n================================')
    console.log('🎉 Migration completed successfully!')
    console.log(`\n📊 Summary:`)
    console.log(`  - Speakers: ${speakerIds.length}`)
    console.log(`  - Team Members: ${teamIds.length}`)
    console.log(`  - Partners: ${partnerIds.length}`)
    console.log(`  - Supporters: ${supporterIds.length}`)
    console.log(`  - Site Settings: 1`)
    console.log(`  - Home Page: 1`)
    console.log(`  - Total: ${speakerIds.length + teamIds.length + partnerIds.length + supporterIds.length + 2}`)
    console.log('\n✅ All content migrated to Sanity!')
    console.log('\n📝 Next steps:')
    console.log('  1. Upload actual images to Sanity (currently using placeholders)')
    console.log('  2. Update image references in documents')
    console.log('  3. Verify content in Sanity Studio: http://localhost:3333')

  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrate()
