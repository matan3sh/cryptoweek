import Head from 'next/head'
import type { SiteSettings } from '@/lib/content/interfaces'

interface SEOProps {
  settings: SiteSettings
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'event'
  noindex?: boolean
}

/**
 * SEO component for managing meta tags
 * Provides comprehensive SEO support including Open Graph and Twitter Cards
 *
 * @param settings - Site settings (passed from page)
 * @param title - Page title (defaults to site title)
 * @param description - Page description (defaults to site description)
 * @param image - Social share image URL (defaults to site OG image)
 * @param url - Canonical URL (defaults to site URL)
 * @param type - OpenGraph type (defaults to 'website')
 * @param noindex - Whether to prevent indexing (defaults to false)
 */
export const SEO: React.FC<SEOProps> = ({
  settings,
  title,
  description,
  image,
  url,
  type = 'website',
  noindex = false,
}) => {

  // Use provided values or fall back to site defaults
  const seoTitle = title || settings.title
  const seoDescription = description || settings.description
  const seoImage = image || settings.seo.ogImage.url
  const seoUrl = url || settings.seo.siteUrl
  const keywords = settings.keywords.join(', ')

  // Construct full image URL if relative
  const fullImageUrl = seoImage.startsWith('http')
    ? seoImage
    : `${settings.seo.siteUrl}${seoImage}`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content={String(settings.seo.ogImage.width)} />
      <meta property="og:image:height" content={String(settings.seo.ogImage.height)} />
      <meta property="og:image:alt" content={settings.seo.ogImage.alt} />
      <meta property="og:site_name" content={settings.seo.siteName} />
      <meta property="og:locale" content={settings.seo.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seoUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      {settings.seo.twitterHandle && (
        <meta name="twitter:site" content={settings.seo.twitterHandle} />
      )}

      {/* Schema.org for Google */}
      <meta itemProp="name" content={seoTitle} />
      <meta itemProp="description" content={seoDescription} />
      <meta itemProp="image" content={fullImageUrl} />

      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
    </Head>
  )
}
