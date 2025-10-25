/**
 * Sanity Migration Script (JavaScript version)
 *
 * Migrates all existing data from JSON/TypeScript to Sanity
 * Run with: node scripts/migrate.js
 */

const {createClient} = require('@sanity/client')
const fs = require('fs')
const path = require('path')
const {createReadStream} = require('fs')

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=')
  if (key && valueParts.length) {
    process.env[key.trim()] = valueParts.join('=').trim()
  }
})

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-25',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Helper: Create a slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Helper: Extract company name from image path
function extractCompanyName(imagePath) {
  const filename = path.basename(imagePath, path.extname(imagePath))
  return filename
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\./g, ' ')
    .trim()
}

// Helper: Upload image to Sanity
async function uploadImage(imagePath, altText) {
  const publicPath = path.join(__dirname, '..', 'public', imagePath)

  // Check if file exists
  if (!fs.existsSync(publicPath)) {
    console.warn(`    ⚠️  Image not found: ${imagePath}`)
    return null
  }

  try {
    const imageStream = createReadStream(publicPath)
    const asset = await client.assets.upload('image', imageStream, {
      filename: path.basename(imagePath),
    })
    console.log(`    📸 Uploaded: ${path.basename(imagePath)}`)
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText,
    }
  } catch (error) {
    console.error(`    ❌ Failed to upload ${imagePath}:`, error.message)
    return null
  }
}

// Load data from data/index.ts by reading and parsing it
const dataFilePath = path.join(__dirname, '..', 'data', 'index.ts')
const dataContent = fs.readFileSync(dataFilePath, 'utf-8')

// Parse speakers data
const speakersMatch = dataContent.match(/export const ourSpeakersData: SpeakerData\[\] = \[([\s\S]*?)\]/m)
const speakersText = speakersMatch ? speakersMatch[1] : ''
const speakers = []
let currentSpeaker = {}
speakersText.split('\n').forEach(line => {
  const nameMatch = line.match(/name: '([^']+)'/)
  const imageMatch = line.match(/image: '([^']+)'/)
  const roleMatch = line.match(/role: '([^']+)'/)

  if (nameMatch) currentSpeaker.name = nameMatch[1]
  if (imageMatch) currentSpeaker.image = imageMatch[1]
  if (roleMatch) {
    currentSpeaker.role = roleMatch[1]
    if (currentSpeaker.name && currentSpeaker.image) {
      speakers.push({...currentSpeaker})
      currentSpeaker = {}
    }
  }
})

// Parse team data
const teamMatch = dataContent.match(/export const ourTeamData: TeamMember\[\] = \[([\s\S]*?)\]/m)
const teamText = teamMatch ? teamMatch[1] : ''
const team = []
let currentTeam = {}
teamText.split('\n').forEach(line => {
  const nameMatch = line.match(/name: '([^']+)'/)
  const imageMatch = line.match(/image:\s*'([^']+)'/)
  const roleMatch = line.match(/role: '([^']+)'/)

  if (nameMatch) currentTeam.name = nameMatch[1]
  if (imageMatch) currentTeam.image = imageMatch[1]
  if (roleMatch) {
    currentTeam.role = roleMatch[1]
    if (currentTeam.name && currentTeam.image) {
      team.push({...currentTeam})
      currentTeam = {}
    }
  }
})

// Parse partners
const partnersMatch = dataContent.match(/export const ourPartnersData: string\[\] = \[([\s\S]*?)\]/m)
const partnersText = partnersMatch ? partnersMatch[1] : ''
const partners = []
partnersText.split('\n').forEach(line => {
  const match = line.match(/'([^']+)'/)
  if (match) partners.push(match[1])
})

// Parse supporters
const supportersMatch = dataContent.match(/export const ourSupportersData: string\[\] = \[([\s\S]*?)\]/m)
const supportersText = supportersMatch ? supportersMatch[1] : ''
const supporters = []
supportersText.split('\n').forEach(line => {
  const match = line.match(/'([^']+)'/)
  if (match) supporters.push(match[1])
})

// Load JSON data
const settingsData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'settings.json'), 'utf-8'))
const homePageData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'pages', 'home.json'), 'utf-8'))

console.log('\n🚀 Starting Sanity Migration...')
console.log('================================\n')
console.log(`Found ${speakers.length} speakers`)
console.log(`Found ${team.length} team members`)
console.log(`Found ${partners.length} partners`)
console.log(`Found ${supporters.length} supporters\n`)

