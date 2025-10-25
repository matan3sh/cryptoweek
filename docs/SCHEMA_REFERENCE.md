# Sanity Schema Reference

Quick reference guide for all Sanity schemas in the CryptoWeek project.

---

## Document Types (Top-level content)

### 🏠 homePage (Singleton)
**File:** `studio/schemas/documents/homePage.ts`

```typescript
{
  hero: heroSection
  aboutSection: contentSection
  inviteSection: contentSection
  partnersTitle: string
  partnersIdentifier: string
  supportersTitle: string
  supportersIdentifier: string
  speakersTitle: string
  speakersIdentifier: string
  teamTitle: string
  teamIdentifier: string
}
```

**Usage:** Only one document, ID: `homePage`

---

### ⚙️ siteSettings (Singleton)
**File:** `studio/schemas/documents/siteSettings.ts`

```typescript
{
  title: string
  description: text
  keywords: string[]
  seo: seoMetadata
  logo: {
    text: string
    url?: string
  }
  navigation: navigationLink[]
  primaryCta: callToAction
  eventUrl: url
  footer: {
    copyrightText: string
    email: string
  }
}
```

**Usage:** Only one document, ID: `siteSettings`

---

### 👤 person (Collection)
**File:** `studio/schemas/documents/person.ts`

```typescript
{
  name: string
  role: string
  company?: string
  image: imageAsset
  bio?: text
  type: 'speaker' | 'team'
  socialLinks?: socialLink[]
  featured?: boolean
  order?: number
}
```

**Usage:**
- Speakers: `type: 'speaker'` (54 total)
- Team: `type: 'team'` (5 total)

**Query Examples:**
```groq
// All speakers
*[_type == "person" && type == "speaker"]

// Featured speakers
*[_type == "person" && type == "speaker" && featured == true]

// Team members
*[_type == "person" && type == "team"]
```

---

### 🏢 company (Collection)
**File:** `studio/schemas/documents/company.ts`

```typescript
{
  name: string
  logo: imageAsset
  website?: url
  tier?: 'platinum' | 'gold' | 'silver' | 'supporter'
  featured?: boolean
  order?: number
}
```

**Usage:**
- Partners: `tier: 'platinum' | 'gold' | 'silver'` (5 total)
- Supporters: `tier: 'supporter'` (43 total)

**Query Examples:**
```groq
// All partners
*[_type == "company" && tier in ["platinum", "gold", "silver"]]

// All supporters
*[_type == "company" && tier == "supporter"]

// Featured companies
*[_type == "company" && featured == true]
```

---

## Object Types (Reusable components)

### 🖼️ imageAsset
**File:** `studio/schemas/objects/imageAsset.ts`

```typescript
{
  image: image (with hotspot)
  alt: string
}
```

**Features:**
- Hotspot enabled for focal point
- Automatic crop data
- LQIP (blur placeholder) generated
- Responsive image URLs

**Usage in GROQ:**
```groq
"image": {
  "src": image.image.asset->url,
  "alt": image.alt,
  "width": image.image.asset->metadata.dimensions.width,
  "height": image.image.asset->metadata.dimensions.height,
  "blurDataUrl": image.image.asset->metadata.lqip
}
```

---

### 🔍 seoMetadata
**File:** `studio/schemas/objects/seoMetadata.ts`

