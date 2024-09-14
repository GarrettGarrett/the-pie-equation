'use server'

import { revalidatePath } from 'next/cache'

export async function submitFeedback(formData: FormData) {
  const feedback = formData.get('feedback') as string

  if (feedback.length < 5) {
    return { error: 'Feedback must be at least 5 characters long.' }
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    console.error('Discord webhook URL is not configured')
    return { error: 'Server configuration error' }
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `New feedback received: ${feedback}`,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send feedback to Discord')
    }

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error sending feedback to Discord:', error)
    return { error: 'Failed to submit feedback' }
  }
}