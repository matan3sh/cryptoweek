import type { SendMessageRequest, ApiResponse } from '@/types'

/**
 * Sends a contact form message to the API
 * @param data - Contact form data
 * @returns API response with success status
 * @throws Error if the request fails
 */
export const sendMessage = async (
  data: SendMessageRequest
): Promise<ApiResponse> => {
  try {
    const response = await fetch('/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error sending message:', error)
    throw error // Re-throw to allow caller to handle
  }
}
