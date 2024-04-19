import {z} from 'zod'

const SuggestionValidator = z.object({
  content: z.string(),
}).parse

export default defineEventHandler(async (event) => {
  const { content } = await readValidatedBody(event, SuggestionValidator)
  const { user } = await requireUserSession(event)
  const config = useRuntimeConfig(event)

  await sendDiscordWebhookMessage(config, {
    title: 'New suggestion ✨',
    description: `**${user.username}** has requested **${content}** for the talents page.`,
    color: 15237114,
  })

  return useDB().insert(tables.suggestions)
    .values({
      email: user.email,
      content,
    })
    .onConflictDoUpdate({
      target: tables.suggestions.email,
      set: {
        content,
      },
      setWhere: sql`${tables.suggestions.email}
      =
      ${user.email}`,
    }).returning({
      content: tables.suggestions.content,
    })
})
