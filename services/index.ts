export interface SendMessageRequest {
  name: string
  email: string
  company: string
  message: string
}

export const sendMessage = async (data: SendMessageRequest) => {
  const response = await fetch('/api/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}
