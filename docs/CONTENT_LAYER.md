# Content Layer Documentation

**Phase 1 Enhanced** - Now with automatic fallback and error handling.

The content layer is an abstraction between data storage and components, designed for type safety, reliability, and future CMS integration.

---

## Overview

**Purpose:** Centralize content management and prepare for Sanity.io CMS

**Benefits:**
- ✅ Type-safe content access
- ✅ Single source of truth
- ✅ Easy CMS migration path
- ✅ Content/code separation
- ✅ Reusable transformations
- ✅ **NEW:** Automatic fallback (Sanity → Static)
- ✅ **NEW:** Retry logic for transient failures
- ✅ **NEW:** Error boundaries for isolated failures

---

## Content Structure

### Directory Layout
```
content/
├── README.md           # Content documentation
├── settings.json       # Site-wide configuration
└── pages/
    └── home.json       # Home page content structure
```

### Future Structure (Ready for Growth)
```
content/
├── settings.json
├── pages/
│   ├── home.json
│   ├── about.json
│   └── events.json
└── collections/
    ├── speakers.json
    ├── partners.json
    └── team.json
```

---

## Content Access API

### Import the API
```typescript
import {
  getSiteSettings,
  getHomePage,
  getAllSpeakers,
  getAllPartners,
  // ... more functions
} from '@/lib/content/static'
```

### Core Functions

#### Site Settings
```typescript
const settings = getSiteSettings()

// Returns:
{
  title: string
  description: string
  keywords: string[]
  seo: SeoMetadata
  logo: { text: string; url?: string }
  footer: { copyrightText, year, email }
  primaryCta: CallToAction
  eventUrl: string
  navigation: NavigationLink[]
}
```

#### Home Page Content
```typescript
const homePage = getHomePage()

// Returns:
{
  hero: HeroSection
  sections: { about, invite }
  partners: PartnerSection
  supporters: PartnerSection
  speakers: PeopleSection
  team: PeopleSection
}
```

#### Collections
```typescript
// Get all speakers
const speakers = getAllSpeakers()  // Person[]

// Get all partners
const partners = getAllPartners()  // Company[]

// Get all team members
const team = getAllTeamMembers()   // Person[]
```

### Legacy Compatibility Functions

For components still using old data format:

```typescript
// Returns SpeakerData[] (legacy format)
const speakersData = getLegacySpeakersData()

// Returns TeamMember[] (legacy format)
const teamData = getLegacyTeamData()

// Returns string[] (logo URLs only)
const partnerLogos = getPartnerLogoUrls()
const supporterLogos = getSupporterLogoUrls()
```

---

## Type Definitions

All content types are defined in `/lib/content/interfaces.ts`

### Core Types

#### SiteSettings
```typescript
interface SiteSettings {
  title: string
  description: string
  keywords: string[]
  seo: SeoMetadata
  logo: { text: string; url?: string }
  footer: {
    copyrightText: string
    year: number
    email: string
  }
  primaryCta: CallToAction
  eventUrl: string
  navigation: NavigationLink[]
}
```

#### Person (Speaker/Team Member)
```typescript
interface Person {
  name: string
  role: string
  bio?: string
  image?: ImageAsset
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  company?: string
}
```

#### Company (Partner/Supporter)
```typescript
interface Company {
  name: string
  logo: ImageAsset
  description?: string
  website?: string
  featured?: boolean
}
```

#### ContentSection
```typescript
interface ContentSection {
  title: string
  subtitle: string
  theme: 'light' | 'dark'  // Semantic theme
  backgroundImage?: string
  _legacyColor?: string    // Backwards compatibility
}
```

### SEO Types

#### SeoMetadata
```typescript
interface SeoMetadata {
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
```

---

## Editing Content

### Site Settings (`/content/settings.json`)

```json
{
  "title": "Your Site Title",
  "description": "Site description for SEO",
  "keywords": ["keyword1", "keyword2"],
  "seo": {
    "siteUrl": "https://yoursite.com",
    "siteName": "Your Site Name",
    "locale": "en_US",
    "ogImage": {
      "url": "/images/og-image.png",
      "width": 1200,
      "height": 630,
      "alt": "Site preview"
    },
    "twitterHandle": "@yourhandle"
  },
  "logo": {
    "text": "YourLogo"
  },
  "footer": {
    "copyrightText": "Your Company",
    "year": 2025,
    "email": "contact@yoursite.com"
  },
  "primaryCta": {
    "text": "Get Started",
    "url": "https://register.com",
    "openInNewTab": true
  }
}
```

### Home Page (`/content/pages/home.json`)

```json
{
  "hero": {
    "headline": "Big Event Title",
    "title": "Event Name",
    "subtitle": "Event tagline",
    "description": "Event description"
  },
  "sections": {
    "about": {
      "title": "About Section",
      "subtitle": "About details",
      "theme": "dark"
    }
  }
}
```

---

## Content Guidelines

### Writing Content

#### Titles & Headlines
- Keep titles under 60 characters (SEO)
- Use clear, descriptive language
- Include keywords naturally

#### Descriptions
- Keep meta descriptions 150-160 characters
- Include call-to-action
- Be specific and compelling

