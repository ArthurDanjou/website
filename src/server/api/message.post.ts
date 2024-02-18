import { z } from 'zod'

const MessageValidator = z.object({
  message: z.string(),
}).parse

export default defineEventHandler(async (event) => {
  const { message } = await readValidatedBody(event, MessageValidator)
  const { user } = await requireUserSession(event)

  await sendDiscordWebhookMessage({
    title: 'New guestbook message ✨',
    description: `**${user.username}** as signed the book : "*${message}*"`,
    color: 15893567,
  })

  return await usePrisma().guestbookMessage.upsert({
    where: {
      email: user.email,
    },
    update: {
      message,
    },
    create: {
      email: user.email,
      image: user.picture,
      username: user.username,
      message,
    },
  })
})
