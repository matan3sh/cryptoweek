/**
 * Sanity Client Configuration
 *
 * Configures the Sanity client for use with Next.js Pages Router
 * Supports both client-side and server-side usage
 */

import {createClient} from 'next-sanity'

// Configuration
export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-25',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for faster reads
}

// Create the client
export const sanityClient = createClient(config)

// Create a client with token for server-side operations (preview, ISR, writes)
export const sanityClientWithToken = createClient({
  ...config,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Never use CDN when using token
  perspective: 'published', // Only fetch published documents by default
})

// Preview client (for draft content)
export const previewClient = createClient({
  ...config,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  perspective: 'previewDrafts', // Fetch draft content
})

/**
 * Get the appropriate client based on preview mode
 * @param preview - Whether to use preview mode
 * @returns Sanity client instance
 */
export function getClient(preview = false) {
  return preview ? previewClient : sanityClient
}

/**
 * Helper to check if we're in preview mode
 * @param req - Next.js request object
 * @returns boolean
 */
export function isPreviewMode(req?: { preview?: boolean }): boolean {
  return req?.preview || false
}
