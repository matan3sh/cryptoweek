# Sanity.io Migration Plan

**Project:** CryptoWeek Next.js to Sanity.io Migration
**Version:** 1.0
**Date:** 2025-10-25
**Status:** Ready for Implementation

---

## Table of Contents

1. [Phase 0: Assessment & Planning](#phase-0-assessment--planning)
2. [Phase 1: Sanity Project Setup](#phase-1-sanity-project-setup)
3. [Phase 2: Schema Development](#phase-2-schema-development)
4. [Phase 3: Data Migration](#phase-3-data-migration)
5. [Phase 4: Integration Layer](#phase-4-integration-layer)
6. [Phase 5: Preview & ISR Setup](#phase-5-preview--isr-setup)
5. [Phase 6: Final Testing & Cleanup](#phase-6-final-testing--cleanup)

---

## Overview

This migration plan preserves your excellent content abstraction layer while replacing the JSON data source with Sanity.io CMS. The migration is designed to be **incremental, testable, and reversible** at each phase.

### Key Benefits of This Approach

✅ **Zero Breaking Changes** - Existing function signatures remain the same
✅ **Phased Testing** - Each phase is independently verifiable
✅ **Rollback Safety** - Can revert to JSON at any point
✅ **Type Safety** - Full TypeScript support throughout
✅ **Content Flexibility** - Easy content updates via Sanity Studio

---

## Phase 0: Assessment & Planning

**Duration:** 30 minutes
**Status:** ✅ COMPLETED

### Current State Analysis

#### Content Structure ✅
- **SiteSettings**: Global configuration (SEO, nav, footer, CTA)
- **HomePage**: Hero, sections, partners, supporters, speakers, team
- **Person**: 54 speakers + 5 team members (59 total)
- **Company**: 5 partners + 43 supporters (48 total)
- **ContentSection**: About and invite sections
- **ImageAsset**: Already has Sanity-ready fields (hotspot, crop)

#### Content Sources
```
/content/settings.json     → Will become siteSettings document
/content/pages/home.json   → Will become homePage document
/data/index.ts             → Legacy data (speakers, team, partners)
```

#### Content Layer ✅
```typescript
/lib/content/interfaces.ts  → Already matches Sanity schema patterns
/lib/content/static.ts      → Will swap JSON imports for GROQ queries
```

### Schema Mapping

| Current Interface | Sanity Schema Type | Document/Object | Priority |
|------------------|-------------------|-----------------|----------|
| SiteSettings | siteSettings | document | HIGH |
| HomePage | homePage | document | HIGH |
| Person | person | document | HIGH |
| Company | company | document | HIGH |
| ContentSection | contentSection | object | MEDIUM |
| HeroSection | heroSection | object | MEDIUM |
| ImageAsset | imageAsset | object | MEDIUM |
| SeoMetadata | seoMetadata | object | MEDIUM |
| CallToAction | callToAction | object | LOW |
| NavigationLink | navigationLink | object | LOW |
| SocialLink | socialLink | object | LOW |
| CompanyLogo | companyLogo | object | LOW |

### Migration Order

```
Phase 1: Setup
  ↓
Phase 2: Schemas (Objects → Documents)
  ↓
Phase 3: Data Migration (Settings → People → Companies → Pages)
  ↓
Phase 4: Integration (GROQ Queries → Content Layer Update)
  ↓
Phase 5: Preview & ISR
  ↓
Phase 6: Cleanup & Testing
```

### Dependencies

- ✅ TypeScript interfaces defined
- ✅ Content abstraction layer exists
- ✅ User token provided
- ✅ Project structure ready
- ⏳ Sanity CLI (will install in Phase 1)

---

## Phase 1: Sanity Project Setup

**Duration:** 45-60 minutes
**Goal:** Initialize Sanity project and configure TypeScript type generation

### Step 1.1: Initialize Sanity Project

```bash
# Navigate to project root
cd /Users/matanshaviro/Documents/nextjs/cryptoweek

# Initialize Sanity (will create studio in current directory)
npx sanity@latest init --project-plan free --dataset production

# When prompted:
# - Create new project? Yes
# - Project name: cryptoweek
# - Dataset: production
# - Output path: ./studio
# - Package manager: npm
# - Template: Clean project with no predefined schemas
```

**Expected Output:**
```
✅ Studio created at ./studio
✅ Project ID: [generated-project-id]
✅ Dataset: production
```

### Step 1.2: Configure Studio for Monorepo

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/package.json`

```json
{
  "name": "cryptoweek-studio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "sanity dev",
    "build": "sanity build",
    "deploy": "sanity deploy",
    "schema-extract": "sanity schema extract --path=../lib/sanity/extract.json",
    "typegen": "sanity typegen generate"
  },
  "dependencies": {
    "@sanity/icons": "^3.4.0",
    "@sanity/vision": "^3.58.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "sanity": "^3.58.0",
    "styled-components": "^6.1.0"
  }
}
```

### Step 1.3: Create Sanity Configuration

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/sanity.config.ts`

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'cryptoweek-studio',
  title: 'CryptoWeek Content Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
```

### Step 1.4: Environment Variables

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/.env.local`

```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/.env.local`

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
SANITY_PREVIEW_SECRET=your-random-secret-string

# Existing variables...
```

### Step 1.5: TypeGen Configuration

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/sanity-typegen.json`

```json
{
  "path": "./**/*.{ts,tsx,js,jsx}",
  "schema": "../lib/sanity/extract.json",
  "generates": "../lib/sanity/types.ts"
}
```

### Step 1.6: Install Sanity Dependencies in Main Project

```bash
cd /Users/matanshaviro/Documents/nextjs/cryptoweek

npm install next-sanity @sanity/image-url @portabletext/react groq
npm install -D @sanity/types
```

### Step 1.7: Create Schema Index

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/index.ts`

```typescript
// Document types will be added in Phase 2
// Object types will be added in Phase 2

export const schemaTypes = []
```

### Testing Phase 1

```bash
# In studio directory
cd /Users/matanshaviro/Documents/nextjs/cryptoweek/studio

# Install dependencies
npm install

# Start Sanity Studio
npm run dev

# Should open http://localhost:3333
# Verify:
# ✅ Studio loads without errors
# ✅ Can see empty schema (no documents yet)
# ✅ Can access Vision tab
```

**Success Criteria:**
- ✅ Sanity Studio launches on localhost:3333
- ✅ No console errors
- ✅ Environment variables loaded
- ✅ Vision plugin accessible

**Rollback Procedure:**
If something fails, delete `/studio` directory and restart Phase 1.

---

## Phase 2: Schema Development

**Duration:** 2-3 hours
**Goal:** Create all Sanity schemas matching existing TypeScript interfaces

### Step 2.1: Create Object Types (Reusable Components)

These are used within documents, create them first.

#### 2.1.1: Image Asset Object

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/objects/imageAsset.ts`

```typescript
import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'imageAsset',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility',
      validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      alt: 'alt',
    },
    prepare({ media, alt }) {
      return {
        title: alt || 'Untitled image',
        media,
      }
    },
  },
})
```

#### 2.1.2: SEO Metadata Object

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/objects/seoMetadata.ts`

```typescript
import { defineType, defineField } from 'sanity'
import { SearchIcon } from '@sanity/icons'

export default defineType({
  name: 'seoMetadata',
  title: 'SEO Metadata',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      description: 'e.g., en_US, en_GB',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'object',
      fields: [
        { name: 'url', type: 'string', title: 'Image URL' },
        { name: 'width', type: 'number', title: 'Width' },
        { name: 'height', type: 'number', title: 'Height' },
        { name: 'alt', type: 'string', title: 'Alt Text' },
      ],
    }),
    defineField({
      name: 'twitterHandle',
      title: 'Twitter Handle',
      type: 'string',
      description: 'Include the @ symbol',
    }),
  ],
})
```

#### 2.1.3: Call to Action Object

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/objects/callToAction.ts`

```typescript
import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export default defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required().max(30).warning('Keep button text short'),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ allowRelative: true }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'style',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      url: 'url',
    },
    prepare({ text, url }) {
      return {
        title: text,
        subtitle: url,
      }
    },
  },
})
```

#### 2.1.4: Navigation Link Object

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/objects/navigationLink.ts`

```typescript
import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export default defineType({
  name: 'navigationLink',
  title: 'Navigation Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Link Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Can be a hash link like #Speakers or full URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({ title, url }) {
      return {
        title,
        subtitle: url,
      }
    },
  },
})
```

#### 2.1.5: Social Link Object

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/objects/socialLink.ts`

```typescript
import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Twitter', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'GitHub', value: 'github' },
          { title: 'Website', value: 'website' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'handle',
      title: 'Handle/Username',
      type: 'string',
      description: 'Optional: @username or profile name',
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      handle: 'handle',
      url: 'url',
    },
    prepare({ platform, handle, url }) {
      return {
        title: `${platform}${handle ? ': ' + handle : ''}`,
        subtitle: url,
      }
    },
  },
})
```

#### 2.1.6: Content Section Object

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/objects/contentSection.ts`

```typescript
import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'contentSection',
  title: 'Content Section',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      description: 'Visual theme for the section',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'string',
      description: 'Path to background image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      theme: 'theme',
    },
    prepare({ title, theme }) {
      return {
        title,
        subtitle: `Theme: ${theme}`,
      }
    },
  },
})
```

#### 2.1.7: Company Logo Object

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/objects/companyLogo.ts`

