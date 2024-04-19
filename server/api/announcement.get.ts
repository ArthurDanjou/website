export default defineEventHandler(async () => {
  return useDB().query.announcements.findFirst({
    orderBy: (announcement, {asc}) => [asc(announcement.createdAt)]
  })
})
