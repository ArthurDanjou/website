import { z } from 'zod'

const SuggestionValidator = z.object({
  content: z.string(),
}).parse

export default defineEventHandler(async (event) => {
  const { content } = await readValidatedBody(event, SuggestionValidator)
  const { user } = await requireUserSession(event)
  const config = useRuntimeConfig(event)

  await sendDiscordWebhookMessage(config, {
    title: 'New suggestion ✨',
    description: `**${user.username}** as requested **${content}** for the talents page.`,
    color: 15237114,
  })

  return await usePrisma().suggestion.upsert({
    where: {
      email: user.email,
    },
    update: {
      content,
    },
    create: {
      email: user.email,
      content,
    },
  })
})
