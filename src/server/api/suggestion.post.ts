import { z } from 'zod'

const SuggestionValidator = z.object({
  content: z.string(),
}).parse

export default defineEventHandler(async (event) => {
  const { content } = await readValidatedBody(event, SuggestionValidator)
  const { user } = await requireUserSession(event)
  return await usePrisma().suggestion.upsert({
    where: {
      author: user.email,
    },
    update: {
      content,
    },
    create: {
      author: user.email,
      content,
    },
  })
})
