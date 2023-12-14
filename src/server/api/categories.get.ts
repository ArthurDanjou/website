import type { CategoryType } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const { type } = getQuery<{ type: CategoryType }>(event)
  return await usePrisma().category.findMany({
    cacheStrategy: {
      ttl: 60 * 3,
    },
    where: {
      type,
    },
  })
})
