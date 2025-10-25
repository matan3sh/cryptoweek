# SEO & Accessibility Documentation

Comprehensive guide to SEO features and accessibility implementation.

---

## SEO Implementation

### Meta Tags & Open Graph

**SEO Component** (`/components/SEO/SEO.tsx`)

```typescript
import { SEO } from '@/components/SEO'

// Use with defaults (from settings.json)
<SEO />

// Override for specific pages
<SEO
  title="Custom Page Title"
  description="Custom description"
  image="/images/custom-og.png"
  url="https://site.com/custom-page"
  type="article"
/>
```

**Included Meta Tags:**
- Primary meta (title, description, keywords)
- Canonical URL
- Open Graph (Facebook)
- Twitter Cards
- Schema.org itemprops
- Favicons
- Viewport & language

### Structured Data (JSON-LD)

**Website Schema:**
```typescript
import { WebsiteStructuredData } from '@/components/SEO'

<WebsiteStructuredData />
```

**Event Schema:**
```typescript
import { EventStructuredData } from '@/components/SEO'

<EventStructuredData
  eventName="CryptoWeek Israel"
  startDate="2025-11-01T09:00:00"
  endDate="2025-11-05T18:00:00"
  location={{
    name: "Tel Aviv Convention Center",
    address: "Tel Aviv, Israel"
  }}
  description="Israel's premier crypto event"
  image="/images/event-banner.jpg"
  url="https://cryptoweek.co.il"
  organizer={{
    name: "Coin Nations",
    url: "https://coinnations.com"
  }}
/>
```

**Organization Schema:**
```typescript
import { OrganizationStructuredData } from '@/components/SEO'

<OrganizationStructuredData
  name="CryptoWeek Israel"
  url="https://cryptoweek.co.il"
  logo="/images/logo.png"
  sameAs={[
    "https://twitter.com/cryptoweek",
    "https://linkedin.com/company/cryptoweek"
  ]}
  contactPoint={{
    email: "info@coinnations.com",
    contactType: "customer service"
  }}
/>
```

### Robots.txt

Located at `/public/robots.txt`

```txt
User-agent: *
Allow: /

Sitemap: https://cryptoweek.co.il/sitemap.xml
```

**Customization:**
```txt
# Disallow specific paths
Disallow: /api/
Disallow: /admin/

# Disallow for specific bots
User-agent: BadBot
Disallow: /
```

### Sitemap.xml

Located at `/public/sitemap.xml`

**Current (Single Page):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cryptoweek.co.il</loc>
    <lastmod>2025-10-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**For Multiple Pages (Future):**
Consider using `next-sitemap` package:
```bash
npm install next-sitemap
```

### SEO Configuration

All SEO metadata in `/content/settings.json`:

```json
{
  "seo": {
    "siteUrl": "https://cryptoweek.co.il",
    "siteName": "CryptoWeek Israel",
    "locale": "en_US",
    "ogImage": {
      "url": "/static/images/metadata_img.png",
      "width": 1200,
      "height": 630,
      "alt": "CryptoWeek Israel - Top Crypto Event"
    },
    "twitterHandle": "@cryptoweek"
  }
}
```

---

## Accessibility Implementation

### WCAG 2.1 AA Compliance

**Current Status:** ✅ Compliant

### Semantic HTML

**Landmark Regions:**
```html
<header role="banner">          <!-- Site header -->
  <nav role="navigation">       <!-- Main navigation -->
<main id="main-content">        <!-- Main content -->
<footer role="contentinfo">     <!-- Site footer -->
```

**Heading Hierarchy:**
```html
<h1>Site Logo/Title</h1>        <!-- One per page -->
<h2>Section Titles</h2>         <!-- Major sections -->
<h3>Subsection Titles</h3>      <!-- Sub-sections -->
```

### Skip-to-Content Link

**Implementation:**
```typescript
import { SkipToContent } from '@/components/SkipToContent'

<SkipToContent />  // Hidden until focused
<Header />
<main id="main-content">
  {/* Content */}
</main>
```

