export default defineEventHandler(async () => {
  return useDB().select().from(tables.guestbookMessages).orderBy(asc(tables.guestbookMessages.createdAt))
})