```typescript
import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'companyLogo',
  title: 'Company Logo',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageAsset',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayWidth',
      title: 'Display Width',
      type: 'string',
      description: 'e.g., 200px',
    }),
    defineField({
      name: 'displayHeight',
      title: 'Display Height',
      type: 'string',
      description: 'e.g., 50px',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      media: 'logo.image',
    },
    prepare({ name, media }) {
      return {
        title: name,
        media,
      }
    },
  },
})
```

#### 2.1.8: Hero Section Object

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/objects/heroSection.ts`

```typescript
import { defineType, defineField } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight',
      type: 'string',
      description: 'The part of the title to highlight (e.g., "Week")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'imageAsset',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'string',
      description: 'Path to background image',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'callToAction',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredPartners',
      title: 'Featured Partners',
      type: 'array',
      of: [{ type: 'companyLogo' }],
      validation: (Rule) => Rule.max(6).warning('Keep featured partners to 6 or less'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      headline: 'headline',
    },
    prepare({ title, headline }) {
      return {
        title: headline,
        subtitle: title,
      }
    },
  },
})
```

### Step 2.2: Create Document Types

#### 2.2.1: Person Document (Speakers & Team)

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/documents/person.ts`

```typescript
import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: UserIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'social', title: 'Social Links' },
    { name: 'meta', title: 'Metadata' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().error('Name is required'),
    }),
    defineField({
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().error('Role is required'),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'imageAsset',
      group: 'content',
      validation: (Rule) => Rule.required().error('Photo is required'),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 5,
      group: 'content',
    }),
    defineField({
      name: 'type',
      title: 'Person Type',
      type: 'string',
      options: {
        list: [
          { title: 'Speaker', value: 'speaker' },
          { title: 'Team Member', value: 'team' },
        ],
        layout: 'radio',
      },
      group: 'meta',
      validation: (Rule) => Rule.required().error('Person type is required'),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
      group: 'social',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage/featured list',
      group: 'meta',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      group: 'meta',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      company: 'company',
      type: 'type',
      media: 'image.image',
    },
    prepare({ name, role, company, type, media }) {
      return {
        title: name,
        subtitle: `${role}${company ? ' at ' + company : ''} • ${type}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
```

#### 2.2.2: Company Document (Partners & Supporters)

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/documents/company.ts`

```typescript
import { defineType, defineField } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export default defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  icon: CaseIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Metadata' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().error('Company name is required'),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageAsset',
      group: 'content',
      validation: (Rule) => Rule.required().error('Logo is required'),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      group: 'content',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'tier',
      title: 'Partnership Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Platinum Partner', value: 'platinum' },
          { title: 'Gold Partner', value: 'gold' },
          { title: 'Silver Partner', value: 'silver' },
          { title: 'Supporter', value: 'supporter' },
        ],
        layout: 'radio',
      },
      group: 'meta',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage/featured list',
      group: 'meta',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      group: 'meta',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      tier: 'tier',
      media: 'logo.image',
    },
    prepare({ name, tier, media }) {
      return {
        title: name,
        subtitle: tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : 'No tier',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
```

