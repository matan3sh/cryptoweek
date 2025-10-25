# Content Directory

This directory contains all the content for the CryptoWeek website in a structured, type-safe format.

## Structure

```
content/
├── settings.json           # Site-wide settings and configuration
├── pages/
│   └── home.json          # Home page content structure
├── collections/
│   ├── speakers.json      # Speaker data (managed via content layer)
│   ├── team.json          # Team member data (managed via content layer)
│   ├── partners.json      # Partner company data (managed via content layer)
│   └── supporters.json    # Supporter company data (managed via content layer)
└── README.md              # This file
```

## Content Management

### Current State (Phase 2)
Content is accessed through a type-safe content layer (`/lib/content/static.ts`) that currently reads from the existing `/data/index.ts` file. This provides:
- ✅ Type safety with TypeScript interfaces
- ✅ Centralized content access
- ✅ Easy testing and mocking
- ✅ Preparation for future CMS integration

### Future State (After Sanity Migration)
The content layer will be updated to fetch from Sanity CMS using GROQ queries. The interfaces remain the same, making migration seamless.

## Type Definitions

All content types are defined in `/lib/content/interfaces.ts`. These interfaces are designed to map directly to future Sanity schema types.

### Key Interfaces:
- `SiteSettings` - Site-wide configuration
- `HomePage` - Complete home page structure
- `Person` - Speakers and team members
- `Company` - Partners and supporters
- `HeroSection` - Hero section configuration
- `ContentSection` - Text content sections
- `ImageAsset` - Image metadata

## Usage

### Accessing Content

```typescript
import {
  getSiteSettings,
  getHomePage,
  getAllSpeakers,
  getAllTeamMembers
} from '@/lib/content/static'

// Get site settings
const settings = getSiteSettings()

// Get home page content
const homePage = getHomePage()

// Get all speakers
const speakers = getAllSpeakers()
```

### Type Safety

All content access is fully typed:

```typescript
import type { SiteSettings, HomePage, Person } from '@/lib/content/interfaces'

const settings: SiteSettings = getSiteSettings()
const speakers: Person[] = getAllSpeakers()
```

## Benefits

1. **Type Safety**: All content is strongly typed
2. **Centralized**: Single source of truth for all content
3. **Testable**: Easy to mock content for testing
4. **Scalable**: Ready for CMS integration
5. **Maintainable**: Clear separation of concerns

## Migration to Sanity CMS

When ready to migrate to Sanity:

1. The interfaces in `/lib/content/interfaces.ts` will be converted to Sanity schemas
2. The content access layer will be updated to use GROQ queries
3. Component code remains unchanged (same interfaces)
4. Content is managed through Sanity Studio instead of JSON files

See `/docs/SANITY_MIGRATION.md` (to be created in Phase 5) for detailed migration instructions.

## Editing Content

### During Development (Current)
Content is currently managed in `/data/index.ts` and accessed through the content layer.

### After Sanity Setup (Future)
Content will be edited through the Sanity Studio interface at `http://localhost:3333` (or your deployed studio URL).

## File Formats

All JSON files follow strict TypeScript interface definitions. Invalid JSON will cause type errors during development.

### Example: settings.json

```json
{
  "title": "Site Title",
  "description": "Site description",
  "keywords": ["keyword1", "keyword2"],
  "logo": {
    "text": "Logo Text"
  },
  "footer": {
    "copyrightText": "Copyright text",
    "year": 2021,
    "email": "contact@example.com"
  }
}
```

## Validation

TypeScript interfaces provide compile-time validation. If content doesn't match the interface, you'll get immediate type errors in your IDE.

## Best Practices

1. **Always use the content layer** - Don't import from `/data/index.ts` directly
2. **Keep interfaces updated** - Update `/lib/content/interfaces.ts` when adding new content types
3. **Use semantic types** - Use `theme: 'light' | 'dark'` instead of raw color values
4. **Provide alt text** - Always include alt text for images
5. **Keep content DRY** - Avoid duplicating content across files

## Support

For questions about content structure, see:
- `/lib/content/interfaces.ts` - Type definitions
- `/lib/content/static.ts` - Content access layer
- `/docs/CLAUDE.md` - Implementation documentation
