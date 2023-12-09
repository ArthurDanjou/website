export default defineEventHandler(() => {
  return usePrisma().announcement.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  })
})