#### 2.2.3: Site Settings Document (Singleton)

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/documents/siteSettings.ts`

```typescript
import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'general',
      validation: (Rule) => [
        Rule.required().error('Site title is required'),
        Rule.max(60).warning('Keep under 60 characters for SEO'),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      group: 'general',
      validation: (Rule) => [
        Rule.required().error('Description is required'),
        Rule.max(160).warning('Keep under 160 characters for SEO'),
      ],
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
      description: 'SEO keywords for the site',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seoMetadata',
      group: 'seo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'object',
      group: 'general',
      fields: [
        { name: 'text', type: 'string', title: 'Logo Text' },
        { name: 'url', type: 'string', title: 'Logo Image URL' },
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Links',
      type: 'array',
      of: [{ type: 'navigationLink' }],
      group: 'navigation',
      validation: (Rule) => Rule.max(8).warning('Too many navigation items may affect UX'),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'callToAction',
      group: 'navigation',
      description: 'Main call-to-action button in header',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventUrl',
      title: 'Event URL',
      type: 'url',
      group: 'general',
      description: 'Main event registration/info URL',
    }),
    defineField({
      name: 'footer',
      title: 'Footer Settings',
      type: 'object',
      group: 'footer',
      fields: [
        {
          name: 'copyrightText',
          type: 'string',
          title: 'Copyright Text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'email',
          type: 'string',
          title: 'Contact Email',
          validation: (Rule) => Rule.email().error('Must be a valid email'),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Site Settings',
        subtitle: title,
      }
    },
  },
})
```

#### 2.2.4: Home Page Document (Singleton)

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/documents/homePage.ts`

```typescript
import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'sections', title: 'Content Sections' },
    { name: 'collections', title: 'People & Companies' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'contentSection',
      group: 'sections',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inviteSection',
      title: 'Invite Section',
      type: 'contentSection',
      group: 'sections',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'partnersTitle',
      title: 'Partners Section Title',
      type: 'string',
      group: 'collections',
      initialValue: 'Our Partners',
    }),
    defineField({
      name: 'partnersIdentifier',
      title: 'Partners Identifier',
      type: 'string',
      group: 'collections',
      description: 'Used for anchor links',
      initialValue: 'Partners',
    }),
    defineField({
      name: 'supportersTitle',
      title: 'Supporters Section Title',
      type: 'string',
      group: 'collections',
      initialValue: 'Supporters',
    }),
    defineField({
      name: 'supportersIdentifier',
      title: 'Supporters Identifier',
      type: 'string',
      group: 'collections',
      description: 'Used for anchor links',
      initialValue: 'Supporters',
    }),
    defineField({
      name: 'speakersTitle',
      title: 'Speakers Section Title',
      type: 'string',
      group: 'collections',
      initialValue: 'Our Speakers',
    }),
    defineField({
      name: 'speakersIdentifier',
      title: 'Speakers Identifier',
      type: 'string',
      group: 'collections',
      description: 'Used for anchor links',
      initialValue: 'Speakers',
    }),
    defineField({
      name: 'teamTitle',
      title: 'Team Section Title',
      type: 'string',
      group: 'collections',
      initialValue: 'Our Team',
    }),
    defineField({
      name: 'teamIdentifier',
      title: 'Team Identifier',
      type: 'string',
      group: 'collections',
      description: 'Used for anchor links',
      initialValue: 'Team',
    }),
  ],
  preview: {
    select: {
      headline: 'hero.headline',
    },
    prepare({ headline }) {
      return {
        title: 'Home Page',
        subtitle: headline,
      }
    },
  },
})
```

### Step 2.3: Update Schema Index

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/schemas/index.ts`

```typescript
// Object types (must be imported before documents that use them)
import imageAsset from './objects/imageAsset'
import seoMetadata from './objects/seoMetadata'
import callToAction from './objects/callToAction'
import navigationLink from './objects/navigationLink'
import socialLink from './objects/socialLink'
import contentSection from './objects/contentSection'
import companyLogo from './objects/companyLogo'
import heroSection from './objects/heroSection'

// Document types
import person from './documents/person'
import company from './documents/company'
import siteSettings from './documents/siteSettings'
import homePage from './documents/homePage'

export const schemaTypes = [
  // Objects first
  imageAsset,
  seoMetadata,
  callToAction,
  navigationLink,
  socialLink,
  contentSection,
  companyLogo,
  heroSection,

  // Documents
  person,
  company,
  siteSettings,
  homePage,
]
```

### Step 2.4: Create Studio Structure (Singleton Pattern)

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/structure/index.ts`

```typescript
import type { StructureResolver } from 'sanity/structure'
import { CogIcon, HomeIcon, UserIcon, CaseIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons (Settings, Home Page)
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Home Page')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),

      S.divider(),

      // Collections
      S.listItem()
        .title('People')
        .icon(UserIcon)
        .child(
          S.list()
            .title('People')
            .items([
              S.listItem()
                .title('All People')
                .child(
                  S.documentTypeList('person')
                    .title('All People')
                ),
              S.listItem()
                .title('Speakers')
                .child(
                  S.documentList()
                    .title('Speakers')
                    .filter('_type == "person" && type == "speaker"')
                ),
              S.listItem()
                .title('Team Members')
                .child(
                  S.documentList()
                    .title('Team Members')
                    .filter('_type == "person" && type == "team"')
                ),
            ])
        ),

      S.listItem()
        .title('Companies')
        .icon(CaseIcon)
        .child(
          S.list()
            .title('Companies')
            .items([
              S.listItem()
                .title('All Companies')
                .child(
                  S.documentTypeList('company')
                    .title('All Companies')
                ),
              S.listItem()
                .title('Partners')
                .child(
                  S.documentList()
                    .title('Partners')
                    .filter('_type == "company" && tier in ["platinum", "gold", "silver"]')
                ),
              S.listItem()
                .title('Supporters')
                .child(
                  S.documentList()
                    .title('Supporters')
                    .filter('_type == "company" && tier == "supporter"')
                ),
            ])
        ),
    ])
```

### Step 2.5: Update Sanity Config

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/sanity.config.ts`

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { structure } from './structure'

export default defineConfig({
  name: 'cryptoweek-studio',
  title: 'CryptoWeek Content Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
```

### Testing Phase 2

```bash
cd /Users/matanshaviro/Documents/nextjs/cryptoweek/studio

# Run type generation
npm run typegen

# Should output:
# ✅ Generated types at ../lib/sanity/types.ts

# Start Studio
npm run dev

# Verify in Studio (http://localhost:3333):
# ✅ Site Settings appears in sidebar
# ✅ Home Page appears in sidebar
# ✅ People section with filters
# ✅ Companies section with filters
# ✅ Can create a test person document
# ✅ Can create a test company document
# ✅ Image upload works
# ✅ All field validations work
```

**Success Criteria:**
- ✅ All schemas appear in Studio
- ✅ Can create documents without errors
- ✅ Image upload works
- ✅ Validation rules work
- ✅ Preview panes show correct data
- ✅ TypeScript types generated