// Step 1: Migrate Speakers
async function migrateSpeakers() {
  console.log('📢 Migrating Speakers...')
  const speakerIds = []

  for (let i = 0; i < speakers.length; i++) {
    const speaker = speakers[i]
    console.log(`  Processing: ${speaker.name}`)

    // Upload image first
    const imageAsset = await uploadImage(speaker.image, `${speaker.name} - ${speaker.role}`)

    const doc = {
      _type: 'person',
      _id: `person-speaker-${createSlug(speaker.name)}`,
      name: speaker.name,
      role: speaker.role,
      type: 'speaker',
      order: i,
      featured: false,
      ...(imageAsset && { image: imageAsset }),
    }

    try {
      await client.createOrReplace(doc)
      speakerIds.push(doc._id)
      console.log(`  ✅ ${speaker.name}`)
    } catch (error) {
      console.error(`  ❌ Failed: ${speaker.name}`, error.message)
    }
  }

  console.log(`\n✅ Migrated ${speakerIds.length}/${speakers.length} speakers\n`)
  return speakerIds
}

// Step 2: Migrate Team Members
async function migrateTeam() {
  console.log('👥 Migrating Team Members...')
  const teamIds = []

  for (let i = 0; i < team.length; i++) {
    const member = team[i]
    console.log(`  Processing: ${member.name}`)

    // Upload image first
    const imageAsset = await uploadImage(member.image, `${member.name} - ${member.role}`)

    const doc = {
      _type: 'person',
      _id: `person-team-${createSlug(member.name)}`,
      name: member.name,
      role: member.role,
      type: 'team',
      order: i,
      featured: false,
      ...(imageAsset && { image: imageAsset }),
    }

    try {
      await client.createOrReplace(doc)
      teamIds.push(doc._id)
      console.log(`  ✅ ${member.name}`)
    } catch (error) {
      console.error(`  ❌ Failed: ${member.name}`, error.message)
    }
  }

  console.log(`\n✅ Migrated ${teamIds.length}/${team.length} team members\n`)
  return teamIds
}

// Step 3: Migrate Partners
async function migratePartners() {
  console.log('🤝 Migrating Partners...')
  const partnerIds = []

  for (let i = 0; i < partners.length; i++) {
    const imagePath = partners[i]
    const companyName = extractCompanyName(imagePath)
    console.log(`  Processing: ${companyName}`)

    // Upload logo
    const logoAsset = await uploadImage(imagePath, `${companyName} logo`)

    const doc = {
      _type: 'company',
      _id: `company-partner-${createSlug(companyName)}`,
      name: companyName,
      tier: 'platinum',
      order: i,
      featured: i < 4,
      ...(logoAsset && { logo: logoAsset }),
    }

    try {
      await client.createOrReplace(doc)
      partnerIds.push(doc._id)
      console.log(`  ✅ ${companyName}`)
    } catch (error) {
      console.error(`  ❌ Failed: ${companyName}`, error.message)
    }
  }

  console.log(`\n✅ Migrated ${partnerIds.length}/${partners.length} partners\n`)
  return partnerIds
}

// Step 4: Migrate Supporters
async function migrateSupporters() {
  console.log('💪 Migrating Supporters...')
  const supporterIds = []

  for (let i = 0; i < supporters.length; i++) {
    const imagePath = supporters[i]
    const companyName = extractCompanyName(imagePath)
    console.log(`  Processing: ${companyName}`)

    // Upload logo
    const logoAsset = await uploadImage(imagePath, `${companyName} logo`)

    const doc = {
      _type: 'company',
      _id: `company-supporter-${createSlug(companyName)}`,
      name: companyName,
      tier: 'supporter',
      order: i,
      featured: false,
      ...(logoAsset && { logo: logoAsset }),
    }

    try {
      await client.createOrReplace(doc)
      supporterIds.push(doc._id)
      console.log(`  ✅ ${companyName}`)
    } catch (error) {
      console.error(`  ❌ Failed: ${companyName}`, error.message)
    }
  }

  console.log(`\n✅ Migrated ${supporterIds.length}/${supporters.length} supporters\n`)
  return supporterIds
}

// Step 5: Migrate Site Settings
async function migrateSiteSettings() {
  console.log('⚙️  Migrating Site Settings...')

  const doc = {
    _type: 'siteSettings',
    _id: 'siteSettings',
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
    navigation: settingsData.navigation.map((link, i) => ({
      _type: 'navigationLink',
      _key: `nav-${i}`,
      title: link.title,
      url: link.url,
      openInNewTab: link.openInNewTab || false,
    })),
  }

  try {
    await client.createOrReplace(doc)
    console.log('  ✅ Site Settings migrated\n')
    return doc._id
  } catch (error) {
    console.error('  ❌ Failed to migrate Site Settings', error.message)
    throw error
  }
}

