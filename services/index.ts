import type {
  ApiResponse,
  SendMessageRequest,
  SendMessageResponse,
} from '@/types'

export const sendMessage = async (
  data: SendMessageRequest
): Promise<SendMessageResponse> => {
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

    const result: ApiResponse<SendMessageResponse> = await response.json()

    if (result.success) {
      return {
        success: true,
        message: result.message || 'Message sent successfully',
      }
    } else {
      return {
        success: false,
        error: result.error || 'Failed to send message',
      }
    }
  } catch (error) {
    console.error('Error sending message:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}