**Rollback Procedure:**
If schemas have errors, fix them one at a time. Studio will show validation errors.

---

## Phase 3: Data Migration

**Duration:** 1-2 hours
**Goal:** Import all existing JSON/TypeScript data into Sanity

### Step 3.1: Create Migration Scripts

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/scripts/migrate-to-sanity.ts`

```typescript
import { createClient } from '@sanity/client'
import settingsData from '../content/settings.json'
import homePageData from '../content/pages/home.json'
import {
  ourSpeakersData,
  ourTeamData,
  ourPartnersData,
  ourSupportersData,
} from '../data'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2025-01-01',
})

// Utility to create document ID from name
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// 1. Migrate Site Settings
async function migrateSiteSettings() {
  console.log('📝 Migrating Site Settings...')

  const doc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: settingsData.title,
    description: settingsData.description,
    keywords: settingsData.keywords,
    seo: settingsData.seo,
    logo: settingsData.logo,
    navigation: settingsData.navigation,
    primaryCta: settingsData.primaryCta,
    eventUrl: settingsData.eventUrl,
    footer: {
      copyrightText: settingsData.footer.copyrightText,
      email: settingsData.footer.email,
    },
  }

  await client.createOrReplace(doc)
  console.log('✅ Site Settings migrated')
}

// 2. Migrate Speakers
async function migrateSpeakers() {
  console.log('📝 Migrating Speakers...')

  for (const [index, speaker] of ourSpeakersData.entries()) {
    const doc = {
      _id: `person-speaker-${slugify(speaker.name)}`,
      _type: 'person',
      name: speaker.name,
      role: speaker.role,
      type: 'speaker',
      order: index,
      image: {
        _type: 'imageAsset',
        image: {
          _type: 'image',
          _sanityAsset: `image@${speaker.image}`,
        },
        alt: `${speaker.name} - ${speaker.role}`,
      },
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${speaker.name}`)
  }

  console.log(`✅ Migrated ${ourSpeakersData.length} speakers`)
}

// 3. Migrate Team Members
async function migrateTeam() {
  console.log('📝 Migrating Team Members...')

  for (const [index, member] of ourTeamData.entries()) {
    const doc = {
      _id: `person-team-${slugify(member.name)}`,
      _type: 'person',
      name: member.name,
      role: member.role,
      type: 'team',
      order: index,
      image: {
        _type: 'imageAsset',
        image: {
          _type: 'image',
          _sanityAsset: `image@${member.image}`,
        },
        alt: `${member.name} - ${member.role}`,
      },
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${member.name}`)
  }

  console.log(`✅ Migrated ${ourTeamData.length} team members`)
}

// 4. Migrate Partners
async function migratePartners() {
  console.log('📝 Migrating Partners...')

  for (const [index, logoUrl] of ourPartnersData.entries()) {
    const name = logoUrl.split('/').pop()?.replace(/\.[^/.]+$/, '') || `Partner ${index}`

    const doc = {
      _id: `company-partner-${index}`,
      _type: 'company',
      name,
      tier: 'platinum',
      order: index,
      logo: {
        _type: 'imageAsset',
        image: {
          _type: 'image',
          _sanityAsset: `image@${logoUrl}`,
        },
        alt: `${name} logo`,
      },
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${name}`)
  }

  console.log(`✅ Migrated ${ourPartnersData.length} partners`)
}

// 5. Migrate Supporters
async function migrateSupporters() {
  console.log('📝 Migrating Supporters...')

  for (const [index, logoUrl] of ourSupportersData.entries()) {
    const name = logoUrl.split('/').pop()?.replace(/\.[^/.]+$/, '') || `Supporter ${index}`

    const doc = {
      _id: `company-supporter-${index}`,
      _type: 'company',
      name,
      tier: 'supporter',
      order: index,
      logo: {
        _type: 'imageAsset',
        image: {
          _type: 'image',
          _sanityAsset: `image@${logoUrl}`,
        },
        alt: `${name} logo`,
      },
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${name}`)
  }

  console.log(`✅ Migrated ${ourSupportersData.length} supporters`)
}