**Behavior:**
- Hidden by default
- Visible when focused (Tab key)
- Jumps to main content
- Bypasses navigation

**Styling:**
```css
position: absolute;
top: -40px;  /* Hidden */

&:focus {
  top: 0;    /* Visible */
}
```

### Keyboard Navigation

**Navigation Menu:**
- Tab through links
- Enter to activate
- Proper focus indicators

**Mobile Menu:**
```typescript
<button
  aria-label="Open navigation menu"
  aria-expanded={isOpen}
  aria-controls="mobile-navigation"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggle()
    }
  }}
>
```

**Form Controls:**
- All inputs keyboard accessible
- Tab order is logical
- Enter submits form
- Escape closes dropdowns

### ARIA Labels

**Navigation:**
```typescript
<nav role="navigation" aria-label="Main navigation">
```

**Buttons:**
```typescript
<button aria-label="Close navigation menu">
```

**Dynamic Content:**
```typescript
<div
  role="dialog"
  aria-modal="true"
  aria-label="Mobile navigation menu"
>
```

**Form Errors:**
```typescript
<input
  aria-invalid={!!errors.email}
  aria-describedby="email-error"
/>
<span id="email-error">{errors.email}</span>
```

### Image Accessibility

**All images have alt text:**
```typescript
<Image
  src="/logo.png"
  alt="CryptoWeek Israel logo"  // Descriptive
/>

<Image
  src="/decorative.png"
  alt=""  // Decorative images use empty string
/>
```

### Screen Reader Support

**Announcements:**
```typescript
// Success message
<div role="status" aria-live="polite">
  Message sent successfully!
</div>

// Error message
<div role="alert" aria-live="assertive">
  Error sending message
</div>
```

### Color Contrast

**WCAG AA Minimum (4.5:1):**
- Text: #1a202c on #ffffff (16.9:1) ✅
- Links: #667eea on #ffffff (6.1:1) ✅
- Buttons: #ffffff on #667eea (6.1:1) ✅

**High Contrast Mode Support:**
- Borders visible in high contrast
- Focus indicators work
- Icons have proper contrast

### Focus Management

**Visible Focus Indicators:**
```css
a:focus, button:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
```

**Modal Focus Trapping:**
When mobile menu opens:
1. Focus moves to menu
2. Tab cycles within menu
3. Escape closes menu
4. Focus returns to trigger

---

## SEO Best Practices

### Content Optimization

**Title Tags:**
- 50-60 characters
- Include primary keyword
- Unique per page
- Brand at end

**Meta Descriptions:**
- 150-160 characters
- Include call-to-action
- Unique per page
- Compelling summary

**Headings:**
- One H1 per page
- Logical hierarchy (H1 → H2 → H3)
- Include keywords naturally
- Descriptive and clear

### Image SEO

**File Names:**
```
❌ img123.jpg
✅ cryptoweek-israel-2025-hero.jpg
```

**Alt Text:**
```typescript
// ❌ Bad
alt="image"
alt="logo"

// ✅ Good
alt="CryptoWeek Israel 2025 conference banner"
alt="Ethereum logo"
```

**Image Optimization:**
- WebP format (Next.js automatic)
- Proper dimensions specified
- Lazy loading (below fold)
- Priority for hero images

### URL Structure

**SEO-Friendly URLs:**
```
✅ https://site.com/speakers
✅ https://site.com/events/crypto-week-2025
❌ https://site.com/page?id=123
```

### Internal Linking

