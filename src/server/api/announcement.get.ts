export default defineEventHandler(async () => {
  return await usePrisma().announcement.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  })
})
