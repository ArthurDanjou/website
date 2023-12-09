import { z } from 'zod'

const SuggestionValidator = z.object({
  author: z.string().trim(),
  content: z.string(),
}).parse

export default defineEventHandler(async (event) => {
  const { author, content } = await getValidatedQuery(event, SuggestionValidator)
  const { user } = await requireUserSession(event)
})
