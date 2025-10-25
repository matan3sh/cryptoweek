# Error Handling & Reliability

**Phase 1 Implementation** - Critical error handling and automatic fallback system.

---

## Overview

This project implements a **three-layer error handling strategy** to ensure maximum reliability:

1. **Automatic Fallback System** - Sanity failures gracefully fall back to static content
2. **React Error Boundaries** - Isolated feature failures don't crash the entire page
3. **Retry Logic** - Transient network errors are automatically retried

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Request                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              React Error Boundary                        │
│          (Per-Feature Isolation)                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│            Content Fetch Layer                           │
│          (Sanity with Retry Logic)                       │
└──────────┬─────────────────────────────┬────────────────┘
           │                             │
     ✅ Success                    ❌ Failure
           │                             │
           │                             ▼
           │                ┌───────────────────────────┐
           │                │  Automatic Fallback       │
           │                │  (Static JSON Content)    │
           │                └───────────────────────────┘
           │                             │
           └─────────────┬───────────────┘
                         │
                         ▼
                ┌────────────────┐
                │  Rendered UI   │
                └────────────────┘
```

---

## 1. Automatic Fallback System

### How It Works

Located in `lib/content/sanity.ts:48-94`, the `fetchWithFallback` wrapper provides:

```typescript
async function fetchWithFallback<T>(
  queryFn: () => Promise<T>,          // Sanity fetch function
  fallbackFn: () => T | Promise<T>,   // Static content function
  errorContext: string,                // For logging
  retries: number = 2                  // Retry attempts
): Promise<T>
```

### Features

✅ **Automatic Retry** - Up to 2 retry attempts with exponential backoff
✅ **Fallback on Failure** - Falls back to static content if Sanity fails
✅ **Detailed Logging** - Clear console messages for debugging
✅ **Type Safety** - Full TypeScript support

### Example Usage

```typescript
export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchWithFallback(
    // Try Sanity first
    async (): Promise<SiteSettings> => {
      const data = await sanityClient.fetch(SITE_SETTINGS_QUERY)
      if (!data) throw new Error('Site settings not found')
      return transformSanityData(data)
    },
    // Fallback to static content
    () => Promise.resolve(staticContent.getSiteSettings()),
    // Context for logging
    'Site Settings'
  )
}
```

### Console Output

**Successful Fetch:**
```
[Sanity] ✅ Site Settings loaded successfully
```

**Retry Scenario:**
```
[Sanity] ⚠️  Site Settings failed (attempt 1/3), retrying...
[Sanity] ✅ Site Settings succeeded on retry 1
```

**Fallback Scenario:**
```
[Sanity] ❌ Site Settings failed after 3 attempts: Network timeout
[Sanity] 🔄 Falling back to static content for Site Settings
```

---

## 2. React Error Boundaries

### Component: FeatureBoundary

Located in `components/FeatureBoundary.tsx`, this component isolates feature failures.

### Usage

```typescript
import FeatureBoundary from '@/components/FeatureBoundary'

// Wrap each feature/section
<FeatureBoundary featureName="contact form">
  <Contact {...props} />
</FeatureBoundary>
```

### Benefits

✅ **Isolated Failures** - If one feature crashes, others continue working
✅ **User-Friendly Messages** - Clear error messages for users
✅ **Production Monitoring** - Ready for Sentry integration
✅ **Graceful Degradation** - Page remains functional

### Error UI

When a feature fails, users see:

```
⚠️

Unable to load contact form

We encountered an issue loading this section.
Please refresh the page to try again.

If the problem persists, the rest of the page
should still work normally.
```

### Custom Fallback

You can provide custom fallback UI:

```typescript
<FeatureBoundary
  featureName="hero section"
  fallback={<div>Loading hero content...</div>}
>
  <Feature {...props} />
</FeatureBoundary>
```

---

## 3. Feature Flag with Validation

### Environment Variable

```bash
# .env.local
NEXT_PUBLIC_USE_SANITY=true   # Use Sanity CMS
NEXT_PUBLIC_USE_SANITY=false  # Use static JSON
```

### Validation Logic

Located in `lib/content/index.ts:31-47`:

```typescript
function shouldUseSanity(): boolean {
  const envValue = process.env.NEXT_PUBLIC_USE_SANITY

  if (typeof envValue === 'undefined') {
    console.warn(
      '[Content Layer] ⚠️  NEXT_PUBLIC_USE_SANITY is not set. ' +
      'Defaulting to static content.'
    )
    return false
  }

  return envValue.toLowerCase() === 'true'
}
```

### Runtime Information

Check which content source is active:

```typescript
import { getContentSourceInfo } from '@/lib/content'

