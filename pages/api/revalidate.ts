/**
 * On-Demand Revalidation API Route
 *
 * This endpoint allows Sanity webhooks to trigger instant page revalidation
 * when content is updated, instead of waiting for the ISR revalidation period.
 *
 * Usage: POST to /api/revalidate?secret=YOUR_SECRET
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation
 */

import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  revalidated: boolean
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { message: string }>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed. Use POST.' })
  }

  // Check for secret to confirm this is a valid request
  const secret = req.query.secret as string

  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // Get the paths to revalidate from the request body (optional)
    const paths = req.body?.paths || ['/']

    // Revalidate each path
    const revalidationPromises = Array.isArray(paths)
      ? paths.map((path: string) => res.revalidate(path))
      : [res.revalidate(paths)]

    await Promise.all(revalidationPromises)

    console.log(`[Revalidate] Successfully revalidated: ${Array.isArray(paths) ? paths.join(', ') : paths}`)

    return res.json({
      revalidated: true,
      message: `Successfully revalidated ${Array.isArray(paths) ? paths.length : 1} path(s)`
    })
  } catch (err) {
    console.error('[Revalidate] Error:', err)
    return res.status(500).json({
      message: 'Error revalidating',
      revalidated: false
    })
  }
}
