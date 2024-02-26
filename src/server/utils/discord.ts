import type { RuntimeConfig } from 'nuxt/schema'

interface WebhookContent {
  title: string
  description: string
  color: number
}

export async function sendDiscordWebhookMessage(config: RuntimeConfig, content: WebhookContent) {
  await $fetch(`https://discordapp.com/api/webhooks/${config.discordId}/${config.discordToken}`, {
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