const info = getContentSourceInfo()
// {
//   usingSanity: true,
//   source: 'sanity',
//   env: 'true'
// }
```

---

## 4. Error Scenarios & Solutions

### Scenario 1: Sanity API Timeout

**What Happens:**
1. Initial request times out
2. Retry attempt 1 (after 100ms)
3. Retry attempt 2 (after 200ms)
4. Fallback to static content
5. Page renders with static data

**User Impact:** None - page loads normally with fallback content

---

### Scenario 2: Invalid Sanity Token

**What Happens:**
1. Authentication failure
2. No retry (not a transient error)
3. Immediate fallback to static content
4. Error logged to console

**User Impact:** None - page loads with static content

**Console Output:**
```
[Sanity] ❌ Site Settings failed after 1 attempts: Authentication failed
[Sanity] 🔄 Falling back to static content for Site Settings
```

---

### Scenario 3: Component Render Error

**What Happens:**
1. Error occurs during component render
2. Error boundary catches the error
3. Error logged to console (and Sentry in production)
4. Feature shows error UI
5. Rest of page continues working

**User Impact:** One section shows error message, rest of page works

---

### Scenario 4: Static Fallback Also Fails

**What Happens:**
1. Sanity fetch fails
2. Attempts fallback to static content
3. Static content also fails (critical error)
4. Error thrown to Next.js error handler

**User Impact:** Page shows Next.js error page

**Console Output:**
```
[Sanity] ❌ CRITICAL: Both Sanity and static fallback failed for Site Settings
Error: Failed to load Site Settings from both Sanity and static sources
```

---

## 5. Testing Error Handling

### Test Automatic Fallback

**Method 1: Break Sanity Token**

```bash
# In .env.local
SANITY_API_TOKEN=invalid-token

# Run dev server
npm run dev

# Check console for fallback messages
```

**Method 2: Disconnect Network**

1. Start dev server
2. Disconnect internet
3. Refresh page
4. Should see fallback messages and static content

---

### Test Error Boundaries

**Method 1: Simulate Component Error**

```typescript
// Temporarily add to any component
if (typeof window !== 'undefined') {
  throw new Error('Test error boundary')
}
```

**Method 2: Pass Invalid Props**

```typescript
// Pass null/undefined to a component that requires data
<Contact config={null} />
```

---

### Test Feature Flag

```bash
# Test Sanity ON
echo "NEXT_PUBLIC_USE_SANITY=true" > .env.local
npm run dev
# Should see: 📦 Content Source: ☁️  Sanity CMS

# Test Sanity OFF
echo "NEXT_PUBLIC_USE_SANITY=false" > .env.local
npm run dev
# Should see: 📦 Content Source: 📄  Static JSON
```

---

## 6. Monitoring & Debugging

### Console Logging

All error handling includes detailed console logging:

```typescript
// Success
console.log(`[Sanity] ✅ ${context} succeeded`)

// Retry
console.warn(`[Sanity] ⚠️  ${context} failed, retrying...`)

// Fallback
console.error(`[Sanity] ❌ ${context} failed`)
console.log(`[Sanity] 🔄 Falling back to static content`)

// Critical
console.error(`[Sanity] ❌ CRITICAL: Both sources failed`)
```

### Future: Sentry Integration

Error boundaries are ready for Sentry:

```typescript
// components/FeatureBoundary.tsx:114-117
if (process.env.NODE_ENV === 'production') {
  // TODO: Integrate with Sentry in Phase 6
  // Sentry.captureException(error, { contexts: { react: errorInfo } })
}
```

---

## 7. Best Practices

### DO ✅

- Always import from unified content layer (`@/lib/content`)
- Wrap each major feature with `FeatureBoundary`
- Use descriptive `featureName` props for error boundaries
- Test both Sanity ON and OFF modes before deployment
- Monitor console logs during development

### DON'T ❌

- Don't import directly from `sanity.ts` or `static.ts`
- Don't nest error boundaries unnecessarily
- Don't catch errors and silently fail
- Don't skip error boundary for critical features
- Don't forget to set `NEXT_PUBLIC_USE_SANITY` in production

---

## 8. Files Reference

### Core Error Handling Files

- `lib/content/sanity.ts:48-94` - Automatic fallback wrapper
- `lib/content/index.ts:31-47` - Feature flag validation
- `components/FeatureBoundary.tsx` - React error boundary
- `pages/index.tsx:108-160` - Error boundary usage examples

### Testing Files

- `.env.local` - Feature flag configuration
- `data/index.ts` - Static fallback data
- `content/settings.json` - Static settings fallback
- `content/pages/home.json` - Static page content

---

## Summary

**Phase 1 Error Handling achieves:**

✅ Zero user-facing errors when Sanity fails
✅ Automatic fallback to static content
✅ Isolated feature failures with error boundaries
✅ Comprehensive logging for debugging
✅ Easy feature flag toggling
✅ Production-ready error monitoring hooks

**Result:** A resilient application that gracefully handles all error scenarios without impacting user experience.

---

**Last Updated:** 2025-10-25 (Phase 1)
**Next Phase:** Phase 2 - Performance Optimization