#### Images
- Use descriptive file names
- Provide meaningful alt text
- Optimize images before upload
- Recommended OG image: 1200x630px

### Content Best Practices

✅ **DO:**
- Use semantic themes ('light'/'dark')
- Provide alt text for all images
- Keep JSON properly formatted
- Validate JSON before committing
- Use meaningful identifiers

❌ **DON'T:**
- Hardcode colors (use themes)
- Use very long text blocks
- Include sensitive data in JSON
- Use special characters in IDs
- Forget to update types when adding fields

---

## Adding New Content

### Adding a New Section

1. **Update home.json:**
```json
{
  "sections": {
    "about": { ... },
    "invite": { ... },
    "newSection": {  // Add new section
      "title": "New Section",
      "subtitle": "Section subtitle",
      "theme": "light"
    }
  }
}
```

2. **Add to interfaces.ts:**
```typescript
interface HomePage {
  // ... existing
  sections: {
    about: ContentSection
    invite: ContentSection
    newSection: ContentSection  // Add here
  }
}
```

3. **Use in component:**
```typescript
const homePage = getHomePage()
<Section data={homePage.sections.newSection} />
```

### Adding a New Collection

1. **Create collection file:**
```
content/collections/events.json
```

2. **Define interface:**
```typescript
// lib/content/interfaces.ts
interface Event {
  title: string
  date: string
  location: string
  description: string
}
```

3. **Add accessor function:**
```typescript
// lib/content/static.ts
import eventsData from '@/content/collections/events.json'

export function getAllEvents(): Event[] {
  return eventsData as Event[]
}
```

4. **Use in components:**
```typescript
import { getAllEvents } from '@/lib/content/static'

const events = getAllEvents()
```

---

## Migration to Sanity.io

When ready to integrate Sanity CMS, the transition is straightforward:

### Step 1: Define Sanity Schemas

Content interfaces → Sanity schemas (nearly 1:1)

```typescript
// lib/content/interfaces.ts
interface Person {
  name: string
  role: string
  image?: ImageAsset
}

// ↓ becomes ↓

// sanity/schemas/person.ts
export default {
  name: 'person',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'image', type: 'image' }
  ]
}
```

### Step 2: Create GROQ Queries

```typescript
// lib/content/queries.ts
export const ALL_SPEAKERS_QUERY = `
  *[_type == "person" && categories[]->title == "Speaker"] {
    name,
    role,
    "image": image.asset->url
  }
`
```

### Step 3: Update Access Functions

```typescript
// lib/content/static.ts
import { sanityClient } from '@/lib/sanity'
import { ALL_SPEAKERS_QUERY } from './queries'

export async function getAllSpeakers(): Promise<Person[]> {
  // Replace JSON import with Sanity query
  return await sanityClient.fetch(ALL_SPEAKERS_QUERY)
}
```

### Step 4: Components Stay the Same!

```typescript
// No changes needed in components
const speakers = await getAllSpeakers()
```

---

## Content Validation

### Type Checking

TypeScript validates structure:

```typescript
// This will error if structure doesn't match
const settings: SiteSettings = getSiteSettings()
```

### Runtime Validation (Recommended)

For production, consider adding Zod or Yup:

```typescript
import { z } from 'zod'

const SettingsSchema = z.object({
  title: z.string(),
  description: z.string(),
  // ... etc
})

export function getSiteSettings(): SiteSettings {
  const data = SettingsSchema.parse(settingsData)
  return data
}
```

---

## Content Performance

### Current Implementation
- **Static JSON files** loaded at build time
- **No runtime overhead** for content access
- **Type-safe** at compile time
- **Fast development** (no build step for content)

### Sanity Implementation (Future)
- **Content fetched** at build time (ISR/SSG)
- **Can revalidate** on-demand
- **Rich media** automatically optimized
- **Preview mode** for drafts

---

## Troubleshooting

### Common Issues

**Issue:** Type error when accessing content
```typescript
// ❌ Wrong
const title = settings.titel  // Typo

// ✅ Correct
const title = settings.title  // TypeScript will help
```

**Issue:** JSON syntax error
```json
// ❌ Wrong (trailing comma)
{
  "title": "Hello",
  "subtitle": "World",
}

// ✅ Correct
{
  "title": "Hello",
  "subtitle": "World"
}
```

**Issue:** Content not updating
1. Restart dev server (`npm run dev`)
2. Check JSON syntax
3. Clear `.next` folder

---

## Future Enhancements

### Planned Features
- [ ] Multi-language support
- [ ] Content versioning
- [ ] A/B testing variants
- [ ] Draft/publish workflow
- [ ] Content search/filtering

### When to Migrate to Sanity
✅ Need content editing UI
✅ Multiple content editors
✅ Want media management
✅ Need preview mode
✅ Want scheduled publishing

---

## See Also

- **[ERROR_HANDLING.md](./ERROR_HANDLING.md)** - Phase 1 error handling and fallback system
- **[FEATURE_FLAG_GUIDE.md](./FEATURE_FLAG_GUIDE.md)** - Toggle between Sanity and static content
- **[SANITY_MIGRATION.md](./SANITY_MIGRATION.md)** - Complete Sanity migration guide

---

**Last Updated:** 2025-10-25 (Phase 1 Enhanced)
