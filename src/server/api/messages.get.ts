export default defineEventHandler(async () => {
  return await usePrisma().guestbookMessage.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  })
})
