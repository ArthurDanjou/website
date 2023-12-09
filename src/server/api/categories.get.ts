export default defineEventHandler(async () => {
  return await usePrisma().category.findMany()
})
