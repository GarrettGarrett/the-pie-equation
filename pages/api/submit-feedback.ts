import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { feedback } = req.body;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(500).json({ error: 'Discord webhook URL is not configured' });
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
      });

      if (response.ok) {
        res.status(200).json({ message: 'Feedback submitted successfully' });
      } else {
        throw new Error('Failed to send feedback to Discord');
      }
    } catch (error) {
      console.error('Error sending feedback to Discord:', error);
      res.status(500).json({ error: 'Failed to submit feedback' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}