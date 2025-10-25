# Content Source Feature Flag

This project supports toggling between **Sanity CMS** and **Static JSON** content sources using an environment variable.

## 🚀 Quick Start

### Use Sanity CMS (Default)
```bash
# In .env.local
NEXT_PUBLIC_USE_SANITY=true
```

### Use Static JSON Files
```bash
# In .env.local
NEXT_PUBLIC_USE_SANITY=false
```

## 📋 How It Works

The unified content layer (`/lib/content/index.ts`) automatically routes to the appropriate data source based on the `NEXT_PUBLIC_USE_SANITY` environment variable:

- **`true`**: Fetches content from Sanity CMS (requires Sanity setup)
- **`false`**: Uses static JSON files from `/content/` and `/data/` directories

## 🔄 Switching Between Sources

1. **Edit `.env.local`** and change the flag:
   ```bash
   NEXT_PUBLIC_USE_SANITY=false  # or true
   ```

2. **Restart the development server**:
   ```bash
   npm run dev
   ```

3. The application will automatically use the selected content source

## 📦 Content Layers

### Static JSON Layer (`/lib/content/static.ts`)
- ✅ Synchronous functions
- ✅ No API calls
- ✅ Fast builds
- ✅ Works in components
- ❌ Requires rebuild for content changes
- ❌ No live preview

### Sanity CMS Layer (`/lib/content/sanity.ts`)
- ✅ Real-time content updates
- ✅ Studio UI for editors
- ✅ Image optimization
- ✅ Draft preview mode
- ✅ Incremental Static Regeneration (ISR)
- ⚠️ Requires Sanity project setup
- ⚠️ API calls (cached with CDN)

## 🎯 Usage in Code

All components and pages import from the unified layer:

```typescript
// ✅ Correct - Import from unified layer
import { getHomePage, getSiteSettings } from '@/lib/content'

// ❌ Don't do this - Direct imports bypass feature flag
import { getHomePage } from '@/lib/content/static'
import { getHomePage } from '@/lib/content/sanity'
```

## 🏗️ Architecture

```
/lib/content/
├── index.ts         # 🎯 Unified layer (use this!)
├── static.ts        # 📄 Static JSON implementation
├── sanity.ts        # 🟢 Sanity CMS implementation
└── interfaces.ts    # 📘 Shared TypeScript types
```

## 🧪 Testing Both Modes

### Test Static Mode
```bash
# 1. Set flag to false
echo "NEXT_PUBLIC_USE_SANITY=false" >> .env.local

# 2. Restart dev server
npm run dev

# 3. Check console output:
# "📦 Content Source: Static JSON"
```

### Test Sanity Mode
```bash
# 1. Set flag to true
echo "NEXT_PUBLIC_USE_SANITY=true" >> .env.local

# 2. Restart dev server
npm run dev

# 3. Check console output:
# "📦 Content Source: Sanity CMS"
```

## ⚠️ Important Notes

### When Using Sanity Mode (NEXT_PUBLIC_USE_SANITY=true)

1. **Pages Must Use `getStaticProps`**
   - Sanity functions are async and require `getStaticProps`
   - Example: `/pages/index.tsx` already uses this pattern

2. **Components Receive Props**
   - Components like Header/Footer must receive settings as props
   - Cannot call async functions directly in components

3. **Requires Sanity Setup**
   - Must have valid Sanity project ID
   - Must have API token
   - Studio must be running at http://localhost:3333

### When Using Static Mode (NEXT_PUBLIC_USE_SANITY=false)

1. **Works Immediately**
   - No additional setup required
   - Components can call functions directly

2. **Content Updates Require Rebuild**
   - Edit files in `/content/` and `/data/`
   - Restart dev server to see changes

## 🚨 Troubleshooting

### "Content Source: undefined"
- Environment variable not set correctly
- Restart dev server after changing .env.local

### "Cannot read properties of undefined"
- Using Sanity mode without proper setup
- Switch to static mode or complete Sanity setup

### Images Not Loading (Sanity Mode)
- Images must be uploaded to Sanity Studio
- Run migration script: `node scripts/migrate.js`

### Changes Not Reflecting (Static Mode)
- Restart dev server after editing JSON files
- Clear `.next` cache: `rm -rf .next`

## 📖 See Also

- [SANITY_MIGRATION.md](./docs/SANITY_MIGRATION.md) - Full Sanity setup guide
- [CONTENT_LAYER.md](./docs/CONTENT_LAYER.md) - Content architecture
- [MIGRATION_QUICKSTART.md](./MIGRATION_QUICKSTART.md) - Quick migration guide
