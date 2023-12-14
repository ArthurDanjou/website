export default defineEventHandler(async () => {
  return await usePrisma().guestbookMessage.findMany({
    cacheStrategy: {
      ttl: 60 * 60,
      swr: 60 * 5,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
})