// Step 6: Migrate Home Page
async function migrateHomePage(speakerIds, teamIds, partnerIds, supporterIds) {
  console.log('🏠 Migrating Home Page...')

  // Upload featured partner logos
  console.log('  Uploading featured partner logos...')
  const featuredPartnersWithLogos = []
  for (let i = 0; i < homePageData.hero.featuredPartners.length; i++) {
    const partner = homePageData.hero.featuredPartners[i]
    console.log(`  Processing featured partner: ${partner.name}`)
    const logoAsset = await uploadImage(partner.logo.src, partner.logo.alt)

    if (logoAsset) {
      featuredPartnersWithLogos.push({
        _type: 'companyLogo',
        _key: `partner-${i}`,
        name: partner.name,
        logo: logoAsset,
        displayWidth: partner.displayWidth,
        displayHeight: partner.displayHeight,
      })
    }
  }

  const doc = {
    _type: 'homePage',
    _id: 'homePage',
    hero: {
      _type: 'heroSection',
      headline: homePageData.hero.headline,
      title: homePageData.hero.title,
      titleHighlight: homePageData.hero.titleHighlight,
      subtitle: homePageData.hero.subtitle,
      description: homePageData.hero.description,
      cta: {
        _type: 'callToAction',
        text: homePageData.hero.cta.text,
        url: homePageData.hero.cta.url,
        openInNewTab: homePageData.hero.cta.openInNewTab,
        style: homePageData.hero.cta.style,
      },
      featuredPartners: featuredPartnersWithLogos,
    },
    aboutSection: {
      _type: 'contentSection',
      title: homePageData.sections.about.title,
      subtitle: homePageData.sections.about.subtitle,
      theme: homePageData.sections.about.theme,
    },
    inviteSection: {
      _type: 'contentSection',
      title: homePageData.sections.invite.title,
      subtitle: homePageData.sections.invite.subtitle,
      theme: homePageData.sections.invite.theme,
    },
    partnersTitle: homePageData.partners?.title || 'Our Partners',
    partners: partnerIds.map((id, i) => ({
      _type: 'reference',
      _ref: id,
      _key: `partner-ref-${i}`,
    })),
    supportersTitle: homePageData.supporters?.title || 'Supporters',
    supporters: supporterIds.map((id, i) => ({
      _type: 'reference',
      _ref: id,
      _key: `supporter-ref-${i}`,
    })),
    speakersTitle: homePageData.speakers?.title || 'Our Speakers',
    speakers: speakerIds.map((id, i) => ({
      _type: 'reference',
      _ref: id,
      _key: `speaker-ref-${i}`,
    })),
    teamTitle: homePageData.team?.title || 'Our Team',
    team: teamIds.map((id, i) => ({
      _type: 'reference',
      _ref: id,
      _key: `team-ref-${i}`,
    })),
  }

  try {
    await client.createOrReplace(doc)
    console.log('  ✅ Home Page migrated\n')
    return doc._id
  } catch (error) {
    console.error('  ❌ Failed to migrate Home Page', error.message)
    throw error
  }
}

// Main migration function
async function migrate() {
  try {
    const speakerIds = await migrateSpeakers()
    const teamIds = await migrateTeam()
    const partnerIds = await migratePartners()
    const supporterIds = await migrateSupporters()
    await migrateSiteSettings()
    await migrateHomePage(speakerIds, teamIds, partnerIds, supporterIds)

    console.log('================================')
    console.log('🎉 Migration completed successfully!')
    console.log(`\n📊 Summary:`)
    console.log(`  - Speakers: ${speakerIds.length}`)
    console.log(`  - Team Members: ${teamIds.length}`)
    console.log(`  - Partners: ${partnerIds.length}`)
    console.log(`  - Supporters: ${supporterIds.length}`)
    console.log(`  - Site Settings: 1`)
    console.log(`  - Home Page: 1`)
    console.log(`  - Total: ${speakerIds.length + teamIds.length + partnerIds.length + supporterIds.length + 2}`)
    console.log('\n✅ All content AND images migrated to Sanity!')
    console.log('\n📝 Next Steps:')
    console.log('   1. View content in Studio: http://localhost:3333')
    console.log('   2. Continue with Phase 4: Update Next.js pages to use Sanity')
    console.log('   3. Test website with: npm run dev')

  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

migrate()