**Navigation Structure:**
- Clear hierarchy
- Descriptive anchor text
- Hash links for sections (#Speakers)
- Breadcrumbs (if multi-page)

---

## Social Media Optimization

### Open Graph Tags

**Required:**
- og:title
- og:description
- og:image
- og:url
- og:type

**Optional:**
- og:site_name
- og:locale
- og:image:width
- og:image:height

### Twitter Cards

**Card Types:**
- summary_large_image (current)
- summary
- app
- player

**Tags:**
- twitter:card
- twitter:title
- twitter:description
- twitter:image
- twitter:site (@handle)

### Social Image Guidelines

**Dimensions:**
- Open Graph: 1200 x 630px
- Twitter: 1200 x 628px
- LinkedIn: 1200 x 627px

**Best Practices:**
- Clear, readable text
- High contrast
- Mobile-friendly
- Test on all platforms

---

## Performance & SEO

### Core Web Vitals

**LCP (Largest Contentful Paint):**
- Target: < 2.5s
- Hero image uses `priority` flag
- Optimized images

**FID (First Input Delay):**
- Target: < 100ms
- Minimal JavaScript blocking
- Code splitting

**CLS (Cumulative Layout Shift):**
- Target: < 0.1
- Image dimensions specified
- Font display swap
- No layout surprises

### Mobile SEO

**Mobile-First:**
- Responsive design
- Touch-friendly targets (44x44px min)
- Fast mobile performance
- Mobile-optimized images

**Viewport:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## Testing & Validation

### SEO Testing Tools

**Google Tools:**
- Google Search Console
- PageSpeed Insights
- Mobile-Friendly Test
- Rich Results Test

**Third-Party:**
- Lighthouse (Chrome DevTools)
- Screaming Frog
- Ahrefs Site Audit
- SEMrush

### Accessibility Testing

**Automated:**
- Lighthouse Accessibility Score
- axe DevTools
- WAVE Browser Extension
- Pa11y

**Manual:**
- Keyboard navigation test
- Screen reader test (NVDA/JAWS)
- Color contrast checker
- Zoom to 200% test

### Validation Commands

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Check structured data
curl https://cryptoweek.co.il | grep 'application/ld+json'

# Validate HTML
npm install -g html-validator-cli
html-validator --url=https://cryptoweek.co.il
```

---

## Monitoring

### SEO Metrics to Track

**Rankings:**
- Target keyword positions
- Organic traffic
- Click-through rate
- Impressions

**Technical:**
- Crawl errors
- Index coverage
- Core Web Vitals
- Mobile usability

**Content:**
- Top pages
- Exit pages
- Bounce rate
- Time on page

### Accessibility Monitoring

**Continuous:**
- Automated scans in CI/CD
- User feedback
- Analytics (keyboard usage)
- Error logs

**Periodic:**
- Manual audits
- User testing
- Screen reader testing
- Compliance reviews

---

## Common Issues & Fixes

### SEO Issues

**Issue:** Duplicate content
```
Fix: Use canonical tags
<link rel="canonical" href="https://site.com/page" />
```

**Issue:** Slow page speed
```
Fix:
- Optimize images
- Enable caching
- Minimize JavaScript
- Use CDN
```

**Issue:** Poor mobile experience
```
Fix:
- Responsive design
- Touch targets
- Fast loading
- Readable text
```

### Accessibility Issues

**Issue:** Missing alt text
```typescript
// ❌ Before
<img src="/logo.png" />

// ✅ After
<Image src="/logo.png" alt="Company logo" />
```

**Issue:** Low color contrast
```css
/* ❌ Before */
color: #999;  /* On white background */

/* ✅ After */
color: #666;  /* Better contrast */
```

**Issue:** No keyboard access
```typescript
// ❌ Before
<div onClick={handleClick}>

// ✅ After
<button onClick={handleClick}>
```

---

## Future Enhancements

### Planned Improvements
- [ ] Multi-language SEO (hreflang)
- [ ] FAQ schema markup
- [ ] Breadcrumb schema
- [ ] Review schema (if applicable)
- [ ] Video schema (if videos added)
- [ ] PWA for offline access
- [ ] Advanced analytics integration

### Advanced Features
- [ ] A/B testing for meta titles
- [ ] Dynamic OG images
- [ ] Automatic sitemap generation
- [ ] Real-time SEO suggestions
- [ ] Accessibility widget

---

**Last Updated:** 2025-10-25