```typescript
{
  siteUrl: url
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

**Usage:** In siteSettings document

---

### 🔗 callToAction
**File:** `studio/schemas/objects/callToAction.ts`

```typescript
{
  text: string
  url: url
  openInNewTab?: boolean
  style?: 'primary' | 'secondary' | 'outline'
}
```

**Validation:**
- Text max 30 characters (warning)
- URL required

---

### 🧭 navigationLink
**File:** `studio/schemas/objects/navigationLink.ts`

```typescript
{
  title: string
  url: string (can be hash link like #Speakers)
  openInNewTab?: boolean
}
```

**Usage:** In siteSettings.navigation array

---

### 📱 socialLink
**File:** `studio/schemas/objects/socialLink.ts`

```typescript
{
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'github' | 'website'
  url: url
  handle?: string
}
```

**Usage:** In person.socialLinks array

---

### 📄 contentSection
**File:** `studio/schemas/objects/contentSection.ts`

```typescript
{
  title: string
  subtitle: text
  theme: 'light' | 'dark'
  backgroundImage?: string
}
```

**Usage:**
- homePage.aboutSection
- homePage.inviteSection

---

### 🏷️ companyLogo
**File:** `studio/schemas/objects/companyLogo.ts`

```typescript
{
  name: string
  logo: imageAsset
  displayWidth?: string (e.g., "200px")
  displayHeight?: string (e.g., "50px")
}
```

**Usage:** In heroSection.featuredPartners array

---

### 🚀 heroSection
**File:** `studio/schemas/objects/heroSection.ts`

```typescript
{
  headline: string
  title: string
  titleHighlight: string
  subtitle: string
  description: text
  heroImage?: imageAsset
  backgroundImage?: string
  cta: callToAction
  featuredPartners?: companyLogo[]
}
```

**Usage:** In homePage.hero

---

## Content Relationships

```
siteSettings (singleton)
├── seo: seoMetadata
├── navigation: navigationLink[]
└── primaryCta: callToAction

homePage (singleton)
├── hero: heroSection
│   ├── cta: callToAction
│   ├── heroImage: imageAsset
│   └── featuredPartners: companyLogo[]
│       └── logo: imageAsset
├── aboutSection: contentSection
└── inviteSection: contentSection

person (collection)
├── image: imageAsset
└── socialLinks: socialLink[]

company (collection)
└── logo: imageAsset
```

---

## Field Types Reference

| Type | Description | Example |
|------|-------------|---------|
| `string` | Short text | "CryptoWeek" |
| `text` | Multi-line text | Long descriptions |
| `url` | Validated URL | "https://example.com" |
| `number` | Integer/decimal | 42 |
| `boolean` | True/false | true |
| `image` | Sanity image asset | With hotspot and crop |
| `array` | List of items | `navigationLink[]` |
| `object` | Nested structure | `{ text, url }` |

---

## Validation Rules

### Required Fields

**person:**
- name ✅
- role ✅
- image ✅
- type ✅

**company:**
- name ✅
- logo ✅

**siteSettings:**
- title ✅ (max 60 chars)
- description ✅ (max 160 chars)
- seo ✅
- primaryCta ✅

**homePage:**
- hero ✅
- aboutSection ✅
- inviteSection ✅

### Warnings

- siteSettings.title: max 60 chars (SEO)
- siteSettings.description: max 160 chars (SEO)
- siteSettings.navigation: max 8 items (UX)
- callToAction.text: max 30 chars (button size)
- heroSection.featuredPartners: max 6 items (layout)

---

## Studio Structure

```
Content
├── Site Settings (singleton)
├── Home Page (singleton)
├── People
│   ├── All People
│   ├── Speakers (filtered: type == "speaker")
│   └── Team Members (filtered: type == "team")
└── Companies
    ├── All Companies
    ├── Partners (filtered: tier in ["platinum", "gold", "silver"])
    └── Supporters (filtered: tier == "supporter")
```

---

## Common GROQ Patterns

### Fetch with Image

```groq
*[_type == "person"][0..10]{
  name,
  role,
  "image": {
    "src": image.image.asset->url,
    "alt": image.alt,
    "blur": image.image.asset->metadata.lqip
  }
}
```

### Filter and Sort

```groq
*[_type == "person" && type == "speaker"]
| order(order asc)
| order(name asc)
```

### Count Documents

```groq
count(*[_type == "person" && type == "speaker"])
```

### Featured Items Only

```groq
*[_type == "company" && featured == true]
```

---

## Migration Mapping

| JSON Source | Sanity Document | Count |
|-------------|-----------------|-------|
| `/content/settings.json` | siteSettings | 1 |
| `/content/pages/home.json` | homePage | 1 |
| `/data/ourSpeakersData` | person (speaker) | 54 |
| `/data/ourTeamData` | person (team) | 5 |
| `/data/ourPartnersData` | company (partner) | 5 |
| `/data/ourSupportersData` | company (supporter) | 43 |

**Total Documents:** 108

---

## API Endpoints

### Preview Mode
- Enable: `/api/preview?secret=YOUR_SECRET`
- Exit: `/api/exit-preview`

### Revalidation
- Manual: `/api/revalidate?secret=YOUR_SECRET`
- Webhook: Automatic on content change

---

## TypeScript Types Location

After running `npm run typegen` in studio:

**Generated types:** `/lib/sanity/types.ts`

**Manual interfaces:** `/lib/content/interfaces.ts`

**Content API:** `/lib/content/sanity.ts`

---

## Quick Commands

```bash
# Start Studio
cd studio && npm run dev

# Generate types
cd studio && npm run typegen

# Extract schema
cd studio && npm run schema-extract

# Run migration
npm run migrate:sanity

# Type check
npm run type-check

# Build project
npm run build
```

---

**Last Updated:** 2025-10-25