// 6. Migrate Home Page
async function migrateHomePage() {
  console.log('📝 Migrating Home Page...')

  const doc = {
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      _type: 'heroSection',
      headline: homePageData.hero.headline,
      title: homePageData.hero.title,
      titleHighlight: homePageData.hero.titleHighlight,
      subtitle: homePageData.hero.subtitle,
      description: homePageData.hero.description,
      heroImage: homePageData.hero.heroImage ? {
        _type: 'imageAsset',
        image: {
          _type: 'image',
          _sanityAsset: `image@${homePageData.hero.heroImage.src}`,
        },
        alt: homePageData.hero.heroImage.alt,
      } : undefined,
      cta: homePageData.hero.cta,
      featuredPartners: homePageData.hero.featuredPartners?.map((partner) => ({
        _type: 'companyLogo',
        name: partner.name,
        logo: {
          _type: 'imageAsset',
          image: {
            _type: 'image',
            _sanityAsset: `image@${partner.logo.src}`,
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
      backgroundImage: homePageData.sections.about.backgroundImage,
    },
    inviteSection: {
      _type: 'contentSection',
      title: homePageData.sections.invite.title,
      subtitle: homePageData.sections.invite.subtitle,
      theme: homePageData.sections.invite.theme,
      backgroundImage: homePageData.sections.invite.backgroundImage,
    },
    partnersTitle: 'Our Partners',
    partnersIdentifier: 'Partners',
    supportersTitle: 'Supporters',
    supportersIdentifier: 'Supporters',
    speakersTitle: 'Our Speakers',
    speakersIdentifier: 'Speakers',
    teamTitle: 'Our Team',
    teamIdentifier: 'Team',
  }

  await client.createOrReplace(doc)
  console.log('✅ Home Page migrated')
}

// Run all migrations
async function runMigration() {
  console.log('🚀 Starting Sanity Migration...\n')

  try {
    await migrateSiteSettings()
    await migrateSpeakers()
    await migrateTeam()
    await migratePartners()
    await migrateSupporters()
    await migrateHomePage()

    console.log('\n✨ Migration Complete!')
    console.log('📊 Summary:')
    console.log(`  - 1 Site Settings document`)
    console.log(`  - 1 Home Page document`)
    console.log(`  - ${ourSpeakersData.length} Speakers`)
    console.log(`  - ${ourTeamData.length} Team Members`)
    console.log(`  - ${ourPartnersData.length} Partners`)
    console.log(`  - ${ourSupportersData.length} Supporters`)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

runMigration()
```

### Step 3.2: Add Migration Script to package.json

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/package.json`

Add to scripts:
```json
{
  "scripts": {
    "migrate:sanity": "tsx scripts/migrate-to-sanity.ts"
  }
}
```

Install tsx if not present:
```bash
npm install -D tsx
```

### Step 3.3: Run Migration

```bash
cd /Users/matanshaviro/Documents/nextjs/cryptoweek

# Ensure environment variables are set
# NEXT_PUBLIC_SANITY_PROJECT_ID
# NEXT_PUBLIC_SANITY_DATASET
# SANITY_API_TOKEN

# Run migration
npm run migrate:sanity
```

### Step 3.4: Verify in Sanity Studio

```bash
cd studio
npm run dev

# Open http://localhost:3333
# Verify:
# ✅ Site Settings document exists and is complete
# ✅ Home Page document exists and is complete
# ✅ 54 Speakers in People section
# ✅ 5 Team Members in People section
# ✅ 5 Partners in Companies section
# ✅ 43 Supporters in Companies section
# ✅ All images are referenced (may show as broken until uploaded)
```

### Testing Phase 3

**Manual Verification:**
1. Open Site Settings - verify all fields populated
2. Open Home Page - verify hero section complete
3. Open any Speaker - verify name, role, image reference
4. Open any Company - verify name, logo reference

**GROQ Query Test (in Vision plugin):**
```groq
// Test fetching all speakers
*[_type == "person" && type == "speaker"] | order(order asc) {
  _id,
  name,
  role,
  company,
  "imageUrl": image.image.asset->url
}
```

**Success Criteria:**
- ✅ All documents created without errors
- ✅ Can query documents via Vision plugin
- ✅ All relationships (references) work
- ✅ Data matches original JSON content

**Rollback Procedure:**
```bash
# Delete all documents (if needed to restart)
npx sanity dataset delete production

# Recreate dataset
npx sanity dataset create production

# Re-run migration
npm run migrate:sanity
```

---

## Phase 4: Integration Layer

**Duration:** 2-3 hours
**Goal:** Update content layer to fetch from Sanity while maintaining existing API

### Step 4.1: Create Sanity Client

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/lib/sanity/client.ts`

```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
```

### Step 4.2: Create GROQ Queries

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/lib/sanity/queries.ts`

```typescript
import { defineQuery } from 'groq'

// Site Settings Query
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    _id,
    title,
    description,
    keywords,
    seo,
    logo,
    navigation,
    primaryCta,
    eventUrl,
    footer
  }
`)

// Home Page Query
export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0]{
    _id,
    hero{
      ...,
      heroImage{
        ...,
        "image": {
          "src": image.asset->url,
          "alt": alt,
          "width": image.asset->metadata.dimensions.width,
          "height": image.asset->metadata.dimensions.height,
          "blurDataUrl": image.asset->metadata.lqip
        }
      },
      featuredPartners[]{
        ...,
        logo{
          ...,
          "image": {
            "src": image.asset->url,
            "alt": alt,
            "width": image.asset->metadata.dimensions.width,
            "height": image.asset->metadata.dimensions.height
          }
        }
      }
    },
    aboutSection,
    inviteSection,
    partnersTitle,
    partnersIdentifier,
    supportersTitle,
    supportersIdentifier,
    speakersTitle,
    speakersIdentifier,
    teamTitle,
    teamIdentifier
  }
`)

// All Speakers Query
export const ALL_SPEAKERS_QUERY = defineQuery(`
  *[_type == "person" && type == "speaker"] | order(order asc){
    _id,
    "id": _id,
    name,
    role,
    company,
    bio,
    type,
    featured,
    order,
    socialLinks,
    "image": {
      "src": image.image.asset->url,
      "alt": image.alt,
      "width": image.image.asset->metadata.dimensions.width,
      "height": image.image.asset->metadata.dimensions.height,
      "blurDataUrl": image.image.asset->metadata.lqip,
      "hotspot": image.image.hotspot,
      "crop": image.image.crop
    }
  }
`)

// All Team Members Query
export const ALL_TEAM_QUERY = defineQuery(`
  *[_type == "person" && type == "team"] | order(order asc){
    _id,
    "id": _id,
    name,
    role,
    company,
    bio,
    type,
    featured,
    order,
    socialLinks,
    "image": {
      "src": image.image.asset->url,
      "alt": image.alt,
      "width": image.image.asset->metadata.dimensions.width,
      "height": image.image.asset->metadata.dimensions.height,
      "blurDataUrl": image.image.asset->metadata.lqip,
      "hotspot": image.image.hotspot,
      "crop": image.image.crop
    }
  }
`)

// All Partners Query
export const ALL_PARTNERS_QUERY = defineQuery(`
  *[_type == "company" && tier in ["platinum", "gold", "silver"]] | order(order asc){
    _id,
    "id": _id,
    name,
    website,
    tier,
    featured,
    order,
    "logo": {
      "src": logo.image.asset->url,
      "alt": logo.alt,
      "width": logo.image.asset->metadata.dimensions.width,
      "height": logo.image.asset->metadata.dimensions.height,
      "blurDataUrl": logo.image.asset->metadata.lqip,
      "hotspot": logo.image.hotspot,
      "crop": logo.image.crop
    }
  }
`)

// All Supporters Query
export const ALL_SUPPORTERS_QUERY = defineQuery(`
  *[_type == "company" && tier == "supporter"] | order(order asc){
    _id,
    "id": _id,
    name,
    website,
    tier,
    featured,
    order,
    "logo": {
      "src": logo.image.asset->url,
      "alt": logo.alt,
      "width": logo.image.asset->metadata.dimensions.width,
      "height": logo.image.asset->metadata.dimensions.height,
      "blurDataUrl": logo.image.asset->metadata.lqip,
      "hotspot": logo.image.hotspot,
      "crop": logo.image.crop
    }
  }
`)

// Single Person by ID Query
export const PERSON_BY_ID_QUERY = defineQuery(`
  *[_type == "person" && _id == $id][0]{
    _id,
    "id": _id,
    name,
    role,
    company,
    bio,
    type,
    featured,
    order,
    socialLinks,
    "image": {
      "src": image.image.asset->url,
      "alt": image.alt,
      "width": image.image.asset->metadata.dimensions.width,
      "height": image.image.asset->metadata.dimensions.height,
      "blurDataUrl": image.image.asset->metadata.lqip,
      "hotspot": image.image.hotspot,
      "crop": image.image.crop
    }
  }
`)
```

### Step 4.3: Update Content Layer

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/lib/content/sanity.ts`

```typescript
/**
 * Sanity Content Access Layer
 *
 * This module provides the same API as static.ts but fetches from Sanity.
 * Function signatures remain identical for backwards compatibility.
 */

import { client } from '@/lib/sanity/client'
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
  SITE_SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  ALL_SPEAKERS_QUERY,
  ALL_TEAM_QUERY,
  ALL_PARTNERS_QUERY,
  ALL_SUPPORTERS_QUERY,
  PERSON_BY_ID_QUERY,
} from '@/lib/sanity/queries'

// ============================================
// SITE SETTINGS
// ============================================

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)

  return {
    ...settings,
    footer: {
      ...settings.footer,
      year: new Date().getFullYear(), // Dynamic year
    },
  }
}

export async function getPrimaryCta() {
  const settings = await getSiteSettings()
  return settings.primaryCta
}

export async function getNavigationLinks(): Promise<NavigationLink[]> {
  const settings = await getSiteSettings()
  return settings.navigation || []
}

// ============================================
// HOME PAGE CONTENT
// ============================================

export async function getHomePage(): Promise<HomePage> {
  const homePage = await client.fetch(HOME_PAGE_QUERY)
  const speakers = await getAllSpeakers()
  const team = await getAllTeamMembers()
  const partners = await getAllPartners()
  const supporters = await getAllSupporters()

  return {
    hero: homePage.hero,
    sections: {
      about: homePage.aboutSection,
      invite: homePage.inviteSection,
    },
    partners: {
      title: homePage.partnersTitle,
      identifier: homePage.partnersIdentifier,
      companies: partners,
    },
    supporters: {
      title: homePage.supportersTitle,
      identifier: homePage.supportersIdentifier,
      companies: supporters,
    },
    speakers: {
      title: homePage.speakersTitle,
      identifier: homePage.speakersIdentifier,
      people: speakers,
    },
    team: {
      title: homePage.teamTitle,
      identifier: homePage.teamIdentifier,
      people: team,
    },
  }
}

export async function getHeroSection(): Promise<HeroSection> {
  const homePage = await client.fetch(HOME_PAGE_QUERY)
  return homePage.hero
}

export async function getAboutSection(): Promise<ContentSection> {
  const homePage = await client.fetch(HOME_PAGE_QUERY)
  return homePage.aboutSection
}

export async function getInviteSection(): Promise<ContentSection> {
  const homePage = await client.fetch(HOME_PAGE_QUERY)
  return homePage.inviteSection
}

// ============================================
// PEOPLE (SPEAKERS & TEAM)
// ============================================

export async function getAllSpeakers(): Promise<Person[]> {
  return await client.fetch(ALL_SPEAKERS_QUERY)
}

export async function getAllTeamMembers(): Promise<Person[]> {
  return await client.fetch(ALL_TEAM_QUERY)
}

export async function getFeaturedSpeakers(): Promise<Person[]> {
  const speakers = await getAllSpeakers()
  return speakers.filter(s => s.featured).slice(0, 6)
}

export async function getSpeakerById(id: string): Promise<Person | undefined> {
  return await client.fetch(PERSON_BY_ID_QUERY, { id })
}

export async function getSpeakersSection(): Promise<PeopleSection> {
  const homePage = await client.fetch(HOME_PAGE_QUERY)
  const speakers = await getAllSpeakers()

  return {
    title: homePage.speakersTitle,
    identifier: homePage.speakersIdentifier,
    people: speakers,
  }
}

export async function getTeamSection(): Promise<PeopleSection> {
  const homePage = await client.fetch(HOME_PAGE_QUERY)
  const team = await getAllTeamMembers()

  return {
    title: homePage.teamTitle,
    identifier: homePage.teamIdentifier,
    people: team,
  }
}

// ============================================
// COMPANIES (PARTNERS & SUPPORTERS)
// ============================================

export async function getAllPartners(): Promise<Company[]> {
  return await client.fetch(ALL_PARTNERS_QUERY)
}

export async function getAllSupporters(): Promise<Company[]> {
  return await client.fetch(ALL_SUPPORTERS_QUERY)
}

export async function getPartnersSection(): Promise<PartnerSection> {
  const homePage = await client.fetch(HOME_PAGE_QUERY)
  const partners = await getAllPartners()

  return {
    title: homePage.partnersTitle,
    identifier: homePage.partnersIdentifier,
    companies: partners,
  }
}

export async function getSupportersSection(): Promise<PartnerSection> {
  const homePage = await client.fetch(HOME_PAGE_QUERY)
  const supporters = await getAllSupporters()

  return {
    title: homePage.supportersTitle,
    identifier: homePage.supportersIdentifier,
    companies: supporters,
  }
}

export async function getFeaturedPartners(): Promise<CompanyLogo[]> {
  const homePage = await client.fetch(HOME_PAGE_QUERY)
  return homePage.hero.featuredPartners || []
}

// ============================================
// LEGACY COMPATIBILITY EXPORTS
// ============================================

export async function getPartnerLogoUrls(): Promise<string[]> {
  const partners = await getAllPartners()
  return partners.map(p => p.logo.src)
}

export async function getSupporterLogoUrls(): Promise<string[]> {
  const supporters = await getAllSupporters()
  return supporters.map(s => s.logo.src)
}

export async function getLegacySpeakersData() {
  const speakers = await getAllSpeakers()
  return speakers.map(s => ({
    name: s.name,
    image: s.image.src,
    role: s.role,
  }))
}

export async function getLegacyTeamData() {
  const team = await getAllTeamMembers()
  return team.map(t => ({
    name: t.name,
    image: t.image.src,
    role: t.role,
  }))
}
```

### Step 4.4: Update Pages to Use Async Functions

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/pages/index.tsx`

```typescript
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { HomePage as HomePageType } from '@/lib/content/interfaces'

// IMPORTANT: Switch import to use Sanity
// import { getHomePage, getSiteSettings } from '@/lib/content/static'
import { getHomePage, getSiteSettings } from '@/lib/content/sanity'

// ... rest of component code stays the same

export const getStaticProps: GetStaticProps<{
  homePage: HomePageType
}> = async () => {
  const homePage = await getHomePage()
  const settings = await getSiteSettings()

  return {
    props: {
      homePage,
    },
    revalidate: 60, // ISR: Revalidate every 60 seconds
  }
}

// Component code remains exactly the same
export default function Home({
  homePage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // ... existing component code
}
```

### Step 4.5: Update _app.tsx for Settings

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/pages/_app.tsx`

If you need settings globally, you can:
1. Fetch in each page's getStaticProps
2. Use React Context
3. Or keep settings static (recommended for now)

For now, keep _app.tsx unchanged and fetch settings per-page as needed.

### Testing Phase 4

```bash
cd /Users/matanshaviro/Documents/nextjs/cryptoweek

# Type check
npm run type-check

# Should pass with no errors

# Build
npm run build

# Run dev server
npm run dev

# Open http://localhost:3000
# Verify:
# ✅ Page loads without errors
# ✅ All content displays correctly
# ✅ Hero section shows
# ✅ Speakers grid populated
# ✅ Team grid populated
# ✅ Partners logos display
# ✅ All images load (from Sanity CDN)
```

**Success Criteria:**
- ✅ No TypeScript errors
- ✅ Build succeeds
- ✅ Page renders correctly
- ✅ All content from Sanity displays
- ✅ No console errors
- ✅ Images load from Sanity CDN

**Rollback Procedure:**
If Sanity integration fails:
```typescript
// In pages/index.tsx, change:
import { getHomePage, getSiteSettings } from '@/lib/content/sanity'
// Back to:
import { getHomePage, getSiteSettings } from '@/lib/content/static'
```

---

## Phase 5: Preview & ISR Setup

**Duration:** 1-2 hours
**Goal:** Enable content preview and set up ISR with on-demand revalidation

### Step 5.1: Create Preview API Route

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/pages/api/preview.ts`

```typescript
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Enable Preview Mode
  res.setPreviewData({})

  // Redirect to the path from the query
  const redirectUrl = req.query.slug ? `/${req.query.slug}` : '/'
  res.redirect(redirectUrl)
}
```

### Step 5.2: Create Exit Preview Route

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/pages/api/exit-preview.ts`

```typescript
import type { NextApiRequest, NextApiResponse } from 'next'

export default function exit(req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData()
  res.redirect('/')
}
```

### Step 5.3: Create Revalidation Webhook

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/pages/api/revalidate.ts`

```typescript
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // Revalidate all paths that might have changed
    await res.revalidate('/')

    // If you have other pages, add them:
    // await res.revalidate('/about')
    // await res.revalidate('/speakers')

    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
```

### Step 5.4: Update Pages to Use Preview Mode

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/pages/index.tsx`

```typescript
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { client, previewClient } from '@/lib/sanity/client'
import { getHomePage, getSiteSettings } from '@/lib/content/sanity'

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  // Use preview client if in preview mode
  const sanityClient = preview ? previewClient : client

  const homePage = await getHomePage()
  const settings = await getSiteSettings()

  return {
    props: {
      homePage,
      preview,
    },
    revalidate: 60, // ISR: Revalidate every 60 seconds
  }
}

