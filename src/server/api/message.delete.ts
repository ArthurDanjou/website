import { z } from 'zod'

const MessageValidator = z.object({
  id: z.number(),
}).parse

export default defineEventHandler(async (event) => {
  const { id } = await readValidatedBody(event, MessageValidator)
  const { user } = await requireUserSession(event)
  if (!user.admin)
    throw createError({ statusCode: 400, message: 'You need the permission to delete a message!' })

  return await usePrisma().guestbookMessage.delete({
    where: {
      id,
    },
  })
})
