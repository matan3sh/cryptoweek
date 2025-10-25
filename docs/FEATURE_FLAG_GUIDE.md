# Content Source Feature Flag

**Phase 1 Enhanced** - Now with automatic fallback, validation, and error handling.

This project supports toggling between **Sanity CMS** and **Static JSON** content sources using an environment variable, with automatic fallback if Sanity fails.

## 🚀 Quick Start

### Use Sanity CMS with Automatic Fallback (Recommended)
```bash
# In .env.local
NEXT_PUBLIC_USE_SANITY=true
```
✅ Fetches from Sanity CMS
✅ Automatically falls back to static content if Sanity fails
✅ Retry logic for transient errors

### Use Static JSON Files Only
```bash
# In .env.local
NEXT_PUBLIC_USE_SANITY=false
```
✅ Fast builds, no API calls
✅ Works offline
✅ No Sanity setup required

## 📋 How It Works

The unified content layer (`/lib/content/index.ts`) automatically routes to the appropriate data source based on the `NEXT_PUBLIC_USE_SANITY` environment variable:

- **`true`**: Fetches content from Sanity CMS with automatic fallback to static content
- **`false`**: Uses static JSON files from `/content/` and `/data/` directories
- **`undefined`**: Defaults to static content with a warning

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

## 🛡️ Automatic Fallback System (Phase 1)

### How Fallback Works

When `NEXT_PUBLIC_USE_SANITY=true`, the system:

1. **Tries Sanity First** - Fetches content from Sanity CMS
2. **Retries on Failure** - Up to 2 retry attempts with exponential backoff
3. **Falls Back Automatically** - If all retries fail, uses static content
4. **Logs Everything** - Clear console messages for debugging

### Example Console Output

**Successful Fetch:**
```
📦 Content Source: ☁️  Sanity CMS
[Sanity] ✅ Site Settings loaded successfully
```

**Fallback Scenario:**
```
📦 Content Source: ☁️  Sanity CMS
[Sanity] ⚠️  Site Settings failed (attempt 1/3), retrying...
[Sanity] ⚠️  Site Settings failed (attempt 2/3), retrying...
[Sanity] ❌ Site Settings failed after 3 attempts: Network timeout
[Sanity] 🔄 Falling back to static content for Site Settings
```

### Testing Fallback

**Method 1: Break the Sanity Token**
```bash
# Temporarily use invalid token in .env.local
SANITY_API_TOKEN=invalid-token-for-testing

# Restart dev server
npm run dev

# Should see fallback messages in console
```

**Method 2: Disconnect Network**
1. Start dev server with Sanity enabled
2. Disconnect internet
3. Refresh page
4. Should load with static content

## 🎯 Runtime Information

### Check Current Content Source

```typescript
import { getContentSourceInfo } from '@/lib/content'

const info = getContentSourceInfo()
console.log(info)
// {
//   usingSanity: true,
//   source: 'sanity',
//   env: 'true'
// }
```

## 📖 See Also

- **[ERROR_HANDLING.md](./ERROR_HANDLING.md)** - ⭐ NEW: Complete error handling guide
- [SANITY_MIGRATION.md](./SANITY_MIGRATION.md) - Full Sanity setup guide
- [CONTENT_LAYER.md](./CONTENT_LAYER.md) - Content architecture