export default function Home({
  homePage,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {preview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: '#f59e0b',
          color: 'white',
          padding: '8px 16px',
          textAlign: 'center',
          zIndex: 9999,
        }}>
          Preview Mode Active •{' '}
          <a
            href="/api/exit-preview"
            style={{ color: 'white', textDecoration: 'underline' }}
          >
            Exit Preview
          </a>
        </div>
      )}

      {/* Rest of your component */}
    </>
  )
}
```

### Step 5.5: Configure Sanity Webhook

In Sanity Studio:

1. Go to **Manage** (top right) → **API** → **Webhooks**
2. Click **Create Webhook**
3. Configure:
   - **Name**: Production Revalidation
   - **URL**: `https://your-domain.com/api/revalidate?secret=YOUR_SECRET`
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **Filter**: Leave empty (or filter specific doc types)
   - **HTTP method**: GET
   - **HTTP Headers**: None needed
   - **Include drafts**: No

4. Save webhook

### Step 5.6: Test Preview Mode

```bash
# 1. Start dev server
npm run dev

# 2. Open preview URL
# http://localhost:3000/api/preview?secret=YOUR_SECRET

# Should:
# ✅ Redirect to homepage
# ✅ Show orange "Preview Mode Active" banner
# ✅ Click "Exit Preview" returns to normal mode

# 3. Make a change in Sanity Studio
# 4. Refresh page in preview mode
# ✅ Changes should appear immediately

# 5. Exit preview mode
# ✅ Original cached content shows
```

