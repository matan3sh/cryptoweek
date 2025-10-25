# CryptoWeek - Documentation

**Modern Next.js 15 Event Website**

This folder contains comprehensive documentation for the CryptoWeek project. The application is built with Next.js 15 (Pages Router), TypeScript, and is optimized for performance, accessibility, and future CMS integration.

---

## 📚 Documentation Structure

### Core Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and design decisions
- **[CONTENT_LAYER.md](./CONTENT_LAYER.md)** - Content management and data flow
- **[ERROR_HANDLING.md](./ERROR_HANDLING.md)** - ⭐ NEW: Error handling & fallback system
- **[FEATURE_FLAG_GUIDE.md](./FEATURE_FLAG_GUIDE.md)** - Toggle between Sanity and static content
- **[SEO.md](./SEO.md)** - SEO features and accessibility guidelines
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development workflow and best practices

---

## 🚀 Quick Start

### Tech Stack
- **Framework:** Next.js 15 (Pages Router)
- **Language:** TypeScript 5.0 (ES2022)
- **Styling:** Styled Components 6.1
- **Animations:** Framer Motion 12.23
- **UI:** Material-UI 6.0 Icons

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Production build
npm run build

# Start production server
npm start
```

---

## 📖 Where to Start

### For Developers
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system structure
2. Review [DEVELOPMENT.md](./DEVELOPMENT.md) for workflow and best practices
3. Check [CONTENT_LAYER.md](./CONTENT_LAYER.md) to understand content management

### For Content Editors
1. See [CONTENT_LAYER.md](./CONTENT_LAYER.md) for content editing guidelines
2. Content files are located in `/content` directory
3. All content is in JSON format with type validation

### For SEO/Marketing
1. Review [SEO.md](./SEO.md) for SEO features and capabilities
2. Check structured data implementation
3. Understand accessibility features

### For LLMs/AI Assistants
1. Start with [ARCHITECTURE.md](./ARCHITECTURE.md) for system overview
2. Reference [ERROR_HANDLING.md](./ERROR_HANDLING.md) for reliability patterns
3. Check [CONTENT_LAYER.md](./CONTENT_LAYER.md) for data structures
4. Review [FEATURE_FLAG_GUIDE.md](./FEATURE_FLAG_GUIDE.md) for content switching

---

## 🎯 Project Status

### ✅ Completed: Phase 1 - Critical Reliability & Error Handling (2025-10-25)

**New Features:**
- ✅ Automatic fallback system (Sanity → Static content)
- ✅ Retry logic with exponential backoff (up to 2 retries)
- ✅ React error boundaries for isolated feature failures
- ✅ Enhanced feature flag with validation
- ✅ Comprehensive error logging
- ✅ Static content layer for fallback

**Files Added/Updated:**
- `lib/content/sanity.ts` - fetchWithFallback wrapper
- `lib/content/index.ts` - Enhanced feature flag validation
- `components/FeatureBoundary.tsx` - New error boundary component
- `data/index.ts` - Static fallback data
- `content/settings.json` - Added contactSection

**Documentation:**
- `ERROR_HANDLING.md` - Complete error handling guide
- `FEATURE_FLAG_GUIDE.md` - Updated with fallback system

### Planned Future Phases
- 📋 **Phase 2:** Performance Optimization (React.memo, code splitting)
- 📋 **Phase 3:** Type Safety & Sanity TypeGen
- 📋 **Phase 4:** Styling & Theme Consistency
- 📋 **Phase 5:** Sanity Architecture Improvements
- 📋 **Phase 6:** Accessibility & Production Hardening

---

## 🔗 Quick Links

### Key Directories
```
/content        → Site content (JSON files)
/components     → React components
/lib/content    → Content access layer
/pages          → Next.js pages
/types          → TypeScript definitions
```

### Important Files
- `/content/settings.json` - Site-wide configuration
- `/content/pages/home.json` - Home page content
- `/lib/content/interfaces.ts` - Type definitions
- `/lib/content/static.ts` - Content access API

---

## 📝 Documentation Standards

### This Documentation Follows
- **Clear Structure:** Organized by topic, not chronology
- **Practical Examples:** Code samples for common tasks
- **Type Safety:** All interfaces and types documented
- **Best Practices:** Recommended patterns and anti-patterns
- **Future-Ready:** Prepared for CMS migration

---

## 🤝 Contributing

When updating documentation:
1. Keep it concise and focused
2. Include code examples
3. Update the relevant doc file (not just CLAUDE.md)
4. Use clear headings and structure
5. Test all code samples

---

## 📞 Support

- **Technical Issues:** Check [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Architecture Questions:** See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Content Updates:** Review [CONTENT_LAYER.md](./CONTENT_LAYER.md)
- **SEO/Accessibility:** Consult [SEO.md](./SEO.md)

---

**Last Updated:** 2025-10-25 (Phase 1 Complete)
