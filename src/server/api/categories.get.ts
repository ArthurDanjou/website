import type { CategoryType } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const { type } = getQuery<{ type: CategoryType }>(event)
  return await usePrisma().category.findMany({
    where: {
      type,
    },
  })
})