### Step 5.7: Test ISR Revalidation

```bash
# 1. Deploy to Vercel (or your hosting)

# 2. In Sanity Studio, edit content
# 3. Save changes

# Webhook should trigger:
# ✅ Automatic revalidation
# ✅ New content visible within 60 seconds

# Manual test:
# curl https://your-domain.com/api/revalidate?secret=YOUR_SECRET
# ✅ Should return { "revalidated": true }
```

### Testing Phase 5

**Preview Mode Tests:**
- ✅ Can enable preview mode via API route
- ✅ Preview banner displays
- ✅ Draft content visible in preview
- ✅ Can exit preview mode
- ✅ Exit preview returns to published content

**ISR Tests:**
- ✅ Static page builds successfully
- ✅ Content cached for 60 seconds
- ✅ Manual revalidation works via API
- ✅ Webhook triggers revalidation
- ✅ Content updates after revalidation

**Success Criteria:**
- ✅ Preview mode functional
- ✅ ISR working with 60s revalidation
- ✅ Webhook configured and tested
- ✅ On-demand revalidation works

---

## Phase 6: Final Testing & Cleanup

**Duration:** 1-2 hours
**Goal:** Remove old content files, update docs, final testing

### Step 6.1: Backup Old Content

```bash
cd /Users/matanshaviro/Documents/nextjs/cryptoweek

# Create backup directory
mkdir -p .archive/old-content

# Move old content files
mv content .archive/old-content/
mv data .archive/old-content/
```

### Step 6.2: Remove Legacy Code

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/lib/content/static.ts`

Option 1: Delete entirely (if all components updated)
Option 2: Keep for reference (recommended during transition)

```bash
# Move to archive
mv lib/content/static.ts .archive/old-content/
```

### Step 6.3: Update Import Paths

Search and replace across all files:

```typescript
// Old
import { getHomePage } from '@/lib/content/static'

// New
import { getHomePage } from '@/lib/content/sanity'
```

### Step 6.4: Update Documentation

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/docs/CONTENT_LAYER.md`

Add Sanity section:

