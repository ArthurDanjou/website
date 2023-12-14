export default defineEventHandler(async () => {
  return await usePrisma().announcement.findFirst({
    ororderBy: {
      createdAt: 'desc',
    },
  })
})
