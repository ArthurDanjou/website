/* eslint-disable node/prefer-global/process */
interface WebhookContent {
  title: string
  description: string
  color: number
}

export async function sendDiscordWebhookMessage(content: WebhookContent) {
  const id = process.env.NUXT_DISCORD_ID
  const token = process.env.NUXT_DISCORD_TOKEN
  await $fetch(`https://discordapp.com/api/webhooks/${id}/${token}`, {
    method: 'POST',
    body: {
      embeds: [
        {
          title: content.title,
          description: content.description,
          color: content.color,
          url: 'https://arthurdanjou.fr/talents',
          footer: {
            text: 'Powered by Nuxt',
          },
          timestamp: new Date().toISOString(),
        },
      ],
      username: 'ArtDanjRobot - Website',
    },
  })
}