```markdown
## Sanity.io Integration

The content layer now fetches from Sanity CMS instead of JSON files.

### Accessing Content

All functions remain the same:
\`\`\`typescript
import { getHomePage, getSiteSettings } from '@/lib/content/sanity'

// In getStaticProps
const homePage = await getHomePage()
\`\`\`

### Editing Content

1. Start Sanity Studio: `cd studio && npm run dev`
2. Open http://localhost:3333
3. Edit content
4. Changes sync to production via webhook

### Preview Mode

Enable: `/api/preview?secret=YOUR_SECRET`
Exit: `/api/exit-preview`
```

### Step 6.5: Update README

**File:** `/Users/matanshaviro/Documents/nextjs/cryptoweek/README.md`

Add Sanity section:

```markdown
## Content Management

This project uses **Sanity.io** for content management.

### Sanity Studio

\`\`\`bash
cd studio
npm run dev
# Open http://localhost:3333
\`\`\`

### Environment Variables

\`\`\`env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token
SANITY_PREVIEW_SECRET=your-secret
\`\`\`

### Content Types

- **Site Settings** - Global configuration (singleton)
- **Home Page** - Homepage content (singleton)
- **Person** - Speakers and team members
- **Company** - Partners and supporters
```

### Step 6.6: Final Testing Checklist

**Build Tests:**
```bash
# Type check
npm run type-check
# ✅ No errors

# Lint
npm run lint
# ✅ No errors

# Build
npm run build
# ✅ Build succeeds
# ✅ All pages generate successfully

# Start production server
npm start
# ✅ Site loads correctly
```

**Content Tests:**
- ✅ Site Settings editable in Studio
- ✅ Home Page editable in Studio
- ✅ Can create/edit Speakers
- ✅ Can create/edit Team Members
- ✅ Can create/edit Partners
- ✅ Can create/edit Supporters
- ✅ Image uploads work
- ✅ Changes reflect on frontend

**Performance Tests:**
```bash
# Run Lighthouse
npx lighthouse http://localhost:3000 --view

# Check:
# ✅ Performance: 90+
# ✅ Accessibility: 100
# ✅ Best Practices: 100
# ✅ SEO: 100
```

**SEO Tests:**
- ✅ Meta tags still working
- ✅ OG images display
- ✅ Structured data present
- ✅ Sitemap accessible

**Mobile Tests:**
- ✅ Responsive design intact
- ✅ Touch navigation works
- ✅ Images optimized

### Step 6.7: Deployment Checklist

**Environment Variables (Production):**
```env
# Vercel/Netlify Dashboard
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxx
SANITY_PREVIEW_SECRET=xxx
```

**Sanity Configuration:**
- ✅ CORS origins configured (add production domain)
- ✅ Webhook configured with production URL
- ✅ API token has correct permissions

**Deploy:**
```bash
# If using Vercel
vercel --prod

# Or
git push origin main
# (triggers automatic deployment)
```

**Post-Deployment:**
- ✅ Site loads correctly
- ✅ All content displays
- ✅ Images load from Sanity CDN
- ✅ Edit content in Studio
- ✅ Webhook triggers revalidation
- ✅ Changes appear on production

### Success Criteria - Phase 6

- ✅ All old content files archived
- ✅ No broken imports
- ✅ All tests passing
- ✅ Documentation updated
- ✅ Production deployment successful
- ✅ Content editable via Studio
- ✅ ISR and webhooks working

---

## Rollback Plan

If migration fails at any phase:

### Full Rollback to JSON

1. **Restore old content:**
   ```bash
   mv .archive/old-content/content ./
   mv .archive/old-content/data ./
   mv .archive/old-content/lib/content/static.ts lib/content/
   ```

2. **Update imports:**
   ```typescript
   // Change all files back to:
   import { getHomePage } from '@/lib/content/static'
   ```

3. **Rebuild:**
   ```bash
   npm run build
   ```

### Partial Rollback

Keep Sanity setup but use JSON as fallback:

```typescript
// lib/content/index.ts
const USE_SANITY = process.env.USE_SANITY === 'true'

export const getHomePage = USE_SANITY
  ? require('./sanity').getHomePage
  : require('./static').getHomePage
```

---

## Common Issues & Solutions

### Issue: Images not loading from Sanity

**Solution:**
```typescript
// In next.config.ts
module.exports = {
  images: {
    domains: ['cdn.sanity.io'],
  },
}
```

### Issue: GROQ query returns null

**Solution:**
- Check document exists in Studio
- Verify query syntax in Vision plugin
- Check field names match schema

### Issue: TypeScript errors after typegen

**Solution:**
```bash
cd studio
npm run typegen
cd ..
npm run type-check
```

### Issue: Webhook not triggering

**Solution:**
- Check webhook secret matches `.env`
- Verify webhook URL is correct
- Check webhook logs in Sanity dashboard
- Ensure API route is deployed

### Issue: Preview mode stuck

**Solution:**
```bash
# Clear cookies
# Or visit:
/api/exit-preview
```

---

## Performance Considerations

### Image Optimization

Sanity's image CDN automatically:
- ✅ Serves WebP format
- ✅ Provides responsive sizes
- ✅ Generates blur placeholders (LQIP)

### Caching Strategy

```typescript
// ISR with 60-second revalidation
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { ... },
    revalidate: 60, // Adjust based on needs
  }
}
```

### GROQ Query Optimization

- ✅ Use projections to fetch only needed fields
- ✅ Limit array fields with `[0...10]`
- ✅ Avoid deep nesting
- ✅ Use references sparingly

---

## Next Steps After Migration

### Recommended Enhancements

1. **Add More Content Types**
   - Blog posts
   - Events
   - News articles

2. **Implement Portable Text**
   - Rich text content
   - Embedded components

3. **Add Localization**
   - Multi-language support
   - Translation management

4. **Advanced Features**
   - Content scheduling
   - A/B testing
   - Personalization

5. **Analytics**
   - Track content performance
   - User engagement metrics

---

## Summary

This migration plan transforms your Next.js project from JSON-based content to a professional Sanity.io CMS while:

✅ **Preserving all existing functionality**
✅ **Maintaining type safety**
✅ **Enabling content team to edit easily**
✅ **Adding preview mode and ISR**
✅ **Improving image optimization**
✅ **Setting up automated deployments**

Each phase is independently testable and reversible, ensuring a smooth migration process.

---

**Questions or Issues?**

- Sanity Docs: https://www.sanity.io/docs
- Sanity Discord: https://slack.sanity.io
- Next.js ISR Docs: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

---

**Last Updated:** 2025-10-25
**Status:** Ready for Implementation ✅
