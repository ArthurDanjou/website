import { z } from 'zod'

const MessageValidator = z.object({
  message: z.string()
}).parse

export default defineEventHandler(async (event) => {
  const { message } = await readValidatedBody(event, MessageValidator)
  const { user } = await requireUserSession(event)
  const config = useRuntimeConfig(event)

  await sendDiscordWebhookMessage(config, {
    title: 'New guestbook message ✨',
    description: `**${user.username}** has signed the book : "*${message}*"`,
    color: 15893567
  })
  return useDB().insert(tables.guestbookMessages)
    .values({
      message,
      email: user.email,
      username: user.username,
      image: user.picture
    })
    .onConflictDoUpdate({
      target: tables.guestbookMessages.email,
      set: {
        message
      }
    })
})
